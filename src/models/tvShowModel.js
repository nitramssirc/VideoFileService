class tvShowModel {
    name;
    constructor(name){
        this.name = name;
    }
}

export var tvShowModelFactory= {
    create: function (filename){
        //Split the filename by "/" the show name will be at index 1
        var splitFilename = filename.split("/");
        return new tvShowModel(splitFilename[1]);
    }
};