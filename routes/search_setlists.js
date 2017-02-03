/* jshint esversion: 6 */

exports.search_setlists = function(req, res) {

	const results = [];
	const songList = [];
	const mbid = req.params["mbid"];
	if(mbid === null) {
		mbid = req.body.mbid;
	}
	const url = "http://api.setlist.fm/rest/0.1/search/setlists.json?artistMbid=" + mbid;
	const request = require("request");
	const async = require("async");
	request(url, function(error, response, body) {
		
		if(!body.includes('not found')) {
			const data = JSON.parse(body);

			const setlist = data.setlists.setlist;

			async.eachSeries(setlist, function(setlist, callback) {
				const id = setlist["@id"];
				const eventDate = setlist["@eventDate"];
				const venueName = setlist.venue["@name"];
				const artistName = setlist.artist["@name"];
				const artistMbid = setlist.artist["@mbid"];
				const sets = setlist.sets.set;
				// const songs = setlist.sets.set.song;
				// console.log(venueName);
				console.log('---------------------')
				let songs

				if(sets) {
					// if its an array
					if (Array.isArray(sets)) {
						songs = sets.reduce(function(arr, set){
							// map over all songs and return song name
							if(Array.isArray(set.song)) {
								const songArray = set.song.map(function(song) {
									return song["@name"];
								});
								arr = arr.concat(songArray);							
							}
							return arr;				
						}, []);
					}
					// else its an object
					else if (typeof sets == 'object') {
						// console.log(sets.song);
						// if sets.song is an array
						if(Array.isArray(sets.song)) {
							songs = sets.song.reduce(function(arr, song){
								arr.push(song["@name"]);
								return arr;
							}, []);
						}
						else {
							songs = sets.song["@name"];
							console.log("SONGS!!!",songs)
						}
						// else we jsut the single song
						
					}

					// console.log("SONGS", songs)
					// <ul>
						// <li data-song="song-name" data-artist="artist-name">info about song</li>
				}
				
				console.log('---------------------')
				// async.eachSeries(songs, function(song, callback){
				// 	songList.push(song["@name"]);
				// 	callback(null);
				// });
				const setlistInfo = { 
					"id": id, 
					"eventDate":eventDate, 
					"venueName":venueName,  
					"artistName":artistName, 
					"artistMbid":artistMbid,
					"songs":songs
				};
				results.push(setlistInfo);
				callback(null);
			},
			function() {
				// console.log(songList);
				// console.log(err);
				console.log("HELLLOOOO!!!!!")

				res.render('setlist_results', {
				    pageTitle: 'Setlists',
				    results: results
				});

				// res.json(results);
			});
		}
		else {
			res.send("not found")
		}
		
	});
}
