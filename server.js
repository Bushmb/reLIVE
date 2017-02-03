/* jshint esversion: 6 */
/* UPDATED VERSION */

const express = require('express');
const bodyParser = require('body-parser');
const search_artist = require('./routes/search_artist');
const search_setlists = require('./routes/search_setlists');
const search_song = require('./routes/search_song');

const app = express();

// Using the .html extension instead of
// having to name the views as *.ejs
app.engine('.html', require('ejs').__express);
 
// Set the folder where the pages are kept
app.set('views', __dirname + '/views');
 

// This avoids having to provide the 
// extension to res.render()
app.set('view engine', 'html');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/search/:name', search_artist.search_artist);
app.get('/setlist/:mbid', search_setlists.search_setlists);
app.get('/setlist/:name/:song', search_song.search_song);


app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));

exports.app = app;
