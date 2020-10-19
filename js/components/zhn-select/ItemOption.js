"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var S = {
  CAPTION: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};

var ItemOption = function ItemOption(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === void 0 ? {} : _ref$item,
      propCaption = _ref.propCaption;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S.CAPTION,
    children: item[propCaption]
  });
};

var _default = ItemOption;
exports["default"] = _default;
//# sourceMappingURL=ItemOption.js.map