exports.search_song = function(req, res) {

	var SpotifyWebApi = require('spotify-web-api-node');

		var name = req.params["name"];
		var song = req.params["song"];
		if(name == null) {
			name = req.body.name;
		}
		console.log("name: " + name);
		console.log("song: " + song);

	// var name = "pearl jam";
	// var song = "better man";
	// credentials are optional
	var spotifyApi = new SpotifyWebApi({
	  clientId : 'fc33a905e5eb4b48930beca47d2d0fa1',
	  clientSecret : '8e92510c66cf4a8e8fd23a67862d9c8e'
	});

	spotifyApi.searchTracks('track:' +song+ ' artist:' +name)
	  .then(function(data) {
			// console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
			// console.log(data.body.tracks.items);
			// console.log(data.body.tracks.items);
			console.log(data.body.tracks.items[0].preview_url);
			res.redirect(data.body.tracks.items[0].preview_url);
			// res.json(data.body.tracks.items[0].preview_url);
			// res.json(data.body.tracks.items);
			// res.(spotify:track:2B98ljvzqpCVgt5reTHq28);
			// data.body.tracks.items.id
		}, function(err) {
			// res.json(results);
			console.log('Something went wrong!', err);
	});

};