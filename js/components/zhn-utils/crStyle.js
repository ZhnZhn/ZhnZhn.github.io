"use strict";

exports.__esModule = true;
exports.default = void 0;
const _assign = Object.assign;

const crStyle = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce((style, itemStyle) => {
    if (itemStyle) {
      _assign(style, itemStyle);
    }

    return style;
  }, {});
};

var _default = crStyle;
exports.default = _default;
//# sourceMappingURL=crStyle.js.map