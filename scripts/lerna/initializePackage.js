const { loadPackages, loadRootPackage } = require('lerna-script');
const editJsonFile = require('edit-json-file');
const scopeLog = require('./lib/scopeLog');

function all(...items) {
  return Promise.all(items);
}

async function getPackages(packageName) {
  let errorMessage = null;
  let rootPackage = null;
  let packages = null;
  let mainName = null;

  try {
    if (packageName === 'initializePackage') {
      throw Error('Please pass package name');
    }

    const nameMatch = packageName.match(/^@(.+)\/(.+)$/);
    if (!nameMatch) {
      throw Error(`Package name must be of the format "@root/package". Got "${packageName}"`);
    }

    mainName = nameMatch[2]; /* eslint-disable-line prefer-destructuring */
    [rootPackage, packages] = await all(loadRootPackage(), loadPackages());
    if (nameMatch[1] !== rootPackage.name) {
      throw Error(
        `Root package does not include root name. Must be "@${rootPackage.name}/${mainName}". Got "${packageName}"`,
      );
    }
  } catch (e) {
    errorMessage = e.message;
  }

  return { packages, errorMessage, mainName };
}

function setPackageDefaults(packageJsonFile, mainName) {
  const scriptFile = `${mainName}.js`;
  const items = {
    type: 'module',
    main: `./cjs/${scriptFile}`,
    files: ['es', 'cjs'],
    directories: {
      lib: 'es',
      test: '__tests__',
    },
    exports: {
      require: `./cjs/${scriptFile}`,
      default: `./es/${scriptFile}`,
    },
  };

  Object.entries(items).forEach(([key, value]) => packageJsonFile.set(key, value));
  packageJsonFile.save();
}

async function initializePackage(log) {
  const { info, error } = scopeLog(log, 'initializePackage');
  const packageName = Array.from(process.argv).pop();

  const { packages, mainName, errorMessage } = await getPackages(packageName);
  if (errorMessage) {
    error(errorMessage);
    return;
  }

  const thePackage = packages.find(p => p.name === packageName);
  if (!thePackage) {
    error(`Package "${packageName}" not found.`);
    return;
  }

  const packageJsonFile = editJsonFile(thePackage.manifestLocation);
  info(`Updating package.json file for ${packageName}`);
  setPackageDefaults(packageJsonFile, mainName);
}

module.exports = initializePackage;
