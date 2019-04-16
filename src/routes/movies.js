var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router();

router.route('/')
    .get(function(req, res){
        //Get a list of all the movie files
        var videoFiles = getMovieFiles();

        //Send the random file
        res.header('Access-Control-Allow-Origin', '*');
        res.jsonp(
            {
                movies: videoFiles
            }
        );
    });


function getMovieFiles(){
    var filesToReturn = [];
    var dir = "../../../videos/Movies"
    function walkDir(currentPath) {
      var files = fs.readdirSync(currentPath);
      for (var i in files) {
        var curFile = path.join(currentPath, files[i]);      
        if (fs.statSync(curFile).isFile() && path.extname(curFile) == '.mp4') {
          filesToReturn.push(curFile.replace(dir, ''));
        } else if (fs.statSync(curFile).isDirectory()) {
         walkDir(curFile);
        }
      }
    };
    walkDir(dir);
    return filesToReturn;     
}

module.exports = router;
