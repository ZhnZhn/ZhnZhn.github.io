"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crRowStyle = _interopRequireDefault(require("./crRowStyle"));

const crRowOptions = ({
  isShowLabels,
  captionStyle,
  caption = '',
  width = 250,
  ...rest
}, {
  isOc
} = {}) => ({ //rowStyle, labelStyle,
  ...(0, _crRowStyle.default)({
    isShowLabels,
    captionStyle
  }, isOc),
  caption,
  options: {
    width,
    ...rest,
    optionName: isShowLabels ? '' : caption
  }
});

var _default = crRowOptions;
exports.default = _default;
//# sourceMappingURL=crRowOptions.js.map