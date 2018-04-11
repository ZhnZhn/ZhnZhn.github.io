"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleConfig = {
  themeName: undefined,
  style: undefined,

  createStyle: function createStyle(CSS_RULE) {
    return {
      CL_SCROLL: CSS_RULE.CL_SCROLL,
      ROOT: (0, _extends3.default)({}, CSS_RULE.BG),
      EL: (0, _extends3.default)({}, CSS_RULE.EL),
      EL_BORDER: (0, _extends3.default)({}, CSS_RULE.EL_BORDER)
    };
  }
};

exports.default = styleConfig;
//# sourceMappingURL=ConfigGeneral.js.map