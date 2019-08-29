# mini-program-boilerplate

## 项目介绍
-------

### 项目结构
```
├── config                    配置目录
|   ├── dev.js                开发时配置
|   ├── index.js              默认配置
|   └── prod.js               打包时配置
├── generators                模板文件
|   ├── component             组件模板配置文件
|   |   ├── class.js.hbs      组件模板文件
|   |   ├── index.js          组件模板配置文件
|   |   └── scss.js.hbs       组件样式模板文件
|   ├── pages                 页面模板配置文件
|   |   ├── actions.js.hbs    页面 actions 模板文件
|   |   ├── class.js.hbs      页面模板文件
|   |   ├── constants.js.hbs  页面 constants 模板文件
|   |   ├── index.js          页面模板配置文件
|   |   ├── reducer.js.hbs    页面 reducer 模板文件
|   |   └── scss.js.hbs       页面样式模板文件
|   ├── utils                 公用方法管理
|   |   └── nameExists.js     检测文件名称是否已存在
|   └── index.js              模板生成器入口文件
├── src                       源码目录
|   ├── actions               actions 目录
|   ├── components            公共组件目录
|   |   ├── component         公共 component 组件
|   |   |   ├── index.jsx     组件逻辑
|   |   |   └── index.scss    组件样式
|   ├── constants             常量文件目录
|   ├── pages                 页面文件目录
|   |   ├── index             index 页面目录
|   |   |   ├── banner        页面私有组件
|   |   |   ├── index.js      页面逻辑
|   |   |   └── index.css     页面样式
|   ├── reducers              reducers 文件目录
|   |   ├── index.js          reducers 入口文件
|   |   └── other.js          单个 reducer 文件
|   ├── utils                 公共方法库
|   ├── theme                 项目主题
|   ├── app.css               项目总通用样式
|   └── app.js                项目入口文件
└── package.json
```
