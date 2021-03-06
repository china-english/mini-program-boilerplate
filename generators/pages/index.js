/**
 * Container Generator
 *
 * source => https://github.com/china-english/react-native-boilerplate
 * author => fei
 */
const nameExists = require('../utils/nameExists')
const pageExists = require('../utils/pageExists')
const packageExists = require('../utils/packageExists')

module.exports = {
  description: 'Generate a page container(生成一个页面文件)',
  prompts: [
    {
      type: 'confirm',
      name: 'isSubpackage',
      default: false,
      message: 'Does this page belong to a subpackage?（这个页面属于分包所有吗）',
    },
    {
      when: (answers) => answers.isSubpackage,
      type: 'input',
      name: 'subpackageName',
      message: 'What is the name of the subpackage?（请输入所属分包名称）',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return !packageExists(value) ? 'A subpackage with this name does not exist(找不到匹配的文件)' : true;
        }
        return 'The name is required(请输入文件名称)';
      },
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called ?(请输入页面名称)',
      default: 'default',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return pageExists(value) ? 'A file with this name already exists(文件名称已存在)' : true
        }
        return 'The name is required(请输入文件名称)'
      },
    },
    {
      type: 'confirm',
      name: 'hasRouter',
      default: true,
      message: 'Do you want to link it with a route?（是否将页面添加到项目路由中）',
    },
    {
      type: 'confirm',
      name: 'wantWX',
      default: true,
      message: 'Do you need wx API?（是否在页面中使用微信 API）',
    },
    {
      type: 'confirm',
      name: 'wantHeader',
      default: true,
      message: 'Do you want use custom header?（是否在页面中添加自定义导航栏）',
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message: 'Do you need actions/constants/reducer tuple for this page?（是否需要 actions/constants/reducer）',
    }
  ],
  actions: (answers) => {
    /* Create the file infrastructure
     * 创建文件基本结构
     */
    let pathPrefix = '../src/pages'
    if (answers.isSubpackage) {
      pathPrefix = '../src/{{subpackageName}}'
    }
    const actions = [{
      type: 'add',
      path: `${pathPrefix}/{{camelCase name}}/index.jsx`,
      templateFile: './pages/class.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${pathPrefix}/{{camelCase name}}/index.scss`,
      templateFile: './pages/scss.js.hbs',
      abortOnFail: true,
    }];
    /* If you want actions and a reducer, generate actions.js, constants.js,
     * reducer.js
     * 如果你需要 actions 和 reducer，那么将会生成以下文件：actions.js, constants.js,
     * reducer.js
     */
    if (answers.wantActionsAndReducer) {
      // Constants
      actions.push({
        type: 'add',
        path: '../src/constants/{{camelCase name}}.js',
        templateFile: './pages/constants.js.hbs',
        abortOnFail: true,
      })

      // Reducer
      actions.push({
        type: 'add',
        path: '../src/reducers/{{camelCase name}}.js',
        templateFile: './pages/reducer.js.hbs',
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
        templateFile: './pages/actions.js.hbs',
        abortOnFail: true,
      })
    }

    // router
    if (answers.hasRouter) {
      const routerName = answers.name.replace(/( |^)[A-Z]/g, (L) => L.toLowerCase())
      if (answers.isSubpackage) {
        const parttern = new RegExp(`${answers.subpackageName} path`)
        actions.push({
          type: 'append',
          path: '../src/app.jsx',
          pattern: parttern,
          template: `          '${routerName}/index',`,
        })
      } else {
        actions.push({
          type: 'modify',
          path: '../src/app.jsx',
          pattern: /(\'pages\/home\/index\'\,)/,
          template: `$1\n      'pages/${routerName}/index',`,
        })
      }
    }
    return actions
  },
};
