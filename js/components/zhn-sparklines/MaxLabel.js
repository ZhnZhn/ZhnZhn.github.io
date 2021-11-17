"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _max2 = _interopRequireDefault(require("./dataProcessing/max"));

var _Label = _interopRequireDefault(require("./Label"));

var _jsxRuntime = require("react/jsx-runtime");

const MaxLabel = ({
  data,
  dy = 4,
  color = "#8bc34a",
  fontSize = 14
}) => {
  const _max = (0, _max2.default)(data),
        _y = fontSize - dy;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
    title: _max,
    x: 0,
    y: _y,
    stroke: "none",
    fill: color,
    fontSize: fontSize
  });
};

var _default = MaxLabel;
exports.default = _default;
//# sourceMappingURL=MaxLabel.js.map