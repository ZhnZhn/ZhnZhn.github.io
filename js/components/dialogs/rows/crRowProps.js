"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _DialogStyles = require("../../styles/DialogStyles");
var _crRowCaption = _interopRequireDefault(require("./crRowCaption"));
// [rowStyle, labelStyle, inputProps, caption, title]
const crRowProps = _ref => {
  let {
    isShowLabels,
    captionStyle,
    caption = '',
    width = 250,
    ...restRowProps
  } = _ref;
  return [...(0, _DialogStyles.crRowLabelStyle)(isShowLabels, captionStyle), {
    width,
    ...restRowProps,
    optionName: isShowLabels ? '' : caption
  }, ...(0, _crRowCaption.default)(caption)];
};
var _default = crRowProps;
exports.default = _default;
//# sourceMappingURL=crRowProps.js.map