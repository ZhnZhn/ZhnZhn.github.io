'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = styleConfig;
//# sourceMappingURL=ConfigLogos.js.map