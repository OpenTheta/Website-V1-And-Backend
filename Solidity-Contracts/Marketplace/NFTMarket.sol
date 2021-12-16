// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // security for non-reentrant


contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds; // Id for each individual item
    Counters.Counter private _itemsSold; // Number of items sold

    // Currency is in Matic (lower price than ethereum)
    address payable owner; // The owner of the NFTMarket contract (transfer and send function availabe to payable addresses)
    uint256 salesFee = 4;
    bool disableListing = false;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        string category;
        uint256 price;
        bool isSold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    // Event is an inhertable contract that can be used to emit events
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

    // Event is an inhertable contract that can be used to emit events
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


    function getSalesFee() public view returns (uint256) {
        return salesFee;
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        string calldata category
    ) public nonReentrant {
        require(disableListing == false, "Listing disabled");
        require(price > 0, "No item for free here");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)), // No owner for the item
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

    function createMarketSale(address nftContract, uint256 itemId)
    public
    payable
    nonReentrant
    {
        require(
            idToMarketItem[itemId].isSold == false,
            "Item is already sold"
        );
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require(
            msg.value == price,
            "Please make the price to be same as listing price"
        );
        require(
            price > 0,
            "Item is already canceled"
        );
        uint256 userPayout = (msg.value/100) * (100 - salesFee);
        idToMarketItem[itemId].seller.transfer(userPayout);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketItem[itemId].isSold = true;
        idToMarketItem[itemId].owner = payable(msg.sender);
        _itemsSold.increment();
        uint256 ownerPayout = msg.value - userPayout;
        payable(owner).transfer(ownerPayout);
        emit MarketItemSale(
            itemId,
            idToMarketItem[itemId].nftContract,
            idToMarketItem[itemId].tokenId,
            idToMarketItem[itemId].seller,
            idToMarketItem[itemId].owner,
            idToMarketItem[itemId].category,
            idToMarketItem[itemId].price,
            true
        );
    }

    function createMarketCancel(address nftContract, uint256 itemId)
    public
    payable
    nonReentrant
    {
        require(
            msg.sender == idToMarketItem[itemId].seller,
            "You have to be the seller to cancel"
        );
        require(
            idToMarketItem[itemId].price > 0,
            "Item is already canceled"
        );
        require(
            idToMarketItem[itemId].isSold == false,
            "Item is already sold"
        );
        idToMarketItem[itemId].price = 0;
        uint256 tokenId = idToMarketItem[itemId].tokenId;

        IERC721(nftContract).transferFrom(address(this), idToMarketItem[itemId].seller, tokenId);
        idToMarketItem[itemId].isSold = true;
        idToMarketItem[itemId].owner = payable(idToMarketItem[itemId].seller);
        _itemsSold.increment();

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

    function getMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory marketItems = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0)) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                marketItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return marketItems;
    }

    function fetchPurchasedNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory marketItems = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                marketItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return marketItems;
    }

    function fetchCreateNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1; // No dynamic length. Predefined length has to be made
            }
        }

        MarketItem[] memory marketItems = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                marketItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return marketItems;
    }

    function getItemsByCategory(string calldata category)
    public
    view
    returns (MarketItem[] memory)
    {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                keccak256(abi.encodePacked(idToMarketItem[i + 1].category)) ==
                keccak256(abi.encodePacked(category)) &&
                idToMarketItem[i + 1].owner == address(0)
            ) {
                itemCount += 1;
            }
        }

        MarketItem[] memory marketItems = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                keccak256(abi.encodePacked(idToMarketItem[i + 1].category)) ==
                keccak256(abi.encodePacked(category)) &&
                idToMarketItem[i + 1].owner == address(0)
            ) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                marketItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return marketItems;
    }

    function getByMarketId(uint256 id) public view returns (MarketItem memory){
        require(id <= _itemIds.current(), "id doesn't exist");
        return idToMarketItem[id];
    }

    /*
    * Pause listings if active
    */
    function flipListingState() public {
        require(msg.sender == owner, "Only owner flip listing state");
        disableListing = !disableListing;
    }

    fallback () payable external {}

    receive() external payable {}

    function retrieveMoney (uint256 amount) external {
        require(msg.sender == owner, "Only owner can retrieve Money");
        require(amount <= address(this).balance, "You can not withdraw more money than there is");
        payable(owner).transfer(amount);
    }

    function setSalesFee(uint256 fee) external {
        require(msg.sender == owner, "Only owner can set listingPrice");
        require(fee <= 10, "Sales Fee cant be higher than 10%");
        salesFee = fee;
    }
}