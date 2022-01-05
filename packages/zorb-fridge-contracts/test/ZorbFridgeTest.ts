import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import {
  ZorbFridge,
  ZorbFridge__factory,
  ZorbNFT,
  ZorbNFT__factory,
} from "../typechain";
import { ethers, deployments, network } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ZorbFridge", () => {
  let signer: SignerWithAddress;
  let signerAddress: string;
  let signer2: SignerWithAddress;
  let signer2Address: string;

  let zorb: ZorbNFT;
  let fridge: ZorbFridge;

  beforeEach(async () => {
    const { ZorbFridge, ZorbNFT } = await deployments.fixture([
      "ZorbNFT",
      "ZorbFridge",
    ]);

    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();
    signer2 = (await ethers.getSigners())[1];
    signer2Address = await signer2.getAddress();

    zorb = ZorbNFT__factory.connect(ZorbNFT.address, signer);
    fridge = ZorbFridge__factory.connect(ZorbFridge.address, signer);

    // Mark fridge as a marketplace
    await zorb.setKnownMarketplaces([fridge.address], true);

    // Allow fridge to manage Zorbs for signer
    await zorb.connect(signer).setApprovalForAll(fridge.address, true);

    // Open sale & mint zorb with id 1
    await network.provider.send("evm_mine", [1641013200]);
    await zorb.mint();
  });

  it("allows owner of zorb to freeze and unfreeze", async () => {
    expect(await zorb.ownerOf(1)).to.be.equal(signerAddress);
    expect(await fridge.ownerOf(1)).to.be.equal(ethers.constants.AddressZero);

    expect(await fridge.freeze(1)).to.emit(fridge, "Frozen");

    expect(await zorb.ownerOf(1)).to.equal(fridge.address);
    expect(await fridge.ownerOf(1)).to.equal(signerAddress);
    expect(await zorb.getZorbRenderAddress(1)).to.be.equal(signerAddress);
    await fridge.transferFrom(signerAddress, signer2Address, 1);
    expect(await zorb.ownerOf(1)).to.be.equal(fridge.address);

    expect(await fridge.connect(signer2).unfreeze(1)).to.emit(
      fridge,
      "Unfrozen"
    );
  });

  it("allows owner of zorb to freeze with just a safeTransfer", async () => {
    await zorb.connect(signer2).mint();
    expect(await zorb.ownerOf(2)).to.be.equal(signer2Address);
    expect(await fridge.ownerOf(2)).to.be.equal(ethers.constants.AddressZero);

    console.log(zorb);

    expect(
      await zorb
        .connect(signer2)
        ["safeTransferFrom(address,address,uint256)"](
          signer2Address,
          fridge.address,
          2
        )
    ).to.emit(fridge, "Frozen");

    expect(await zorb.ownerOf(2)).to.equal(fridge.address);
    expect(await fridge.ownerOf(2)).to.equal(signer2Address);
    expect(await zorb.getZorbRenderAddress(2)).to.be.equal(signer2Address);
    expect(await zorb.ownerOf(2)).to.be.equal(fridge.address);
    await fridge.connect(signer2).transferFrom(signer2Address, signerAddress, 2);

    expect(await fridge.connect(signer).unfreeze(2)).to.emit(
      fridge,
      "Unfrozen"
    );
  });

  it("allows owner of zorb to freeze and unfreeze multiple times", async () => {
    expect(await zorb.ownerOf(1)).to.be.equal(signerAddress);
    expect(await fridge.ownerOf(1)).to.be.equal(ethers.constants.AddressZero);

    expect(await fridge.freeze(1)).to.emit(fridge, "Frozen");

    expect(await zorb.ownerOf(1)).to.equal(fridge.address);
    expect(await fridge.ownerOf(1)).to.equal(signerAddress);
    await fridge.transferFrom(signerAddress, signer2Address, 1);
    expect(await zorb.getZorbRenderAddress(1)).to.be.equal(signerAddress);
    expect(await zorb.ownerOf(1)).to.be.equal(fridge.address);
    expect(await fridge.ownerOf(1)).to.be.equal(signer2Address);

    expect(await fridge.connect(signer2).unfreeze(1)).to.emit(
      fridge,
      "Unfrozen"
    );

    expect(await fridge.ownerOf(1)).to.be.equal(ethers.constants.AddressZero);

    await zorb.connect(signer2).setApprovalForAll(fridge.address, true);
    expect(await fridge.connect(signer2).freeze(1)).to.emit(fridge, "Frozen");
    expect(await fridge.ownerOf(1)).to.be.equal(signer2Address);
  });

  it("does not allow a non-owner to freeze", async () => {
    await zorb.connect(signer2).mint();
    await zorb.connect(signer2).setApprovalForAll(fridge.address, true);
    await expect(fridge.connect(signer2).freeze(2)).to.emit(fridge, "Frozen");
  });
  it("does not allow non-owner to unfreeze", async () => {
    expect(await fridge.freeze(1)).to.emit(fridge, "Frozen");
    await expect(fridge.connect(signer2).unfreeze(1)).to.be.revertedWith(
      "not owner"
    );
  });
});
