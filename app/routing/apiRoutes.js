//===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsList = require("../data/friends.js");

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
    res.json(friendsList);
  });

//Adding new friend entry
    app.post("/api/friends", function(req, res) {
        // req.body is available since we're using the body parsing middleware
        var newUserInput = req.body;
        var newUserScores = newUserInput.scores;
        var scoresArray = [];
        var friendCount =  0;
        var bestMatch = 0;

        for (var i = 0; i < friendsList.length; i++) {

            var scoresDiff = 0;
            for (var j = 0; j < newUserScores.length; j++) {
                scoresDiff += Math.abs(parseInt(friendsList[i].scores[j]) - parseInt(newUserScores[j]));
            }
            console.log("difference = " + scoresDiff);
            //push results into scoresArray
            scoresArray.push(scoresDiff);
        }

        //After all friends are compared, find best match
        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }

        //Add new friend
        friendsList.push(newUserInput);  
        //Send response
        res.json(friendsList[bestMatch]);

    });
};
