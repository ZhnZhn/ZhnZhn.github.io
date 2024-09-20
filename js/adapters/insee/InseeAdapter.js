"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _configBuilderFn = require("../../charts/configBuilderFn");
var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _fnDescr = require("./fnDescr");
//€
const _crZhConfig = (id, caption) => ({
  id: id,
  key: id,
  itemCaption: caption,
  dataSource: 'INSEE'
});
const _crValueStatus = node => {
  const _status = node.getAttribute('OBS_STATUS');
  return _status && _status.length === 1 && _status !== 'A' ? _status.toLowerCase() : void 0;
};
const _toData = str => {
  const xml = (0, _AdapterFn.crXmlDocument)(str),
    series = xml.getElementsByTagName('Series'),
    data = [],
    seriesParams = [];
  let i = 0,
    max = (series || []).length,
    _seria,
    _getAttr,
    _childNodes,
    _v;
  for (i; i < max; i++) {
    _seria = series[i];
    _getAttr = _seria.getAttribute.bind(_seria);
    seriesParams.push({
      id: _getAttr('IDBANK'),
      title: _getAttr('TITLE_EN'),
      frequency: _getAttr('FREQ'),
      updatedOn: _getAttr('LAST_UPDATE'),
      unitMeasure: _getAttr('UNIT_MEASURE'),
      unitMult: _getAttr('UNIT_MULT')
    });
    _childNodes = _seria.childNodes || [];
    _childNodes.forEach(node => {
      _v = parseFloat(node.getAttribute('OBS_VALUE'));
      if (!(0, _AdapterFn.isNaN)(_v)) {
        data.push([(0, _AdapterFn.ymdToUTC)(node.getAttribute('TIME_PERIOD')), _v, _crValueStatus(node)]);
      }
    });
  }
  return [data.sort(_compareByFn.compareByDate), seriesParams];
};
const _crConfigOption = (option, seriesParams) => ({
  info: (0, _fnDescr.crInfo)(option.title, option.subtitle, seriesParams),
  zhConfig: _crZhConfig(option._itemKey || option.value, option.value)
});
const InseeAdapter = {
  toConfig(str, option) {
    const [data, seriesParams] = _toData(str);
    return {
      config: (0, _crConfigType.default)({
        option,
        data,
        confOption: _crConfigOption(option, seriesParams)
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
var _default = exports.default = InseeAdapter;
//# sourceMappingURL=InseeAdapter.js.map