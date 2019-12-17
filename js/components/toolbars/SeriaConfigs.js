"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _A = _interopRequireDefault(require("../zhn/A"));

var S = {
  ROW: {
    paddingTop: 5
  },
  fnSpan: function fnSpan(color) {
    return {
      color: color,
      paddingLeft: 8
    };
  }
};

var SeriaConfigs = function SeriaConfigs(_ref) {
  var configs = _ref.configs,
      onRemove = _ref.onRemove;
  return _react["default"].createElement("div", null, configs.map(function (_ref2) {
    var id = _ref2.id,
        color = _ref2.color;
    return _react["default"].createElement("div", {
      key: id,
      style: S.ROW
    }, _react["default"].createElement(_A["default"].SvgMinus, {
      onClick: onRemove.bind(null, id)
    }), _react["default"].createElement("span", {
      style: S.fnSpan(color)
    }, id));
  }));
};

var _default = SeriaConfigs;
exports["default"] = _default;
//# sourceMappingURL=SeriaConfigs.js.map