var getCompositions = require('../../src/util/getCompositions');
var getStateNamesFromComp = require('../../src/util/getStateNamesFromComp');
var getTargetName = require('../../src/util/getTargetName');
var path = require('path');

module.exports = function(jsonAE) {
  var compositions = getCompositions(jsonAE);
  var compIdx = 0;
  var getName;
  var html;
  var composition;
  var fileName;

  while((composition = compositions[ compIdx ]) && !fileName) {
    fileName = getStateNamesFromComp(composition);
    compIdx++;
  }

  if(composition) {
    getName = getTargetName(composition.layers);

    composition.layers.forEach(function(layer, i) {
      if(layer.source) {
        addToHTMLFromSource(layer, i);  
      }
    });
  }

  var styleContainer = [
    'width: ' + composition.width + 'px',
    'width: ' + composition.height + 'px',
    'perspective: 1000px'
  ];

  return html && "'<div style=\"" + styleContainer.join('; ') + "\">' +\n" +
    html
    .map(function(tag) {
      return "    '" + tag + "' +\n";
    })
    .join('') +
  "  '</div>'";

  function addToHTMLFromSource(layer, i) {
    html = html || [];

    switch(path.extname(layer.source).toLowerCase()) {
      case '.jpg':
      case '.png':
      case '.gif':
        html.push(
          '<img ' + 
          'data-f1="' + getName(i) + '" ' +
          'src="\' + opts.assetPath + \'' + path.basename(layer.source)  + '" ' + 
          'width="' + layer.width  + '" ' + 
          'height="' + layer.height  + '" ' + 
          'style="position: absolute; left: 0px; top: 0px;" ' +
          ' />'
        );
      break;
    }
  }
};