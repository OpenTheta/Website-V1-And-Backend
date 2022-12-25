// express api server
const express = require("express");
const fs = require('fs');
const https = require('https');
const axios = require('axios');

const projectsRouter = require("../Routes/projects-routes");
const nftRouter = require("../Routes/nft-routes");
const searchRouter = require("../Routes/search-routes");
const creatorsRouter = require("../Routes/creators-routes");
// const userRouter = require("../Routes/user-routes")

const server = express();

// const baseURL = "opentheta.de"
const baseURL = "open-theta.de"

server.use(express.json());
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.get("/", (req, res,next) => {
    res.json({message: "this is the api of OpenTheta"})
});

server.post('/', (req, res, next) => {
    // Handle the post for this route
});

https.createServer(
        {
            key: fs.readFileSync('/etc/letsencrypt/live/'+baseURL+'/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/'+baseURL+'/cert.pem'),
            ca: fs.readFileSync('/etc/letsencrypt/live/'+baseURL+'/chain.pem')
        },
        server
    )
    .listen(443, () => {
        console.log('Listening...')
    });

server.get("/uri", (req, res) => {
    axios.get(req.query.url).then(response => {
        res.json(response.data);
    });
});

server.use('/api/static', express.static('public/json'))
server.use('/api/images/creators', express.static('public/creators'))
server.use('/api/images/launches', express.static('public/launches'))
server.use('/api/images/projects', express.static('public/projects'))
server.use('/api/projects', projectsRouter);
server.use('/api/nft', nftRouter);
server.use('/api/search', searchRouter);
server.use('/api/creators', creatorsRouter);
// server.use('/api/user', userRouter);


module.exports = server;
