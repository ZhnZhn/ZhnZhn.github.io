'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _EuroStatFn = require('./EuroStatFn');

var _EuroStatFn2 = _interopRequireDefault(_EuroStatFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crTimeIndexAndValue = function _crTimeIndexAndValue(json) {
  var _json$dimension = json.dimension,
      dimension = _json$dimension === undefined ? {} : _json$dimension,
      _json$value = json.value,
      value = _json$value === undefined ? [] : _json$value,
      _dimension$time = dimension.time,
      time = _dimension$time === undefined ? {} : _dimension$time,
      _time$category = time.category,
      category = _time$category === undefined ? {} : _time$category,
      _category$index = category.index,
      timeIndex = _category$index === undefined ? 0 : _category$index;

  return { timeIndex: timeIndex, value: value };
};

var toArea = {
  createConfig: function createConfig(json, option) {
    var _crTimeIndexAndValue2 = _crTimeIndexAndValue(json),
        timeIndex = _crTimeIndexAndValue2.timeIndex,
        value = _crTimeIndexAndValue2.value,
        isNotZoomToMinMax = option.isNotZoomToMinMax,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        _EuroStatFn$createDat = _EuroStatFn2.default.createData(timeIndex, value),
        data = _EuroStatFn$createDat.data,
        max = _EuroStatFn$createDat.max,
        min = _EuroStatFn$createDat.min,
        config = _ChartConfig2.default.fBaseAreaConfig({
      seriaType: seriaType.toLowerCase(),
      seriaColor: seriaColor
    });

    _EuroStatFn2.default.setDataAndInfo({ config: config, data: data, json: json, option: option });
    _EuroStatFn2.default.setLineExtrems({ config: config, max: max, min: min, isNotZoomToMinMax: isNotZoomToMinMax });

    return config;
  },

  createSeria: function createSeria(json, option) {
    var _crTimeIndexAndValue3 = _crTimeIndexAndValue(json),
        timeIndex = _crTimeIndexAndValue3.timeIndex,
        value = _crTimeIndexAndValue3.value,
        itemCaption = option.itemCaption,
        seriaColor = option.seriaColor,
        seria = _ChartConfig2.default.fSeries(),
        _EuroStatFn$createDat2 = _EuroStatFn2.default.createData(timeIndex, value),
        data = _EuroStatFn$createDat2.data;

    return Object.assign(seria, {
      zhSeriaId: option.key,
      zhValueText: itemCaption,
      color: seriaColor,
      data: data,
      minY: _EuroStatFn2.default.findMinY(data)
    });
  }
};

exports.default = toArea;
//# sourceMappingURL=toArea.js.map