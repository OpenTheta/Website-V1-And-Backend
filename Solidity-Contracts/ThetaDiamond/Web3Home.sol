// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Web3Home is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable {

    string private baseURI;
    bool public saleIsActive = false;
    address public feeAddress;

    mapping(address => bool) addressHasMinted;

    constructor(address _feeAddress, string memory uri) ERC721("Web3 Home", "W3H") {
        feeAddress = _feeAddress;
        baseURI = uri;
    }

    /**
    * @dev Gets current Price
    */
    function getDiscountedNFTPrice(address buyer) public view returns (uint256) {
        require(saleIsActive, "Currently sale not active");
        if(!addressHasMinted[buyer]) {
            return 0;
        } else {
            return 100000000000000000000; // 600 TFUEL
        }
    }

    function safeMint(address to) public payable {
        require(saleIsActive, "Sale must be active to mint");
        require(getDiscountedNFTPrice(to) == msg.value, "Already minted one NFT");
        if(getDiscountedNFTPrice(to) > 0) {
            payable(feeAddress).transfer(msg.value);
        }
        addressHasMinted[to] = true;
        uint256 tokenId = totalSupply() + 1;
        _safeMint(to, tokenId);
    }

    /**
    * Set some NFTs aside
    */
    function reserveNFTS(uint256 numberOfNfts, address _senderAddress) public onlyOwner {
        for (uint i = 0; i < numberOfNfts; i++) {
            uint supply = totalSupply();
            _safeMint(_senderAddress, supply);
        }
    }

    /*
    * Pause sale if active, make active if paused
    */
    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
    internal
    override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");
        return baseURI;
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