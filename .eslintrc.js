module.exports = {
  "parser": "@babel/eslint-parser",
  "env": {
     "es6": true,
     "browser": true,
     "jest": true
  },
  "plugins": [
     "react",
     "react-hooks",
     "jsx-a11y",
     "testing-library"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "overrides": [
    {
      "files": ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      "extends": ["plugin:testing-library/react"] 
    }
  ],

  "rules": {

    //edit eslint rules
    "for-direction": 0,

    "no-mixed-spaces-and-tabs": [2, "smart-tabs"],
    "no-console": 0,
    "no-whitespace-before-property": 2,

    "default-case": 2,
    "jsx-quotes": [2, "prefer-double"],
    "no-unused-expressions": 1,
    "no-unused-vars": [1, {"args": "none"}],
    "no-use-before-define": ["error", { "variables": false }],

    //set react rules
    "react/display-name": 0,
    "react/jsx-boolean-value": [1, "always"],
    "react/jsx-no-undef": 0,

    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,

    "react/no-did-mount-set-state": 0,
    "react/no-did-update-set-state": 0,

    "react/no-multi-comp": 0,
    "react/no-unknown-property": 0,

    "react/prop-types": 0,
    "react/react-in-jsx-scope": 1,
    "react/self-closing-comp": 1,

    "react/sort-comp": 0,
    "react/jsx-wrap-multilines": ["error", {
       "declaration": true,
       "assignment": true,
       "return": true,
       "arrow": true
    }],

    //jsx-transform
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    //set react-hooks rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    //edit jsx-a11y rules
    //"jsx-a11y/no-access-key": 0,
    "jsx-a11y/label-has-for": 0
  }
}
