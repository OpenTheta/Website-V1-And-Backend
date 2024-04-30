const axios = require('axios');

const baseURL = 'https://arweave.net/7QObA8FwQeluYW31psPX5QoaJxo8AkJU3Yqc_cJylqA/'; // JSON


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function check () {
    for (let i = 1; i <= 1111; i++) {
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