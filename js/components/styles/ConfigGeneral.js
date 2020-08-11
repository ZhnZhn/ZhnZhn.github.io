"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var styleConfig = {
  //themeName: void 0,
  //style: void 0,
  createStyle: function createStyle(CSS_RULE) {
    return {
      CL_SCROLL: CSS_RULE.CL_SCROLL,
      ROOT: (0, _extends2["default"])({}, CSS_RULE.BG),
      EL: (0, _extends2["default"])({}, CSS_RULE.EL),
      EL_BORDER: (0, _extends2["default"])({}, CSS_RULE.EL_BORDER)
    };
  }
};
var _default = styleConfig;
exports["default"] = _default;
//# sourceMappingURL=ConfigGeneral.js.map