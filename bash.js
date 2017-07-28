var commands = require('./commands');
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  commands[cmd]();
  // if (cmd === 'pwd') {
  //   process.stdout.write(process.env.PWD);
  // }
  //
  // if (cmd === 'date'){
  //   var dateNow = new Date().toString();
  //   process.stdout.write(dateNow)
  // }

});
