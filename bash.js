var commands = require('./commands');
var chalk = require('chalk');

// Output a prompt
process.stdout.write(chalk.yellow('prompt > '));
var done = function(output) {
  console.log(chalk.green(output));
  process.stdout.write('prompt > ');
}
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  data = data.toString().trim();
  var arrArgs = data.split(' ');
  var cmd = arrArgs[0];
  var args = arrArgs.slice(1).join(' ');
  // if (!commands[cmd](args)) { process.stdout.write(chalk.red('Please check your input'));
  // process.stdout.write(chalk.yellow('\nprompt > ')); }
  commands[cmd](args, done);
});
