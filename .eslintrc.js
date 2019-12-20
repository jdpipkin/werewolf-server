module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": ["eslint:recommended","prettier"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      "prettier/prettier": [
        "error",
        {
          "trailingComma": "es5",
          "semi": false,
          "singleQuote": true,
          "printWidth": 80,
        }
      ],
    }, 
    "plugins": ["eslint-plugin-prettier",]
};