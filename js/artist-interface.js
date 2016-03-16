var artist = require('./../js/artist.js');
var spotifyKey = require('./../.env').spotifyKey;
var echoNestKey = require('./../.env').echoNestKey;


$(document).ready(function() {
  $('#enter').click(function() {
    var artistName = $('#artistName').val();
    $('#artistName').val("");
    var newArtist = new artist.Artist();
    findSpotifyId();

    function findSpotifyId() {
      $.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist').then(function(response) {
        //display reponse on page
        console.log(response);
        artist = response.artists.items[0];
        findSimilarArtists();
        $.extend( newArtist, artist );
        console.log(newArtist)
       });
     }

    function findSimilarArtists() {
      var similarArtists = [];
    $.get('http://developer.echonest.com/api/v4/artist/similar?api_key=' + echoNestKey +  '&id=spotify:artist:' + artist.id + '&bucket=id:spotify').then(function(response) {
      for (var i = 0; i < response.response.artists.length; i++) {
        similarArtists.push(response.response.artists[i].name);
      }
      return similarArtists;
      //display reponse on page
      console.log(similarArtists);
    });
  }
  });
});
