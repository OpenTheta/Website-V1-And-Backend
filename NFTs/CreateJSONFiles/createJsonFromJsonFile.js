const fs = require("fs");

const dirJsonFile = "./../../../../OpenTheta/Projects/MaxTheta/Panamals/json/_metadata.json"
const dirSaveJsonFiles = "./../../../../OpenTheta/Projects/MaxTheta/Panamals/metadata/"

let baseURL = "https://arweave.net/vq2ZZLlBOhkq6xK5rZy4LgvSU0klkIoej99iGzqeImI/"
const external_url = "https://www.clearlakeecoretreat.com/camp-theta.html";
const creator = "Max Theta";
const description = "Unlock season 3 of Into The WilderVRS." +
    "\n" +
    "\n" +
    "Find a fish to instantly win a ticket to CampTheta '24." +
    "\n" +
    "\n" +
    "Hold the crab, pelican, sloth, iguana, and frog on May 1st to be entered into a draw for the final CampTheta '24 ticket, physical artwork, and OT banners!";
const fishDescription = "This is your ticket to CampTheta '24";
const reserve = [1, 3, 4, 8, 14, 18, 20, 21, 27, 31, 32, 37, 40, 44, 45, 46, 47, 50, 51, 53]
let counterToReserve = 0

let JSONFile = fs.readFileSync(dirJsonFile)

JSONFile = JSON.parse(JSONFile)
let counter = 20
for (const metadata of JSONFile) {
    let fileNumber;
    if(reserve.includes(metadata.edition)) {
        counterToReserve++
        fileNumber = counterToReserve
    } else {
        counter++
        fileNumber = counter
    }

    if(metadata.attributes.some(attribute => {return attribute.trait_type === "Panimal" && attribute.value === "Fish";})) {
        metadata.description = fishDescription
    } else {
        metadata.description = description
    }
    metadata.name = metadata.name.replace('Panimals', 'Panamals')
    metadata.image = baseURL + metadata.edition + ".png"
    metadata['external_url'] = external_url
    metadata['creator'] = creator

    delete metadata.edition
    fs.writeFile(dirSaveJsonFiles + fileNumber + ".json", JSON.stringify(metadata, null, 4), function (err) {
        if (err) {
            console.log(err);
        }
    });
}
