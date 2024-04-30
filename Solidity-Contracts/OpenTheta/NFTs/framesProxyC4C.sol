// SPDX-License-Identifier: MIT


// OpenZeppelin Contracts v4.3.2 (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// @openzeppelin/contracts/access/Ownable.sol
// OpenZeppelin Contracts v4.3.2 (access/Ownable.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

interface IERC721 {
    function safeMint(address to, uint256 tokenId, string memory uri) external;
}

contract ProxyMinterC4C is Ownable {

    string public tokenUriSilver;
    string public tokenUriGold;
    string public tokenUriPlatinum;
    string public tokenUriObsidian;
    uint256 public totalSupply = 0;
    uint256 public START_ID;
    address public feeAddress;
    bool public saleIsActive = false;
    address public NFT;
    uint256 Price;

    // randomize mint
    uint16[200] private order;
    uint private start;
    uint private end = 200;
    uint private stepSize = 200;
    bool private orderIsCreated;
    bool private orderIsShuffled;

    constructor(address fee, string memory _tokenUriSilver, string memory _tokenUriGold, string memory _tokenUriPlatinum, string memory _tokenUriObsidian, uint256 startId, address nft) {
        START_ID = startId;
        NFT = nft;
        feeAddress = fee;
        tokenUriSilver = _tokenUriSilver;
        tokenUriGold = _tokenUriGold;
        tokenUriPlatinum = _tokenUriPlatinum;
        tokenUriObsidian = _tokenUriObsidian;
    }

    function shuffle(uint seed) external onlyOwner {
        require(orderIsCreated, "Order was not created");
        require(!orderIsShuffled, "Already shuffled");
        for (uint256 i = start; i < end; i++) {
            uint256 n = i + uint256(keccak256(abi.encodePacked(block.timestamp + seed))) % (order.length - i);
            uint16 temp = order[n];
            order[n] = order[i];
            order[i] = temp;
        }
        orderIsShuffled = true;
    }

    function createOrder() external onlyOwner {
        require(!orderIsCreated, "Order was already created");
        for (uint256 i = start; i < end; i++) {
            if(i<6) {
                order[i] = uint16(1); // obsidian
            } else if(i<28) {
                order[i] = uint16(2); // platinum
            } else if(i<86) {
                order[i] = uint16(3); // gold
            } else if(i<200) {
                order[i] = uint16(4); // silver
            }
        }
        orderIsCreated = true;
        start = 0;
    }

    //    function getOrder(uint256 i) public view returns (uint16) {
    //        return order[i];
    //    }

    function getURI(uint256 uriID) internal view returns(string memory) {
        string memory  uri;
        if(uriID == 1) {
            uri = tokenUriObsidian;   // obsidian
        } else if(uriID == 2) {
            uri = tokenUriPlatinum;   // platinum
        } else if(uriID == 3) {
            uri = tokenUriGold;       // gold
        } else if(uriID == 4) {
            uri = tokenUriSilver;     // silver
        }
        return uri;
    }

    /**
    * @dev Gets current Price
     */
    function getNFTPrice() public view returns (uint256) {
        return Price;
    }

    /*
* Mint token if sale is active and total supply < max supply
*/
    function safeMint(address to) public payable {
        require(saleIsActive, "Sale must be active to mint");
        require(getNFTPrice() == msg.value, "TFuel value sent is not correct");
        require(orderIsShuffled, "not shuffled");
        uint256 ownerPayout = msg.value / 2;
        uint256 feePayout = msg.value - ownerPayout;
        payable(owner()).transfer(ownerPayout);
        payable(feeAddress).transfer(feePayout);


        uint256 tokenId = START_ID + totalSupply;

        IERC721(NFT).safeMint(to, tokenId, getURI(order[totalSupply % 200]));
        totalSupply++;
    }

    function reserveNFTS(uint256 numberOfNfts, address _senderAddress) public onlyOwner {
        for (uint i = 0; i < numberOfNfts; i++) {
            uint256 tokenId = START_ID + totalSupply;
            IERC721(NFT).safeMint(_senderAddress, tokenId, getURI(order[totalSupply % 200]));
            totalSupply++;

        }
    }

    function setPrice(uint256 price) public onlyOwner {
        Price = price;
    }

    /*
    * Change fee address
    */
    function changeFeeAddress(address newAddress) public {
        require(feeAddress == msg.sender, 'Only current feeAddress can change it');
        feeAddress = newAddress;
    }


    /*
    * Pause sale if active, make active if paused
    */
    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }
}