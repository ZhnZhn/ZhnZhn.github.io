"use strict";

exports.__esModule = true;
exports.default = void 0;
const styleConfig = {
  //themeName: void 0,
  //style: void 0,

  createStyle: CSS_RULE => {
    return {
      ROOT: {
        ...CSS_RULE.BG
      },
      EL: {
        ...CSS_RULE.EL
      },
      EL_BORDER: {
        ...CSS_RULE.EL_BORDER
      }
    };
  }
};
var _default = styleConfig;
exports.default = _default;
//# sourceMappingURL=ConfigGeneral.js.map