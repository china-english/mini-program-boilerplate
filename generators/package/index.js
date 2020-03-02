/**
 * Package Generator
 *
 * source => https://github.com/china-english/react-native-boilerplate
 * author => fei
 */
const packageExists = require('../utils/packageExists')

module.exports = {
  description: 'Generate a project subpackage(生成项目分包)',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called ?(项目分包名称)',
      default: 'defaultPackage',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return packageExists(value) ? 'A package with this name already exists(分包已存在)' : true
        }
        return 'The name is required(请输入分包名称)'
      },
    },
    {
      type: 'confirm',
      name: 'needAssets',
      default: true,
      message: 'Do you want to create the subpackage assets folder?（你想创建分包资源文件夹吗）',
    },
    {
      type: 'confirm',
      name: 'needContants',
      default: true,
      message: 'Do you want to create the subpackage constants folder?（你想创建分包常量文件夹吗）',
    },
    {
      type: 'confirm',
      name: 'needUtils',
      default: true,
      message: 'Do you want to create the subpackage utils folder?（你想创建分包工具文件夹吗）',
    },
  ],
  actions: (answers) => {
    /* Create the file infrastructure
     * 创建分包基本结构
     */
    const actions = [{
      type: 'add',
      path: '../src/{{camelCase name}}/{{camelCase name}}.md',
      templateFile: './package/md.js.hbs',
      abortOnFail: true,
    }]
    actions.push({
      type: 'append',
      path: '../src/app.jsx',
      pattern: /(subPackages: \[)/,
      templateFile: './package/addSubpackages.js.hbs',
      abortOnFail: true,
    })
    actions.push({
      type: 'append',
      path: './utils/pageExists.js',
      pattern: /(subPackages pages)/,
      template: 'const {{camelCase name}}Pages = fs.readdirSync(path.join(__dirname, \'../../src/{{camelCase name}}\'));',
      abortOnFail: true,
    })
    actions.push({
      type: 'append',
      path: './utils/pageExists.js',
      pattern: /(concat array)/,
      template: '    .concat({{camelCase name}}Pages)',
      abortOnFail: true,
    })
    if (answers.needAssets) {
      actions.push({
        type: 'add',
        path: '../src/{{camelCase name}}/assets/ASSETS.md',
        templateFile: './package/assets.js.hbs',
        abortOnFail: true,
      })
    }
    if (answers.needContants) {
      actions.push({
        type: 'add',
        path: '../src/{{camelCase name}}/constants/index.js',
        templateFile: './package/constants.js.hbs',
        abortOnFail: true,
      })
    }
    if (answers.needUtils) {
      actions.push({
        type: 'add',
        path: '../src/{{camelCase name}}/utils/index.js',
        templateFile: './package/utils.js.hbs',
        abortOnFail: true,
      })
    }
    return actions
  },
};
