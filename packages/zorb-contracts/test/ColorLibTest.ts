import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { TestColorLib__factory, TestColorLib } from "../typechain";
import { lerpHueFn } from "./lib";

describe("BaseMetadataToken", () => {
  let signer: SignerWithAddress;
  let signerAddress: string;
  let testColorLib: TestColorLib;

  beforeEach(async () => {
    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();

    testColorLib = await new TestColorLib__factory(signer).deploy();
  });

  it("mints", async () => {
    const lerp = await testColorLib.getLerp(
      "0x912b28822bd8C7A6FAe3CF0499A51C8d8bD746C6"
    );
    console.log(lerp);
    for (var i = 0; i < lerp.length; i++) {
      console.log(`n${i}`, lerp[i]);
    }
    expect(true).to.be.equal(true);
  });
  it('lerps hue', async () => {
    const inputs = [2, 1, 200, 100];
    const result = lerpHueFn(inputs[0], inputs[1])(inputs[2], inputs[3])
    const chainResult = await testColorLib.getLerpHue(inputs[0], inputs[1], inputs[2], inputs[3]);
    console.log({result, chainResult: chainResult.toNumber()});
    expect(result).to.be.equal(chainResult);
  })
});
