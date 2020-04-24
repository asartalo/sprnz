const fs = require('fs');
const { join } = require('path');
const runCommand = require('./lib/runCommand.js');

const scriptName = Array.from(process.argv).pop();
const packageName = `@sprnz/${scriptName}`;

(async () => {
  console.log(`Creating package ${packageName}`);
  let result = await runCommand('lerna', 'create', packageName);
  if (result !== 0) {
    return;
  }
  result = await runCommand('npm', 'run', 'ls', 'initializePackage', packageName);
  if (result !== 0) {
    return;
  }

  // Prepare test file for conversion to esm
  const testFilePath = join(
    __dirname,
    '..',
    'packages',
    scriptName,
    '__tests__',
    `${scriptName}.test.js`,
  );

  let testFile = fs.readFileSync(testFilePath, { encoding: 'utf8' });
  testFile = `${testFile}`.replace(/'..'/, `'../lib/${scriptName}.js'`);
  fs.writeFileSync(testFilePath, testFile);

  result = await runCommand(
    'cross-env',
    'BABEL_ENV=es',
    'babel',
    `./packages/${scriptName}`,
    '--out-dir',
    `./packages/${scriptName}`,
  );

  await runCommand('eslint', '--fix', `./packages/${scriptName}/**/*.js`, { stdio: 'ignore' });
})();
