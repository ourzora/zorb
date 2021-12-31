import { GetStaticProps } from "next";
import {Frame} from '../src/Frame';

import {
  FetchStaticData,
  MediaFetchAgent,
  NetworkIDs,
} from "@zoralabs/nft-hooks";

export default function Home({ tokens }: { tokens: any }) {
  return (
    <Frame tokens={tokens} />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );
  const contractAddress = process.env
    .NEXT_PUBLIC_ZORB_CONTRACT as string;
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
