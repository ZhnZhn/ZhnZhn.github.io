"use strict";

exports.__esModule = true;
exports.default = void 0;
var _DialogStyles = require("../../styles/DialogStyles");
const MAX_LENGTH = 11;
const _crCaption = caption => caption.length > MAX_LENGTH && caption.indexOf(' ') === -1 ? caption.slice(0, MAX_LENGTH) + '.' : caption;
const crRowOptions = function (_ref, _temp) {
  let {
    isShowLabels,
    captionStyle,
    caption = '',
    width = 250,
    ...rest
  } = _ref;
  let {
    isOc
  } = _temp === void 0 ? {} : _temp;
  const _caption = _crCaption(caption),
    _crRowStyle = isOc ? _DialogStyles.crRowOcSelectStyle : _DialogStyles.crRowLabelStyle,
    [rowStyle, labelStyle] = _crRowStyle(isShowLabels, captionStyle);
  return {
    rowStyle,
    labelStyle,
    caption: _caption,
    options: {
      width,
      ...rest,
      optionName: isShowLabels ? '' : _caption
    }
  };
};
var _default = crRowOptions;
exports.default = _default;
//# sourceMappingURL=crRowOptions.js.map