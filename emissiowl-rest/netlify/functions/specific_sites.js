require("dotenv").config();
const dbFunctions = require('./Database.js');

const connectionString = process.env.CONNECTION_STRING;
const pgp = require("pg-promise")();
const db = pgp(connectionString);


exports.handler = async function(event,context)
{
    context.callbacksWaitsForEmptyEventLoop = false;
    const sites = JSON.parse(event.body).sites
    const siteResponse = await dbFunctions.querySitesAndStates(db,sites)
    return dbFunctions.responseDetails(siteResponse)
}