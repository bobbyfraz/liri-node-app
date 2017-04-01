var fs = require("fs");
var Twitter = require('twitter');
var accessKeys = require('./keys.js');
var spotify = require("spotify");
var request = require("request");

var command = process.argv[2];
var argument2 = process.argv[3];

var client = new Twitter(accessKeys.twitterKeys);

function spotifySong() {
	spotify.search({ type: "track", query: argument2 }, function(err, data) {
		if (!err) {
			fs.appendFile("records.txt", "\n" + "NEW DATA" + "-------"+ '\n', function(err) {
				if (err) {
					console.log(err);
				}
			});

				var infoData = ["Artist: " + data.tracks.items[0].artists[0].name, "Song Name: " + data.tracks.items[0].name, 
				"Album Name: " + data.tracks.items[0].album.name, "Preview URL: " + data.tracks.items[0].preview_url];
				for (var i = 0; i < infoData.length; i++) {
					console.log(infoData[i]);
					fs.appendFile("records.txt", infoData[i] + "\n", function(err) {
						if (err) {
							console.log(err);
						}
					});
			};
		}
		else {
			console.log('Error occurred: ' + err);
			return;
		};
	});
};

function myTweets() {
	client.get('statuses/user_timeline.json?count=20', function(error, tweets, response) {
		if (!error) {
			fs.appendFile("records.txt", "\n" + "NEW DATA" + "-------" + "\n", function(err) {
				if (err) {
					console.log(err);
					}
			});
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text + "\n -------");
				fs.appendFile("records.txt", tweets[i].text + "\n", function(err) {
					 if (err) {
						console.log(err);
						}
				});
			};
		}
		else {
			throw error;
		}
	});
};

function movieOmdb() {
	request("http://www.omdbapi.com/?t=" + argument2 + "&y=&plot=short&r=json", function(error, response, body) {
		argument2 = argument2.split(' ').join('_');
		if (!error && response.statusCode === 200) {
			fs.appendFile("records.txt", "\n" + "NEW DATA" + "-------" + "\n", function(err) 
			{
				if (err) {
					console.log(err);
					}
			});
			var infoData = ["* Title: " + JSON.parse(body).Title, "* Year: " + JSON.parse(body).Year, "* IMDB Rating: " + JSON.parse(body).imdbRating,
				"* Country: " + JSON.parse(body).Country, "* Language: " + JSON.parse(body).Language, 
				"* Plot: " + JSON.parse(body).Plot, "* Actors: " + JSON.parse(body).Actors, "* Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
				"* Rotten Tomatoes URL: https://www.rottentomatoes.com/m/" + argument2];

			for (var i = 0; i < infoData.length; i++) {
				console.log(infoData[i]);
				fs.appendFile("records.txt", infoData[i] + "\n", function(err) {
					if (err) {
						console.log(err);
					}
				});
			}
		};
	});
};

function app() {
	if (command === "spotify-this-song") {
		spotifySong();
	};

	if (command === "my-tweets") {
		myTweets();
	};

	if (command === "movie-this") {
		movieOmdb();
	}

	if (command === "do-what-it-says") {
		fs.readFile("random.txt", "utf8", function(error, data){
			var recordedData = data.split(",", 2);
			command = recordedData[0];
			argument2 = recordedData[1];
			app();
		});
	};
};

app();