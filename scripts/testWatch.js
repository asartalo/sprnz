/**
 * Because `mocha --watch` fails
 */
const chokidar = require('chokidar');
const { spawn } = require('child_process');

let runDebounceId;
function runTests() {
  clearTimeout(runDebounceId);
  runDebounceId = setTimeout(() => {
    process.stdout.write('\nRunning tests...');
    const cmd = spawn('npm', ['run', 'test'], { stdio: 'inherit' });
    cmd.on('close', code => {
      process.stdout.write(`Test exited with ${code}`);
    });
  }, 70);
}

chokidar.watch('./packages/**/*.js').on('all', runTests);
