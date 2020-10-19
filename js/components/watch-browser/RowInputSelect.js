"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

//import PropTypes from "prop-types";
var S = {
  CAPTION: (0, _extends2["default"])({}, _DialogStyles["default"].CAPTION, {
    width: 120
  })
};

var RowInputSelect = function RowInputSelect(_ref) {
  var caption = _ref.caption,
      options = _ref.options,
      onSelect = _ref.onSelect;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _DialogStyles["default"].ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S.CAPTION,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect["default"], {
      width: "250",
      options: options,
      onSelect: onSelect
    })]
  });
};
/*
RowInputSelect.propTypes = {
  caption: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.func
}
*/


var _default = RowInputSelect;
exports["default"] = _default;
//# sourceMappingURL=RowInputSelect.js.map