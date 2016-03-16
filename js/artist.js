exports.Artist = function(artistName) {
    this.artistName = artistName;
    this.genres = [];
    this.popularity = 0;
    this.artistHref = "";
    this.artistImages = [];
};

exports.Artist.prototype.matchGenre = function(Artist) {
    function isSame(genre) {
        return this.Artist.genre === artist.getArtist();
    }
    Artist = [Artist.genres].filter(isSame);
};

exports.Artist.prototype.addImages = function(images) {
    this.artistImages.push(images);
};

exports.Artist.prototype.getArtist = function() {
    var artistInfo = [];
    artistInfo.push(this.artistName);
    artistInfo.push(this.genres);
    artistInfo.push(this.popularity);
    artistInfo.push(this.artistHref);
    artistInfo.push(this.artistImages);
    return artistInfo;
};
