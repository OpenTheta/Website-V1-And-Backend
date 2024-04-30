const axios = require('axios');
const fs = require('fs');

// steps:
// 1. Get all minted pearls from the OpenTheta API
// 2. For each category talke out: All minted Pearls and: 100, 97, 76, 73, 62, 38

// get OpenTheta API
const category = "(Serene)"
const tokensNeeded = [38,62,73,76,97,100]
const originalReserved = [24,46,52,75,94,100]
async function getAllPearls() {
    const res = await axios.get('https://api.opentheta.io/v1/items?contractAddress=0x13ba2e20789df0ded3f9c30575d450152640f3dc&limit=300')
    let allTokensOfCategory = []
    let count = 0
    let changeCounter = 0
    for(let token of res.data.items) {
        if(token.name && token.name.split(' ')[0] === category) {
            count++
            allTokensOfCategory.push(token.name.split('#')[1])
            console.log(count, category, token.name.split('#')[1])
            if(originalReserved.includes(parseInt(token.name.split('#')[1]))) {
                console.log(token.name.split('#')[1], tokensNeeded[changeCounter], 'TokenID:', token.tokenId)
                changeCounter++
            }
        }
    }
    let tokensToRemove = []
    for(let id of allTokensOfCategory) {
        if(!originalReserved.includes(parseInt(id))) tokensToRemove.push(parseInt(id))
    }
    tokensToRemove = [...tokensNeeded, ...tokensToRemove]
    const uniqueArray = [...new Set(tokensToRemove)];
    console.log(tokensToRemove, tokensToRemove.length, uniqueArray, uniqueArray.length)
    return uniqueArray
}

async function generateNewJsonFolder(){
    const idsToRemove = await getAllPearls()
    // check if correct tokenURI
    const resCheck = JSON.parse(fs.readFileSync(`./../../../../OpenTheta/Projects/ThetaGrunberg/metadata/pearls/${category.slice(1,-1)}/1.json`));
    let jsonID = 0
    console.log(resCheck)
    if(resCheck.name.split(' ')[0] !== category) throw Error('wrong category or uri')
    for(let i = 1; i<=100; i++) {
        if(!idsToRemove.includes(i)) {
            const res = fs.readFileSync(`./../../../../OpenTheta/Projects/ThetaGrunberg/metadata/pearls/${category.slice(1,-1)}/${i}.json`);
            const data = JSON.parse(res);
            jsonID ++;
            fs.writeFileSync("./../../../../OpenTheta/Projects/ThetaGrunberg/metadata/new/"+category.slice(1,-1)+"/"+jsonID+".json", JSON.stringify(data), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        } else {
            console.log("Do not include ID:", i)
        }

    }
}

if("main") {
    generateNewJsonFolder()
}