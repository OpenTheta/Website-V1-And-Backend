const fs = require('fs');
const axios = require('axios');

const baseUrl = "https://arweave.net/4o2kTeE6xqv4RlaMM7_vH93p5P7Ufsh5Efa06Rd9Qjc/"
async function downloadMetadata(start, end) {
    for(let i=start; i< end; i++) {
        let res = await axios.get(baseUrl + i + ".json")
        let data = res.data

        // console.log(data)
        fs.writeFile("./../../../../OpenTheta/Projects/Matreshka/metadata/"+i+".json", JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

downloadMetadata(907, 908).then(() => {console.log("end")})