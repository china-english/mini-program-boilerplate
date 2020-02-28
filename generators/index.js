/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs')
const path = require('path')
const componentGenerator = require('./component/index.js')
const pageGenerator = require('./pages/index.js')
const packageGenerator = require('./package/index.js')

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('pages', pageGenerator)
  plop.setGenerator('package', packageGenerator)

  plop.setHelper('preCurly', (t) => `{${t}}`)

  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(path.join(__dirname, `../src/pages/${comp}`), fs.F_OK)
      return `pages/${comp}`
    } catch (e) {
      try {
        return `components/${comp}`
      } catch (e1) {
        return `src/${comp}`
      }
    }
  })
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'))
}
