// express api server
const express = require("express");
const projects = require("../models/dbHelpers");

const router = express.Router();

router.get('/', (req, res) => {

    projects.getAllProjects().then(projects => {
        res.status(200).json(projects);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving all projects"});
    });
});

router.get('/:contract', (req, res) => {
    const {contract} = req.params;

    projects.getProjectByContract(contract).then(project => {
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
    projects.getProjectsNFTs(contract).then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs"});
    });
});

router.get('/:contract/nft/on-market', (req, res) => {
    const {contract} = req.params;

    projects.getProjectsNFTsOnMarket(contract).then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs of project on market"});
    });
});

router.get('/:contract/nft/sold', (req, res) => {
    const {contract} = req.params;

    projects.getProjectsNFTsSold(contract).then(nfts => {
        res.status(200).json(nfts);
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs of project sold"});
    });
});

module.exports = router;