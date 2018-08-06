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
        var _fn$crTimeIndexAndVal = _EuroStatFn2.default.crTimeIndexAndValue(json),
            timeIndex = _fn$crTimeIndexAndVal.timeIndex,
            value = _fn$crTimeIndexAndVal.value,
            isNotZoomToMinMax = option.isNotZoomToMinMax,
            seriaType = option.seriaType,
            seriaColor = option.seriaColor,
            _fn$createData = _EuroStatFn2.default.createData(timeIndex, value),
            data = _fn$createData.data,
            max = _fn$createData.max,
            min = _fn$createData.min,
            _type = typeof seriaType === 'string' ? seriaType.toLowerCase() : 'spline',
            config = _ChartConfig2.default.fBaseAreaConfig({
            seriaType: _type,
            seriaColor: seriaColor
        });

        _EuroStatFn2.default.setDataAndInfo({ config: config, data: data, json: json, option: option });
        _EuroStatFn2.default.setLineExtrems({ config: config, max: max, min: min, isNotZoomToMinMax: isNotZoomToMinMax });

        return config;
    },

    createSeria: function createSeria(json, option) {
        var _fn$crTimeIndexAndVal2 = _EuroStatFn2.default.crTimeIndexAndValue(json),
            timeIndex = _fn$crTimeIndexAndVal2.timeIndex,
            value = _fn$crTimeIndexAndVal2.value,
            itemCaption = option.itemCaption,
            seriaType = option.seriaType,
            seriaColor = option.seriaColor,
            seria = _ChartConfig2.default.fSeries({ seriaType: seriaType }),
            _fn$createData2 = _EuroStatFn2.default.createData(timeIndex, value),
            data = _fn$createData2.data;

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