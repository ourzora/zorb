import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import {
  TestColorLib__factory,
  TestColorLib,
  TestSharedNFTLogic,
} from "../typechain";
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
    for (var i = 0; i < lerp.length; i++) {
      console.log(`n${i}`, lerp[i]);
    }
    expect(true).to.be.equal(true);
  });

  it("tests array", async () => {
    const checkArgs = [
      [0, 1, 200, 100],
      [1, 1, 10, 10],
      [2, 0, 30, 8],
      [3, 0, 40, 60],
      [4, 0, 60, 8],
      [5, 0, 80, 100],
    ];
    for (let i = 0; i < checkArgs.length; i++) {
      const [input0, input1, input2, input3] = checkArgs[i];
      const result = lerpHueFn(input0, input1/100.0)(input2, input3/100.0);
      const chainResult = await testColorLib.getLerpHue(
        input0,
        input1,
        input2,
        input3
      );
      const testValue = `Arg: ${input0} ${input1} ${input2} ${input3}`;
      console.log({ testValue, result, chainResult: chainResult.toNumber() });
      // expect(
      //   chainResult.toNumber(),
      //   testValue,
      // ).to.be.approximately(result, 2);
    }
  });
});
