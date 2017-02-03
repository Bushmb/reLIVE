/* jshint esversion: 6 */

exports.search_artist = function(req, res) {

	const results = [];
	// const songList = [];
	const name = req.params["name"];
	if(name == null) {
		name = req.body.name;
	}
	// const url = "http://api.setlist.fm/rest/0.1/search/artists.json?artistName=" + name;
	const url = "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + name + "&api_key=87e75278c460e15fa3f27e38c480037a&format=json";
	const request = require("request");
	const async = require("async");
	request(url, function(error, response, body) {
		console.log(body);
		data = JSON.parse(body);
		// const artistList = data.artists.artist;
		const artistList = data.results.artistmatches.artist; 
		// console.log(artistList);

		async.eachSeries(artistList, function(artistList, callback) {
			const artistName = artistList["name"];
			const artistMbid = artistList["mbid"];
			const image = artistList["image"][2]["#text"];
			console.log(image);
			// const artistMbid = artistList["@mbid"];
			// const artistName = artistList["@name"];
			
			console.log('---------------------')
			console.log(artistMbid);		
			console.log('---------------------')
			if(artistMbid) {
				const artistInfo = { 
					"artistMbid": artistMbid,  
					"artistName":artistName,
					"image":image 
				};
				results.push(artistInfo);
			}
			// results.push(artistInfo);
			callback(null);
		},
		function(err) {
			// console.log(songList);
			res.render('search_results', {
			    pageTitle: 'EJS Demo',
			    results: results
			  });
			// res.json(results);
		});
	});
}
