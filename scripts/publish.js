const runCommand = require('./lib/runCommand.js');

(async () => {
  let result = await runCommand('npm', 'run', 'ls', 'buildDist');
  if (result === 1) {
    return;
  }

  result = await runCommand(
    'lerna',
    'version',
    '--conventional-commits',
    '-m',
    'chore(release): publish',
  );
  if (result === 1) {
    return;
  }

  await runCommand('lerna', 'publish', 'from-git');
})();
