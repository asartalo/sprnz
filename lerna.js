const { loadPackages, iter, exec } = require('lerna-script');
const { join } = require('path');

function scopeLog(log, scope) {
  return {
    info: msg => log.info(scope, msg),
  };
}

const distDirs = ['es', 'cjs'];
async function distFolders(logger) {
  const { info } = scopeLog(logger, 'distFolders');
  info(`making publish directories: ${distDirs.join(', ')}`);
  const packages = await loadPackages();

  const paths = distDirs.map(dir => `${join('.', dir)}`).join(' ');

  return iter.parallel(packages)(lernaPackage => {
    info(lernaPackage);
    exec.command(lernaPackage)(`mkdir -p ${paths}`);
  });
}

module.exports.distFolders = distFolders;
