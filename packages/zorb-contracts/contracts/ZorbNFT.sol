// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

import {IBaseERC721Interface, ConfigSettings} from "gwei-slim-nft-contracts/contracts/base/ERC721Base.sol";
import {ERC721Delegated} from "gwei-slim-nft-contracts/contracts/base/ERC721Delegated.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {IPublicSharedMetadata} from "@zoralabs/nft-editions-contracts/contracts/IPublicSharedMetadata.sol";
import {StringsUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import {ColorLib} from "./ColorLib.sol";

interface INFT {
    function ownerOf(uint256 tokenId) external view returns (address);
}

/// This custom NFT contract stores additional metadata to use for tokenURI
contract ZorbNFT is ERC721Delegated {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    // new years 2020
    uint128 private constant START_AT = 1577836800;
    uint128 private constant START_YEAR = 2020;
    uint128 private constant YEAR_INTERVAL = 31536000;
    uint128 private constant TIME_OPEN = 172800;

    CountersUpgradeable.Counter currentTokenId;
    mapping(uint256 => string) metadataJson;
    mapping(address => bool) hasMinted;
    mapping(uint256 => uint256) tokenIdToYear;
    IPublicSharedMetadata private immutable sharedMetadata;

    modifier canOnlyMintOnce() {
        require(!hasMinted[msg.sender], "cannot mint twice");
        _;
        hasMinted[msg.sender] = true;
    }

    constructor(address baseFactory, IPublicSharedMetadata _sharedMetadata)
        ERC721Delegated(
            baseFactory,
            "Zorbs",
            "ZORB",
            ConfigSettings({
                royaltyBps: 0,
                uriBase: "",
                uriExtension: "",
                hasTransferHook: false
            })
        )
    {
        sharedMetadata = _sharedMetadata;
        currentTokenId.increment();
    }

    function mint() public canOnlyMintOnce {
        uint256 secondsSince2020 = (block.timestamp - START_AT);
        uint256 year = ((block.timestamp - START_AT) / YEAR_INTERVAL) + 2020;
        require(
            secondsSince2020 % YEAR_INTERVAL >= 0 &&
                secondsSince2020 % YEAR_INTERVAL <= TIME_OPEN,
            "Not new years + 3 days"
        );
        _mint(msg.sender, currentTokenId.current());
        tokenIdToYear[currentTokenId.current()] = year;
        currentTokenId.increment();
    }

    function burn(uint256 tokenId) public {
        _burn(tokenId);
    }

    function zorbForAddress(address user) public view returns (string memory) {
        bytes[5] memory colors = ColorLib.gradientForAddress(user);
        string memory encoded = sharedMetadata.base64Encode(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs>'
                '<radialGradient fx="64.96%" fy="24.36%" id="grad">'
                '<stop offset="15.62%" stop-color="',
                colors[0],
                '" /><stop offset="39.58%" stop-color="',
                colors[1],
                '" /><stop offset="72.92%" stop-color="',
                colors[2],
                '" /><stop offset="90.62%" stop-color="',
                colors[3],
                '" /><stop offset="100%" stop-color="',
                colors[4],
                '" /></radialGradient></defs>'
                '<circle cx="50%" cy="50%" r="50%" fill="url(#grad)" />'
                "</svg>"
            )
        );
        return string(abi.encodePacked("data:image/svg+xml;base64,", encoded));
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "No token");

        return
            sharedMetadata.encodeMetadataJSON(
                abi.encodePacked(
                    '{"name": "Zora Zorb #',
                    StringsUpgradeable.toString(tokenId),
                    " (",
                    StringsUpgradeable.toString(tokenIdToYear[tokenId]),
                    ')", "description": "Zora Zorb New Years Drop ',
                    StringsUpgradeable.toString(tokenIdToYear[tokenId]),
                    '\\n\\nCelebrate Zora with your own unique Zorb\\n\\n[https://zorb.zora.co/](zorb.zora.co)", "image": "',
                    zorbForAddress(INFT(address(this)).ownerOf(tokenId)),
                    '"}'
                )
            );
    }
}
