var fs = require('fs');
var chalk = require('chalk');
module.exports = {
  pwd: function(stdin, data, done){
    var output = process.env.PWD;
    done(output);
  },
  date: function(stdin, data, done){
    var dateNow = new Date().toString();
    done(dateNow);
  },
  ls: function(stdin, file, done) {
    var output = "";
    fs.readdir('.', function(err, files) {
      files.forEach(function(file) {
        output += file.toString() + "\n";
      })
      done(output);
    });
  },
  echo: function(stdin, data, done){
    if (data[0] !== '$') {
      done(data);
    } else {
      for (var prop in process.env) {
        if (data.slice(1) === prop) {
          done(process.env[prop]);
        }
      }
    }
  },
  cat: function(stdin, fileName, done){
    files = fileName.split(' ');
    var counter = 0;
    files.forEach(function(file){
      fs.readFile(file, 'utf-8', function(err, content){
        counter++;
        if (err) throw err;
        else done(content.toString());
        if (counter === files.length) { return;}
      })
    })
  },
  head: function(stdin, fileName, done){
    // fileName = `./${fileName}`;
    fs.readFile(fileName, 'utf-8', function(err, content){
      if (err) throw err;
      content = content.split('\n');
      done(content.slice(0,5).join('\n'));
    })
  },
  tail: function(stdin, fileName, done){
    fileName = `./${fileName}`;
    fs.readFile(fileName, 'utf-8', function(err, content){
      if (err) throw err;
      content = content.split('\n');
      done(content.slice(-6).join('\n'));
    })
  }
}
