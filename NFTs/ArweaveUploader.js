const Bundlr = require('@bundlr-network/client');
const fs = require('fs');

let key = fs.readFileSync("./wallet/arweave-wallet.json").toString()

const jwk = JSON.parse(key);
console.log(jwk.n)

const bundlr = new Bundlr.default("http://node1.bundlr.network", "arweave", jwk);

bundlr.uploader.uploadFolder("./logs").then(res => {
    console.log(res)
})