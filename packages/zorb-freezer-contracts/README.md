# Zorb Fridge

> Zorbs shift when transferred. The Zorb Fridge allows you to freeze them.

[Zorbs](https://zorb.dev) are an NFT project created by [ZORA](https://zora.co), which consist on generative art orbs that change color depending on the wallet that holds them.

This project allows you to "freeze" your zorbs, so that they keep your wallet's colors after you transfer them.

## How does it work?

The Zorb contract contains a list of known marketplace contracts. If a zorb is transferred to one of these contracts, it retains the colors of the previous owner (in order to prevent all zorbs looking the same in marketplaces) until they're transferred again.

The Zorb Fridge takes advantage of this functionality by "wrapping" your Zorb NFTs and forwarding all `tokenURI` calls, effectively freezing the metadata until you decide to withdraw it.

> NOTE: For this to work, ZORA needs to add the address of this contract to the `knownMarketplaces` mapping on the Zorb contract.
