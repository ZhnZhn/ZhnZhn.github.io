"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var S = {
  ROW: {
    cursor: 'default',
    "float": 'right',
    marginTop: 8,
    marginBottom: 10,
    marginRight: 4
  }
};

var RowButtons = function RowButtons(_ref) {
  var children = _ref.children,
      btStyle = _ref.btStyle,
      onClose = _ref.onClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S.ROW,
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
      style: btStyle,
      caption: "Close",
      onClick: onClose
    })]
  });
};

var _default = RowButtons;
exports["default"] = _default;
//# sourceMappingURL=RowButtons.js.map