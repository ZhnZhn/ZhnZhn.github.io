"use strict";

exports.__esModule = true;
exports.default = void 0;
const S = {
  BT: {
    color: '#1b2836'
  }
};
const styleConfig = {
  createStyle: (CSS_RULE, themeName) => {
    return {
      ...S,
      ROOT: {
        ...CSS_RULE.BG
      }
    };
  }
};
var _default = styleConfig;
exports.default = _default;
//# sourceMappingURL=ConfigHeaderBar.js.map