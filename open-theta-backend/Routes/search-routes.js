// express api server
const express = require("express");
const dataProvider = require("../models/dbHelpers");

const router = express.Router();

// Returns newly listed Creators
router.get('/:search', (req, res)=> {
    const {search} = req.params;
    if(req.query.creators && req.query.projects){
        const projects = JSON.parse(req.query.projects);
        const creators = JSON.parse(req.query.creators);
        dataProvider.getNFTsOnMarketByCreatorsAndProjects(creators, projects).then(nfts => {
            let results = [];
            if(nfts) {
                if (search === 'ALL'){
                    res.status(200).json(nfts);
                } else {
                    nfts.forEach( function (nft) {
                        if(nft.projectName.indexOf(search) !== -1 || nft.creator.indexOf(search) !== -1 || nft.category.indexOf(search) !== -1) {
                            results.push(nft);
                        }
                    });
                    res.status(200).json(results);
                }
            } else {
                res.status(404).json({message:'Search found no NFTs on market by creators and projects'});
            }
        }).catch(error => {
            res.status(500).json({message: "Error searching NFTs on market by creators and projects"});
        });
    } else if(req.query.creators) {
        const creators = JSON.parse(req.query.creators);
        dataProvider.getNFTsOnMarketByCreators(creators).then(nfts => {
            let results = [];
            if(nfts) {
                if (search === 'ALL'){
                    res.status(200).json(nfts);
                } else {
                    nfts.forEach( function (nft) {
                        if(nft.projectName.indexOf(search) !== -1 || nft.creator.indexOf(search) !== -1 || nft.category.indexOf(search) !== -1) {
                            results.push(nft);
                        }
                    });
                    res.status(200).json(results);
                }
            } else {
                res.status(404).json({message:'Search found no NFTs on market by creators'});
            }
        }).catch(error => {
            res.status(500).json({message: "Error searching NFTs on market by creators"});
        });
    } else if(req.query.projects) {
        const projects = JSON.parse(req.query.projects);
        dataProvider.getNFTsOnMarketByProjects(projects).then(nfts => {
            let results = [];
            if(nfts) {
                if (search === 'ALL'){
                    res.status(200).json(nfts);
                } else {
                    nfts.forEach( function (nft) {
                        if(nft.projectName.indexOf(search) !== -1 || nft.creator.indexOf(search) !== -1 || nft.category.indexOf(search) !== -1) {
                            results.push(nft);
                        }
                    });
                    res.status(200).json(results);
                }
            } else {
                res.status(404).json({message:'Search found no NFTs on market by projects'});
            }
        }).catch(error => {
            res.status(500).json({message: "Error searching NFTs on market by projects"});
        });
    } else {
        dataProvider.getNFTsOnMarket().then(nfts => {
            let results = [];
            if(nfts) {
                if (search === 'ALL'){
                    res.status(200).json(nfts);
                } else {
                    nfts.forEach( function (nft) {
                        if(nft.projectName.indexOf(search) !== -1 || nft.creator.indexOf(search) !== -1 || nft.category.indexOf(search) !== -1) {
                            results.push(nft);
                        }
                    });
                    res.status(200).json(results);
                }
            } else {
                res.status(404).json({message:'Search found no NFTs on market'})
            }
        }).catch(error => {
            res.status(500).json({message: "Error searching NFTs on market"});
        });
    }
});


module.exports = router;