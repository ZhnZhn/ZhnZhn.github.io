"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _FactoryChart = _interopRequireDefault(require("./FactoryChart"));

var _JsonStatFn = _interopRequireDefault(require("./JsonStatFn"));

var _EuroStatFn = require("./EuroStatFn");

const _filterZeroIf = (data, is) => is ? data.map(value => value === 0 ? null : value) : data;

const _crScatterProps = seriaColor => ({
  type: 'scatter',
  marker: {
    fillColor: seriaColor,
    radius: 5,
    symbol: 'circle'
  }
});

const toCategory = {
  createConfig: (json, option) => {
    const {
      zhMapSlice: configSlice
    } = option;
    return _JsonStatFn.default.trJsonToCategory(json, configSlice).then(_ref => {
      let {
        categories,
        data,
        min
      } = _ref;

      const config = _FactoryChart.default.createConfig(option);

      (0, _EuroStatFn.addToCategoryConfig)(config, {
        json,
        option,
        data,
        categories,
        min
      });
      return config;
    });
  },
  createSeria: (json, option, chart) => {
    const categories = chart.options.xAxis[0].categories;

    const {
      isFilterZero,
      zhMapSlice: configSlice = {},
      time,
      seriaColor,
      seriaType
    } = option,
          data = _JsonStatFn.default.trJsonToSeria(json, configSlice, categories),
          _data = _filterZeroIf(data, isFilterZero),
          _seriaProps = seriaType === 'DOT_SET' ? _crScatterProps(seriaColor) : void 0;

    return {
      minY: (0, _EuroStatFn.findMinY)(data),
      name: configSlice.time || time,
      color: seriaColor,
      data: _data,
      tooltip: (0, _EuroStatFn.crCategoryTooltip)(),
      ..._seriaProps
    };
  }
};
var _default = toCategory;
exports.default = _default;
//# sourceMappingURL=toCategory.js.map