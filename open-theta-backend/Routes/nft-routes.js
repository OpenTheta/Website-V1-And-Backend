// express api server
const express = require("express");
const projects = require("../models/dbHelpers");

const router = express.Router();

// Returns all NFTs in database
router.get('/', (req, res) => {

    projects.getAllNFTs().then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs"});
    });
});

// Returns NFT with itemId
router.get('/id/:itemId', (req, res) => {
    const {itemId} = req.params;
    projects.getNFTById(itemId).then(nft => {
        if(nft) {
            res.status(200).json(nft);
        } else {
            res.status(404).json({message:'NFT not found'})
        }
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFT"});
    });
});

//Returns all NFTs currently on the marketplace
router.get('/on-market', (req, res) => {
    projects.getNFTsOnMarket().then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs on market"});
    });
});

//Returns all NFTs currently on the marketplace
router.get('/onMarket', (req, res) => {
    projects.getNFTsOnMarket().then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs on market"});
    });
});

//Returns all NFTs of address currently on the marketplace
router.get('/onMarket/:address', (req, res) => {
    const {address} = req.params;
    projects.getNFTsOnMarketByAddress(address).then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs on market"});
    });
});

// Returns all NFTs sold on marketplace
router.get('/sold', (req, res) => {
    projects.getSoldNFTs().then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs sold"});
    });
});

//Returns the most recent sold NFTs (number = number of NFTs)
router.get('/sold/recent/:number', (req, res) => {
    const {number} = req.params;
    projects.getSoldNFTs().then(nfts => {
        nfts.sort((a, b) => {
            return (a.soldTimestamp - b.soldTimestamp); // ascending
        })
        if(nfts.length > number){
            nfts = nfts.slice(0,number);
        }
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs sold"});
    });
});

// Returns newly listed NFTs on the marketplace (number = number of NFTs)
router.get('/new/:number', (req, res)=> {
    const {number} = req.params;
    projects.getNFTsOnMarket().then(nfts => {
        if(nfts) {
            nfts.sort((a, b) => {
                return (a.soldTimestamp - b.soldTimestamp); // ascending
            })
            if(nfts.length > number){
                nfts = nfts.slice(0,number);
            }
            res.status(200).json(nfts);
        } else {
            res.status(404).json({message:'No new NFTs on market'})
        }
    }).catch(error => {
        res.status(500).json({message: "Error retrieving new NFTs on market"});
    });
});

// search in NFT name and project name and creator name -> returns results
router.get('/search/:name', (req, res)=> {
    const {name} = req.params;
    projects.getNFTsOnMarket().then(nfts => {
        let results = [];
        if(nfts) {
            if (name === 'ALL'){
                res.status(200).json(nfts);
            } else {
                nfts.forEach( function (nft) {
                    if(nft.projectName.indexOf(name) !== -1 || nft.creator.indexOf(name) !== -1 || nft.category.indexOf(name) !== -1) {
                        results.push(nft);
                    }
                });
                res.status(200).json(results);
            }
        } else {
            res.status(404).json({message:'No new NFTs on market'})
        }
    }).catch(error => {
        res.status(500).json({message: "Error retrieving new NFTs on market"});
    });
});

// search in NFT name and project name and creator name -> returns results
router.get('/promoted', (req, res)=> {
    projects.getNFTsOnMarket().then(nfts => {
        if(nfts) {
            res.status(200).json(nfts[1]);
        } else {
            res.status(404).json({message:'No new NFTs on market'})
        }
    }).catch(error => {
        res.status(500).json({message: "Error retrieving new NFTs on market"});
    });
});

module.exports = router;