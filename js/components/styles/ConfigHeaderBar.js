'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  BT: {
    color: '#1b2836'
  },
  LIMIT: {
    float: 'right',
    paddingTop: '9px'
  }
};

//for light
//0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.3)

var styleConfig = {
  themeName: undefined,
  style: undefined,

  createStyle: function createStyle(CSS_RULE) {
    return (0, _extends3.default)({}, S, {
      ROOT: (0, _extends3.default)({}, CSS_RULE.BG)
    });
  }
};

exports.default = styleConfig;
//# sourceMappingURL=ConfigHeaderBar.js.map