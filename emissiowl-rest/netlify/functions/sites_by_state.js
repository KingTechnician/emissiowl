require("dotenv").config();
const dbFunctions = require("./Database.js");

const connectionString = process.env.CONNECTION_STRING;
const pgp = require("pg-promise")();
const db = pgp(connectionString);


exports.handler = async function(event,context)
{
    context.callbacksWaitsForEmptyEventLoop = false;
    let sites = await dbFunctions.sitesByState(db);
    return dbFunctions.responseDetails({message:sites})
}