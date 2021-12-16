const ethers = require('ethers');
const Web3 = require('web3');
const axios = require('axios');

let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);
let projectsAddress = "0x1f3de9cdb1d4ed10e8b7b3f21f282d84f7f54473";

const contractThetaPunksABI = [
    "function balanceOf(address _owner) view returns (uint256)",
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
    "function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function approve(address to, uint256 tokenID)",
    "function getApproved(uint256 tokenId) view returns (address)",
    "event Approval(address indexed owner, address indexed to, uint256 tokenId)",
];

const contractNFTObject = new ethers.Contract(
    projectsAddress,
    contractThetaPunksABI,
    provider
);
owners = [];
counter = 2800;
lost = []

async function readData1(number) {
    for (let i = number; i<number+100; i++) {
        contractNFTObject.ownerOf(i).then(address => {
            console.log(address);
            axios.get('https://ipfs.io/ipfs/QmaTssCFkteWfSGdKJuobzPDT3EDGGpEqqxBUb7HEVcvAM/'+ i.toString()).then(response => {
                let exists = false
                for (let j = 0; j<owners.length; j++) {
                    if (owners[j].address === address) {
                        owners[j].punks += 1;
                        owners[j].rarity.push(response.data.attributes[0].value);
                        exists = true;
                    }
                }
                if (!exists) {
                    newOwner = {
                        address: address,
                        punks: 1,
                        rarity: [response.data.attributes[0].value],
                    }
                    owners.push(newOwner);
                }
                counter += 1;
                // let fs = require('fs');
                // fs.writeFile("test.txt", JSON.stringify(owners), function(err) {
                //     if (err) {
                //         console.log(err);
                //     }
                // });
            }).catch(() => {
                lost.push(i);
                console.log("Error");
            });
        });
    }
}

async function readLost(number) {
    contractNFTObject.ownerOf(number).then(address => {
        console.log(address);
        axios.get('https://ipfs.io/ipfs/QmaTssCFkteWfSGdKJuobzPDT3EDGGpEqqxBUb7HEVcvAM/'+ number.toString()).then(response => {
            let exists = false
            for (let j = 0; j<owners.length; j++) {
                if (owners[j].address === address) {
                    owners[j].punks += 1;
                    owners[j].rarity.push(response.data.attributes[0].value);
                    exists = true;
                }
            }
            if (!exists) {
                newOwner = {
                    address: address,
                    punks: 1,
                    rarity: [response.data.attributes[0].value],
                }
                owners.push(newOwner);
            }
            counter += 1;
        }).catch(() => {
            lost.push(number);
            console.log("Error");
        });
    });
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function readFile() {
    let fs = require('fs');
    await fs.readFile('test.txt', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        owners = JSON.parse(data);
    });
    await sleep(1000);
}

async function getData() {
    await readFile();
    await sleep(1000);
    let fs = require('fs');
    for (let i = 28; i<100; i++) {
        readData1(i*100);
        await sleep(10000);
        console.log('Round:',
            i);
        console.log(counter);
        while (counter < ((i+1)*100)){
            console.log('wait', counter);
            for (let i = lost.length-1; i>=0; i--) {
                console.log("Lost", lost);
                readLost(lost[i]);
                lost.pop();
            }
            await sleep(2000);
        }
        fs.writeFile("test"+i.toString()+".txt", JSON.stringify(owners), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
    await sleep(100000);
    console.log(owners);
    fs.writeFile("test.txt", JSON.stringify(owners), function(err) {
        if (err) {
            console.log(err);
        }
    });

}

// getData();

// let fs = require('fs');
// fs.readFile('test27.txt', 'utf8' , (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     owners = JSON.parse(data);
//     console.log(owners);
// })

async function postProcessing() {
    await readFile();
    // console.log(owners[0.json].punks);
    let count = 0;
    for (let i = 0; i< owners.length; i++) {
        let rarity = 0;
        for (let j = 0; j< owners[i].rarity.length; j++) {
            rarity += owners[i].rarity[j];
        }
        owners[i].score = rarity/owners[i].punks;
        if (owners[i].address.toLowerCase() === "0xd539558887b6744c52c595cb24fb9efa664ba814") {
            console.log(owners[i]);
        }
    }
    // owners.sort((a, b) => {
    //     return (b.punks - a.punks); // ascending 0xd539558887b6744c52c595cb24fb9efa664ba814
    // })
    // for (let i = 0.json; i< 50; i++) {
    //     console.log(owners[i]);
    // }
}

// postProcessing();

number = [];

for (let i = 0; i< 10000; i++) {
    let newNumber = (i + 3) % 10000;

}

