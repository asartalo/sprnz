const {
  loadPackages, loadRootPackage, iter, exec,
} = require('lerna-script');
const editJsonFile = require('edit-json-file');
const { join } = require('path');

function scopeLog(log, scope) {
  const scoped = method => (...msgs) => log[method].call(log, scope, ...msgs);
  return {
    info: scoped('info'),
    error: scoped('error'),
  };
}

function all(...items) {
  return Promise.all(items);
}

const distDirs = ['es', 'cjs'];
async function distFolders(logger) {
  const { info } = scopeLog(logger, 'distFolders');
  const packages = await loadPackages();
  const paths = distDirs.map(dir => `${join('.', dir)}`).join(' ');

  info(`Making publish directories: ${distDirs.join(', ')}`);

  return iter.parallel(packages)(lernaPackage => {
    info(lernaPackage);
    exec.command(lernaPackage)(`mkdir -p ${paths}`);
  });
}

async function initializePackage(logger) {
  const { info, error } = scopeLog(logger, 'initializePackage');
  const packageName = Array.from(process.argv).pop();

  if (packageName === 'initializePackage') {
    error('Please pass package name');
    return;
  }

  const nameMatch = packageName.match(/^@(.+)\/(.+)$/);

  if (!nameMatch) {
    error(`Package name must be of the format "@root/package". Got "${packageName}"`);
    return;
  }

  const [rootPackage, packages] = await all(loadRootPackage(), loadPackages());
  const mainName = nameMatch[2];
  if (nameMatch[1] !== rootPackage.name) {
    error(
      `Root package does not include root name. Must be "@${rootPackage.name}/${mainName}". Got "${packageName}"`,
    );
    return;
  }

  const thePackage = packages.find(p => p.name === packageName);
  if (!thePackage) {
    error(`Package "${packageName}" not found.`);
    return;
  }

  const packageJsonFile = editJsonFile(thePackage.manifestLocation);
  const scriptFile = `${mainName}.js`;
  const items = {
    type: 'module',
    main: `cjs/${scriptFile}`,
    exports: {
      import: `es/${scriptFile}`,
      require: `cjs/${scriptFile}`,
    },
  };
  Object.entries(items).forEach(([key, value]) => packageJsonFile.set(key, value));
  packageJsonFile.save();
}

module.exports = {
  distFolders,
  initializePackage,
};
