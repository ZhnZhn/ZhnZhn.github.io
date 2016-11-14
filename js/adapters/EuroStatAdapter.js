'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartConfig = require('../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _EuroStatFn = require('./EuroStatFn');

var _EuroStatFn2 = _interopRequireDefault(_EuroStatFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _fnCreateData = function _fnCreateData(timeIndex, value) {
  var data = [];
  var max = Number.NEGATIVE_INFINITY,
      min = Number.POSITIVE_INFINITY;

  Object.keys(timeIndex).map(function (key) {
    var pointValue = value[timeIndex[key]];
    if (!(pointValue == null)) {
      data.push([_EuroStatFn2.default.convertToUTC(key), pointValue]);

      if (pointValue >= max) {
        max = pointValue;
      }
      if (pointValue <= min) {
        min = pointValue;
      }
    }
  });

  return { data: data, max: max, min: min };
};

var EuroStatAdapter = {
  toConfig: function toConfig(json, option) {
    var zhCompType = option.zhCompType;
    var timeIndex = json.dimension.time.category.index;
    var value = json.value;

    var _fnCreateData2 = _fnCreateData(timeIndex, value);

    var data = _fnCreateData2.data;
    var max = _fnCreateData2.max;
    var min = _fnCreateData2.min;
    var config = _ChartConfig2.default.fBaseAreaConfig();

    _EuroStatFn2.default.setDataAndInfo({ config: config, data: data, json: json, option: option });
    _EuroStatFn2.default.setLineExtrems({ config: config, max: max, min: min });

    if (zhCompType) {
      config.zhDialog = option;
      config.zhDialog.apiKey = '';
      config.json = json;
      config.zhMapSlice = option.zhMapSlice;
    }

    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    var timeIndex = json.dimension.time.category.index;
    var value = json.value;
    var valueText = option.itemCaption;
    var seria = _ChartConfig2.default.fSeries();

    var _fnCreateData3 = _fnCreateData(timeIndex, value);

    var data = _fnCreateData3.data;


    seria.zhSeriaId = option.key;
    seria.zhValueText = valueText;
    seria.data = data;

    seria.minY = _EuroStatFn2.default.findMinY(data);

    return seria;
  }
};

exports.default = EuroStatAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\EuroStatAdapter.js.map