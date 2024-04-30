// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PUNS is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable {

    string private baseURI;
    bool public saleIsActive = false;

    mapping(address => bool) addressHasMinted;

    constructor(string memory uri) ERC721("P.U.N.S.", "PUNS") {
        baseURI = uri;
    }

    /**
    * @dev Gets current Price
    */
    function getNFTPrice() public view returns (uint256) {
        require(saleIsActive, "Currently sale not active");
        return 0;
    }

    function safeMint(address to) public payable {
        require(saleIsActive, "Sale must be active to mint");
        require(!addressHasMinted[to], "Already minted one NFT");
        addressHasMinted[to] = true;
        uint256 tokenId = totalSupply() + 1;
        _safeMint(to, tokenId);
        if(tokenId % 2 == 1) {
            _setTokenURI(tokenId, '1.json');
        } else {
            _setTokenURI(tokenId, '2.json');
        }
    }

    /**
    * Set some NFTs aside
    */
    function reserveNFTS(uint256 numberOfNfts, address to) public onlyOwner {
        for (uint i = 0; i < numberOfNfts; i++) {
            uint256 tokenId = totalSupply() + 1;
            _safeMint(to, tokenId);
            if(tokenId % 2 == 1) {
                _setTokenURI(tokenId, '1.json');
            } else {
                _setTokenURI(tokenId, '2.json');
            }
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    /*
    * Pause sale if active, make active if paused
    */
    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function updateURI(string memory uri) public onlyOwner {
        baseURI = uri;
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