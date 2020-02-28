/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict'

const nameExists = require('../utils/nameExists')
const pageExists = require('../utils/pageExists')

module.exports = {
  description: 'Generate a component(生成一个组件文件)',
  prompts: [{
    type: 'confirm',
    name: 'isPageComponent',
    default: false,
    message: 'Does this component belong to a page?（这个组件属于某个页面私有吗）',
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?(请输入组件名称)',
    default: (answers) => answers.isPageComponent ? 'headerCopy' : 'HeaderCopy',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return nameExists(value) ? 'A file with this name already exists(文件名称已存在)' : true
      }
      return 'The name is required(请输入文件名称)'
    },
  }, {
    type: 'confirm',
    name: 'overwriteStyle',
    default: (answers) => !answers.isPageComponent,
    message: 'Does this component need to override the style of the taro-ui（这个组件需要覆写 taro-ui 的样式吗?）',
  }, {
    when: (answers) => answers.isPageComponent,
    type: 'input',
    name: 'pageName',
    message: 'What is the name of the container?（请输入这个组件所属页面名称）',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return !pageExists(value) ? 'A page with this name does not exist(找不到匹配的文件)' : true;
      }
      return 'The name is required(请输入文件名称)';
    },
  }],
  actions: (answers) => {
    let actions = [{
      type: 'add',
      path: '../src/components/{{ properCase name }}/index.jsx',
      templateFile: './component/class.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/components/{{ properCase name }}/index.scss',
      templateFile: './component/scss.js.hbs',
      abortOnFail: true,
    }];
    if (answers.isPageComponent) {
      actions = [{
        type: 'add',
        path: `../src/pages/${answers.pageName}/{{ camelCase name }}.jsx`,
        templateFile: './component/class.js.hbs',
        abortOnFail: true,
      }, {
        type: 'add',
        path: `../src/pages/${answers.pageName}/{{ camelCase name }}.scss`,
        templateFile: './component/scss.js.hbs',
        abortOnFail: true,
      }];
    }
    if (answers.overwriteStyle) {
      actions.push({
        type: 'add',
        path: `../src/customComponentTheme/{{ camelCase name }}.scss`,
        templateFile: './component/overwriteStyle.js.hbs',
        abortOnFail: true,
      })
      actions.push({
        type: 'modify',
        path: `../src/customComponentTheme/index.scss`,
        pattern: /( \*\/)/gi,
        template: `$1\n\n// {{ camelCase name }} style which overwrtie taro-ui\n@import './{{ camelCase name }}.scss';`,
      })
    }
    return actions;
  },
};
