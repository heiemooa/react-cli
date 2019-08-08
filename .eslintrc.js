// .eslintrc.js
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true
  },
  extends: ['standard'],
  globals: {
    NODE_ENV: false
  },
  "plugins": [
    "react"
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 添加，分号必须
    semi: ['error', 'always'],
    'no-unexpected-multiline': 'off', //禁止出现难以理解的多行代码，off没有必要限制
    'space-before-function-paren': ['warn', 'never'], //function的圆括号之前是否使用空格
    // 'quotes': ["error", "double", { "avoidEscape": true }]
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: true
      }
    ],
    'no-unused-vars': [2,
      {
        'vars': 'all', // 变量定义必须被使用
        'args': 'after-used', // 对于函数形参不检测
        'ignoreRestSiblings': false, // 忽略剩余子项 fn(...args)，{a, b, ...coords}
        'caughtErrors': 'none', // 忽略 catch 语句的参数使用
      }
    ]
  }
}
