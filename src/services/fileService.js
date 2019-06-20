var fs = require("fs");
var path = require("path");

var fileservice = {
  /**
   * Gets the file names of all the files in the given directory
   * optionally only including files of a given file ext and can include just the files in the
   * directory or include subdirectories as well
   * @param {*} dirPath path of the directory to get the files from
   * @param {*} fileExt if set, only files with this extension will be returned
   * @param {*} includeSubDirectories if true, all files included in subdirectories will be included
   */
  getFilesInDirectory: function(
    dirPath,
    fileExt,
    includeSubDirectories = true
  ) {
    var filesToReturn = [];

    //Get all the files in the directory
    var files = fs.readdirSync(dirPath);

    //loop through each file
    for (var i in files) {
      var curFile = path.join(dirPath, files[i]);

      //Is this a file and does it have our file extension if we are looking for one
      if (
        fs.statSync(curFile).isFile() &&
        (!fileExt || path.extname(curFile) == fileExt)
      ) {
        //Yes, include the file
        filesToReturn.push(files[i]);
      }
      //No, are we including subdirectories and if so, is this a directory?
      else if (includeSubDirectories && fs.statSync(curFile).isDirectory()) {
        //Yes, get the files from the directory
        var subdir = path.join(dirPath, files[i]);
        var subdirectoryFiles = this.getFilesInDirectory(subdir, fileExt, includeSubDirectories);

        //Add the files to the return list
        subdirectoryFiles.forEach(subFile => {
          filesToReturn.push(path.join(files[i], subFile));
        });
      }
    }

    return filesToReturn;
  }
};

module.exports = fileservice;
