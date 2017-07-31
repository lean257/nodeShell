var fs = require('fs');
var chalk = require('chalk');
module.exports = {
  pwd: function(data, done){
    var output = process.env.PWD;
    done(output);
  },
  date: function(data, done){
    var dateNow = new Date().toString();
    done(dateNow);
  },
  ls: function(file, done) {
    var output = "";
    fs.readdir('.', function(err, files) {
      files.forEach(function(file) {
        output += file.toString() + "\n";
      })
      done(output);
    });
  },
  echo: function(data, done){
    if (data[0] !== '$') {
      done(data);
    } else {
      for (var prop in process.env) {
        // console.log(data, prop);
        if (data.slice(1) === prop) {
          done(process.env[prop]);
        }
      }
    }
  },
  cat: function(fileName, done){
    // fileName = `./${fileName}`;
    fs.readFile(fileName, 'utf-8', function(err, content){
      if (err) throw err;
      done(content);
    })
  },
  head: function(fileName, done){
    // fileName = `./${fileName}`;
    fs.readFile(fileName, 'utf-8', function(err, content){
      if (err) throw err;
      content = content.split('\n');
      done(content.slice(0,5).join('\n'));
    })
  },
  tail: function(fileName, done){
    fileName = `./${fileName}`;
    fs.readFile(fileName, 'utf-8', function(err, content){
      if (err) throw err;
      content = content.split('\n');
      done(content.slice(-6).join('\n'));
    })
  }
}
