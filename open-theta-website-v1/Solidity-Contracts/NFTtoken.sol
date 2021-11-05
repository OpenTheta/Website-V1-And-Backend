// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/EnumerableMap.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @title NFTtoken contract
 * @dev Extends ERC721 Non-Fungible Token Standard basic implementation
 */
contract NFTtoken is ERC721, Ownable {
    using SafeMath for uint256;

    string public TOKEN_PROVENANCE = "";

    uint256 public startingIndexBlock;

    uint256 public startingIndex;

    uint256 public MAX_NFT_SUPPLY = 10000;

    bool public saleIsActive = false;

    address public feeAddress;

    constructor(string memory name, string memory symbol, address feeAddress) ERC721(name, symbol) {
        feeAddress = feeAddress;
    }

    /**
     * @dev Gets current ThetaPunk Price
     */
    function getNFTPrice() public view returns (uint256) {
        require(totalSupply() < MAX_NFT_SUPPLY, "Sale has already ended");

        uint currentSupply = totalSupply();

        if (currentSupply >= 7500) {
            return 800000000000000000000; // 7500 - 10000 800 TFUEL
        } else if (currentSupply >= 5000) {
            return 600000000000000000000; // 5000 - 7499 600 TFUEL
        } else {
            return 400000000000000000000; // 0 - 4999 400 TFUEL
        }
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        msg.sender.transfer(balance);
    }

    /**
     * Set some Theta Punks aside
     */
    function reserveNFTS(uint256 numberOfNfts, address[] memory _senderAddress) public onlyOwner {

        for (uint i = 0; i < numberOfNfts; i++) {
            uint supply = totalSupply();
            if (totalSupply() < MAX_NFT_SUPPLY)
            {
                _safeMint(_senderAddress[i], supply);
            }
        }
    }

    /*
    * Set provenance once it's calculated
    */
    function setProvenanceHash(string memory provenanceHash) public onlyOwner {
        TOKEN_PROVENANCE = provenanceHash;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _setBaseURI(baseURI);
    }

    /*
    * Pause sale if active, make active if paused
    */
    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    /**
    * Mints Theta Punks
    */
    function mintNFT() public payable {
        require(saleIsActive, "Sale must be active to mint Punks");
        require(totalSupply() <= MAX_NFT_SUPPLY, "Purchase would exceed max supply of Punks");
        require(getNFTPrice() == msg.value, "Ether value sent is not correct");

        uint mintIndex = totalSupply();
        _safeMint(msg.sender, mintIndex);

        uint256 userPayout = (msg.value.div(100)).mul(97);
        uint256 ownerPayout = msg.value.sub(userPayout);
        payable(owner).transfer(ownerPayout);
        /**
        * Source of randomness. Theoretical miner withhold manipulation possible but should be sufficient in a pragmatic sense
        */
        if (startingIndexBlock == 0 && (totalSupply() == MAX_NFT_SUPPLY)) {
            startingIndexBlock = block.number;
        }
    }

    /**
     * Set the starting index for the collection
     */
    function setStartingIndex() public {
        require(startingIndex == 0, "Starting index is already set");
        require(startingIndexBlock != 0, "Starting index block must be set");

        startingIndex = uint(blockhash(startingIndexBlock)) % MAX_NFT_SUPPLY;
        // Just a sanity case in the worst case if this function is called late (EVM only stores last 256 block hashes)
        if (block.number.sub(startingIndexBlock) > 255) {
            startingIndex = uint(blockhash(block.number - 1)) % MAX_NFT_SUPPLY;
        }
        // Prevent default sequence
        if (startingIndex == 0) {
            startingIndex = startingIndex.add(1);
        }
    }

    /**
     * Set the starting index block for the collection, essentially unblocking
     * setting starting index
     */
    function emergencySetStartingIndexBlock() public onlyOwner {
        require(startingIndex == 0, "Starting index is already set");

        startingIndexBlock = block.number;
    }
}
