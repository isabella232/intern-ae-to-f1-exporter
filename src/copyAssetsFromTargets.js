var path = require('path');
var child_process = require('child_process');

var async = require('async');
var fs = require('fs');

// var fse = require('fs-extra');


// this function is meant to receive parsed targets and to 
// copy all files to output folder
module.exports = function(targets, pathOutFolder, callback) {
  var commands = [];

  var pathAssetOutFolder = path.join(pathOutFolder, 'assets');

  if(!fs.existsSync(pathAssetOutFolder)) {
    fs.mkdirSync(pathAssetOutFolder); 
  }

  Object.keys(targets)
  .forEach(function(nameTarget) {
    var target = targets[ nameTarget ];
    var inFile = target.src.split('(').join('\\(').split(')').join('\\)');
    var outFile = path.join(pathAssetOutFolder, path.basename(inFile));

    console.log(inFile);

    if(inFile) {
      commands.push('cp ' + inFile + ' ' + outFile);  
    }
  }); 

  async.each(commands, child_process.exec, callback);
};