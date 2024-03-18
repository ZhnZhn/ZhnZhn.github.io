"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crRowCaption = _interopRequireDefault(require("./crRowCaption"));
// [rowStyle, labelStyle, inputProps, caption, title]
const crRowProps = _ref => {
  let {
    isShowLabels,
    caption = '',
    width = 250,
    ...restRowProps
  } = _ref;
  return [{
    width,
    ...restRowProps,
    optionName: isShowLabels ? '' : caption
  }, ...(0, _crRowCaption.default)(caption)];
};
var _default = exports.default = crRowProps;
//# sourceMappingURL=crRowProps.js.map