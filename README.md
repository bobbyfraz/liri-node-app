# liri-node-app

## Description
The Liri Node App will take in git/bash commands while using node.js and either
display your latest tweets, song information when a 
title of a song is typed in, or movie information when a movie title is inputed.

The Liri Node App will also record the information displayedin a seperate text file called records.txt.

## How it works
Users will have four options to choose from when when usine the git/bash command line.

The first is `node liri.js my-tweets` which will display the last 20 tweets from 
your twitter account.

The second is `node liri.js spotify-this-song "beat it"`. This command will take two arguments with
the last being the song title. It must be wrapped in single quotes in order to process the spaces properly.


The third command is: `node liri.js movie-this "toy story"`. Similar to the spotify command, when entering
a movie title place it between single or double quotes.

Finally the final command: `node liri.js do-what-it-says` will read a text file called `random.txt`
and execute the command listed to the console.