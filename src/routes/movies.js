var express = require('express');
var fileservice = require('../services/fileService');
var movieModelFactory = require('../models/movieModel');

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
    var dir = "../../../videos/Movies"
    var files = fileservice.getFilesInDirectory(dir, ".mp4", true);
    var movies = [];
    files.forEach(file => {
      movies.push(movieModelFactory.create("/" + file));//Need to add movies back in but I'm tired and this will get it working
    });
    return movies;
}



module.exports = router;
