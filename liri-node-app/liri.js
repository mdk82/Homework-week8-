var node = process.argv;
var apiSelect = process.argv[2];
var fs = require("fs");
var allKeys = require("./keys.js");

// Node argument to select which api to run //
// ======================================== //

if (apiSelect === "my-tweets") {
    topTweets();
}
else if (apiSelect === "spotify-this-song") {
    spotify();
}
else if (apiSelect === "movie-this") {
    movie();
}
else if (apiSelect === "do-what-it-says") {

} else {
    console.log("Error: Not Valid Input");
};


//console.log(allKeys);

// Twitter function to get the top 20 tweets from a user //
// ===================================================== //

function topTweets() {
const Twitter = require("twitter")
console.log(allKeys);

var tweet = new Twitter({
    consumer_key: allKeys.twitter.consumer_key,
    consumer_secret: allKeys.twitter.consumer_secret,
    consumer_token_key: allKeys.twitter.access_token,
    consumer_token_secret: allKeys.twitter.access_token_secret
});

var params = {
    screen_name:'Haukter1',
    count: 20,
    exclude_replies: true,
    tweet_mode: 'extended'
};

tweet.get("statuses/user_timeline/", params, function(error, tweets, response) {
    if (error) {
        console.log("Error: Something is wrong");
    }

    for (var i = 1; i < tweets.length; i++) {
        console.log(tweets[i].full_text);
    }
});

// console.log(tweet);

};

// Spotify function to get song info from song name //
// ================================================ //

function spotify() {

    var Spotify = require("node-spotify-api")

    var spotify = new Spotify({
        id: allKeys.spotifykeys.client_id,
        secret: allKeys.spotifykeys.client_secret
    })

    // console.log(spotify);
    songName = process.argv[3]

    if (!songName) {
        songName = "Evenflow";
    }

    spotify.search({ type: 'track', query: songName}, function(error, data) {
        if (error) {
            console.log("Error: Something is wrong" + error)
        }

        // console.log(data.tracks.items[0]);

            console.log(
            data.tracks.items[0].album.artists[0].name + '\n' + 
            data.tracks.items[0].album.name + '\n' + 
            data.tracks.items[0].name + '\n' + 
            data.tracks.items[0].external_urls.spotify
            ); 

    });

};

// Movie function
// ======================================= //

function movie() {

var request = require('request')

// console.log(request);

var movieSearch = process.argv[3];

    if (!movieSearch) {
        movieSearch = "jumanji"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            // console.log(JSON.parse(body));
            var movieObject = JSON.parse(body);

            // console.log(
            // JSON.parse.body +
            // JSON.parse.body.title + 
            // JSON.parse.body.year + 
            // JSON.parse.body.imbdRating + 
            // JSON.parse.body.country + 
            // JSON.parse.body.actors 
            // )

            console.log(
                movieObject.title +
                movieObject.year +
                movieObject.imdbRating +
                movieObject.tomatoRating +
                movieObject.Country +
                movieObject.Language +
                movieObject.Actors +
                movieObject.Plot
            )
        }

    });


}