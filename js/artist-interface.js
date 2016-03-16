var artist = require('./../js/artist.js');
var spotifyKey = require('./../.env').spotifyKey;
var echoNestKey = require('./../.env').echoNestKey;


$(document).ready(function() {
  var artistId = "";

  $('#enter').click(function() {
    var artistName = $('#artistName').val();
    $('#artistName').val("");
    var newartist = new artist.Artist(artistName);
    findSpotifyId();

    function findSpotifyId() {
      $.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist').then(function(response) {
        //display reponse on page
        console.log(response);
        artistId = response.artists.items[0].id;
        console.log("artistId:" + artistId);
        findSimilarArtists();
       });
     }

    function findSimilarArtists() {
    $.get('http://developer.echonest.com/api/v4/artist/similar?api_key=' + echoNestKey +  '&id=spotify:artist:' + artistId + '&bucket=id:spotify').then(function(response) {
      //display reponse on page
      console.log(response);
    });
  }
  });
});
