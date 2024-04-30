const axios = require("axios");
const {all} = require("axios");

let contracts = {
    "0xa3254b1f2c34d9373585b2072067247afce88055": 1,
    "0x38af6ddf4f3f3b044bd0ae1106d6726a011eefd1": 2,
    "0x53086cdba46d30ba6c94bfaefe1921f8a55cd873": 2,
}

async function main() {
    let allOwners = {}
    let baseData = {}
    for (const [contract] of Object.entries(contracts)) {
        baseData[contract] = 0
    }
    // console.log(baseData)

    for (const [keyContract, value] of Object.entries(contracts)) {
        let url = `https://api.opentheta.io/v1/contracts/${keyContract}/owners`;
        let res = await axios.get(url);
        let owners = res.data.owners
        // filter out which owners are already in all Owners and filter out all owners that have the correct number of NFTs.
        for(const [keyOwners] of Object.entries(owners)) {
            const owner = owners[keyOwners]
            if(!allOwners[owner]) {
                allOwners[owner] = JSON.parse(JSON.stringify(baseData));
            }
            allOwners[owner][keyContract] += 1
        }
    }

    // const targetKeys = ["Thegon", "HighFlyer", "Space", "Punk"];
    const result = [];
    //
    for (const [address, values] of Object.entries(allOwners)) {
        let keep = true
        for(const [contract] of Object.entries(allOwners[address])) {
            if(allOwners[address][contract] < contracts[contract]) {
                keep = false
            }
        }
        if(keep) {
            console.log(allOwners[address])
            result.push(address);
        }
    }
    //
    // console.log(result);
    // console.log(result.length);

    console.log(result)
    console.log(result.length)

    // const filteredData = allOwners.filter(data => {
    //     const ownerAddresses = Object.values(data.owners);
    //     return ownerAddresses.some(address => targetAddresses.includes(address));
    // });


}

// main()

let k =    ["0x22f497e1e081775b969b99fe0cd58d47723bde55","0xa8c4b3a4d25c201cc3b0b91f0d4b7cc8c4e0a78c","0xc2bfb8ee30c0ba6dcb929faef7fc1768c01e4085","0x6078abd99be5d0642e6ea2259b6b1df041eef839","0x4c2d6c8669519aab6cf6855eebcafa45c259398b","0xbf7c8d6344f212bdea2fcd636423eff3c9053f7a","0x19a32a9897c71dead753989bf2eb941cd64b3e7e","0xd1b6108ceaad5f94a053ec822b196d6d1bb1d636","0x11811fd283984458680a7f2e1889504a1f36194b","0x4dbd057aea218f498a9b660f6cfdf6ce86bf8de7","0x5e08e7f730af97d765dedeacf7204f031ea42e23","0x0b13f0bece5c31699ee09a7bd4b144b141a5fc4e","0x8a5a1556ba9a6d1ebb9ba0e66e6f0cee3453ac44","0xacee40907444dbb44ed469323cc65a4ac174e393","0xe8e20b3c23b455a361af92696c3d4241e14bb343","0x9c149994ba28da33c804c4d1e8605820bb69bae4","0xb7e5e5dfd7d1c0a6139a67c9f15e0a95154c6b5c","0xe54db11d8c462b0e5d59836359301c2b60f2dfad","0x062b5f7e7fa827783abb946915a8109ae82dda40","0x86147e84fc75c820862cc9796d3fda08e20720d3","0x65e0fc5482f35ec55a840a7ca309d1624f0e6155","0xe4c914ed579c959b0db059b448e3b1dd49b7a244","0x40621bff926dc1caeb2281b1e2e669b0fc3d8617","0x25dac153f0a42921dfa212c87457542fa516d6c7","0xcf51ab58c0e84deac72970116fce52f768f71fe8","0x29917bf58d80815e3dd93b7e4441b405e3d41588","0x926eadfbdba442aa23f1c45e3c7659d98a35346a","0x816fe8299e4c6d81f4aff9354d0a26f9d89750b1"]
console.log(k.length)