// express api server
const express = require("express");
const projects = require("../models/dbHelpers");
const projects2 = require("../../database2/models/dbHelpers2");

const router = express.Router();

// Returns all NFTs in database
router.get('/', (req, res) => {

    projects.getAllNFTs().then(nfts => {
        projects2.getAllNFTs().then(nfts2 => {
            nfts = nfts.concat(nfts2)
            res.status(200).json(nfts);
        }).catch(error => {
            console.log(error)
            res.status(500).json({message: "Error retrieving NFTs2"});
        });
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
    projects.getNFTsOnMarket().then(nfts => {
        projects2.getNFTsOnMarket().then(nfts2 => {
            nfts = nfts.concat(nfts2)
            res.status(200).json(nfts);
        }).catch(error => {
            res.status(500).json({message: "Error retrieving NFTs on market2"});
        });
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs on market"});
    });
});

//Returns all NFTs of seller address currently on the marketplace
router.get('/onMarket/:address', (req, res) => {
    const {address} = req.params;
    projects.getNFTsOnMarketByAddress(address).then(nfts => {
        projects2.getNFTsOnMarketByAddress(address).then(nfts2 => {
            nfts = nfts.concat(nfts2)
            res.status(200).json(nfts);
        }).catch(error => {
            res.status(500).json({message: "Error retrieving NFTs on market2"});
        });
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs on market"});
    });
});

// Returns all NFTs sold on marketplace
router.get('/sold', (req, res) => {
    projects.getSoldNFTs().then(nfts => {
        projects2.getSoldNFTs().then(nfts2 => {
            nfts = nfts.concat(nfts2)
            res.status(200).json(nfts);
        }).catch(error => {
            res.status(500).json({message: "Error retrieving NFTs sold2"});
        });
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs sold"});
    });
});

//Returns the most recent sold NFTs (number = number of NFTs)
router.get('/sold/recent/:number', (req, res) => {
    const {number} = req.params;
    projects.getSoldNFTs().then(nfts => {
        projects2.getSoldNFTs().then(nfts2 => {
            nfts = nfts.concat(nfts2)
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
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs sold"});
    });
});

//Returns the most recent sold NFTs (number = number of NFTs)
router.get('/sold/recent/:number/:contract', (req, res) => {
    const {number, contract} = req.params;
    projects.getSoldNFTsByAddress(contract).then(nfts => {
        projects2.getSoldNFTsByAddress(contract).then(nfts2 => {
            nfts = nfts.concat(nfts2)
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
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs sold by contract address"});
    });
});

//Returns the most recent sold NFTs by user address (number = number of NFTs)
router.get('/sold/my/:number/:contract', (req, res) => {
    const {number, contract} = req.params;
    projects.getSoldNFTsByUserAddress(contract).then(nfts => {
        projects2.getSoldNFTsByUserAddress(contract).then(nfts2 => {
            nfts = nfts.concat(nfts2)
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
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs sold by user address"});
    });
});

// Returns newly listed NFTs on the marketplace (number = number of NFTs)
router.get('/new/:number', (req, res)=> {
    const {number} = req.params;
    projects.getNFTsOnMarket().then(nfts => {
        projects2.getNFTsOnMarket().then(nfts2 => {
            nfts = nfts.concat(nfts2)
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
    }).catch(error => {
        res.status(500).json({message: "Error retrieving new NFTs on market"});
    });
});

module.exports = router;