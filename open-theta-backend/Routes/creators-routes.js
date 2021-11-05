// express api server
const express = require("express");
const projects = require("../models/dbHelpers");

const router = express.Router();

// Returns newly listed Creators
router.get('/new/:number', (req, res)=> {

});

// Returns newly listed NFTs on the marketplace (number = number of NFTs)
router.get('/popular/:number', (req, res)=> {

});


module.exports = router;