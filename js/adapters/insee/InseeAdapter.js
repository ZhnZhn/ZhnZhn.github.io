"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _fnDescr = _interopRequireDefault(require("./fnDescr"));

var Builder = _crConfigType["default"].Builder,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    compareByDate = _AdapterFn["default"].compareByDate,
    findMinY = _AdapterFn["default"].findMinY,
    _parser = new window.DOMParser(); //€


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

    _seria.childNodes.forEach(function (node) {
      _v = parseFloat(node.getAttribute('OBS_VALUE'));

      if (!Number.isNaN(_v)) {
        data.push([ymdToUTC(node.getAttribute('TIME_PERIOD')), _v]);
      }
    });
  }

  return {
    data: data.sort(compareByDate),
    info: info
  };
};

var _crConfigOption = function _crConfigOption(_ref, info) {
  var value = _ref.value,
      title = _ref.title;
  return {
    info: _fnDescr["default"].toInfo(info, title),
    zhConfig: _crZhConfig(value)
  };
};

var InseeAdapter = {
  toConfig: function toConfig(str, option) {
    var _toData2 = _toData(str),
        data = _toData2.data,
        info = _toData2.info,
        confOption = _crConfigOption(option, info);

    return {
      config: (0, _crConfigType["default"])({
        option: option,
        data: data,
        confOption: confOption
      })
    };
  },
  toSeries: function toSeries(str, option) {
    var value = option.value,
        title = option.title,
        subtitle = option.subtitle,
        _text = subtitle ? subtitle : title,
        _toData3 = _toData(str),
        data = _toData3.data;

    return Builder().initSeria({
      minY: findMinY
    }).addPoints(value, data, _text).toSeria();
  }
};
var _default = InseeAdapter;
exports["default"] = _default;
//# sourceMappingURL=InseeAdapter.js.map