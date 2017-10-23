module.exports = exports = {
  "root": true,
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jest": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react"
  ],
  "extends": ["airbnb"],
  "rules": {
    "no-mixed-spaces-and-tabs": [2, "smart-tabs"],
  }
};