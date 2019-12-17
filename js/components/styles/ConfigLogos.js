"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var styleConfig = {
  createStyle: function createStyle(CSS_RULE, themeName) {
    var borderColor = themeName === 'GREY' ? '#1b2836' : 'grey';
    return {
      ROOT: {
        borderWidth: 0,
        borderColor: borderColor,
        fill: CSS_RULE.BG.backgroundColor
      }
    };
  }
};
var _default = styleConfig;
exports["default"] = _default;
//# sourceMappingURL=ConfigLogos.js.map