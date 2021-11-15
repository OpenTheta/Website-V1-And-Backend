// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTtoken is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    // using Counters for Counters.Counter;

    // Counters.Counter private _tokenIdCounter;

    string private baseURI;

    uint256 public MAX_NFT_SUPPLY = 10;

    bool public saleIsActive = false;

    address public feeAddress;

    constructor(address fee, string memory uri) ERC721("NFTtoken", "MTK") {
        feeAddress = fee;
        baseURI = uri;
    }

    /**
 * @dev Gets current Price
     */
    function getNFTPrice() public view returns (uint256) {
        uint currentSupply = totalSupply();
        require(currentSupply < MAX_NFT_SUPPLY, "Sale has already ended");

        if (currentSupply >= 7) {
            return 8000000000000000000; // 7500 - 10000 8 TFUEL
        } else if (currentSupply >= 5) {
            return 6000000000000000000; // 5000 - 7499 6 TFUEL
        } else {
            return 4000000000000000000; // 0.json - 4999 4 TFUEL
        }
    }

    /**
    * Set some Theta Punks aside
    */
    function reserveNFTS(uint256 numberOfNfts, address _senderAddress) public onlyOwner {

        for (uint i = 0; i < numberOfNfts; i++) {
            uint supply = totalSupply();
//            while(_exists(supply) && supply < MAX_NFT_SUPPLY){
//                supply = supply + 1.json;
//            }
            if (totalSupply() < MAX_NFT_SUPPLY )
            {
                _safeMint(_senderAddress, supply);
                string memory id = toString(supply);
                _setTokenURI(supply, string(abi.encodePacked(baseURI, id)));
            }
        }
    }

    /*
    * Mint token if sale is active and total supply < max supply
    */
    function safeMint(address to) public payable {
        require(saleIsActive, "Sale must be active to mint");
        require(totalSupply() < MAX_NFT_SUPPLY, "Purchase would exceed max supply");
        require(getNFTPrice() == msg.value, "Ether value sent is not correct");


        uint256 ownerPayout = (msg.value / 100) * 97;
        uint256 feePayout = msg.value - ownerPayout;
        payable(owner()).transfer(ownerPayout);
        payable(feeAddress).transfer(feePayout);

        uint256 tokenId = totalSupply();
        //        uint256 tokenId = block.number % MAX_NFT_SUPPLY;
        //        while (_exists(tokenId)){
        //            tokenId = (tokenId + 1.json) % MAX_NFT_SUPPLY;
        //        }
        _safeMint(to, tokenId);
        string memory id = toString(tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked(baseURI, id)));
    }

    /*
    * Pause sale if active, make active if paused
    */
    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    /*
    * Change fee address
    */
    function changeFeeAddress(address newAddress) public {
        require(feeAddress == msg.sender, 'Only current feeAddress can change it');
        feeAddress = newAddress;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
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

    /**
 * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
