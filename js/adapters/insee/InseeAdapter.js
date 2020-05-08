"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnDescr = _interopRequireDefault(require("./fnDescr"));

var _parser = new window.DOMParser(); //€


var _crZhConfig = function _crZhConfig(id) {
  return {
    id: id,
    key: id,
    dataSource: "INSEE"
  };
};

var _toData = function _toData(str) {
  var xml = _parser.parseFromString(str, 'text/xml'),
      series = xml.getElementsByTagName('Series'),
      data = [],
      info = [];

  var i = 0,
      max = series.length,
      _seria,
      _v;

  for (i; i < max; i++) {
    _seria = series[i];
    info.push({
      id: _seria.getAttribute('IDBANK'),
      title: _seria.getAttribute('TITLE_EN'),
      frequency: _seria.getAttribute('FREQ'),
      updatedOn: _seria.getAttribute('LAST_UPDATE'),
      unitMeasure: _seria.getAttribute('UNIT_MEASURE'),
      unitMult: _seria.getAttribute('UNIT_MULT')
    });

    _seria.childNodes.forEach(function (node) {
      _v = parseFloat(node.getAttribute('OBS_VALUE'));

      if (!Number.isNaN(_v)) {
        data.push([_AdapterFn["default"].ymdToUTC(node.getAttribute('TIME_PERIOD')), _v]);
      }
    });
  }

  return {
    data: data.sort(_AdapterFn["default"].compareByDate),
    info: info
  };
};

var InseeAdapter = {
  toConfig: function toConfig(str, option) {
    var value = option.value,
        title = option.title,
        subtitle = option.subtitle,
        _toData2 = _toData(str),
        data = _toData2.data,
        info = _toData2.info,
        config = (0, _ConfigBuilder["default"])().areaConfig({
      spacingTop: 25
    }).addCaption(title, subtitle).addPoints(value, data).addMinMax(data, option).add({
      info: _fnDescr["default"].toInfo(info, title),
      valueMoving: _AdapterFn["default"].valueMoving(data),
      zhConfig: _crZhConfig(value)
    }).toConfig();

    return {
      config: config
    };
  },
  toSeries: function toSeries(str, option) {
    var value = option.value,
        title = option.title,
        subtitle = option.subtitle,
        _text = subtitle ? subtitle : title,
        _toData3 = _toData(str),
        data = _toData3.data;

    return (0, _ConfigBuilder["default"])().initSeria().addPoints(value, data, _text).toSeria();
  }
};
var _default = InseeAdapter;
exports["default"] = _default;
//# sourceMappingURL=InseeAdapter.js.map