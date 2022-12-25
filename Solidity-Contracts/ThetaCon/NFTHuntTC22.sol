// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Token starting at 1
contract NFTHUNT is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable {

    uint256 public MAX_NFT_SUPPLY = 1000;
    address public couponWallet = 0x0000000000000000000000000000000000000000;

    constructor() ERC721("NFT Hunt TC22", "NH-TC22") {
    }


    /*
    * Mint token if sale is active and total supply < max supply
    */
//    function safeMint(address to, uint256 tokenId, string memory uri) public onlyOwner {
//        require(!_exists(tokenId), "Token already exists");
//
//        _safeMint(to, tokenId);
//        _setTokenURI(tokenId, uri);
//    }

    /**
    * Set some NFTs aside
    */
    function reserveNFTS(uint256 numberOfNfts, address _senderAddress, string memory uri) public onlyOwner {
        for (uint i = 0; i < numberOfNfts; i++) {
            uint256 supply = totalSupply();

            if (supply < MAX_NFT_SUPPLY )
            {
                uint256 tokenId = supply+1;
                _safeMint(_senderAddress, tokenId);
                _setTokenURI(tokenId, uri);
            }
        }
    }

    function setCouponWallet(address wallet) public onlyOwner {
        couponWallet = wallet;
    }

    function burn(uint256 tokenId) public {
        _burn(tokenId);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
    internal
    override(ERC721, ERC721Enumerable)
    {
        if(paused()) {
            require(from == couponWallet, "Only Coupon redeeming allowed");
        }
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}