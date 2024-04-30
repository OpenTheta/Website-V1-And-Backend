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
    function safeMint(address account, string memory baseTokenURI) external;
    function totalSupply() external view returns(uint256);
}

contract ThetaConProxy is Ownable {

    string public tokenUri;
    uint256 public MAX_NFT_SUPPLY;
    address public feeAddress;
    bool public saleIsActive = false;
    address public contractAddress;
    uint256 Price;

    constructor(address fee, string memory uri, uint256 maxAmount, address _contractAddress) {
        tokenUri = uri;
        MAX_NFT_SUPPLY = maxAmount;
        contractAddress = _contractAddress;
        feeAddress = fee;
    }

    /**
    * @dev Gets current Price
     */
    function getNFTPrice() public view returns (uint256) {
        uint currentSupply = IERC721(contractAddress).totalSupply();
        require(currentSupply < MAX_NFT_SUPPLY, "Sale has already ended");
        return Price;
    }

    /*
* Mint token if sale is active and total supply < max supply
*/
    function safeMint(address to) public payable {
        require(saleIsActive, "Sale must be active to mint");
        require(IERC721(contractAddress).totalSupply() < MAX_NFT_SUPPLY, "Purchase would exceed max supply");
        require(getNFTPrice() == msg.value, "TFuel value sent is not correct");

        payable(feeAddress).transfer(msg.value);

        IERC721(contractAddress).safeMint(to, tokenUri);
    }

    function setPrice(uint256 price) public onlyOwner {
        Price = price;
    }

    function totalSupply() public view returns(uint256){
        return IERC721(contractAddress).totalSupply();
    }

    /*
    * Change fee address
    */
    function changeFeeAddress(address newAddress) public {
        require(feeAddress == msg.sender, 'Only current feeAddress can change it');
        feeAddress = newAddress;
    }

    function setTokenUri(string memory _uri) public onlyOwner {
        tokenUri = _uri;
    }

    function setMaxAmount(uint256 _maxAmount) public onlyOwner {
        MAX_NFT_SUPPLY = _maxAmount;
    }

    function setContractAddress(address _contractAddress) public onlyOwner {
        contractAddress = _contractAddress;
    }


    /*
    * Pause sale if active, make active if paused
    */
    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }
}