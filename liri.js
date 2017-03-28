//var twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var accessKeys = require("./keys.js");
var command = process.argv[2];

function omdb(){
var movieTitle = process.argv[3];
	request("http://www.omdbapi.com/?t="+movieTitle+"&r=json", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("The movie's title is: " + JSON.parse(body).Title);
			console.log("The year the movie came out was: " + JSON.parse(body).Year);
			console.log("The movie's rating is: " + JSON.parse(body).Rated);
			console.log("The country where the movie was produced: " + JSON.parse(body).Country);
			console.log("The language of the movie is: " + JSON.parse(body).Language);
			console.log("The movie's plot is: " + JSON.parse(body).Plot);
			console.log("The movie's actors are: " + JSON.parse(body).Actors);
//			console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings);
//			console.log("The movie's Rotten Tomatoes URL is: " + JSON.parse(body));
//								https://www.rottentomatoes.com/m/get_out
		}
		else{
			movieTitle = "Mr. Nobody";
		}
});
};

function spotifySongs(){
	var songName = process.argv[3];
	spotify.search({ type: 'track', query: songName }, function(error, data) {
		if (error) {
			console.log('Error occurred: ' + error);
		}
		else {
			console.log("The name of the Artist is: " + data.name);
			console.log("The name of the song is: " + songName);
//			console.log("This is a link to a preview of the song: " + JSON.parse(body).Title);
//			console.log("This song is from the: " + JSON.parse(body).Album + " album");
		};
	});
};
/*
function twitter(){
var tweets = process.argv[3];
	client.get(path, params, callback);
	request("http://www.omdbapi.com/?t="+movieTitle+"&r=json", function(error, response, body, data) {
		if (!error && response.statusCode === 200) {
			
		}
});
};
*/
if (command == "movie-this") {
	omdb();
};
if (command == "spotify-this-song") {
	spotifySongs();
};
if (command == "my-tweets") {
	twitter();
};
if (command == "do-what-it-says"){

}