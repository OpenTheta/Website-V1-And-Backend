const fs = require('fs');

// File specifics
// {
//     "name":"ThetaPug #1",
//     "symbol":"PUG",
//     "description":"A Collection of 10,000 Randomly Generated Pug NFTs, exclusive to the Theta Blockchain",
//     "image":"https://arweave.net/<ID>/1.png",
//     "external_url": "https://thetapugs.com/",
// }

const baseImageURI = [
    "https://arweave.net/vENF6V6wewbVytZcSfbRxNMFRmvm5XtD2mACtL5Ss4k", // 55
]


// const baseName = "ThetaZilla #";
const symbol = "SB";
const description = "The North Pole is in chaos; elves run from one end of the toy shoppe to the other looking for the man in the suit without avail—Santa’s gone AWOL. With no one to turn to, the elves and Mrs. Clause enlist the ThetaBulls to save Christmas. Fresh from the pasture, they’ve got Santa’s sack and the red suit in hoof, as the Bulls set forth to deliver Yuletide joy across the Thetaverse. But that velvet sack isn’t full of toys; no, it’s overflowing with bear traps, spray, and all the makings for a comfy bear fur rug. Sorry Bears, no toys this year, the ThetaBulls are back, and this time, you’re on the naughty list. It’s the running of the Christmas Bulls, leaving a wake of candy canes and pain.";
const external_url = "https://www.bullsontheta.io";
const twitter = "https://twitter.com/ThetaBulls";
const tokenNumber = 55;

const baseName = "Santa Bull #";
const creator = "ThetaBulls"
// const symbol = "SP";
// const description = "This NFT is limited to ten editions";
// const tokenNumber = 10;

async function writeFile(jsonId) {
    // fs.readFile('./../../../OpenThetaProjects/ThetaTeeth/json/'+ (jsonId) + '.json', 'utf8' , (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
        // let image = baseImageURI[0]+(jsonId).toString()+".png";
        // let image = baseImageURI

        // data =  JSON.parse(data);
    let data = {
        name: baseName + jsonId.toString(),
        image: baseImageURI[0],
        description: description,
        external_url: external_url,
        creator: creator,
        twitter: twitter
    }
        // data.description = description;
        // data["external_url"] = external_url;
        // data.name = baseName + (jsonId).toString();
        // data["twitter"] = twitter;
        // data["image"] = image;
        // data["creator"] = creator;
        // delete data.compiler;
        fs.writeFile("./../../../../OpenThetaProjects/ThetaBulls/SantaBull/metadata/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
            }
        });
    // });
}
// const baseID = 7000;
// for(let i=1; i<=tokenNumber; i++) {
//     writeFile( baseID+i);
// }

// Create a array with numbers from 0 to 9999
let a = [];
for (let i=1;i<=tokenNumber;++i){
    writeFile(i)
}
