"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crStackedColumnSeria = exports.crStackedColumnConfig = exports.crStackedAreaSeria = exports.crStackedAreaConfig = void 0;

var _crStackedConfig = _interopRequireDefault(require("./crStackedConfig"));

const crStackedAreaConfig = _crStackedConfig.default;
exports.crStackedAreaConfig = crStackedAreaConfig;

const crStackedColumnConfig = props => (0, _crStackedConfig.default)({ ...props,
  type: 'column'
});

exports.crStackedColumnConfig = crStackedColumnConfig;

const crStackedAreaSeria = _ref => {
  let {
    name,
    data = [],
    color = 'gray'
  } = _ref;
  return {
    name,
    data,
    color,
    fillColor: color,
    fillOpacity: 0.5,
    marker: {
      radius: 6,
      symbol: 'circle'
    }
  };
};

exports.crStackedAreaSeria = crStackedAreaSeria;

const crStackedColumnSeria = _ref2 => {
  let {
    name,
    data = [],
    color = 'gray'
  } = _ref2;
  return {
    name,
    data,
    color,
    fillColor: color,
    fillOpacity: 0.5,
    borderColor: 'transparent',
    borderWidth: 1,
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
};

exports.crStackedColumnSeria = crStackedColumnSeria;
//# sourceMappingURL=StackedConfigFn.js.map