module.exports = {
  "extends": ["eslint:recommended"],
  "env": {
    "browser": true,
    "node": true,
    "jest":true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "parser": "babel-eslint",
  "rules": {
    "semi":["error", "always"],
    "camelcase":"off",
    "comma-dangle":["error", "always-multiline"],
    "indent":["error", 2],
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "object-curly-spacing": ["error", "always"],
    "eol-last": ["error", "always"],
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }]
  }
};
