var videoModel = require("./videoModel");

class movieModel extends videoModel {}

var movieModelFacotry = {
  create: function(filename) {
    //Get rid of any leading directories and trim the file ext
    var dirTrimmed = filename.split("/").pop();
    var displayName = dirTrimmed.slice(0, dirTrimmed.length-4);
    return new movieModel(displayName, filename);
  }
};

module.exports = movieModelFacotry;