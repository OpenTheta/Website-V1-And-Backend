// express api server
const express = require("express");
const projects = require("../models/dbHelpers");
const projects2 = require("../../database2/models/dbHelpers2");

const router = express.Router();

async function checkProjectOnMarket(p) {
    for(let i=0; i<p.length; i++){
        let existOnMarket = false
        let res  = await projects2.getProjectsNFTsOnMarket(p[i].contract)
        if(res.length > 0) {
            existOnMarket = true
        } else {
            let res =  await projects.getProjectsNFTsOnMarket(p[i].contract)
            if(res.length > 0) {
                existOnMarket = true
            }
        }
        p[i]["existsOnMarket"] = existOnMarket
    }
    return p
}


router.get('/', (req, res) => {

    projects2.getAllProjects().then(Projects => {
        checkProjectOnMarket(Projects).then(p=> {
            res.status(200).json(p);
        })
    }).catch(error => {
        res.status(500).json({message: "Error retrieving all projects"});
    });
});

router.get('/:contract', (req, res) => {
    const {contract} = req.params;

    projects2.getProjectByContract(contract).then(project => {
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
        projects2.getProjectsNFTs(contract).then(nfts2 => {
            nfts = nfts.concat(nfts2)
            res.status(200).json(nfts);
        }).catch(error => {
            res.status(500).json({message: "Error retrieving NFTs"});
        });
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs"});
    });
});

router.get('/:contract/nft/on-market', (req, res) => {
    const {contract} = req.params;

    projects.getProjectsNFTsOnMarket(contract).then(nfts => {
        projects2.getProjectsNFTsOnMarket(contract).then(nfts2 => {
            nfts = nfts.concat(nfts2)
            res.status(200).json(nfts);
        }).catch(error => {
            res.status(500).json({message: "Error retrieving NFTs of project on market"});
        });
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs of project on market"});
    });
});

router.get('/:contract/nft/sold', (req, res) => {
    const {contract} = req.params;

    projects.getProjectsNFTsSold(contract).then(nfts => {
        projects2.getProjectsNFTsSold(contract).then(nfts2 => {
            nfts = nfts.concat(nfts2)
            res.status(200).json(nfts);
        }).catch(error => {
            res.status(500).json({message: "Error retrieving NFTs of project sold"});
        });
    }).catch(error => {
        res.status(500).json({message: "Error retrieving NFTs of project sold"});
    });
});

module.exports = router;