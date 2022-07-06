"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _GeneralStyles = require("../styles/GeneralStyles");

var _Button = _interopRequireDefault(require("./Button"));

var _jsxRuntime = require("react/jsx-runtime");

const S_COMMAND_DIV = { ..._GeneralStyles.S_FLEX_ROW_END,
  margin: '8px 4px 10px 0'
};

const RowButtons = _ref => {
  let {
    Primary,
    withoutClear,
    onClear,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_COMMAND_DIV,
    children: [Primary, !withoutClear && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default.Clear, {
      onClick: onClear
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default.Close, {
      onClick: onClose
    })]
  });
};

var _default = RowButtons;
exports.default = _default;
//# sourceMappingURL=RowButtons.js.map