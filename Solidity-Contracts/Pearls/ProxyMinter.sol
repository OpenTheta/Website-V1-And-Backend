// SPDX-License-Identifier: UNLICENSED

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

// OpenZeppelin Contracts v4.3.2 (utils/Strings.sol)

pragma solidity ^0.8.0;

/**
 * @dev String operations.
 */
library Strings {
    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";

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

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
     */
    function toHexString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0x00";
        }
        uint256 temp = value;
        uint256 length = 0;
        while (temp != 0) {
            length++;
            temp >>= 8;
        }
        return toHexString(value, length);
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
     */
    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _HEX_SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }
}

pragma solidity ^0.8.0;

interface ITNT721 {
    function safeMint(address to, string memory uri) external;
    function PRICE() external view returns (uint256);
    function creatorAddress() external view returns(address);
    function feeAddress() external view returns(address);
}

contract ProxyMinter  is Ownable {
    address public mintingContract = 0x13BA2e20789DF0dEd3f9C30575D450152640F3dc;

    uint private MAX_NFT_SUPPLY = 100;
    uint public totalSupply = 0;
    uint public alreadyMinted = 12;

    uint16[100-12] private order;
    uint private start;
    uint private end;
    uint private stepSize;
    bool private orderIsCreated;
    bool private orderIsShuffled;

    string private baseURI;

    bool public saleIsActive = false;

    constructor(string memory _uri){
        baseURI = _uri;
        stepSize = MAX_NFT_SUPPLY-alreadyMinted;
        end = stepSize;
        totalSupply = alreadyMinted;
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
        start = end;
        end += stepSize;
        if(end > MAX_NFT_SUPPLY - alreadyMinted) end = MAX_NFT_SUPPLY-alreadyMinted;
        if(start == end) orderIsShuffled = true;
    }

    function createOrder() external onlyOwner {
        require(!orderIsCreated, "Order was already created");
        for (uint256 i = start; i < end; i++) {
            order[i] = uint16(i+1);
        }
        orderIsCreated = true;
        start = 0;
        end = stepSize;
        if(stepSize > 500) {
            stepSize = 500;
            end = stepSize;
        }
    }

    function getNFTPrice() public view returns (uint256) {
        return ITNT721(mintingContract).PRICE();
    }

    /**
    * Set some NFTs aside
    */
    function reserveNFTS(uint256 numberOfNfts, address _senderAddress) public onlyOwner {
        require(orderIsShuffled, "Not shuffled");
        for (uint i = 0; i < numberOfNfts; i++) {
            uint256 supply = totalSupply;

            if (supply < MAX_NFT_SUPPLY )
            {
                uint orderID = totalSupply-alreadyMinted;
                string memory id = Strings.toString(order[orderID]);
                string memory uri = string(abi.encodePacked(baseURI, string(abi.encodePacked(id, ".json"))));
                totalSupply++;
                ITNT721(mintingContract).safeMint(_senderAddress, uri);
            }
        }
    }

    /*
    * Mint token if sale is active and total supply < max supply
    */
    function safeMint(address to) public payable {
        require(saleIsActive, "Sale must be active to mint");
        require(totalSupply < MAX_NFT_SUPPLY, "Already all NFTs Minted");
        require(getNFTPrice() <= msg.value, "Wrong value");

        uint256 creatorPayout = (msg.value / 100) * 70;
        uint256 feePayout = msg.value - creatorPayout;
        payable(ITNT721(mintingContract).creatorAddress()).transfer(creatorPayout);
        payable(ITNT721(mintingContract).feeAddress()).transfer(feePayout);

        uint orderID = totalSupply-alreadyMinted;
        string memory id = Strings.toString(order[orderID]);
        string memory uri = string(abi.encodePacked(baseURI, string(abi.encodePacked(id, ".json"))));
        totalSupply++;
        ITNT721(mintingContract).safeMint(to, uri);
    }

    /*
    * Pause sale if active, make active if paused
    */
    function flipSaleState() public onlyOwner {
        require(orderIsShuffled, "Not shuffled");
        saleIsActive = !saleIsActive;
    }
}
