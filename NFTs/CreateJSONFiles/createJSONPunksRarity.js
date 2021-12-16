const fs = require('fs').promises;



async function writeFile(data) {
    fs.writeFile("./../../../OpenThetaProjects/ThetaPunks/rarityThetaPunks.json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

async function readFiles() {
    let data = {};
    for (let i = 0; i < 10000; i++) {
        let metaData = await fs.readFile('./../../../OpenThetaProjects/ThetaPunks/METADATA/ThetaPunk #'+i+'.json', 'utf8')
        console.log(i, JSON.parse(metaData.replace("\"verified\": ,", "").replace(" \"share\":", "\"share\":\"\"")).attributes[0].value);
        // data.push(JSON.parse(metaData.replace("\"verified\": ,", "").replace(" \"share\":", "\"share\":\"\"")).attributes[0].value);
        data[JSON.parse(metaData.replace("\"verified\": ,", "").replace(" \"share\":", "\"share\":\"\"")).name] = JSON.parse(metaData.replace("\"verified\": ,", "").replace(" \"share\":", "\"share\":\"\"")).attributes[0].value
    }
    writeFile(data);
}

readFiles();
// fs.readFile('./../../../OpenThetaProjects/ThetaPunks/METADATA/rarityThetaPunks.js', 'utf8', (err, data) => {
//     console.log(JSON.parse(data));
// });