var commands = require('./commands');
var chalk = require('chalk');
const prompt = chalk.blue('\nprompt > ');
var cmdGroups;
// Output a prompt
process.stdout.write(prompt);
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  cmdGroups = data.toString().trim().split(/\s*\|\s*/g); // separate by pipe
  const unsafeCommands = getUnsafeCommands(cmdGroups);
  if (unsafeCommands.length) {
    process.stderr.write(chalk.red('command(s) not found: ' + unsafeCommands.join(' ')));
    cmdGroups = [];
    done('');
  } else {
    execute(cmdGroups.shift());
  }
});

function getUnsafeCommands (cmdStrings) {
  return cmdStrings
  .map(cmdString => cmdString.split(' ')[0]) // remove arguments (ES6 arrow)
  .filter(cmd => !commands[cmd]); // filter down to unsafe commands
}

function execute (cmdGroup, lastStdout) {
  const tokens = cmdGroup.toString().trim().split(' '); // separate this cmd and its args
  const cmd = tokens[0];
  const args = tokens.slice(1).join(' ');
  commands[cmd](lastStdout, args, done); // where the magic happens
}

// handle result of a command (async cannot `return`, only call more funcs)
function done (stdout) {
  if (cmdGroups.length) {
    execute(cmdGroups.shift(), stdout); // execute the next command-arg set
  } else {
    process.stdout.write(stdout + prompt);
  }
}
