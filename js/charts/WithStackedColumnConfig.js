"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _crStackedConfig = _interopRequireDefault(require("./crStackedConfig"));

var WithStackedColumnConfig = {
  crStackedColumnConfig: function crStackedColumnConfig(props) {
    return (0, _crStackedConfig["default"])((0, _extends2["default"])({}, props, {
      type: 'column'
    }));
  },
  crStackedColumnSeria: function crStackedColumnSeria(_ref) {
    var name = _ref.name,
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? [] : _ref$data,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'gray' : _ref$color;
    return {
      name: name,
      data: data,
      borderColor: 'transparent',
      borderWidth: 1,
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
      pointPadding: 0.01,
      marker: {
        radius: 6,
        symbol: 'circle'
      },
      dataLabels: {
        enabled: false,
        format: '{point.percent}',
        color: 'black',
        style: {
          textShadow: 'none'
        }
      },
      states: {
        hover: {
          enabled: true,
          borderColor: 'yellow'
        }
      }
    };
  }
};
var _default = WithStackedColumnConfig;
exports["default"] = _default;
//# sourceMappingURL=WithStackedColumnConfig.js.map