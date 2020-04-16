module.exports = {
  "parser": "babel-eslint",
  "env": {
     "es6": true,
     "browser": true,
     "jest": true
  },
  "plugins" : [
     "react-hooks"
  ],
  "rules": {
     "react-hooks/rules-of-hooks": "error",
     "react-hooks/exhaustive-deps": "warn"
  }
}
