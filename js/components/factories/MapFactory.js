"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _ClusterInfo = _interopRequireDefault(require("../map/ClusterInfo"));

var MapFactory = {
  crClusterInfo: function crClusterInfo(props) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClusterInfo["default"], (0, _extends2["default"])({}, props));
  },
  crInfo: function crInfo(_ref) {
    var label = _ref.label,
        value = _ref.value;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        children: [label, ":\xA0"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: value ? value : 'unknown'
      })]
    });
  }
};
var _default = MapFactory;
exports["default"] = _default;
//# sourceMappingURL=MapFactory.js.map