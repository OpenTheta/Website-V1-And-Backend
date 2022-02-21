// express api server
const express = require("express");
const projects = require("../models/dbHelpers");
const projects2 = require("../../database2/models/dbHelpers2");
const projects3 = require("../../database3/models/dbHelpers3");

const router = express.Router();

async function checkProjectOnMarket(p) {
    for(let i=0; i<p.length; i++){
        let existOnMarket = false
        let res  = await projects3.getProjectsNFTsOnMarket(p[i].contract)
        if(res.length > 0) {
            existOnMarket = true
        } else {
            let res =  await projects2.getProjectsNFTsOnMarket(p[i].contract)
            if(res.length > 0) {
                existOnMarket = true
            } else {
                let res =  await projects.getProjectsNFTsOnMarket(p[i].contract)
            }
        }
        p[i]["existsOnMarket"] = existOnMarket
    }
    return p
}

async function getProjectsNFTs(contract) {
    let nfts1 = await projects.getProjectsNFTs(contract);
    let nfts2 = await projects2.getProjectsNFTs(contract);
    let nfts3 = await projects3.getProjectsNFTs(contract);

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

async function getProjectsNFTsOnMarket(contract) {
    let nfts1 = await projects.getProjectsNFTsOnMarket(contract);
    let nfts2 = await projects2.getProjectsNFTsOnMarket(contract);
    let nfts3 = await projects3.getProjectsNFTsOnMarket(contract);

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}

async function getProjectsNFTsSold(contract) {
    let nfts1 = await projects.getProjectsNFTsSold(contract);
    let nfts2 = await projects2.getProjectsNFTsSold(contract);
    let nfts3 = await projects3.getProjectsNFTsSold(contract);

    let nfts = nfts1.concat(nfts2);
    nfts = nfts.concat(nfts3);

    return nfts;
}


router.get('/', (req, res) => {

    projects3.getAllProjects().then(Projects => {
        checkProjectOnMarket(Projects).then(p=> {
            res.status(200).json(p);
        })
    }).catch(error => {
        res.status(500).json({message: "Error retrieving all projects"});
    });
});

router.get('/:contract', (req, res) => {
    const {contract} = req.params;

    projects3.getProjectByContract(contract).then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({message:'Project not found'})
        }

    }).catch(error => {
        res.status(500).json({message: 'Unable to preform operation'});
    });
});

router.get('/:contract/nft', (req, res) => {
    const {contract} = req.params;
    getProjectsNFTs(contract).then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs"});
    });
});

router.get('/:contract/nft/on-market', (req, res) => {
    const {contract} = req.params;

    getProjectsNFTsOnMarket(contract).then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs of project on market"});
    });
});

router.get('/:contract/nft/sold', (req, res) => {
    const {contract} = req.params;

    getProjectsNFTsSold(contract).then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs of project sold"});
    });
});

module.exports = router;