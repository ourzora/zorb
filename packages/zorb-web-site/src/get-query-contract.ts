import { ethers } from "ethers";
import { NETWORK_ID, RPC_URL, ZORB_CONTRACT } from "./env-vars";

const Contract = new ethers.Contract(ZORB_CONTRACT, [
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function zorbForAddress(address user) view returns (string)",
]);

export async function getTokenInfo(tokenId: string) {
  const provider = new ethers.providers.JsonRpcBatchProvider(
    RPC_URL,
    parseInt(NETWORK_ID || "4")
  );
  const connectedContract = Contract.connect(provider);
  const ownerAddress = await connectedContract.ownerOf(tokenId);
  const zorbImage = await connectedContract.zorbForAddress(ownerAddress);
  return {ownerAddress, zorbImage};
}
