import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments, network } from "hardhat";
import { ZorbNFT } from "../typechain";
import { writeFile } from "fs/promises";
import { expect } from "chai";

function parseZorb(zorb: string) {
  const zorbJSONStr = Buffer.from(
    zorb.substring("data:application/json;base64,".length),
    "base64"
  ).toString("utf-8");
  console.log({ zorbJSONStr });
  const zorbJSON = JSON.parse(zorbJSONStr);
  return zorbJSON;
}

function makeInline(zorb: string) {
  return Buffer.from(zorb.substring(zorb.indexOf(",")), "base64").toString(
    "utf-8"
  );
}

describe("ZorbNFT", () => {
  let signer: SignerWithAddress;
  let signerAddress: string;
  let signer2: SignerWithAddress;
  let signer2Address: string;
  let signer3: SignerWithAddress;
  let signer3Address: string;

  let childNft: ZorbNFT;

  beforeEach(async () => {
    const { ZorbNFT } = await deployments.fixture(["ZorbNFT"]);

    childNft = (await ethers.getContractAt(
      "ZorbNFT",
      ZorbNFT.address
    )) as ZorbNFT;

    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();
    signer2 = (await ethers.getSigners())[1];
    signer2Address = await signer2.getAddress();
    signer3 = (await ethers.getSigners())[2];
    signer3Address = await signer3.getAddress();
  });

  it("hides from marketplace transfers", async () => {
    await childNft.adminMint([signerAddress]);
    await childNft.setKnownMarketplaces([signer2Address], true);
    await childNft.transferFrom(signerAddress, signer2Address, 1);
    // shows old
    expect(await childNft.getZorbRenderAddress(1)).to.be.equal(signerAddress);
    await childNft
      .connect(signer2)
      .transferFrom(signer2Address, signer3Address, 1);
    expect(await childNft.getZorbRenderAddress(1)).to.be.equal(signer3Address);
  });

  it("allows batch adminMint", async () => {
    await childNft.airdrop([signerAddress]);
    expect(await childNft.ownerOf(1)).to.be.equal(signerAddress);
    await expect(
      childNft.connect(signer2).adminMint([signerAddress])
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  xit("renders", async () => {
    const signers = await ethers.getSigners();
    await network.provider.send("evm_setNextBlockTimestamp", [1640995200]);
    await network.provider.send("evm_mine");
    const zorbs = [];
    const signerAddresses: string[] = [];
    for (let i = 0; i < 20; i++) {
      await childNft.connect(signers[i]).mint();
      const zorb = await childNft.tokenURI(i + 1);
      zorbs.push(parseZorb(zorb).image);
      signerAddresses.push(await signers[i].getAddress());
    }
    await writeFile(
      "./out/zorb.html",
      zorbs
        .map(
          (zorb, indx) =>
            `<div>${signerAddresses[indx]}${makeInline(zorb).replace(
              /grad/g,
              `grad${indx}`
            )}<zora-zorb address="${signerAddresses[indx]}"></zora-zorb></div>`
        )
        .join("\n") + `<script src="./zorb-web-component.umd.js"></script>`
    );
  });
});
