"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _GeneralStyles = require("../styles/GeneralStyles");

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ROW = { ..._GeneralStyles.S_FLEX_ROW_END,
  marginTop: 8,
  marginBottom: 10
};

const RowButtons = _ref => {
  let {
    style,
    btStyle,
    onClose,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: { ...S_ROW,
      ...style
    },
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      style: btStyle,
      caption: "Close",
      onClick: onClose
    })]
  });
};

var _default = RowButtons;
exports.default = _default;
//# sourceMappingURL=RowButtons.js.map