import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";
import { ERC721Base, ZorbNFT, BaseTestContract } from "../typechain";
import { writeFile } from "fs/promises";

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
  return Buffer.from(
    zorb.substring(zorb.indexOf(',')),
    "base64"
  ).toString("utf-8"); 
}

describe("ZorbNFT", () => {
  let signer: SignerWithAddress;
  let signerAddress: string;
  let childNft: ZorbNFT;
  let baseNft: ERC721Base;

  beforeEach(async () => {
    const { ZorbNFT, BaseTestContract } = await deployments.fixture([
      "BaseTestContract",
      "ZorbNFT",
    ]);

    childNft = (await ethers.getContractAt(
      "ZorbNFT",
      ZorbNFT.address
    )) as ZorbNFT;
    baseNft = (await ethers.getContractAt(
      "BaseTestContract",
      ZorbNFT.address
    )) as BaseTestContract;

    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();
  });

  it("renders", async () => {
    const signers = await ethers.getSigners();
    const zorbs = [];
    const signerAddresses: string[] = [];
    for (let i = 0; i < 10; i++) {
      await childNft.connect(signers[i]).mint();
      const zorb = await baseNft.tokenURI(i + 1);
      zorbs.push(parseZorb(zorb).image);
      signerAddresses.push(await signers[i].getAddress());
    }
    await writeFile("zorb.html", zorbs.map((zorb, indx) => `<div>${signerAddresses[indx]}${makeInline(zorb).replace(/grad/g, `grad${indx}`)}</div>`).join("\n"));
  });
});
