"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ClusterInfo = _interopRequireDefault(require("../map/ClusterInfo"));

var MapFactory = {
  crClusterInfo: function crClusterInfo(props) {
    return _react["default"].createElement(_ClusterInfo["default"], props);
  },
  crInfo: function crInfo(_ref) {
    var label = _ref.label,
        value = _ref.value;
    return _react["default"].createElement("p", null, _react["default"].createElement("span", null, label, ":\xA0"), _react["default"].createElement("span", null, value ? value : 'unknown'));
  }
};
var _default = MapFactory;
exports["default"] = _default;
//# sourceMappingURL=MapFactory.js.map