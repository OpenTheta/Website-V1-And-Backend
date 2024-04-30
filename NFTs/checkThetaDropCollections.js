const axios = require('axios');
const fs = require('fs');

main()

let pages
let ThetaDropCollections= []
let OpenThetaCollections = []
let count = 0
let missingCollections = []
async function main() {
    // get all ThetaDrop Collections
    let resTD = await axios.get("https://api.thetadrop.com/collection/external/list_all?page=1&number=100");
    console.log(resTD.data.body.pagination)
    pages = resTD.data.body.pagination.pages
    for(let i = 1; i<=pages; i++) {
        resTD = await axios.get(`https://api.thetadrop.com/collection/external/list_all?page=${i}&number=100`);
        ThetaDropCollections.push(...resTD.data.body.collections);
    }
    // Get all OpenTheta Collections
    let resOT = await axios.get("https://api.opentheta.io/v1/collections");
    OpenThetaCollections = resOT.data.collections
    // console.log(OpenThetaCollections[0])
    for(let collectionTD of ThetaDropCollections) {
        if (!(OpenThetaCollections.some(collectionOT => collectionOT.contractAddress === collectionTD.contract_address))) {
            console.log(collectionTD.name ,collectionTD.contract_address);
            count ++
            let newCollection = {
                name: collectionTD.name,
                image: collectionTD.image,
                description: collectionTD.description,
                contractAddress: collectionTD.contract_address,
                urlTD: collectionTD.url,
                twitter: collectionTD.creator.twitter,
                youtube: collectionTD.creator.youtube,
                discord: collectionTD.creator.discord,
                facebook: collectionTD.creator.facebook,
                tiktok: collectionTD.creator.tiktok,
                instagram: collectionTD.creator.instagram,
                website: collectionTD.creator.website,
                creatorName: collectionTD.creator.display_name,
                creatorImage: collectionTD.creator.image
            }
            missingCollections.push(newCollection)
        }
    }
    console.log(missingCollections)
    if (!missingCollections.length) {
        console.log('The array is empty. Nothing to write to CSV.');
        process.exit(0); // or return, depending on the rest of your code
    }

    let csvContent = '';

// headers
    let headers = Object.keys(missingCollections[0]).join(';');
    csvContent += headers + '\n';

// data
    for(let obj of missingCollections) {
        if (obj && typeof obj === 'object') {
            let row = Object.values(obj).map(val => val === null ? '' : `"${val}"`).join(';');
            csvContent += row + '\n';
        }
    }

// write to a file
    fs.writeFileSync('output.csv', csvContent);
}