"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crStackedConfig = _interopRequireDefault(require("./crStackedConfig"));

var WithStackAreaConfig = {
  crStackedAreaConfig: function crStackedAreaConfig(props) {
    return (0, _crStackedConfig["default"])(props);
  },
  crStackedAreaSeria: function crStackedAreaSeria(_ref) {
    var name = _ref.name,
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? [] : _ref$data,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'gray' : _ref$color;
    return {
      name: name,
      data: data,
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
      marker: {
        radius: 6,
        symbol: 'circle'
      }
    };
  }
};
var _default = WithStackAreaConfig;
exports["default"] = _default;
//# sourceMappingURL=WithStackedAreaConfig.js.map