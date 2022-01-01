import { useENSAddress } from "@zoralabs/nft-hooks";
import { sliceAddress } from "./eth-utils";

export const AddressView = ({ address }) => {
  const ensResult = useENSAddress(address);
  if (ensResult.error || !ensResult.data) {
    return <>{sliceAddress(address)}</>;
  }
  return <>{ensResult.data}</>;
};
