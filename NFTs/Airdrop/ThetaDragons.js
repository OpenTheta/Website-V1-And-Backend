const fs = require("fs");

let metadataDir = './../../../../OpenTheta/Projects/ThetaDragons/june4th/_metadata.json'
let data = fs.readFileSync(metadataDir)
data = JSON.parse(data)

let baseURI = "https://arweave.net/QwZdNnH2-PDZkEa80CvQJVfUKoz9T6FJttjVDUsbrzM/"
let baseName = "July 4th 2023 Dragon #"

for(let metadata of data) {
    metadata["name"] = baseName + metadata["name"].split("#")[1]
    metadata["image"] = baseURI + metadata["image"].split("/THETADragons/")[1]
    fs.writeFileSync(`./../../../../OpenTheta/Projects/ThetaDragons/june4th/metadata/${metadata["name"].split("#")[1]}.json`, JSON.stringify(metadata))
}