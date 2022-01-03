// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

import {ERC721} from "@rari-capital/solmate/src/tokens/ERC721.sol";
import {ZorbNFT} from "@zoralabs/zorb-contracts/contracts/ZorbNFT.sol";
import {IPublicSharedMetadata} from "@zoralabs/nft-editions-contracts/contracts/IPublicSharedMetadata.sol";

/// @title A fridge for all your Zorbs
/// @author Miguel Piedrafita
contract ZorbFridge is ERC721 {
    ZorbNFT public immutable zorb;
    IPublicSharedMetadata private immutable sharedMetadata;

    event Frozen(address indexed actor, uint256 indexed tokenId);
    event Unfrozen(address indexed actor, uint256 indexed tokenId);

    constructor(ZorbNFT _zorb, IPublicSharedMetadata _metadataUtils)
        payable
        ERC721("Frozen Zorbs", "FZORB")
    {
        zorb = _zorb;
        sharedMetadata = _metadataUtils;
    }

    /// @notice Freeze your `tokenId` Zorb in place
    function freeze(uint256 tokenId) public {
        _mint(msg.sender, tokenId);
        emit Frozen(msg.sender, tokenId);

        zorb.transferFrom(msg.sender, address(this), tokenId);
    }

    /// @notice Unfreeze your `tokenId` Zorb from the last wallet and deposit the original NFT in your wallet.
    function unfreeze(uint256 tokenId) public {
        require(ownerOf[tokenId] == msg.sender, "not owner");

        _burn(tokenId);
        emit Unfrozen(msg.sender, tokenId);

        zorb.transferFrom(address(this), msg.sender, tokenId);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        string memory idString = sharedMetadata.numberToString(id);

        return
            sharedMetadata.encodeMetadataJSON(
                abi.encodePacked(
                    '{"name": "Frozen Zorb #',
                    idString,
                    unicode'", "description": "Zorbs were distributed for free by ZORA on New Year’s 2022. Zorbs transform when sent to someone, Frozen Zorbs allow you to freeze their appearance.\\n\\nView the original frozen Zorb at [zorb.dev/nft/',
                    idString,
                    "](https://zorb.dev/nft/",
                    idString,
                    ')", "image": "',
                    zorb.zorbForAddress(zorb.getZorbRenderAddress(id)),
                    '"}'
                )
            );
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external view returns (bytes4) {
        require(msg.sender == address(zorb), "not a zorb");

        return this.onERC721Received.selector;
    }
}
