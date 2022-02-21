// express api server
const express = require("express");
const dataProvider = require("../models/dbHelpers");
const dataProvider2 = require("../../database2/models/dbHelpers2");
const dataProvider3 = require("../../database3/models/dbHelpers3");
const ethers =  require("ethers")

const router = express.Router();

function filterNFTs(nfts, minimum, maximum, sorting, number, search) {
    let results = []
    let min = parseInt(minimum, 10);
    let max = parseInt(maximum, 10);
    if (search === 'ALL'){
        results = nfts
    } else {
        nfts.forEach( function (nft) {
            if(nft.projectName.indexOf(search) !== -1 || nft.creator.indexOf(search) !== -1 || nft.category.indexOf(search) !== -1) {
                results.push(nft);
            }
        });
    }
    if(max !== 0 && min !== 0){
        results = results.filter(function (nft) {
            return (ethers.BigNumber.from(nft.price).div(ethers.BigNumber.from("1000000000000000000"))).toNumber() <= max &&
                (ethers.BigNumber.from(nft.price).div(ethers.BigNumber.from("1000000000000000000"))).toNumber() >= min;
        });
    } else if(max !== 0) {
        results = results.filter(function (nft) {
            return (ethers.BigNumber.from(nft.price).div(ethers.BigNumber.from("1000000000000000000"))).toNumber() <= max;
        });
    } else if(min !== 0) {
        results = results.filter(function (nft) {
            return (ethers.BigNumber.from(nft.price).div(ethers.BigNumber.from("1000000000000000000"))).toNumber() >= min;
        });
    }
    if (sorting === "ascending") {
        results.sort((a, b) => {
            return (a.price - b.price); // ascending
        });
    } else if(sorting === "descending"){
        results.sort((a, b) => {
            return (b.price - a.price); // descending
        });
    }
    if(results.length > number){
        results = results.slice(0,number);
    }
    return results;
}

async function getNFTsOnMarketByCreatorsAndProjects(creators, projects) {
    let nfts1 = await dataProvider.getNFTsOnMarketByCreatorsAndProjects(creators, projects);
    let nfts2 = await dataProvider2.getNFTsOnMarketByCreatorsAndProjects(creators, projects);
    let nfts3 = await dataProvider3.getNFTsOnMarketByCreatorsAndProjects(creators, projects);

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

async function getNFTsOnMarketByCreators(creators) {
    let nfts1 = await dataProvider.getNFTsOnMarketByCreators(creators);
    let nfts2 = await dataProvider2.getNFTsOnMarketByCreators(creators);
    let nfts3 = await dataProvider3.getNFTsOnMarketByCreators(creators);

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

async function getNFTsOnMarketByProjects(projects) {
    let nfts1 = await dataProvider.getNFTsOnMarketByProjects(projects);
    let nfts2 = await dataProvider2.getNFTsOnMarketByProjects(projects);
    let nfts3 = await dataProvider3.getNFTsOnMarketByProjects(projects);

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

async function getNFTsOnMarket() {
    let nfts1 = await dataProvider.getNFTsOnMarket();
    let nfts2 = await dataProvider2.getNFTsOnMarket();
    let nfts3 = await dataProvider3.getNFTsOnMarket();

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

// Returns newly listed Creators
router.get('/:search', (req, res)=> {
    const {search} = req.params;
    if(req.query.creators && req.query.projects){
        const projects = JSON.parse(req.query.projects);
        const creators = JSON.parse(req.query.creators);
        getNFTsOnMarketByCreatorsAndProjects(creators, projects).then(nfts => {
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
        getNFTsOnMarketByCreators(creators).then(nfts => {
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
        getNFTsOnMarketByProjects(projects).then(nfts => {
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
        getNFTsOnMarket().then(nfts => {
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


// Returns newly listed Creators
router.get('/:search/:number/:sorting/:min/:max', (req, res)=> {
    const {search, number, sorting, min, max} = req.params;
    if(req.query.creators && req.query.projects){
        const projects = JSON.parse(req.query.projects);
        const creators = JSON.parse(req.query.creators);
        getNFTsOnMarketByCreatorsAndProjects(creators, projects).then(nfts => {
            if(nfts) {
                let results = filterNFTs(nfts, min, max, sorting, number, search);
                res.status(200).json(results);
            } else {
                res.status(404).json({message:'Search found no NFTs on market by creators and projects'});
            }
        }).catch(error => {
            res.status(500).json({message: "Error searching NFTs on market by creators and projects"});
        });
    } else if(req.query.creators) {
        const creators = JSON.parse(req.query.creators);
        getNFTsOnMarketByCreators(creators).then(nfts => {
            if(nfts) {
                let results = filterNFTs(nfts, min, max, sorting, number, search);
                res.status(200).json(results);
            } else {
                res.status(404).json({message:'Search found no NFTs on market by creators'});
            }
        }).catch(error => {
            res.status(500).json({message: "Error searching NFTs on market by creators"});
        });
    } else if(req.query.projects) {
        const projects = JSON.parse(req.query.projects);
        getNFTsOnMarketByProjects(projects).then(nfts => {
            if(nfts) {
                let results = filterNFTs(nfts, min, max, sorting, number, search);
                res.status(200).json(results);
            } else {
                res.status(404).json({message:'Search found no NFTs on market by projects'});
            }
        }).catch(error => {
            res.status(500).json({message: "Error searching NFTs on market by projects"});
        });
    } else {
        getNFTsOnMarket().then(nfts => {
            if(nfts) {
                let results = filterNFTs(nfts, min, max, sorting, number, search);
                res.status(200).json(results);
            } else {
                res.status(404).json({message:'Search found no NFTs on market'})
            }
        }).catch(error => {
            res.status(500).json({message: "Error searching NFTs on market"});
        });
    }
});



module.exports = router;