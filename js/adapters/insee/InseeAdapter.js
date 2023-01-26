"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _configBuilderFn = require("../../charts/configBuilderFn");
var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _fnDescr = _interopRequireDefault(require("./fnDescr"));
const _parser = new window.DOMParser(),
  _isNaN = Number.isNaN;

//€

const _crZhConfig = id => ({
  id: id,
  key: id,
  dataSource: "INSEE"
});
const _toData = str => {
  const xml = _parser.parseFromString(str, 'text/xml'),
    series = xml.getElementsByTagName('Series'),
    data = [],
    info = [];
  let i = 0,
    max = series.length,
    _seria,
    _getAttr,
    _v;
  for (i; i < max; i++) {
    _seria = series[i];
    _getAttr = _seria.getAttribute.bind(_seria);
    info.push({
      id: _getAttr('IDBANK'),
      title: _getAttr('TITLE_EN'),
      frequency: _getAttr('FREQ'),
      updatedOn: _getAttr('LAST_UPDATE'),
      unitMeasure: _getAttr('UNIT_MEASURE'),
      unitMult: _getAttr('UNIT_MULT')
    });
    _seria.childNodes.forEach(node => {
      _v = parseFloat(node.getAttribute('OBS_VALUE'));
      if (!_isNaN(_v)) {
        data.push([(0, _AdapterFn.ymdToUTC)(node.getAttribute('TIME_PERIOD')), _v]);
      }
    });
  }
  return [data.sort(_compareByFn.compareByDate), info];
};
const _crConfigOption = (_ref, info) => {
  let {
    value,
    title
  } = _ref;
  return {
    info: _fnDescr.default.toInfo(info, title),
    zhConfig: _crZhConfig(value)
  };
};
const InseeAdapter = {
  toConfig(str, option) {
    const [data, info] = _toData(str);
    return {
      config: (0, _crConfigType.default)({
        option,
        data,
        confOption: _crConfigOption(option, info)
      })
    };
  },
  toSeries(str, option) {
    const {
        value,
        title,
        subtitle
      } = option,
      data = _toData(str)[0];
    return (0, _configBuilderFn.crSeriaConfig)({
      data,
      minY: (0, _AdapterFn.findMinY)(data),
      zhValueText: subtitle || title || value
    });
  }
};
var _default = InseeAdapter;
exports.default = _default;
//# sourceMappingURL=InseeAdapter.js.map