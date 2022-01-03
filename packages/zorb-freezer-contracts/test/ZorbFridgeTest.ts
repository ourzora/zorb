import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ZorbFridge, ZorbNFT } from "../typechain";
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
		const { ZorbNFT } = await deployments.fixture(["ZorbNFT"]);
		const { ZorbFridge } = await deployments.fixture(["ZorbFridge"]);

		zorb = (await ethers.getContractAt("ZorbNFT", ZorbNFT.address)) as ZorbNFT;
		fridge = (await ethers.getContractAt(
			"ZorbFridge",
			ZorbFridge.address
		)) as ZorbFridge;

		signer = (await ethers.getSigners())[0];
		signerAddress = await signer.getAddress();
		signer2 = (await ethers.getSigners())[1];
		signer2Address = await signer2.getAddress();

		// Mark fridge as a marketplace
		await zorb.setKnownMarketplaces([fridge.address], true);

		// Allow fridge to manage Zorbs for signer
		await zorb.setApprovalForAll(fridge.address, true);

		// Open sale & mint zorb with id 1
		await network.provider.send("evm_mine", [1641013200]);
		await zorb.mint();
	});

	it("allows owner of zorb to freeze", async () => {
		expect(await zorb.ownerOf(1)).to.be.equal(signerAddress);
		expect(await fridge.ownerOf(1)).to.equal(
			"0x0000000000000000000000000000000000000000"
		);

		await fridge.freeze(1);

		expect(zorb.ownerOf(1)).to.equal(fridge.address);
		expect(fridge.ownerOf(1)).to.equal(signerAddress);
	});
});
