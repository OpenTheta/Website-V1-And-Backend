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
    function safeMint(address to, string memory uri, uint256 tokenId) external;
    function balanceOf(address owner) external view returns (uint256);
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256);
}

contract ProxyMinter is Ownable {

    string public tokenUri;
    uint256 public MAX_NFT_SUPPLY;
    uint256 public totalSupply = 0;
    uint256 public START_ID;
    address public feeAddress;
    bool public saleIsActive = false;
    address public NFT;
    uint256 Price;
    address ThetaPunks = 0x1f3De9cdB1D4eD10e8b7b3F21F282D84f7f54473;
//    address Wes = 0x6449F9E18F3afb470bE2038B271090412890f264;

    constructor(address fee, string memory uri, uint256 maxAmount, uint256 startId, address nft) {
        tokenUri = uri;
        MAX_NFT_SUPPLY = maxAmount;
        START_ID = startId;
        NFT = nft;
        feeAddress = fee;
    }

    /**
    * @dev Gets current Price
     */
    function getNFTPrice() public view returns (uint256) {
        uint currentSupply = totalSupply;
        require(currentSupply < MAX_NFT_SUPPLY, "Sale has already ended");

        return Price;
    }

    /**
    * @dev Gets current Price
    */
    function getDiscountedNFTPrice(address buyer) public view returns (uint256) {
        uint currentSupply = totalSupply;
        require(currentSupply < MAX_NFT_SUPPLY, "Sale has already ended");
        uint multiplier = 100;
        if(IERC721(ThetaPunks).balanceOf(buyer) >= 1) {
            multiplier -= 15;
        }
        if(totalSupply<100) {
            uint discount = 150000000000000000000;
            return (Price-discount)*multiplier/100;
        }
//        bool hasWes = false;
//        if(IERC721(Wes).balanceOf(buyer) >= 1) {
//            for(uint i=0; i< IERC721(Wes).balanceOf(buyer); i++) {
//                if(IERC721(Wes).tokenOfOwnerByIndex(buyer,i)>0 && IERC721(Wes).tokenOfOwnerByIndex(buyer,i)<=600) {
//                    hasWes = true;
//                    break;
//                }
//            }
//        }
//        if(hasWes) {
//            multiplier -= 15;
//        }
        return Price*multiplier/100;
    }

    function hasDiscount(address buyer) public view returns(bool) {
        return (IERC721(ThetaPunks).balanceOf(buyer) >= 1);
    }

    /*
* Mint token if sale is active and total supply < max supply
*/
    function safeMint(address to) public payable {
        require(saleIsActive, "Sale must be active to mint");
        require(totalSupply < MAX_NFT_SUPPLY, "Purchase would exceed max supply");
        require(getDiscountedNFTPrice(to) == msg.value, "TFuel value sent is not correct");

        uint256 ownerPayout = msg.value/100*20;
        uint256 feePayout = msg.value - ownerPayout;
        payable(owner()).transfer(ownerPayout);
        payable(feeAddress).transfer(feePayout);


        uint256 tokenId = START_ID + totalSupply;
        totalSupply++;

        IERC721(NFT).safeMint(to, tokenUri, tokenId);
    }

    function reserveNFTS(uint256 numberOfNfts, address _senderAddress) public onlyOwner {
        for (uint i = 0; i < numberOfNfts; i++) {
            if (totalSupply < MAX_NFT_SUPPLY ) {
                uint256 tokenId = START_ID + totalSupply;
                totalSupply++;
                IERC721(NFT).safeMint(_senderAddress, tokenUri, tokenId);
            }
        }
    }

    function setMaxSupply(uint256 maxSupply) public onlyOwner {
        require(maxSupply>=totalSupply, "MaxSupply can't be smaller then supply");
        MAX_NFT_SUPPLY = maxSupply;
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
