// SPDX-License-Identifier: MIT

// OpenZeppelin Contracts v4.4.1 (utils/Counters.sol)
// File: @openzeppelin/contracts/utils/Counters.sol
pragma solidity ^0.8.0;

/**
 * @title Counters
 * @author Matt Condon (@shrugs)
 * @dev Provides counters that can only be incremented, decremented or reset. This can be used e.g. to track the number
 * of elements in a mapping, issuing ERC721 ids, or counting request ids.
 *
 * Include with `using Counters for Counters.Counter;`
 */
library Counters {
    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
    unchecked {
        counter._value += 1;
    }
    }

    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0, "Counter: decrement overflow");
    unchecked {
        counter._value = value - 1;
    }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}

// OpenZeppelin Contracts v4.3.2 (utils/Address.sol)
// File: @openzeppelin/contracts/utils/Address.sol
pragma solidity ^0.8.0;

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        (bool success,) = recipient.call{value : amount}("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        require(isContract(target), "Address: call to non-contract");

        (bool success, bytes memory returndata) = target.call{value : value}(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        require(isContract(target), "Address: static call to non-contract");

        (bool success, bytes memory returndata) = target.staticcall(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionDelegateCall(target, data, "Address: low-level delegate call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(isContract(target), "Address: delegate call to non-contract");

        (bool success, bytes memory returndata) = target.delegatecall(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Tool to verifies that a low level call was successful, and revert if it wasn't, either by bubbling the
     * revert reason using the provided one.
     *
     * _Available since v4.3._
     */
    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}


// OpenZeppelin Contracts v4.3.2 (utils/Strings.sol)
// File: @openzeppelin/contracts/utils/Strings.sol
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


// OpenZeppelin Contracts v4.3.2 (utils/introspection/IERC165.sol)
// File: @openzeppelin/contracts/utils/introspection/IERC165.sol
pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC165 standard, as defined in the
 * https://eips.ethereum.org/EIPS/eip-165[EIP].
 *
 * Implementers can declare support of contract interfaces, which can then be
 * queried by others ({ERC165Checker}).
 *
 * For an implementation, see {ERC165}.
 */
interface IERC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}


// OpenZeppelin Contracts v4.3.2 (token/ERC721/IERC721Receiver.sol)
// File: @openzeppelin/contracts/token/ERC721/IERC721Receiver.sol
pragma solidity ^0.8.0;

/**
 * @title ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC721 asset contracts.
 */
interface IERC721Receiver {
    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}


// OpenZeppelin Contracts v4.3.2 (utils/introspection/ERC165.sol)
// File: @openzeppelin/contracts/utils/introspection/ERC165.sol
pragma solidity ^0.8.0;

/**
 * @dev Implementation of the {IERC165} interface.
 *
 * Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check
 * for the additional interface id that will be supported. For example:
 *
 * ```solidity
 * function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
 *     return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId);
 * }
 * ```
 *
 * Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation.
 */
abstract contract ERC165 is IERC165 {
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}


// OpenZeppelin Contracts v4.3.2 (token/ERC721/IERC721.sol)
// File: @openzeppelin/contracts/token/ERC721/IERC721.sol
pragma solidity ^0.8.0;

/**
 * @dev Required interface of an ERC721 compliant contract.
 */
interface IERC721 is IERC165 {
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     */
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) external;

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId) external view returns (address operator);

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool _approved) external;

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;
}


// OpenZeppelin Contracts v4.3.2 (utils/Context.sol)
// File: @openzeppelin/contracts/utils/Context.sol
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


// OpenZeppelin Contracts v4.3.2 (token/ERC721/extensions/IERC721Metadata.sol)
// File: @openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol
pragma solidity ^0.8.0;

/**
 * @title ERC-721 Non-Fungible Token Standard, optional metadata extension
 * @dev See https://eips.ethereum.org/EIPS/eip-721
 */
interface IERC721Metadata is IERC721 {
    /**
     * @dev Returns the token collection name.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the token collection symbol.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */
    function tokenURI(uint256 tokenId) external view returns (string memory);
}


