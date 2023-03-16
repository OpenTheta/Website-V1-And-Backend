const axios = require('axios');
const fs = require('fs');


const baseURL = 'https://arweave.net/UCd_sVQXItreKnFU96KoQz25P7m3dswaIV65C5sVA14/'; // JSON
const hasNumbering = true

async function check () {
    let finalReport = {
        metadata: {
            checked: [],
            failed: []
        },
        names: [],
        images: {
            checked: [],
            failed: []
        },
        animation_url: {
            checked: [],
            failed: []
        },
        videoApi: {
            checked: [],
            failed: []
        }
    }
    process.stdout.write("Checking:")
    for (let i = 1; i <=420; i++) {
        if(i%10 === 0)process.stdout.write(" " + i)
        finalReport.metadata.checked.push(i)
        let count = 0
        let timeout = true
        let metadata;
        while(timeout){
            timeout = false
            let url = ''
            if(hasNumbering){
                url = baseURL+i+'.json'
            } else{
                url = baseURL
            }
            metadata = await axios.get(url, {timeout: 3000}).catch(error => {
                count += 1
                if(count < 20){
                    timeout = true
                } else {
                    finalReport.metadata.failed.push(i)
                    console.log("Error Metadata", i)
                }

            });
        }
        if(metadata !== undefined) {
            // console.log(JSON.parse(metadata.data))
            // let imageNumber = metadata.data.image.slice(-8,-4).replace( /^\D+/g, '')
            // finalReport.images.checked.push(parseInt(imageNumber))
            // let imageNumber = metadata.data.image.slice(-10,-3)
            // finalReport.images.checked.push(imageNumber)
            finalReport.images.checked.push(metadata.data.image)
            finalReport.names.push(metadata.data.name)
            count = 0
            timeout = true
            while(timeout){
                timeout = false
                await axios.get(metadata.data.image, {timeout: 3000}).catch(error => {
                    count += 1
                    if(count < 20){
                        timeout = true
                    } else {
                        finalReport.images.failed.push(i)
                        console.log("Error Image", metadata.data.image, "Metadata", i);
                    }
                });
            }
            if(metadata.data.animation_url) {
                finalReport.animation_url.checked.push(i)
                count = 0
                timeout = true
                while(timeout){
                    timeout = false
                    await axios.get(metadata.data.animation_url, {timeout: 3000}).catch(error => {
                        count += 1
                        if(count < 20){
                            timeout = true
                        } else {
                            finalReport.animation_url.failed.push(i)
                            console.log("Error Video", metadata.data.animation_url, "Metadata", i);
                        }
                    });
                }
            }
            if(metadata.data.theta_api) {
                finalReport.videoApi.checked.push(i)
                count = 0
                timeout = true
                while(timeout){
                    timeout = false
                    axios.get("https://player.thetavideoapi.com/video/"+metadata.data.theta_api.videoId, {timeout: 3000}).catch(error => {
                        count += 1
                        if(count < 20){
                            timeout = true
                        } else {
                            finalReport.videoApi.failed.push(i)
                            console.log("Error VideoAPI", metadata.data.theta_api.videoId, "Metadata", i);
                        }
                    });
                }
            }
        }
    }
    console.log(finalReport)
    fs.writeFile("./logs/DeployedJSONReport.json", JSON.stringify(finalReport, null, 2), function(err) {
        if (err) {
            console.log(err);
        }
    });
    const toFindDuplicates = tokenIds => tokenIds.filter((item, index) => tokenIds.indexOf(item) !== index)
    let duplicateElements = toFindDuplicates(finalReport.metadata.checked);
    console.log("Duplicate URI",duplicateElements);
    duplicateElements = toFindDuplicates(finalReport.images.checked);
    console.log("Duplicate Images",duplicateElements);
    duplicateElements = toFindDuplicates(finalReport.names);
    console.log("Duplicate Names",duplicateElements);
    console.log(duplicateElements.length)
}

check().then(() => {
    console.log("END");
});

// let test = ("Hello1230.png").slice(-8,-4).replace( /^\D+/g, '')
// console.log(test)