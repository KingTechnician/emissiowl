



async function getStates(db)
{
    let result = db.any('SELECT "State" FROM states')
    let data = await result.then(data => data);
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data.map((state) => state.State);
}

async function queryState(db,state)
{
    let result = db.any('SELECT * FROM states WHERE "State" = $1',[state])
    let data = await result.then(data=>data);
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

async function getCities(db)
{
    let result = db.any('SELECT DISTINCT "City" FROM pollutionsite')
    let data = await result.then(data => data);
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data.map((city) => city.City);
}

async function queryCity(db,city)
{
    let result = db.any('SELECT * FROM pollutionsite WHERE "City" = $1',[city])
    let data = await result.then(data=>data);
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

async function queryCityAndState(db,city,state)
{
    let result = db.any('SELECT * FROM pollutionsite WHERE "City" = $1 AND "State"=$2',[city,state])
    let data = await result.then(data=>data);
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

async function getSiteNames(db)
{
    let result = db.any('SELECT "SiteName" FROM pollutionsite')
    let data = await result.then(data => data);
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data.map((site) => site.SiteName);
}

async function querySiteName(db,siteName)
{
    let result = db.any('SELECT * FROM pollutionsite WHERE "SiteName" = $1',[siteName])
    let data = await result.then(data=>data);
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

function requestHeaders()
{
    return{
        "content-type":"application/json",
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true,
        "Access-Control-Allow-Methods":"GET,POST",
        "Access-Control-Allow-Headers":"Content-Type"
    }
}

async function responseDetails(message)
{
    return{
        statusCode:200,
        headers: requestHeaders,
        body: JSON.stringify(message)
    }
}

module.exports = {getStates,getCities,getSiteNames,queryCity,querySiteName,queryState,queryCityAndState,requestHeaders,responseDetails}
