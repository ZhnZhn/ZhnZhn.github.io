"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _min2 = _interopRequireDefault(require("./dataProcessing/min"));

var _Label = _interopRequireDefault(require("./Label"));

var _jsxRuntime = require("react/jsx-runtime");

const MinLabel = ({
  data,
  height = 0,
  dy = 3,
  color = "#f44336",
  fontSize = 14
}) => {
  const _min = (0, _min2.default)(data),
        _y = height - dy;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
    title: _min,
    x: 0,
    y: _y,
    stroke: "none",
    fill: color,
    fontSize: fontSize
  });
};

var _default = MinLabel;
exports.default = _default;
//# sourceMappingURL=MinLabel.js.map