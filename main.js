let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
let request = require("request");
let cheerio = require("cheerio");
let scoreCardObj=require("./scorecard");
console.log("before");

// data extract
request(link, cb);

function cb(error, response, html) {
    if (error) {
        console.log(error); //print the error if one occured
    }
    else if (response.statusCode == 404) {
        console.log("Page Not Found")
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

    let anchorRep = searchTool('a[data-hover="View All Results"]');
    let url = anchorRep.attr("href");
    // console.log("link",url)
    let fullAllmatchPageLink = `https://www.espncricinfo.com${url}`;
    // console.log(fullAllmatchPageLink);

    request(fullAllmatchPageLink, allmatchpageCb);
}

// go to all match page

function allmatchpageCb(error, response, html) {
    if (error) {
        console.log(error); //print the error if one occured
    }
    else if (response.statusCode == 404) {
        console.log("Page Not Found")
    }
    else {
        console.log(html); //print the HTML  for the request made
        // console.log("html",);
        getAllScorecardLink(html);
    }
}

// data extracting
/* my method
function getAllScorecardLink(html) {
    let searchTool = cheerio.load(html);
    // css selector
    let scoreCardArr = searchTool('a[data-hover="Scorecard"]');
    for (let i = 0; i < scoreCardArr.length; i++) {
        let link = searchTool(scoreCardArr[i]).attr("href");
        let fullScoreCardUrl = `https://www.espncricinfo.com${link}`;

        console.log("ScorecardURL",fullScoreCardUrl);
    }
    

    // console.log(fullScoreCardUrl);
    // request(fullScoreCardUrl, ncb)
}*/

function getAllScorecardLink(html) {
    console.log("```````````````````````````````````````````````");
    let searchTool = cheerio.load(html);
    let scorecardsArr = searchTool(`a[data-hover="Scorecard"]`);
    for (let i = 0; i < scorecardsArr.length; i++) {
        let link = searchTool(scorecardsArr[i]).attr("href");
        let fullAllmatchpagelink = `https://www.espncricinfo.com${link}`;
        console.log("ScorecardURL", fullAllmatchpagelink);
        scoreCardObj.processSinglematch(fullAllmatchpagelink);
    }
  console.log("-----------------------------------------");
}