// OpenZeppelin Contracts v4.4.1 (token/ERC721/ERC721.sol)
// File: @openzeppelin/contracts/token/ERC721/ERC721.sol
pragma solidity ^0.8.0;
/**
 * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including
 * the Metadata extension, but not including the Enumerable extension, which is available separately as
 * {ERC721Enumerable}.
 */
contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
        interfaceId == type(IERC721).interfaceId ||
    interfaceId == type(IERC721Metadata).interfaceId ||
    super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _balances[owner];
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _mint(to, tokenId);
        require(
            _checkOnERC721Received(address(0), to, tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _beforeTokenTransfer(address(0), to, tokenId);

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);

        _afterTokenTransfer(address(0), to, tokenId);
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);

        _afterTokenTransfer(owner, address(0), tokenId);
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);

        _afterTokenTransfer(from, to, tokenId);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits a {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev Approve `operator` to operate on all of `owner` tokens
     *
     * Emits a {ApprovalForAll} event.
     */
    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal virtual {
        require(owner != operator, "ERC721: approve to caller");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}
}


// OpenZeppelin Contracts v4.4.1 (security/ReentrancyGuard.sol)
// File: @openzeppelin/contracts/security/ReentrancyGuard.sol
pragma solidity ^0.8.0;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        // On the first call to nonReentrant, _notEntered will be true
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;

        _;

        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }
}

