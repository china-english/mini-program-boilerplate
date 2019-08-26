/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict'

const componentExists = require('../utils/componentExists')
const pagesExists = require('../utils/pagesExists')

module.exports = {
  description: 'Generate a component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'HeaderCopy',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A file with this name already exists' : true;
      }
      return 'The name is required';
    },
  }],
  actions: () => {
    const actions = [{
      type: 'add',
      path: '../src/components/index.js',
      templateFile: './component/class.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/components/index.scss',
      templateFile: './component/scss.js.hbs',
      abortOnFail: true,
    }];
    return actions;
  },
};
