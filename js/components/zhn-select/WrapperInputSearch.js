"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));
var _TransformFn = require("./TransformFn");
var _InputSelect = _interopRequireDefault(require("./InputSelect"));
var _jsxRuntime = require("react/jsx-runtime");
const WrapperInputSearch = (0, _memoEqual.default)(_ref => {
  let {
    style,
    placeholder = '',
    data,
    ItemOptionComp,
    onSelect
  } = _ref;
  const _hSelectItem = (0, _uiApi.useCallback)(item => {
      if (item) {
        onSelect(item);
      }
    }, [onSelect]),
    {
      meta
    } = data || {},
    {
      caption
    } = meta || {},
    _options = (0, _TransformFn.transformFromLevel3)(data);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
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
exports.default = _default;
//# sourceMappingURL=WrapperInputSearch.js.map