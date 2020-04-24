const { loadPackages, iter, exec } = require('lerna-script');
const { join } = require('path');
const scopeLog = require('./scopeLog');

const distDirs = ['es', 'cjs'];

async function distFolders(logger) {
  const { info } = scopeLog(logger, 'distFolders');
  const packages = await loadPackages();
  const paths = distDirs.map(dir => `${join('.', dir)}`).join(' ');

  info(`Making publish directories: ${distDirs.join(', ')}`);

  return iter.parallel(packages)(lernaPackage => {
    exec.command(lernaPackage)(`mkdir -p ${paths}`);
  });
}

module.exports = distFolders;
