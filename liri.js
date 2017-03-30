var accessKeys = require("./keys.js");
var twitterR = require('twitter');
var spotify = require('spotify');
var request = require("request");
var fs = require("fs");
//var textFile = require("./random.txt");
var command = process.argv[2];
var record = "\n" + process.argv[2] + "," + process.argv[3]

function omdb(){
	function movieInfo(){
		request("http://www.omdbapi.com/?t="+movieTitle+"&r=json", function(error, response, body) {
		console.log("Title: " + JSON.parse(body).Title);
		console.log("Year: " + JSON.parse(body).Year);
		console.log("Rating: " + JSON.parse(body).Rated);
		console.log("Country: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Main Actors: " + JSON.parse(body).Actors);
		console.log("Rotten Tomatoes rating is: " + JSON.parse(body).Ratings);
		console.log("Rotten Tomatoes URL is: https://www.rottentomatoes.com/m/" + movieTitle);
		});
	};
	var movieTitle = process.argv[3];
	request("http://www.omdbapi.com/?t="+movieTitle+"&r=json", function(error, response, body) {
		if (response.statusCode === 200) {
			movieInfo();
//			fs.appendFile("random.txt", record);
		}
		else if (error) {
			movieTitle = "Mr. Nobody";
			console.log("There has been an error processing your request.  Here is information on Mr. Nobody");
			request("http://www.omdbapi.com/?t="+movieTitle+"&r=json", function(error, response, body) {
					movieInfo();
			});
		};
	});
};

function spotifySongs(){
	var songName = process.argv[3];
	spotify.search({ type: 'track', query: songName }, function(err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}
		else {
			console.log("Song: " + data.tracks.items[0].name);
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Preview URL: " + "<a href=" + data.tracks.items[0].preview_url + "></a>");
//			fs.appendFile("random.txt", record);
		};
	});
};

function twitter(){
	var client = new twitterR(accessKeys.twitterKeys);
	client.get('statuses/user_timeline.json?count=20', function(err, tweets, response) {
		if (!err) {
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text + "\n ---------------------");
			};
//			fs.appendFile("random.txt", record);
		}
		else {
			console.log("Error please retry...");
		};
	});
};

function doIt(){
	fs.readFile("random.txt", "utf8", function(err, data){
//		data = data.split(",");
		if (!err) {
			for (var i = 0; i < data.length; i++) {
				if (command == "movie-this") {
					omdb(data[i]);
				};
				if (command == "spotify-this-song") {
					spotifySongs(data[i]);
				};
				if (command == "my-tweets") {
					twitter(data[i]);
				};
				if (command == "do-what-it-says"){
					doIt(data[i]);
				};
			};
		};
	});
	 
};

if (command == "movie-this") {
	omdb();
};
if (command == "spotify-this-song") {
	spotifySongs();
};
if (command == "my-tweets") {
	twitter();
};
if (command == "do-what-it-says") {
	doIt();
};