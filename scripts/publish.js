const runCommand = require('./lib/runCommand.js');

(async () => {
  let result = await runCommand('npm', 'run', 'ls', 'bildDist');
  if (result === 0) {
    return;
  }

  result = await runCommand(
    'lerna',
    'version',
    '--conventional-commits',
    '-m',
    'chore(release): publish',
  );
  if (result === 0) {
    return;
  }

  await runCommand('lerna', 'publish', 'from-git');
})();
