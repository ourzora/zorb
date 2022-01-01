import { GetStaticProps } from "next";
import {Frame} from '../src/Frame';

import {
  FetchStaticData,
  MediaFetchAgent,
  NetworkIDs,
} from "@zoralabs/nft-hooks";
import { ZORB_CONTRACT, NETWORK_ID } from "../src/env-vars";

export default function Home({ tokens }: { tokens: any }) {
  return (
    <Frame tokens={tokens} />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(
    NETWORK_ID as NetworkIDs
  );
  const contractAddress = ZORB_CONTRACT;
  const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    collectionAddresses: [contractAddress],
    limit: 100,
    offset: 0,
  });

  return {
    props: {
      tokens,
    },
    revalidate: 60,
  };
};
