const path = require('path');
const fs = require('fs-extra');

const IS_BUILD = process.argv.find(arg => arg === 'build');

const SOURCE_FOLDER = path.resolve(process.cwd(), 'src');
const DIST_FOLDER = path.resolve(process.cwd(), 'dist');
const TO_COPY = ['assets', 'vendor', 'index.html', 'manifest.json'];

const copyForBuild = fileFolderName => {
  const completeFilePath = path.join(SOURCE_FOLDER, fileFolderName);
  const distFilePath = path.join(DIST_FOLDER, fileFolderName);
  return fs.copy(completeFilePath, distFilePath);
};

const copyForDev = () => {
  const webcomponentsPath = path.resolve(
    process.cwd(), 'node_modules', '@webcomponents', 'webcomponentsjs', 'webcomponents-loader.js'
  );
  const vendorPath = path.resolve(process.cwd(), 'src', 'vendor', 'webcomponents-loader.js');
  return fs.copy(webcomponentsPath, vendorPath);
};

const main = () => {
  if (IS_BUILD) {
    const promises = TO_COPY.reduce((acc, itemName) => acc.concat(copyForBuild(itemName)), []);
    return Promise.all(promises);
  }
  return copyForDev();
};

main().catch(err => console.error(err));
