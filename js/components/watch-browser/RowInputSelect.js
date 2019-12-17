"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

//import PropTypes from "prop-types";
var S = {
  CAPTION: {
    width: '120px'
  }
};

var RowInputSelect = function RowInputSelect(_ref) {
  var caption = _ref.caption,
      options = _ref.options,
      onSelect = _ref.onSelect;
  return _react["default"].createElement("div", {
    style: _DialogStyles["default"].rowDiv
  }, _react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, _DialogStyles["default"].labelSpan, {}, S.CAPTION)
  }, caption), _react["default"].createElement(_InputSelect["default"], {
    width: "250",
    options: options,
    onSelect: onSelect
  }));
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