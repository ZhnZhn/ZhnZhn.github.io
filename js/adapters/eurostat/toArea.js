'use strict';

Object.defineProperty(exports, "__esModule", {
     value: true
});

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _EuroStatFn = require('./EuroStatFn');

var _EuroStatFn2 = _interopRequireDefault(_EuroStatFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toArea = {
     createConfig: function createConfig(json, option) {
          var timeIndex = json.dimension.time.category.index,
              value = json.value,
              _EuroStatFn$createDat = _EuroStatFn2.default.createData(timeIndex, value),
              data = _EuroStatFn$createDat.data,
              max = _EuroStatFn$createDat.max,
              min = _EuroStatFn$createDat.min,
              config = _ChartConfig2.default.fBaseAreaConfig();


          _EuroStatFn2.default.setDataAndInfo({ config: config, data: data, json: json, option: option });
          _EuroStatFn2.default.setLineExtrems({ config: config, max: max, min: min });

          return config;
     },
     createSeria: function createSeria(json, option) {
          var timeIndex = json.dimension.time.category.index,
              value = json.value,
              valueText = option.itemCaption,
              seria = _ChartConfig2.default.fSeries(),
              _EuroStatFn$createDat2 = _EuroStatFn2.default.createData(timeIndex, value),
              data = _EuroStatFn$createDat2.data;
          //, { data } = _fnCreateData(timeIndex, value);

          seria.zhSeriaId = option.key;
          seria.zhValueText = valueText;
          seria.data = data;

          seria.minY = _EuroStatFn2.default.findMinY(data);

          return seria;
     }
};

exports.default = toArea;
//# sourceMappingURL=toArea.js.map