const { loadPackages, iter } = require('lerna-script');
const editJsonFile = require('edit-json-file');
const { join } = require('path');
const runCommand = require('../lib/runCommand');
const scopeLog = require('./lib/scopeLog');

function babelCommand({
  env, src, dest, config,
}) {
  return ['babel', '--env-name', env, '--config-file', config, '--out-dir', dest, src];
}

async function buildDist(log) {
  const { info, error } = scopeLog(log, 'buildDist');
  const packages = await loadPackages();

  info('Building scripts for distribution');

  return iter.parallel(packages)(async lernaPackage => {
    info(lernaPackage.location);

    const libPath = join(lernaPackage.location, 'lib');
    const cjsPath = join(lernaPackage.location, 'cjs');
    const esPath = join(lernaPackage.location, 'es');
    const config = join(lernaPackage.rootPath, 'babel.config.json');

    try {
      await runCommand(
        ...babelCommand({
          env: 'cjs',
          src: libPath,
          dest: cjsPath,
          config,
        }),
      );
      await runCommand(
        ...babelCommand({
          env: 'es',
          src: libPath,
          dest: esPath,
          config,
        }),
      );
    } catch (e) {
      error(e);
      return;
    }

    // Add package.json to cjs directory
    const filePath = join(cjsPath, 'package.json');
    await runCommand('touch', filePath);
    const cjsPackageJson = editJsonFile(filePath);
    cjsPackageJson.set('type', 'commonjs');
    cjsPackageJson.save();
  });
}

module.exports = buildDist;
