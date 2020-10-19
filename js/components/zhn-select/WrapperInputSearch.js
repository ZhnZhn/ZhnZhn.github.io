"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));

var _TransformFn = _interopRequireDefault(require("./TransformFn"));

var _InputSelect = _interopRequireDefault(require("./InputSelect"));

var WrapperInputSearch = (0, _memoEqual["default"])(function (_ref) {
  var style = _ref.style,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
      data = _ref.data,
      ItemOptionComp = _ref.ItemOptionComp,
      onSelect = _ref.onSelect;

  var _hSelectItem = (0, _react.useCallback)(function (item) {
    if (item) {
      onSelect(item);
    }
  }, [onSelect]),
      _ref2 = data || {},
      meta = _ref2.meta,
      _ref3 = meta || {},
      caption = _ref3.caption,
      _options = _TransformFn["default"].fromLevel3(data);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect["default"], {
      width: "100%",
      isShowOptionAnim: true,
      placeholder: placeholder,
      propCaption: caption,
      options: _options,
      ItemOptionComp: ItemOptionComp,
      onSelect: _hSelectItem
    })
  });
});
var _default = WrapperInputSearch;
exports["default"] = _default;
//# sourceMappingURL=WrapperInputSearch.js.map