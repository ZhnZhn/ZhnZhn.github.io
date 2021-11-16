"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crRowStyle = _interopRequireDefault(require("./crRowStyle"));

const MAX_LENGTH = 11;

const _crCaption = caption => caption.length > MAX_LENGTH && caption.indexOf(' ') === -1 ? caption.substring(0, MAX_LENGTH) + '.' : caption;

const crRowOptions = ({
  isShowLabels,
  captionStyle,
  caption = '',
  width = 250,
  ...rest
}, {
  isOc
} = {}) => {
  const _caption = _crCaption(caption);

  return { //rowStyle, labelStyle,
    ...(0, _crRowStyle.default)({
      isShowLabels,
      captionStyle
    }, isOc),
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