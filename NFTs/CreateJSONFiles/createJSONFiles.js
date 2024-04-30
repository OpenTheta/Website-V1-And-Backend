const fs = require('fs');

let videoIds = [
    "video_f07cuavwdrm7erxb8hasqnt9pr"
    // "video_4vum7zgh7880fq808gzeypsnqg",
    // "video_ckfabzv0f53mreqyv55j4fg4ve",
    // "video_2xbiw9fum2jy2xxw8fitrj9ds8",
    // "video_cgvzep91wv6qhv004hus611b7f",
    // "video_gxac8y92zcnsq5z89yir10598h",
    // "video_tbr2ev6gezcrmsicfx5zwxntsj",
    // "video_yj64gpwcwpbzsgy5jahrs5xebv",
    // "video_n221ttz8n9azw9vaq0f7wkbe39",
    // "video_536b5qttnhkpkw8i7hmkfanh4x",
    // "video_cr91jfhfvx44192wjvje2tmtiz",


]

const name = "Edge Cloud Jelly"
const imageUrl = "https://arweave.net/Qc7i5xrOax4iTNQbJ8gCwPkMSRmXVfA1FEbrM8uI9P8"
const description = "Commemorating the launch of Edge Cloud"
const animation_url = "https://arweave.net/L48pUyuyaMea04vir4gVSuTIFEsvalyh0rOAf3LYqQQ"
const thetaVideo = {videoId: "video_u8re4tss09376r13qy6x5nw3g6"}
// const external_url = "https://linktr.ee/iastrobeing"
const creator = "Max Theta"
const twitter = "https://twitter.com/opentheta";
// const collection = ""
const tokenNumber = 54
// const attributes = [{"trait_type":"rarity","value":"None"},{"trait_type":"event","value":"ThetaCon23"},{"trait_type":"radius","value":"0%"},{"trait_type":"artist","value":"Theta Vibes"}]
// const attributes = [{"trait_type":"event","value":"CampTheta"},{"trait_type":"rarity","value":"Custom"},{"trait_type":"artist","value":"Max Theta"}]
// const attributes = [{"trait_type":"Artist","value":"TheRareRobot"},{"trait_type":"Type","value":"Early Bird"}]
let attributes = [
    {
        "trait_type": "event",
        "value": "Giveaway"
    },
    {
        "trait_type": "artist",
        "value": "Max Theta"
    }
]
// const attributes = [{"trait_type":"collaborator","value":"@ReikiMatt"},{"trait_type":"chakra","value":"Muladhara"}]
let jsonID = 1

async function writeFile(jsonId) {
    // let thetaVideo = {videoId: videoIds[jsonId-1]}
    // jsonId = jsonId+350

    let data = {
        name: name + ` #`+ jsonId.toString(),
        // name: name,
        // image: imageUrl + videoIds[jsonId-1] + ".png",
        // image: imageUrl + jsonId + ".png",
        image: imageUrl,
        // image_hd: "https://arweave.net/_aNIuICZYQBThd60Jh5Zm-_gQI0uLLqgvXkG7duOALk",
        // gif: "https://arweave.net/Q10bG-mJgk6pmNSCF-WOlLqSWw1ULc_h_N7Bk0T_M1g",
        description: description,
        // animation_url: animation_url + videoIds[jsonId-1] + ".mp4",
        // animation_url: animation_url,
        // theta_api: thetaVideo,
        // external_url: external_url,
        creator: creator,
        // twitter: twitter,
        // attributes: attributes
        // collection: collection
    }
    fs.writeFileSync("./../../../../OpenTheta/Projects/MaxTheta/Panamals/Airdrop1/metadata/"+jsonId+".json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
    // fs.writeFile("./../../../../OpenTheta/Projects/ThetaSeeds/Challenge5/metadata.json", JSON.stringify(data), function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });
    // fs.writeFile("./../../../../OpenThetaProjects/ThetaCon/TC22/metadata/"+jsonId+".json", JSON.stringify(data), function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });
    // });
}

for(let i=1; i<=tokenNumber; i++) {
    // if(![24, 46, 52, 75, 94, 100].includes(i)) {
        writeFile(i)
    // }
}

