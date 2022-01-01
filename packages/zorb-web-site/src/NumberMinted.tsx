import { useEffect, useState } from "react";
import { NETWORK_ID, ZORB_CONTRACT } from "./env-vars";

export const NumberMinted = () => {
  const [count, setCount] = useState<undefined | string>();
  useEffect(() => {
    fetch(
      `https://${
        NETWORK_ID === "4" ? "rinkeby." : ""
      }ether.actor/${ZORB_CONTRACT}/totalSupply`
    )
      .then((r) => {
        if (r.status === 200) {
          r.text().then(setCount)
        } else {
          setCount('');
        }
      })
  }, []);
  return <>{count ? Intl.NumberFormat('en-US').format(parseInt(count, 10)) : ""}</>;
};
