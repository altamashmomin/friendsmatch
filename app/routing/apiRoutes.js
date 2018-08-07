// pull dependencies
var path = require("path");

// import list of friend entries
var friends = require("../data/friends.js");

// exporting api routes
module.exports = function(app) {

	// total list of friends
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	// adding new friend
	app.post("/api/friends", function(req, res) {

        //set a big value to compare 
		var totalDifference = 1000; 

        // best friend match
		var matchName = "";
        var matchImage = "";

		// Capture the user input object
		var userInput = req.body;

        var userResponses = userInput.scores;

        //looks at all the friends in the array and calculate difference for each question
        for (var i = 0; i < friends.length; i++) {
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			//if lowest difference, then match
			if (diff < totalDifference) {
                matchName = friends[i].name;
				matchImage = friends[i].photo;
				totalDifference = diff;
			}
		}

		// add the new user
		friends.push(userInput);

		// sends response
		res.json({status: "OK", matchName: matchName, matchImage: matchImage});
	});
};
