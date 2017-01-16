'use strict';

Object.defineProperty(exports, "__esModule", {
     value: true
});

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _EuroStatFn = require('./EuroStatFn');

var _EuroStatFn2 = _interopRequireDefault(_EuroStatFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toMap = {
     createConfig: function createConfig(json, option) {
          var timeIndex = json.dimension.time.category.index,
              value = json.value,
              _EuroStatFn$createDat = _EuroStatFn2.default.createData(timeIndex, value),
              data = _EuroStatFn$createDat.data,
              config = _ChartConfig2.default.fBaseAreaConfig();


          _EuroStatFn2.default.setDataAndInfo({ config: config, data: data, json: json, option: option });

          config.zhDialog = option;
          config.zhDialog.apiKey = '';
          config.json = json;
          config.zhMapSlice = option.zhMapSlice;

          return config;
     }
};

exports.default = toMap;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\eurostat\toMap.js.map