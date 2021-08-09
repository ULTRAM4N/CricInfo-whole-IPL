// let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
console.log("before");

function processSinglematch(url) {
    request(url, cb)
}

// data extract
// request(link, cb);

function cb(error, response, html) {
    if (error) {
        console.log(error); //print the error if one occured
    }
    else if (response.statusCode == 404) {
        console.log("Page Not Found");
    }
    else {
        // console.log(html); //print the HTML  for the request made
        // console.log("html",);
        dataExtractor(html);
    }
}

function dataExtractor(html) {
    let searchTool = cheerio.load(html);
    // css selector
    let bothInningArr = searchTool(".Collapsible");
    let scoreCard="";
    for (let i = 0; i < bothInningArr.length; i++) {
        // scoreCard=searchTool(bothInningArr[i]).html();
        let teamNameElem = searchTool(bothInningArr[i]).find("h5");
        let teamname = teamNameElem.text();
        // console.log(teamname);
        teamName = teamname.split("INNINGS")[0];
        // console.log(teamName);
        teamName = teamName.trim();
        console.log(teamName);
        let batsManTableBodyAllRows = searchTool(bothInningArr[i]).find(".table.batsman tbody tr");
        // console.log(batsManTableBodyAllRows.length)
        // type cohersion loops -> 
        for (let j = 0; j < batsManTableBodyAllRows.length; j++) {
            let numberofTds = searchTool(batsManTableBodyAllRows[j]).find("td");
            // console.log(numberofTds.length);
            if (numberofTds.length == 8) {
                // console.log("You are valid")
                let playerName = searchTool(numberofTds[0]).text();
                let runs=searchTool(numberofTds[2]).text().trim();
                let balls=searchTool(numberofTds[3]).text().trim();
                let fours=searchTool(numberofTds[5]).text().trim();
                let sixes=searchTool(numberofTds[6]).text().trim();
                let sr=searchTool(numberofTds[7]).text().trim();

                console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
            }
        }
        console.log("``````````````````````````````````````")
        // fs.writeFileSync(`innning${i + 1}.html`, scoreCard);

    }
    // // players name
}
module.exports = {
    processSinglematch
}


