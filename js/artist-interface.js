var artist = require('./../js/artist.js');
var spotifyKey = require('./../.env').spotifyKey;
var echoNestKey = require('./../.env').echoNestKey;


$(document).ready(function() {
  $('#enter').click(function() {
    $('.band-group').remove();
    var artistName = $('#artistName').val();
    var newArtist = new artist.Artist();
    findSpotifyId();

    function findSpotifyId() {
      $.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist').then(function(response) {
        console.log(response);
        var artist = response.artists.items[0];
        $.extend( true, newArtist, artist );
        $('#top-text').html('<h2>Artists similar to ' + JSON.stringify(newArtist.name) +'</h2>' )
        findSimilarArtists();
        console.log(newArtist);
      });
    }

    function findSimilarArtists() {
      var similarIds = [];
      $.get('http://developer.echonest.com/api/v4/artist/similar?api_key=' + echoNestKey +  '&id=spotify:artist:' + newArtist.id + '&bucket=id:spotify').then(function(response) {
        console.log(response);
        for (var i = 0; i < response.response.artists.length; i++) {
          var id = response.response.artists[i].foreign_ids[0].foreign_id;
          var idSlice = id.slice(15);
          similarIds.push(idSlice);
          idString = similarIds.join(',');
        }
        getSimilarArtistImgs(idString);
        console.log(idString);
      });
    }

    function getSimilarArtistImgs(idString) {
      $.get('https://api.spotify.com/v1/artists/?ids=' + idString).then(function(response) {
        console.log(response);
        for (var i = 0; i < response.artists.length; i++) {
          var name = response.artists[i].name;
          var pic = response.artists[i].images[0].url;
          $('#results').append('<div class=\"band-group\"><h3>' + name + '</h3>' + '<img src=' + pic + '></div>');
        }
      });
    }
  });
});
