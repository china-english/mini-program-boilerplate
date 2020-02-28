/**
 * nameExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs')
const path = require('path')

const pageComponents = fs.readdirSync(path.join(__dirname, '../../src/components'))
const pageContainers = fs.readdirSync(path.join(__dirname, '../../src/pages'))
// 查询页面私有组件名称
const pageContainersComponents = function () {
  let pagePrivateComponents = []
  pageContainers.forEach((pageName) => {
    const pageChildrenFilesName = fs.readdirSync(path.join(__dirname, `../../src/pages/${pageName}`))
    pageChildrenFilesName.forEach((file) => {
      const fileName = file.split('.')[0]
      if (fileName !== 'index') {
        pagePrivateComponents.push(fileName)
      }
    })
  })
  return pagePrivateComponents
}

const components = pageComponents.concat(pageContainers).concat(pageContainersComponents())

function nameExists(comp) {
  return components.indexOf(comp) >= 0
}

module.exports = nameExists
