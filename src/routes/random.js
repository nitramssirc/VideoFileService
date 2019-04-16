var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router();

router.route('/')
    .get(function (req, res) {
        //Get a list of all the video files
        var tvShows = getTVShows();

        //Choose a random tv show
        var randTVShowIndex = Math.floor(Math.random() * tvShows.length);
        var randTVShowFile = tvShows.length > 0 ? tvShows[randTVShowIndex] : "";

        var tvShowPath = "../../../videos/TV" + randTVShowFile;
        var episodes = getVideoFiles(tvShowPath);

        var randEpisodeIndex = Math.floor(Math.random() * episodes.length);
        var randEpisodeFile = episodes.length > 0 ? episodes[randEpisodeIndex] : "Could Not load show for " + randTVShowFile;

        //Send the random file
        res.header('Access-Control-Allow-Origin', '*');
        res.jsonp(
            {
                vidoefile: randTVShowFile + randEpisodeFile,
                videoCount: episodes.length
            }
        );
    });

function getTVShows() {
    var dir = "../../../videos/TV";
    var files = fs.readdirSync(dir);
    var filesToReturn = [];
    for (var i in files) {
        var curFile = path.join(dir, files[i]);
        if (fs.statSync(curFile).isDirectory()) {
            filesToReturn.push(curFile.replace(dir, ''));
        }
    }
    return filesToReturn;
}

function getVideoFiles(dir) {
    var filesToReturn = [];
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
