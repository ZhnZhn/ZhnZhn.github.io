"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var S = {
  LABEL: {
    display: 'inline-block',
    color: '#2f7ed8',
    paddingRight: 8,
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var LimitRemainingLabel = function LimitRemainingLabel(_ref) {
  var store = _ref.store,
      style = _ref.style;

  var _useState = (0, _react.useState)(''),
      value = _useState[0],
      setValue = _useState[1];

  (0, _useListen["default"])(store, function (v) {
    if (v != null) {
      setValue(v);
    }
  }, 'listenLimitRemaining');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: (0, _extends2["default"])({}, S.LABEL, style),
    children: value
  });
};

var _default = LimitRemainingLabel;
exports["default"] = _default;
//# sourceMappingURL=LimitRemainingLabel.js.map