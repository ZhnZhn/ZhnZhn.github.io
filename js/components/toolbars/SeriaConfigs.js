"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: configs.map(function (_ref2) {
      var id = _ref2.id,
          color = _ref2.color;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S.ROW,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].SvgMinus, {
          onClick: onRemove.bind(null, id)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S.fnSpan(color),
          children: id
        })]
      }, id);
    })
  });
};

var _default = SeriaConfigs;
exports["default"] = _default;
//# sourceMappingURL=SeriaConfigs.js.map