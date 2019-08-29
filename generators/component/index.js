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
    type: 'input',
    name: 'name',
    message: 'What should it be called?(请输入组件名称)',
    default: 'headerCopy',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return nameExists(value) ? 'A file with this name already exists(文件名称已存在)' : true
      }
      return 'The name is required(请输入文件名称)'
    },
  }, {
    type: 'confirm',
    name: 'isPageComponent',
    default: false,
    message: 'Does this component belong to a page ?（这个组件属于某个页面私有吗）',
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
      path: '../src/components/{{ camelCase name }}/index.jsx',
      templateFile: './component/class.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/components/{{ camelCase name }}/index.scss',
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
        type: 'modify',
        path: `../src/pages/${answers.pageName}/index.scss`,
        pattern: /(the private component)/gi,
        template: `$1\n.{{  kebabCase name }}-container {\n}`,
      }];
    }
    return actions;
  },
};
