const { spawn } = require('child_process');

function runCommand(command, ...args) {
  let options = { stdio: 'inherit' };
  if (args.length > 0 && typeof args[args.length - 1] === 'object') {
    options = { ...options, ...args.pop() };
  }
  return new Promise(resolve => {
    const cmd = spawn(command, args, options);
    cmd.on('close', resolve);
  });
}

module.exports = runCommand;
