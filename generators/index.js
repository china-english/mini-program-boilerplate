/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs')
const path = require('path')
const componentGenerator = require('./component/index.js')
const containerGenerator = require('./container/index.js')

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('pages', containerGenerator)

  plop.setHelper('preCurly', (t) => `{${t}}`)

  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(path.join(__dirname, `../src/pages/${comp}`), fs.F_OK)
      return `pages/${comp}`
    } catch (e) {
      return `components/${comp}`
    }
  })
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'))
}
