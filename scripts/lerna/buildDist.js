const { loadPackages, iter } = require('lerna-script');
const { join } = require('path');
const runCommand = require('../runCommand');
const scopeLog = require('./scopeLog');

function babelCommand({
  env, src, dest, config,
}) {
  return ['babel', '--env-name', env, '--config-file', config, '--out-dir', dest, src];
}

async function buildDist(log) {
  const { info, error } = scopeLog(log, 'buildDist');
  const packages = await loadPackages();

  info('Building scripts for distribution');

  return iter.parallel(packages)(lernaPackage => {
    info(lernaPackage.location);

    const libPath = join(lernaPackage.location, 'lib');
    const cjsPath = join(lernaPackage.location, 'cjs');
    const esPath = join(lernaPackage.location, 'es');
    const config = join(lernaPackage.rootPath, 'babel.config.json');

    try {
      runCommand(
        ...babelCommand({
          env: 'cjs',
          src: libPath,
          dest: cjsPath,
          config,
        }),
      );
      runCommand(
        ...babelCommand({
          env: 'es',
          src: libPath,
          dest: esPath,
          config,
        }),
      );
    } catch (e) {
      error(e);
    }
  });
}

module.exports = buildDist;