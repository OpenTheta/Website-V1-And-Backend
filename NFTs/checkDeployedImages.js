const axios = require('axios');

const baseURL = 'https://arweave.net/0S_Arw2Ic6mkJr3OhOjr5foktswQa27dcNPZqzqPBqw/'; // JSON


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function check () {
    for (let i = 2467; i <= 5555; i++) {
        axios.get(baseURL+i+'.png').then(() => {
            console.log("Checked:", i);
        }).catch(() => {
            axios.get(baseURL+i+'.png').then(() => {
                console.log("Checked:", i);
            }).catch(() => {
                console.log("Error image", i);
            });
        });
        await sleep(200)
    }
}

check().then(() => {
    console.log("END");
});