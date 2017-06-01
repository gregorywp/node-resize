var sharp = require('sharp');
var fs = require('fs');

module.exports = function (url, size, hash, callback) {

  var d = new Date();
  
  var newFilePath = 'images/'+hash+'.png';
  var fullNewPath = 'http://dev.gregoryprill.com/images/' + hash + '.png';

  if(fs.existsSync(newFilePath)){
    callback(fullNewPath);
  } else {
      //get original file
      var request = require('request').defaults({ encoding: null });
      request.get(url, function (err, res, body) {
          sharp(body)
          .resize(size.width,size.height)
          .toFile(newFilePath, (err, info) => {
              if(err){
                callback(err);
              } else {
                callback(fullNewPath);
              }
          });
      });
  }
};