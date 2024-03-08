"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _SpanToken = require("../zhn/SpanToken");
var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));
var _DialogStyles = require("../styles/DialogStyles");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const S_CAPTION = {
  width: 120
};
const RowInputSelect = _ref => {
  let {
    caption,
    options,
    onSelect
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _DialogStyles.S_DIALOG_ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
      style: S_CAPTION,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
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
var _default = exports.default = RowInputSelect;
//# sourceMappingURL=RowInputSelect.js.map