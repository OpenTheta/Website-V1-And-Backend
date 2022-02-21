// express api server
const express = require("express");
const projects = require("../models/dbHelpers");
const projects2 = require("../../database2/models/dbHelpers2");
const projects3 = require("../../database3/models/dbHelpers3");

const router = express.Router();

async function getAllNFTs() {
    let nfts1 = await projects.getAllNFTs();
    let nfts2 = await projects2.getAllNFTs();
    let nfts3 = await projects3.getAllNFTs();

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

async function getNFTsOnMarket(){
    let nfts1 = await projects.getNFTsOnMarket();
    let nfts2 = await projects2.getNFTsOnMarket();
    let nfts3 = await projects3.getNFTsOnMarket();

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

async function getNFTsOnMarketByAddress(address) {
    let nfts1 = await projects.getNFTsOnMarketByAddress(address);
    let nfts2 = await projects2.getNFTsOnMarketByAddress(address);
    let nfts3 = await projects3.getNFTsOnMarketByAddress(address);

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

async function getSoldNFTs() {
    let nfts1 = await projects.getSoldNFTs();
    let nfts2 = await projects2.getSoldNFTs();
    let nfts3 = await projects3.getSoldNFTs();

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

async function getSoldNFTsByAddress(address) {
    let nfts1 = await projects.getSoldNFTsByAddress(address);
    let nfts2 = await projects2.getSoldNFTsByAddress(address);
    let nfts3 = await projects3.getSoldNFTsByAddress(address);

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

async function getSoldNFTsByUserAddress(address) {
    let nfts1 = await projects.getSoldNFTsByUserAddress(address);
    let nfts2 = await projects2.getSoldNFTsByUserAddress(address);
    let nfts3 = await projects3.getSoldNFTsByUserAddress(address);

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

// Returns all NFTs in database
router.get('/', (req, res) => {
    getAllNFTs().then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs"});
    });
});

// // Returns NFT with itemId
// router.get('/id/:itemId', (req, res) => {
//     const {itemId} = req.params;
//     projects.getNFTById(itemId).then(nft => {
//         if(nft) {
//             res.status(200).json(nft);
//         } else {
//             res.status(404).json({message:'NFT not found'})
//         }
//     }).catch(error => {
//         res.status(500).json({message: "Error retrieving NFT"});
//     });
// });

// //Returns all NFTs currently on the marketplace
// router.get('/on-market', (req, res) => {
//     projects.getNFTsOnMarket().then(nfts => {
//         res.status(200).json(nfts);
//     }).catch(error => {
//         res.status(500).json({message: "Error retrieving NFTs on market"});
//     });
// });

//Returns all NFTs currently on the marketplace
router.get('/onMarket', (req, res) => {
    getNFTsOnMarket().then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs on market"});
    });
});

//Returns all NFTs of seller address currently on the marketplace
router.get('/onMarket/:address', (req, res) => {
    const {address} = req.params;
    getNFTsOnMarketByAddress(address).then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs on market"});
    });
});

// Returns all NFTs sold on marketplace
router.get('/sold', (req, res) => {
    getSoldNFTs().then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs sold"});
    });
});

//Returns the most recent sold NFTs (number = number of NFTs)
router.get('/sold/recent/:number', (req, res) => {
    const {number} = req.params;
    getSoldNFTs().then(nfts => {
        nfts.sort((a, b) => {
            return (b.soldTimestamp - a.soldTimestamp); // descending
        })
        if(nfts.length > number){
            nfts = nfts.slice(0,number);
        }
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs sold"});
    });
});

//Returns the most recent sold NFTs (number = number of NFTs)
router.get('/sold/recent/:number/:contract', (req, res) => {
    const {number, contract} = req.params;
    getSoldNFTsByAddress(contract).then(nfts => {
        nfts.sort((a, b) => {
            return (b.soldTimestamp - a.soldTimestamp); // descending
        })
        if(nfts.length > number){
            nfts = nfts.slice(0,number);
        }
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs sold by contract address"});
    });
});

//Returns the most recent sold NFTs by user address (number = number of NFTs)
router.get('/sold/my/:number/:contract', (req, res) => {
    const {number, contract} = req.params;
    getSoldNFTsByUserAddress(contract).then(nfts => {
        nfts.sort((a, b) => {
            return (b.soldTimestamp - a.soldTimestamp); // descending
        })
        if(nfts.length > number){
            nfts = nfts.slice(0,number);
        }
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs sold by user address"});
    });
});

// Returns newly listed NFTs on the marketplace (number = number of NFTs)
router.get('/new/:number', (req, res)=> {
    const {number} = req.params;
    getNFTsOnMarket().then(nfts => {
        if(nfts) {
            nfts.sort((a, b) => {
                return (b.createdTimestamp - a.createdTimestamp); // descending
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

module.exports = router;