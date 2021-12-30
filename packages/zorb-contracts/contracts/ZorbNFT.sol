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

    // new years 2022 base
    uint256 private constant MINT_START_AT = 1640995200;
    uint256 private constant MINT_DURATION = 24 hours;

    CountersUpgradeable.Counter currentTokenId;
    IPublicSharedMetadata private immutable sharedMetadata;

    modifier onlyApproved(uint256 tokenId) {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Ony approved");
        _;
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

    function adminMint(address[] memory to) public onlyOwner {
        for (uint256 i = 0; i < to.length; i++) {
            _mint(to[i], currentTokenId.current());
            currentTokenId.increment();
        }
    }

    // onlyapproved guard
    function burn(uint256 tokenId) external onlyApproved(tokenId) {
        _burn(tokenId);
    }

    function zorbForAddress(address user) public view returns (string memory) {
        bytes[5] memory colors = ColorLib.gradientForAddress(user);
        string memory encoded = sharedMetadata.base64Encode(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220"><defs>'
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
                '<g transform="translate(10 10) scale(0.9)"><circle cx="50%" cy="50%" r="50%" fill="url(#grad)" /></g>'
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
                    '", "description": "Zora Zorb New Years Drop 2022',
                    '\\n\\nCelebrate Zora with your own unique Zorb\\n\\n[https://zorb.dev/](zorb.dev)\\n\\nWhen Zorbs are sold or transferred, they update to reflect the zorb of the current owner.", "image": "',
                    zorbForAddress(INFT(address(this)).ownerOf(tokenId)),
                    '"}'
                )
            );
    }
}
