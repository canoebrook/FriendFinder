// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var ffData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    console.log(ffData);
    res.json(ffData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a survey data... this data is then sent to the server...
  // Then the server saves the data to the ffData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
      var scrArr    = req.body.scores;
      var lScrArr   = scrArr.length;
      var totalDiff = scrArr.length*scrArr.length; // A large starting value
      var resName   = "";
      var resPhoto  = "";
      // Loop thru array and compare array totals and get closest match
      for(i=0; i< ffData.length; i++) {
        // console.log(ffData[i].scores);
        // console.log(ffData[i].name);
        // console.log("************");
        var diff      = 0;
        for(j=0; j<lScrArr; j++) {
           diff += Math.abs(parseInt(scrArr[j])-parseInt(ffData[i].scores[j]));
        }
        if (diff <= totalDiff) {
           resName   = ffData[i].name;
           resPhoto  = ffData[i].photo;
           totalDiff = diff;
        }
      }
      // console.log(req.body.scores);
      // console.log(resName);
      // console.log(resPhoto);
      // console.log(totalDiff);
  

      ffData.push(req.body);
      res.json({name : resName,
                photo: resPhoto});
  });

  
};
