/**
 * Container Generator
 *
 * source => https://github.com/china-english/react-native-boilerplate
 * author => fei
 */
const nameExists = require('../utils/componentExists')

// import nameExists from '../utils/componentExists'

module.exports = {
  description: 'Generate a page container',
  prompts: [
    // {
    //   type: 'list',
    //   name: 'type',
    //   message: 'Select the base page type:',
    //   default: 'React.Component',
    //   choices: () => ['React.Component', 'Stateless Function', 'React.PureComponent'],
    // },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called ?',
      default: 'defaultPage',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return nameExists(value) ? 'A file with this name already exists' : true
        }
        return 'The name is required'
      },
    },
    {
      type: 'confirm',
      name: 'hasRouter',
      default: true,
      message: 'Do you want to link it with a route?',
    },
    {
      type: 'confirm',
      name: 'wantWX',
      default: true,
      message: 'Do you need wx API?',
    },
    {
      type: 'confirm',
      name: 'wantHeader',
      default: true,
      message: 'Do you want common page header?',
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message: 'Do you want an actions/constants/reducer tuple for this container?',
    }
  ],
  actions: (answers) => {
    // Generate index.js and index.test.js
    // let componentTemplate
    // switch (answers.type) {
    //   case 'Stateless Function': {
    //     componentTemplate = './container/stateless.js.hbs';
    //     break;
    //   }
    //   default: {
    //     componentTemplate = './container/class.js.hbs';
    //   }
    // }

    /* Create the file infrastructure
     * 创建文件基本结构
     */
    const actions = [{
      type: 'add',
      path: '../src/pages/{{camelCase name}}/index.jsx',
      templateFile: './container/class.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/pages/{{camelCase name}}/index.scss',
      templateFile: './container/scss.js.hbs',
      abortOnFail: true,
    }];

    /* If you want actions and a reducer, generate actions.js, constants.js,
     * reducer.js and the corresponding tests for actions and the reducer
     * 如果你需要 actions 和 reducer，那么将会生成以下文件：actions.js, constants.js,
     * reducer.js 以及 actions.test.js 和 reducer.test.js
     */
    if (answers.wantActionsAndReducer) {
      // Constants
      actions.push({
        type: 'add',
        path: '../src/constants/{{camelCase name}}.js',
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      })

      // Reducer
      actions.push({
        type: 'add',
        path: '../src/reducers/{{camelCase name}}.js',
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      })
      actions.push({
        type: 'modify',
        path: '../src/reducers/index.js',
        pattern: /(\n)(export default)/gi,
        template: `import {{ camelCase name }} from './{{ camelCase name }}'\n$1$2`,
      })
      actions.push({
        type: 'modify',
        path: '../src/reducers/index.js',
        pattern: /(combineReducers\(\{)/gi,
        template: `$1\n  {{ camelCase name }},`,
      })

      // Actions
      actions.push({
        type: 'add',
        path: '../src/actions/{{camelCase name}}.js',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      })
    }

    // router
    if (answers.hasRouter) {
      // const reg = new RegExp('Scene')
      const routerName = answers.name
        // .replace(reg, '')
        .replace(/( |^)[A-Z]/g, (L) => L.toLowerCase())
      actions.push({
        type: 'modify',
        path: '../src/app.jsx',
        pattern: /(\'pages\/home\/index\'\,)/gi,
        template: `$1\n      'pages/${routerName}/index',`,
      })
    }
    return actions
  },
};
