/**
 * pageExists
 * Check whether the given component exist in either the components or pages directory
 */

const fs = require('fs');
const path = require('path');
const pages = fs.readdirSync(path.join(__dirname, '../../src/pages'));

function pageExists(comp) {
  return pages.indexOf(comp) >= 0;
}

module.exports = pageExists;
