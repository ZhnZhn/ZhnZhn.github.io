"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var S = {
  ROW: {
    cursor: 'default',
    "float": 'right',
    marginTop: '8px',
    marginBottom: '10px',
    marginRight: '4px'
  }
};

var RowButtons = function RowButtons(_ref) {
  var children = _ref.children,
      btStyle = _ref.btStyle,
      onClose = _ref.onClose;
  return _react["default"].createElement("div", {
    style: S.ROW
  }, children, _react["default"].createElement(_FlatButton["default"], {
    rootStyle: btStyle,
    caption: "Close",
    onClick: onClose
  }));
};

var _default = RowButtons;
exports["default"] = _default;
//# sourceMappingURL=RowButtons.js.map