module.exports.Artist = Artist;

function Artist() {
    this.id = "";
    this.name = "";
    this.genres = [];
    this.popularity = 0;
    this.href = "";
    this.images = [];
}

Artist.prototype.addImages = function(images) {
    this.images.push(images);
};

Artist.prototype.getArtist = function() {
    var artistInfo = [];
    artistInfo.push(this.name);
    artistInfo.push(this.genres);
    artistInfo.push(this.popularity);
    artistInfo.push(this.href);
    artistInfo.push(this.images);
    return artistInfo;
};
