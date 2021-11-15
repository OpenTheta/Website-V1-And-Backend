const knex = require('knex');
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
    addProject,
    deleteProject,
    updateProject,
    getAllProjects,
    getProjectByContract,

    getProjectsNFTs,
    getProjectsNFTsOnMarket,
    getProjectsNFTsSold,
    addNFT,
    deleteNFT,
    updateNFT,
    getAllNFTs,
    getNFTById,
    getNFTsOnMarket,
    getSoldNFTs,
    getNFTsOnMarketByAddress
}

// interact with projects table
function addProject(project) {
    return db("projects").insert(project);
}

function deleteProject(contract) {
    return db('projects').where({contract}).del();
}

function updateProject(contract, changes) {
    return db('projects').where({contract}).update(changes).then(() => {
        return getProjectByContract(contract);
    });
}

function getAllProjects() {
    return db("projects");
}

function getProjectByContract(contract) {
    return db('projects').where({contract}).first();
}

// interact with the marketplace table
function getProjectsNFTs(nftContract) {
    return db("projects as p")
        .join("marketplace as m", "p.contract", "m.nftContract")
        .select(
            "p.contract as nftContract",
            "p.name as projectName",
            "p.creator as creator",
            "p.tokenNumber as tokenNumber",
            "p.description as projectDescription",
            "p.imgUrl as projectImgUrl",
            "m.itemId as itemId",
            "m.tokenId as tokenId",
            "m.seller as seller",
            "m.owner as owner",
            "m.category as category",
            "m.price as price",
            "m.isSold as isSold",
            "m.name as name",
            "m.imgUrl as imgUrl",
            "m.description as description",
        ).where({nftContract});
}

function getProjectsNFTsOnMarket(nftContract) {
    return db("projects as p")
        .join("marketplace as m", "p.contract", "m.nftContract")
        .select(
            "p.contract as nftContract",
            "p.name as projectName",
            "p.creator as creator",
            "p.tokenNumber as tokenNumber",
            "p.description as projectDescription",
            "p.imgUrl as projectImgUrl",
            "m.itemId as itemId",
            "m.tokenId as tokenId",
            "m.seller as seller",
            "m.owner as owner",
            "m.category as category",
            "m.price as price",
            "m.isSold as isSold",
            "m.name as name",
            "m.imgUrl as imgUrl",
            "m.description as description",
        ).where({
            nftContract: nftContract,
            isSold: false});
}

function getProjectsNFTsSold(nftContract) {
    return db("projects as p")
        .join("marketplace as m", "p.contract", "m.nftContract")
        .select(
            "p.contract as nftContract",
            "p.name as projectName",
            "p.creator as creator",
            "p.tokenNumber as tokenNumber",
            "p.description as projectDescription",
            "p.imgUrl as projectImgUrl",
            "m.itemId as itemId",
            "m.tokenId as tokenId",
            "m.seller as seller",
            "m.owner as owner",
            "m.category as category",
            "m.price as price",
            "m.isSold as isSold",
            "m.name as name",
            "m.imgUrl as imgUrl",
            "m.description as description",
            "m.createdTimestamp as createdTimestamp",
            "m.soldTimestamp as soldTimestamp"
        ).where({
            nftContract: nftContract,
            isSold: true});
}

function addNFT(item) {
    return db('marketplace').where({nftContract: item.nftContract}).insert(item);
}

function deleteNFT(itemId) {
    return db("marketplace").where({itemId}).del();
}

function updateNFT(itemId, item) {
    return db("marketplace").where({itemId}).update(item);
}

function getAllNFTs() {
    return db("projects as p")
        .join("marketplace as m", "p.contract", "m.nftContract")
        .select(
            "p.contract as nftContract",
            "p.name as projectName",
            "p.creator as creator",
            "p.tokenNumber as tokenNumber",
            "p.description as projectDescription",
            "p.imgUrl as projectImgUrl",
            "m.itemId as itemId",
            "m.tokenId as tokenId",
            "m.seller as seller",
            "m.owner as owner",
            "m.category as category",
            "m.price as price",
            "m.isSold as isSold",
            "m.name as name",
            "m.imgUrl as imgUrl",
            "m.description as description",
            "m.createdTimestamp as createdTimestamp",
            "m.soldTimestamp as soldTimestamp"
        ).select("*");
}

function getNFTById (itemId) {
    return db("projects as p")
            .join("marketplace as m", "p.contract", "m.nftContract")
            .select(
                "p.contract as nftContract",
                "p.name as projectName",
                "p.creator as creator",
                "p.tokenNumber as tokenNumber",
                "p.description as projectDescription",
                "p.imgUrl as projectImgUrl",
                "m.itemId as itemId",
                "m.tokenId as tokenId",
                "m.seller as seller",
                "m.owner as owner",
                "m.category as category",
                "m.price as price",
                "m.isSold as isSold",
                "m.name as name",
                "m.imgUrl as imgUrl",
                "m.description as description",
                "m.createdTimestamp as createdTimestamp",
                "m.soldTimestamp as soldTimestamp"
            ).where({itemId});
}

function getSoldNFTs() {
    return db("projects as p")
        .join("marketplace as m", "p.contract", "m.nftContract")
        .select(
            "p.contract as nftContract",
            "p.name as projectName",
            "p.creator as creator",
            "p.tokenNumber as tokenNumber",
            "p.description as projectDescription",
            "p.imgUrl as projectImgUrl",
            "m.itemId as itemId",
            "m.tokenId as tokenId",
            "m.seller as seller",
            "m.owner as owner",
            "m.category as category",
            "m.price as price",
            "m.isSold as isSold",
            "m.name as name",
            "m.imgUrl as imgUrl",
            "m.description as description",
            "m.createdTimestamp as createdTimestamp",
            "m.soldTimestamp as soldTimestamp"
        ).where({isSold: true});
}

function getNFTsOnMarket() {
    return db("projects as p")
        .join("marketplace as m", "p.contract", "m.nftContract")
        .select(
            "p.contract as nftContract",
            "p.name as projectName",
            "p.creator as creator",
            "p.tokenNumber as tokenNumber",
            "p.description as projectDescription",
            "p.imgUrl as projectImgUrl",
            "m.itemId as itemId",
            "m.tokenId as tokenId",
            "m.seller as seller",
            "m.owner as owner",
            "m.category as category",
            "m.price as price",
            "m.isSold as isSold",
            "m.name as name",
            "m.imgUrl as imgUrl",
            "m.description as description",
            "m.createdTimestamp as createdTimestamp",
        ).where({isSold: false});
}

function getNFTsOnMarketByAddress(address) {
    return db("projects as p")
        .join("marketplace as m", "p.contract", "m.nftContract")
        .select(
            "p.contract as nftContract",
            "p.name as projectName",
            "p.creator as creator",
            "p.tokenNumber as tokenNumber",
            "p.description as projectDescription",
            "p.imgUrl as projectImgUrl",
            "m.itemId as itemId",
            "m.tokenId as tokenId",
            "m.seller as seller",
            "m.owner as owner",
            "m.category as category",
            "m.price as price",
            "m.isSold as isSold",
            "m.name as name",
            "m.imgUrl as imgUrl",
            "m.description as description",
            "m.createdTimestamp as createdTimestamp",
        ).where({
            seller: address,
            isSold: false
        });
}