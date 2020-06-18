"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _crRow = _interopRequireDefault(require("./crRow"));

var crRowOptions = function crRowOptions(_ref, _temp) {
  var isShowLabels = _ref.isShowLabels,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? '' : _ref$caption,
      captionStyle = _ref.captionStyle,
      rest = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["isShowLabels", "caption", "captionStyle"]);

  var _ref2 = _temp === void 0 ? {} : _temp,
      isOc = _ref2.isOc;

  return (0, _extends2["default"])({}, (0, _crRow["default"])({
    isShowLabels: isShowLabels,
    caption: caption,
    captionStyle: captionStyle
  }, isOc), {
    options: (0, _extends2["default"])({
      width: "250"
    }, rest, {
      optionName: isShowLabels ? '' : caption.replace(':', '')
    })
  });
};

var _default = crRowOptions;
exports["default"] = _default;
//# sourceMappingURL=crRowOptions.js.map