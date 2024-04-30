const axios = require('axios');

let NFTsInfo = {}
let owners = {}
async function challengeFlowers() {
    let ids = ['1570812','1570803','1570786','1570798'] // flowers
    // let ids = ['1570803','1570812','1570781','1570791','1570787','1570801','1570786','1570778','1570802','1570775','1570779','1570798','1570809','1570793','1570799','1570794','1570784','1570811','1570777','1570813','1570774']
    for(let id of ids) {
        let resInfo = await axios.get(`https://api.opentheta.io/edition?contract=0x85ceb74500dcfef2682fa03edf9748f35cffd238&ID=${id}&filter=all`)
        let tokenIds = []
        for(let edition of resInfo.data.editions) {
            tokenIds.push(edition.tokenId)
        }
        NFTsInfo[resInfo.data.item.metaName] = tokenIds
    }

    for(let key of Object.keys(NFTsInfo)) {
        if(Object.keys(owners).length === 0) {
            for(let tokenId of NFTsInfo[key]) {
                let resOwner = await axios.get(`https://api.opentheta.io/nft?contract=0x85ceb74500dcfef2682fa03edf9748f35cffd238&ID=${tokenId}`)
                let owner = (resOwner.data.item.listedOwnerAddress === null) ? resOwner.data.item.currentOwnerAddress : resOwner.data.item.listedOwnerAddress;
                if(!owners[owner]) {
                    owners[owner] = {}
                    owners[owner][key] = 1
                } else {
                    owners[owner][key] += 1
                }
            }
        } else {
            for(let tokenId of NFTsInfo[key]) {
                let resOwner = await axios.get(`https://api.opentheta.io/nft?contract=0x85ceb74500dcfef2682fa03edf9748f35cffd238&ID=${tokenId}`)
                let owner = (resOwner.data.item.listedOwnerAddress === null) ? resOwner.data.item.currentOwnerAddress : resOwner.data.item.listedOwnerAddress;
                if(owners[owner] && !owners[owner][key]) {
                    owners[owner][key] = 1
                } else if(owners[owner] && owners[owner][key]) {
                    owners[owner][key] += 1
                }
            }
        }
    }

    for(let owner of Object.keys(owners)) {
        console.log(Object.keys(owners[owner]).length, Object.keys(NFTsInfo).length)
        if(Object.keys(owners[owner]).length < Object.keys(NFTsInfo).length) {
            console.log("Delete Owner")
            delete owners[owner]
        }
    }

    console.log(owners)
}



// challengeFlowers()


async function getAttributes() {
    let res =  await axios.get("https://api.opentheta.io/v1/contracts/0x85ceb74500dcfef2682fa03edf9748f35cffd238/attributes")
    let owners = res.data.owners
    const filteredAddresses = owners.filter(obj => {
        // const types = obj.attributes.Genus;
        const types = obj.attributes.Type;
        // console.log(obj.attributes)
        const count = types ? types.filter(item => item === 'root').length : 0;
        return count >= 3;
    }).map(obj => obj.address);

    // console.log(filteredAddresses);
    for(let owner of filteredAddresses) {
        console.log(owner)
    }
}

getAttributes()