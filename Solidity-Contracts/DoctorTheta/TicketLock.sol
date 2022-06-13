// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

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

// import "@openzeppelin/contracts/access/Ownable.sol";
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

contract TicketLock is Ownable{

    uint256 public startLockTime;
    uint256 public endLockTime;

    address public TokenAddress = 0x11cD1B3323192E56e8fa1F0E624244f36eEFb971;

    mapping(uint256 => address) idToWallet;

    constructor(uint256 startTime, uint256 endTime) {
        startLockTime = startTime;
        endLockTime = endTime;
    }

    event TokenLocked(uint256 indexed tokenId, address indexed owner);
    event TokenUnlocked(uint256 indexed tokenId, address indexed owner);

    function setStartTime(uint256 timestamp) public onlyOwner {
        require(endLockTime > timestamp, "Start time not smaller then end time");
        startLockTime = timestamp;
    }

    function setEndTime(uint256 timestamp) public onlyOwner {
        require(startLockTime < timestamp, "End time not bigger then start time");
        endLockTime = timestamp;
    }

    function lockToken(uint256 tokenId) public {
        require(startLockTime > block.timestamp, "Smart contract is locked");
        IERC721(TokenAddress).transferFrom(msg.sender, address(this), tokenId);
        idToWallet[tokenId] = msg.sender;
        emit TokenLocked(tokenId, msg.sender);
    }

    function unlockToken(uint256 tokenId) public {
        require(startLockTime > block.timestamp || endLockTime < block.timestamp, "Smart contract is locked");
        require(idToWallet[tokenId] == msg.sender, "Caller didn't lock this NFT");
        IERC721(TokenAddress).transferFrom(address(this), msg.sender, tokenId);
        idToWallet[tokenId] = address(0);
        emit TokenUnlocked(tokenId, msg.sender);
    }

    function getWallet(uint tokenId) public view returns(address){
        return idToWallet[tokenId];
    }
}
