const fs = require('fs');
const axios = require('axios');

let name = '0xcb8f0b07ab79118014c8d6fa2ab2e2d88477305f'
let total = 0
let owners = []
async function getData() {
    let data = await fs.readFileSync('logs.json');
    data = JSON.parse(data)
    for(let i=0; i<data.length; i++){
        let inOwners = false
        for(let j=0; j<owners.length; j++){
            if(owners[j].address.toLowerCase() === data[i].address.toLowerCase()){
                inOwners = true;
                owners[j][name] += data[i][name]
            }
        }
        if(!inOwners) {
            owners.push(data[i])
        }
        total += data[i][name]
    }
    console.log(owners.length)

    let tires = []
    for(let o=0; o<owners.length; o++){
        if (owners[o][name] >= 5) {
            tires.push(owners[o].address)
            // owners[o][projects[p].address] -= tires[t].tokenNumber
        }
    }

    console.log(tires.length)


}


getData()