const axios = require('axios');

async function main() {
    let allOwners = {}
    let resThegon = await axios.get('https://api.opentheta.io/v1/contracts/0xee4ad23c12ab827b35a6796bc04ced750b206f73/owners')
    let resHighFlyer = await axios.get('https://api.opentheta.io/v1/contracts/0x81fcd77c59cc469026e3bb8eef46a495581a495e/owners')
    let resSpace = await axios.get('https://api.opentheta.io/v1/contracts/0x9f6b2bd41490d4597038acde77c638c861b021cf/owners')
    let resPunk = await axios.get('https://api.opentheta.io/v1/contracts/0x1f3de9cdb1d4ed10e8b7b3f21f282d84f7f54473/attributes') // Zombie, Ape, Alien

    // console.log(Object.keys(resThegon.data.owners))
    for(let key of Object.keys(resThegon.data.owners)) {
        // console.log(resThegon.data.owners[key])
        if(allOwners[resThegon.data.owners[key]] && allOwners[resThegon.data.owners[key]]['Thegon']) {
            allOwners[resThegon.data.owners[key]]['Thegon'] += 1
        } else {
            allOwners[resThegon.data.owners[key]] = {Thegon: 1, HighFlyer: 0, Space: 0, Punk: 0}
        }
    }

    for(let key of Object.keys(resHighFlyer.data.owners)) {
        // console.log(resThegon.data.owners[key])
        if(allOwners[resHighFlyer.data.owners[key]]) {
            allOwners[resHighFlyer.data.owners[key]]['HighFlyer'] += 1
        }
    }

    for(let key of Object.keys(resSpace.data.owners)) {
        // console.log(resThegon.data.owners[key])
        if(allOwners[resSpace.data.owners[key]]) {
            allOwners[resSpace.data.owners[key]]['Space'] += 1
        }
    }

    const targetStrings = ['Zombie', 'Alien', 'Ape'];

    for(let key of Object.keys(allOwners)) {
        let data = resPunk.data.owners.filter(data => {
            return data.address === key
        });
        if(data[0] && data[0].attributes.Type.some(element => targetStrings.includes(element))) {
            allOwners[key]['Punk'] += 1
        }

    }

    for(let attribute of resPunk.data.owners.filter(data => {
        return data.address === '0xe3e7b5912ba10674aef6252b3c224509861341b3'
    })[0].attributes.Type) {
        if(attribute !== 'Human')console.log(attribute)
    }

    // console.log(allOwners)
    // console.log(Object.keys(allOwners).length)

    const targetKeys = ['Thegon', 'HighFlyer', 'Space', 'Punk'];
    const result = [];

    for (const [address, values] of Object.entries(allOwners)) {
        if (targetKeys.every(key => values[key] >= 1)) {
            result.push(address);
        }
    }

    console.log(result);
    console.log(result.length);
    // const filteredData = dataArray.filter(data => {
    //     const ownerAddresses = Object.values(data.owners);
    //     return ownerAddresses.some(address => targetAddresses.includes(address));
    // });


}

main()