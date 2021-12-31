// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {ERC721Burnable, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IPublicSharedMetadata} from "@zoralabs/nft-editions-contracts/contracts/IPublicSharedMetadata.sol";
import {ColorLib} from "./ColorLib.sol";

interface INFT {
    function ownerOf(uint256 tokenId) external view returns (address);
}

/// This custom NFT contract stores additional metadata to use for tokenURI
contract ZorbNFT is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    // new years 2022 base

    // PROD
    uint256 private constant MINT_START_AT = 1640995200;
    uint256 private constant MINT_DURATION = 42 hours;


    mapping(address => bool) private knownMarketplace;
    mapping(uint256 => address) private lastOwner;

    Counters.Counter currentTokenId;
    IPublicSharedMetadata private immutable sharedMetadata;

    modifier onlyApproved(uint256 tokenId) {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Ony approved");
        _;
    }

    constructor(IPublicSharedMetadata _sharedMetadata) ERC721("Zorbs", "ZORB") {
        sharedMetadata = _sharedMetadata;
        currentTokenId.increment();
    }

    function setKnownMarketplaces(address[] calldata marketPlaces, bool isKnown)
        external
        onlyOwner
    {
        for (uint256 i = 0; i < marketPlaces.length; i++) {
            knownMarketplace[marketPlaces[i]] = isKnown;
        }
    }

    function mintIsOpen() public view returns (bool) {
        return
            block.timestamp > MINT_START_AT &&
            block.timestamp <= MINT_START_AT + MINT_DURATION;
    }

    function mint() public {
        require(mintIsOpen(), "not open");
        _mint(msg.sender, currentTokenId.current());
        currentTokenId.increment();
    }

    function totalSupply() public view returns (uint256) {
        return currentTokenId.current();
    }

    function airdrop(address[] memory to) public {
        require(mintIsOpen() || msg.sender == owner(), "Only open");
        for (uint256 i = 0; i < to.length; i++) {
            _mint(to[i], currentTokenId.current());
            currentTokenId.increment();
        }
    }

    function zorbForAddress(address user) public view returns (string memory) {
        bytes[5] memory colors = ColorLib.gradientForAddress(user);
        string memory encoded = sharedMetadata.base64Encode(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220"><defs>'
                '<radialGradient fx="66.46%" fy="24.36%" id="grad">'
                '<stop offset="15.62%" stop-color="',
                colors[0],
                '" /><stop offset="39.58%" stop-color="',
                colors[1],
                '" /><stop offset="72.92%" stop-color="',
                colors[2],
                '" /><stop offset="90.63%" stop-color="',
                colors[3],
                '" /><stop offset="100%" stop-color="',
                colors[4],
                '" /></radialGradient></defs>'
                '<g transform="translate(10 10) scale(0.9)"><circle cx="50%" cy="50%" r="50%" fill="url(#grad)" /></g>'
                "</svg>"
            )
        );
        return string(abi.encodePacked("data:image/svg+xml;base64,", encoded));
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        if (knownMarketplace[to]) {
            lastOwner[tokenId] = from;
        }
    }

    function getZorbRenderAddress(uint256 tokenId)
        public
        view
        returns (address)
    {
        address zorbFor = INFT(address(this)).ownerOf(tokenId);
        if (knownMarketplace[zorbFor] && lastOwner[tokenId] != address(0x0)) {
            zorbFor = lastOwner[tokenId];
        }
        return zorbFor;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "No token");

        return
            sharedMetadata.encodeMetadataJSON(
                abi.encodePacked(
                    '{"name": "Zora Zorb #',
                    sharedMetadata.numberToString(tokenId),
                    '", "description": "Zora Zorb New Years Drop 2022',
                    '\\n\\nCelebrate Zora with your own unique Zorb\\n\\n[https://zorb.dev/](zorb.dev)\\n\\nWhen Zorbs are sold or transferred, they update to reflect the zorb of the current owner.", "image": "',
                    zorbForAddress(getZorbRenderAddress(tokenId)),
                    '"}'
                )
            );
    }
}
