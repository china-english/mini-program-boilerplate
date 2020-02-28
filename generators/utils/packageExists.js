/**
 * packageExists
 * Check whether the given name exist in the project
 */

const fs = require('fs');
const path = require('path');
const sourceFolder = fs.readdirSync(path.join(__dirname, '../../src'));

function packageExists(comp) {
  return sourceFolder.indexOf(comp) >= 0;
}

module.exports = packageExists;