// OpenZeppelin Contracts v4.4.1 (token/ERC20/IERC20.sol)
// File: @openzeppelin/contracts/token/ERC20/IERC20.sol
pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract OpenThetaNFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds; // Id for each individual item
    Counters.Counter private _itemsSold; // Number of items sold

    /// @notice The super admin address / owner
    address public superAdmin;

    /// @notice The admin address
    address public admin;

    address public feeAddress;

    uint256 salesFeeBasisPoints = 400;
    bool public listingIsActive = true;
    bool public tiersAreActive = false;
    address public WTFuel;
    address public openThetaToken;

    struct Tier {
        uint256 tokenBalance;
        uint marketFeeMultiplierSale;
        uint creatorFeeMultiplierSale;
        uint marketFeeMultiplierOffer;
        uint creatorFeeMultiplierOffer;
    }

    Tier[3] public sellerTiers;




    constructor(address feeAddress_, address WTFuelAddress) {
        superAdmin = payable(msg.sender);
        feeAddress = payable(feeAddress_);
        WTFuel = WTFuelAddress;
    }

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 highestOffer;
        address bidder;
        string category;
        uint256 price;
        bool isSold;
    }

    struct Creator {
        address creator;
        uint256 feeBasisPoints;
    }

    //    mapping that keeps all items ever placed on the marketplace
    mapping(uint256 => MarketItem) private idToMarketItem;

    //    mapping NFT address to creators address
    mapping(address => Creator) private AddressToCreatorFeeItem;

    /**
    * @notice events
    */

    // Event called when a new Item is created
    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        string category,
        uint256 price,
        bool isSold
    );

    // Event called when a new Item is updated
    event MarketItemUpdated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        string category,
        uint256 price,
        bool isSold
    );

    // Event called when an Item is sold
    event MarketItemSale(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        string category,
        uint256 price,
        bool isSold
    );

    // Event when someone places a offer
    event PlaceOffer(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        uint256 highestOffer,
        address bidder,
        string category,
        uint256 price
    );

    // Event called TFuel is spit into creator fee, opentheta fee and payment to seller
    event FeeSplit(
        uint256 userPayout,
        address userAddress,
        uint256 feePayout,
        address feeAddress,
        uint256 creatorPayout,
        address creatorAddress
    );

    /**
    * @notice modifiers
    */
    modifier onlySuperAdmin {
        require(msg.sender == superAdmin, "only the super admin can perform this action");
        _;
    }

    modifier onlyAdmin {
        require(msg.sender == admin || msg.sender == superAdmin, "only the admin can perform this action");
        _;
    }

    // Marketplace functions
    function createMarketItem(address nftContract, uint256 tokenId, uint256 price, string calldata category) public nonReentrant {
        require(listingIsActive == true, "Listing disabled");
        require(price > 0, "No item for free here");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)), // No owner for the item
            0, // No offer
            payable(address(0)), // No bidder
            category,
            price,
            false
        );
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            category,
            price,
            false
        );
    }

    function updateMarketItem(address nftContract, uint256 tokenId, uint256 price, uint256 itemId) public nonReentrant {
        require(listingIsActive == true, "Listing disabled");
        require(price > 0, "No item for free here");
        require(idToMarketItem[itemId].isSold == false, "Item is already sold");
        require(idToMarketItem[itemId].nftContract == nftContract, "Not correct NFT address");
        require(idToMarketItem[itemId].tokenId == tokenId, "Not correct tokenId");
        require(idToMarketItem[itemId].seller == msg.sender, "Only seller can update Item");

        idToMarketItem[itemId].price = price;

        emit MarketItemUpdated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            idToMarketItem[itemId].category,
            price,
            false
        );
    }

    function createMarketSale(address nftContract, uint256 itemId) public payable nonReentrant {
        require(idToMarketItem[itemId].isSold == false, "Item is already sold");

        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        address addressNFT = idToMarketItem[itemId].nftContract;

        require(addressNFT == nftContract, "Not correct NFT address");
        require(msg.value == price, "Please make the price to be same as listing price");
        require(price > 0, "Item is already canceled");

        address sellerAddress = idToMarketItem[itemId].seller;
        (uint marketFeeMultiplier, uint creatorFeeMultiplier) = getFeeMultiplier(sellerAddress, false);

        // Read data from mappings
        uint256 creatorPayout = 0;
        address creator = AddressToCreatorFeeItem[addressNFT].creator;
        if(creator != address(0x0)) {
            // if creator is set
            creatorPayout = (msg.value / 10000) * AddressToCreatorFeeItem[addressNFT].feeBasisPoints * creatorFeeMultiplier / 100;
            payable(creator).transfer(creatorPayout);
        }

        // set in marketItem
        idToMarketItem[itemId].isSold = true;
        idToMarketItem[itemId].owner = payable(msg.sender);

        _itemsSold.increment();

        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        // Calculate Payouts
        uint256 feePayout = (msg.value / 10000) * salesFeeBasisPoints * marketFeeMultiplier / 100;
        uint256 userPayout = msg.value - creatorPayout - feePayout;

        // Payout to user and owner (opentheta)
        payable(sellerAddress).transfer(userPayout);
        payable(feeAddress).transfer(feePayout);

        MarketItem memory item = idToMarketItem[itemId];

        // Through events
        emit MarketItemSale(
            item.itemId,
            item.nftContract,
            item.tokenId,
            item.seller,
            item.owner,
            item.category,
            item.price,
            true
        );

        emit FeeSplit(
            userPayout,
            sellerAddress,
            feePayout,
            feeAddress,
            creatorPayout,
            creator
        );
    }

    function createMarketCancel(address nftContract, uint256 itemId) public nonReentrant {
        require(msg.sender == idToMarketItem[itemId].seller, "You have to be the seller to cancel");
        require(idToMarketItem[itemId].isSold == false, "Item is already sold");

        // Read data from mappings
        uint256 tokenId = idToMarketItem[itemId].tokenId;

        // set in marketItem
        idToMarketItem[itemId].price = 0;
        idToMarketItem[itemId].isSold = true;
        idToMarketItem[itemId].owner = payable(idToMarketItem[itemId].seller);

        IERC721(nftContract).transferFrom(address(this), idToMarketItem[itemId].seller, tokenId);

        _itemsSold.increment();

        // Through event
        emit MarketItemSale(
            itemId,
            idToMarketItem[itemId].nftContract,
            idToMarketItem[itemId].tokenId,
            idToMarketItem[itemId].seller,
            idToMarketItem[itemId].owner,
            idToMarketItem[itemId].category,
            0,
            true
        );
    }

    // For TNT20 token (WrapedTFuel)
    function createMarketItemOfferTNT20(address nftContract, uint256 itemId, uint256 offerPrice) public nonReentrant {
        require(idToMarketItem[itemId].isSold == false,"Item is already sold");
        require(idToMarketItem[itemId].nftContract == nftContract, "Not correct NFT address");

        uint256 allowance = IERC20(WTFuel).allowance(msg.sender, address(this));
        uint256 highestOffer = idToMarketItem[itemId].highestOffer;

        require(allowance >= offerPrice, "Allowance of TNT20 token is not big enough");
        if(IERC20(WTFuel).allowance(idToMarketItem[itemId].bidder, address(this)) >= highestOffer){
            require(highestOffer < offerPrice, "Not highest offer");
        }

        // set in marketItem
        idToMarketItem[itemId].highestOffer = offerPrice;
        idToMarketItem[itemId].bidder = payable(msg.sender);

        emit PlaceOffer(
            itemId,
            nftContract,
            idToMarketItem[itemId].tokenId,
            idToMarketItem[itemId].seller,
            offerPrice,
            idToMarketItem[itemId].bidder,
            idToMarketItem[itemId].category,
            idToMarketItem[itemId].price
        );
    }

    function acceptMarketItemOfferTNT20(address nftContract, uint256 itemId) public payable nonReentrant {
        require(msg.sender == idToMarketItem[itemId].seller, "You have to be the seller to cancel");
        require(idToMarketItem[itemId].isSold == false,"Item is already sold");

        address bidder = idToMarketItem[itemId].bidder;

        if(IERC20(WTFuel).allowance(bidder, address(this)) < idToMarketItem[itemId].highestOffer) {
            // delete offer, bidder has not enough TNT20 tokens
            //        // set in marketItem
            idToMarketItem[itemId].highestOffer = 0;
            idToMarketItem[itemId].bidder = address(0x0);
            return;
        }

        uint256 offer = idToMarketItem[itemId].highestOffer;
        idToMarketItem[itemId].price = offer;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        address addressNFT = idToMarketItem[itemId].nftContract;

        require(addressNFT == nftContract, "Not correct NFT address");

        (uint marketFeeMultiplier, uint creatorFeeMultiplier) = getFeeMultiplier(idToMarketItem[itemId].seller, true);
        //        (uint marketFeeMultiplier, uint creatorFeeMultiplier) = (100,100);
        // Read data from mappings
        uint256 creatorPayout = 0;
        address creator = AddressToCreatorFeeItem[addressNFT].creator;
        if(creator != address(0x0)) {
            // if creator is set
            creatorPayout = (offer / 10000) * AddressToCreatorFeeItem[addressNFT].feeBasisPoints * creatorFeeMultiplier / 100;
            IERC20(WTFuel).transferFrom(bidder, creator, creatorPayout);
        }

        // set in marketItem
        idToMarketItem[itemId].isSold = true;
        idToMarketItem[itemId].owner = payable(bidder);

        _itemsSold.increment();

        IERC721(nftContract).transferFrom(address(this), bidder, tokenId);

        // Calculate Payouts
        uint256 feePayout = (offer / 10000) * salesFeeBasisPoints * marketFeeMultiplier / 100;
        uint256 userPayout = offer - creatorPayout - feePayout;

        // Payout to user and feeAddress (opentheta)
        require(IERC20(WTFuel).transferFrom(bidder, idToMarketItem[itemId].seller, userPayout));
        require(IERC20(WTFuel).transferFrom(bidder, feeAddress, feePayout));

        MarketItem memory item = idToMarketItem[itemId];

        // Through events
        emit MarketItemSale(
            itemId,
            nftContract,
            item.tokenId,
            item.seller,
            item.owner,
            item.category,
            item.price,
            true
        );

        emit FeeSplit(
            userPayout,
            item.seller,
            feePayout,
            feeAddress,
            creatorPayout,
            creator
        );
    }

    function cancelMarketItemOfferTNT20(uint256 itemId) public nonReentrant {
        require(msg.sender == idToMarketItem[itemId].bidder, "You have to be the bidder to cancel");
        require(idToMarketItem[itemId].isSold == false,"Item is already sold");

        idToMarketItem[itemId].highestOffer = 0;
        idToMarketItem[itemId].bidder = address(0x0);
    }

    // Set Tiers and get internal fee multiplier
    function getFeeMultiplier(address seller, bool offer) internal view returns(uint marketFeeMultiplier, uint creatorFeeMultiplier) {
        if(tiersAreActive && openThetaToken != address(0x0)) {
            uint256 userTokenBalance = IERC20(openThetaToken).balanceOf(seller);
            if(offer) {
                if(userTokenBalance >= sellerTiers[2].tokenBalance) {
                    return (sellerTiers[2].marketFeeMultiplierOffer,sellerTiers[2].creatorFeeMultiplierOffer);
                } else if(userTokenBalance >= sellerTiers[1].tokenBalance) {
                    return (sellerTiers[1].marketFeeMultiplierOffer,sellerTiers[1].creatorFeeMultiplierOffer);
                } else if(userTokenBalance >= sellerTiers[0].tokenBalance) {
                    return (sellerTiers[0].marketFeeMultiplierOffer,sellerTiers[0].creatorFeeMultiplierOffer);
                } else {
                    return (100,100);
                }
            } else {
                if(userTokenBalance >= sellerTiers[2].tokenBalance) {
                    return (sellerTiers[2].marketFeeMultiplierSale,sellerTiers[2].creatorFeeMultiplierSale);
                } else if(userTokenBalance >= sellerTiers[1].tokenBalance) {
                    return (sellerTiers[1].marketFeeMultiplierSale,sellerTiers[1].creatorFeeMultiplierSale);
                } else if(userTokenBalance >= sellerTiers[0].tokenBalance) {
                    return (sellerTiers[0].marketFeeMultiplierSale,sellerTiers[0].creatorFeeMultiplierSale);
                } else {
                    return (100,100);
                }
            }
        } else {
            return (100,100);
        }
    }

    function setTier(uint tier, uint256 tokenBalance, uint marketFeeMultiplierSale, uint creatorFeeMultiplierSale, uint marketFeeMultiplierOffer, uint creatorFeeMultiplierOffer) onlySuperAdmin external {
        require(tier >= 0, "Tier is not in range");
        require(tier < 3, "Tier is not in range");
        require(marketFeeMultiplierSale <= 100 && creatorFeeMultiplierSale <= 100 && marketFeeMultiplierOffer <= 100 && creatorFeeMultiplierOffer <= 100, "Fee multiplier to big");
        sellerTiers[tier].tokenBalance = tokenBalance;
        sellerTiers[tier].marketFeeMultiplierSale = marketFeeMultiplierSale;
        sellerTiers[tier].creatorFeeMultiplierSale = creatorFeeMultiplierSale;
        sellerTiers[tier].marketFeeMultiplierOffer = marketFeeMultiplierOffer;
        sellerTiers[tier].creatorFeeMultiplierOffer = creatorFeeMultiplierOffer;
    }

    // Read data from marketplace
    // function getMarketItems() public view returns (MarketItem[] memory) {
    //     uint256 itemCount = _itemIds.current();
    //     uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
    //     uint256 currentIndex = 0;

    //     MarketItem[] memory marketItems = new MarketItem[](unsoldItemCount);
    //     for (uint256 i = 0; i < itemCount; i++) {
    //         if (idToMarketItem[i + 1].owner == address(0)) {
    //             uint256 currentId = idToMarketItem[i + 1].itemId;
    //             MarketItem storage currentItem = idToMarketItem[currentId];
    //             marketItems[currentIndex] = currentItem;
    //             currentIndex += 1;
    //         }
    //     }
    //     return marketItems;
    // }

    // function fetchPurchasedNFTs() public view returns (MarketItem[] memory) {
    //     uint256 totalItemCount = _itemIds.current();
    //     uint256 itemCount = 0;
    //     uint256 currentIndex = 0;

    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].owner == msg.sender) {
    //             itemCount += 1;
    //         }
    //     }
    //
    //     MarketItem[] memory marketItems = new MarketItem[](itemCount);
    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].owner == msg.sender) {
    //             uint256 currentId = idToMarketItem[i + 1].itemId;
    //             MarketItem storage currentItem = idToMarketItem[currentId];
    //             marketItems[currentIndex] = currentItem;
    //             currentIndex += 1;
    //         }
    //     }
    //     return marketItems;
    // }

    // function fetchCreateNFTs() public view returns (MarketItem[] memory) {
    //     uint256 totalItemCount = _itemIds.current();
    //     uint256 itemCount = 0;
    //     uint256 currentIndex = 0;

    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].seller == msg.sender) {
    //             itemCount += 1;
    //             // No dynamic length. Predefined length has to be made
    //         }
    //     }

    //     MarketItem[] memory marketItems = new MarketItem[](itemCount);
    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].seller == msg.sender) {
    //             uint256 currentId = idToMarketItem[i + 1].itemId;
    //             MarketItem storage currentItem = idToMarketItem[currentId];
    //             marketItems[currentIndex] = currentItem;
    //             currentIndex += 1;
    //         }
    //     }
    //     return marketItems;
    // }

    // function getItemsByCategory(string calldata category) public view returns (MarketItem[] memory) {
    //     uint256 totalItemCount = _itemIds.current();
    //     uint256 itemCount = 0;
    //     uint256 currentIndex = 0;

    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (
    //             keccak256(abi.encodePacked(idToMarketItem[i + 1].category)) ==
    //             keccak256(abi.encodePacked(category)) &&
    //             idToMarketItem[i + 1].owner == address(0)
    //         ) {
    //             itemCount += 1;
    //         }
    //     }

    //     MarketItem[] memory marketItems = new MarketItem[](itemCount);
    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (
    //             keccak256(abi.encodePacked(idToMarketItem[i + 1].category)) ==
    //             keccak256(abi.encodePacked(category)) &&
    //             idToMarketItem[i + 1].owner == address(0)
    //         ) {
    //             uint256 currentId = idToMarketItem[i + 1].itemId;
    //             MarketItem storage currentItem = idToMarketItem[currentId];
    //             marketItems[currentIndex] = currentItem;
    //             currentIndex += 1;
    //         }
    //     }
    //     return marketItems;
    // }

    function getByMarketId(uint256 id) public view returns (MarketItem memory){
        require(id <= _itemIds.current(), "id doesn't exist");
        return idToMarketItem[id];
    }

    // set creator fee
    function setCreatorFeeBasisPoints(uint256 feeBasisPoints, address creatorAddress, address NFTAddress) public onlyAdmin{
        require(feeBasisPoints <= 1000, "Sales Fee cant be higher than 10%");
        AddressToCreatorFeeItem[NFTAddress].feeBasisPoints = feeBasisPoints;
        AddressToCreatorFeeItem[NFTAddress].creator = payable(creatorAddress);
    }

    // get creator fee
    function getCreatorFeeBasisPoints(address NFTAddress) public view returns(Creator memory){
        return AddressToCreatorFeeItem[NFTAddress];
    }

    /*
    * Pause listings if active
    */
    function flipListingState() onlySuperAdmin public {
        listingIsActive = !listingIsActive;
    }

    fallback() payable external {}

    receive() external payable {}

    function getSalesFee() public view returns (uint256) {
        return salesFeeBasisPoints;
    }

    function retrieveMoney(uint256 amount) onlySuperAdmin external {
        require(amount <= address(this).balance, "You can not withdraw more money than there is");
        payable(feeAddress).transfer(amount);
    }

    function setSalesFeeBasisPoints(uint256 feeBasisPoints) onlySuperAdmin external {
        require(feeBasisPoints <= 1000, "Sales Fee cant be higher than 10%");
        salesFeeBasisPoints = feeBasisPoints;
    }

    function setWTFuelAddress(address wTFuel) onlySuperAdmin external {
        WTFuel = wTFuel;
    }

    function setOpenThetaTokenAddress(address OTToken) onlySuperAdmin external {
        openThetaToken = OTToken;
    }

    /**
    * @notice Change the fee address
     * @param feeAddress_ The address of the new fee address
     */
    function setFeeAddress(address feeAddress_) onlySuperAdmin external {
        feeAddress = feeAddress_;
    }

    /**
     * @notice Change the admin address
     * @param superAdmin_ The address of the new super admin
     */
    function setSuperAdmin(address superAdmin_) onlySuperAdmin external {
        superAdmin = superAdmin_;
    }

    /**
     * @notice Change the admin address
     * @param admin_ The address of the new admin
     */
    function setAdmin(address admin_) onlySuperAdmin external {
        admin = admin_;
    }
}