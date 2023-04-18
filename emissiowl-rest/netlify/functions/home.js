require("dotenv").config();
const dbFunctions = require("./Database.js");

const connectionString = process.env.CONNECTION_STRING;
const pgp = require("pg-promise")();
const db = pgp(connectionString);





exports.handler = async function(event,context)
{
    context.callbacksWaitsForEmptyEventLoop = false;
    let cities = await dbFunctions.getCities(db);
    let states = await dbFunctions.getStates(db);
    let siteNames = await dbFunctions.getSiteNames(db);
    const query = JSON.parse(event.body).query;
    let choiceSplit = query.split(",");
    var response = undefined
    choiceSplit = choiceSplit.map((item) => item.trim());
    if(choiceSplit.length == 2)
    {
        response = await dbFunctions.queryCityAndState(db,choiceSplit[0],choiceSplit[1])
        return dbFunctions.responseDetails(response);
    }
    else
    {
        if(siteNames.includes(query.trim()))
        {
            response = await dbFunctions.querySiteName(db,query.trim());    
            return dbFunctions.responseDetails(response);
        }
        if(states.includes(query.trim()))
        {
            response = await dbFunctions.queryState(db,query.trim());
            return dbFunctions.responseDetails(response);
        }
        if(cities.includes(query.trim()))
        {
            response =  await dbFunctions.queryCity(db,query.trim());
            return dbFunctions.responseDetails(response);
        }
        else
        {
            return dbFunctions.responseDetails({message:"Invalid choice"})
        }
    }
}