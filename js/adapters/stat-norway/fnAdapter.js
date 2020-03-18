"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsonstat = _interopRequireDefault(require("jsonstat"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var isYNumber = _AdapterFn["default"].isYNumber,
    numberFormat = _AdapterFn["default"].numberFormat,
    crId = _AdapterFn["default"].crId,
    roundBy = _AdapterFn["default"].roundBy,
    valueMoving = _AdapterFn["default"].valueMoving,
    crItemConf = _AdapterFn["default"].crItemConf;
var TITLE = {
  NST: 'Statisctics Norway: All Items',
  SWS: 'Statisctics Sweden: All Items'
};
var SEARCH = {
  NST: {
    url: 'https://www.ssb.no/en/sok?sok=',
    title: 'Statistics Norway Search'
  },
  SWS: {
    url: 'https://www.scb.se/en/finding-statistics/search/?query=',
    title: 'Statistics Sweden Search'
  },
  SFL: {
    url: 'http://pxnet2.stat.fi/PXWeb/pxweb/en/StatFin/',
    title: "Statistics Finland's PX-Web"
  }
};
var DF_SOURCE = 'Unknown';
var MAX_SOURCE_ID_LENGTH = 9;

var _crSearchToken = function _crSearchToken(label) {
  var _arr = (label || '').toString().split(',');

  return _arr[0] || '';
};

var _crLink = function _crLink(token, _ref) {
  var url = _ref.url,
      title = _ref.title;
  return "<a class=\"native-link\" href=\"" + url + token + "\">" + title + "</a>";
};

var _crToken = function _crToken(_ref2) {
  var dfId = _ref2.dfId;
  var arr = ('' + dfId).split('/'),
      id = arr.pop(),
      prefix = arr.join('__');
  return prefix && id ? "StatFin__" + prefix + "/" + id : '';
};

var _crSearchLink = function _crSearchLink(label, option) {
  var _token = _crSearchToken(label);

  switch (option.loadId) {
    case 'NST':
    case 'NST_2':
      return _crLink(_token, SEARCH.NST);

    case 'SWS':
      return _crLink(_token, SEARCH.SWS);

    case 'SFL':
      return _crLink(_crToken(option), SEARCH.SFL);

    default:
      return '';
  }
};

var _crDescr = function _crDescr(_ref3, option) {
  var _ref3$updated = _ref3.updated,
      updated = _ref3$updated === void 0 ? '' : _ref3$updated,
      _ref3$source = _ref3.source,
      source = _ref3$source === void 0 ? DF_SOURCE : _ref3$source,
      label = _ref3.label;

  var _date = updated.replace('T', ' ').replace('Z', ''),
      _option$dfId = option.dfId,
      dfId = _option$dfId === void 0 ? '' : _option$dfId,
      _elSearchLink = _crSearchLink(label, option);

  return "TableId: " + dfId + "<BR/>" + source + ": " + _date + "<BR/>" + _elSearchLink;
};

var _crItemCaption = function _crItemCaption(option) {
  var items = option.items,
      _option$dfId2 = option.dfId,
      dfId = _option$dfId2 === void 0 ? 'id' : _option$dfId2,
      caption = items[0] ? items[0].caption : 'All Items';
  return dfId + "_" + caption;
};

var _crAreaMapSlice = function _crAreaMapSlice(option) {
  var items = option.items,
      dfTSlice = option.dfTSlice,
      mapSlice = {};
  items.forEach(function (item) {
    if (item.slice) {
      Object.assign(mapSlice, item.slice);
    }
  });
  return Object.assign(mapSlice, dfTSlice);
};

var _getDimensionWithouTime = function _getDimensionWithouTime(ds) {
  var _dim = ds.Dimension("Year") || ds.Dimension("Vuosi") || ds.Dimension("Vuosineljännes") || ds.Dimension("Month");

  return _dim && _dim.id ? [_dim.id[0]] : ["2019"];
};

var _getTimeDimension = function _getTimeDimension(ds, timeId) {
  var _dimTimeId = timeId && ds.Dimension(timeId),
      _dim = _dimTimeId || ds.Dimension("Tid"),
      times = _dim && _dim.id || _getDimensionWithouTime(ds);

  return times;
};

var _crDataSource = function _crDataSource(_ref4) {
  var dataSource = _ref4.dataSource,
      dfId = _ref4.dfId;
  return dfId && ('' + dfId).length < MAX_SOURCE_ID_LENGTH ? dataSource + " (" + dfId + ")" : dataSource;
};

var fnAdapter = {
  isYNumber: isYNumber,
  numberFormat: numberFormat,
  crId: crId,
  roundBy: roundBy,
  crValueMoving: valueMoving,
  crTitle: function crTitle(option) {
    switch (option.browserType) {
      case 'NST':
      case 'NST_ALL':
        return TITLE.NST;

      case 'SWS':
      case 'SWS_ALL':
        return TITLE.SWS;

      default:
        return '';
    }
  },
  crDsValuesTimes: function crDsValuesTimes(json, option) {
    var mapSlice = _crAreaMapSlice(option),
        ds = (0, _jsonstat["default"])(json).Dataset(0),
        values = ds.Data(mapSlice),
        times = _getTimeDimension(ds, option.timeId);

    return {
      ds: ds,
      values: values,
      times: times
    };
  },
  crTid: function crTid(time, ds) {
    if (time) {
      return time;
    }

    var tidIds = _getTimeDimension(ds);

    return tidIds[tidIds.length - 1];
  },
  crInfo: function crInfo(ds, option) {
    return {
      name: ds.label || '',
      description: _crDescr(ds, option)
    };
  },
  crZhConfig: function crZhConfig(option) {
    var _itemKey = option._itemKey,
        url = option.url,
        optionFetch = option.optionFetch,
        items = option.items,
        dataSource = option.dataSource,
        dfId = option.dfId,
        timeId = option.timeId,
        key = _itemKey || crId(),
        itemCaption = option.itemCaption || _crItemCaption(option);

    return {
      id: key,
      key: key,
      itemCaption: itemCaption,
      itemConf: (0, _extends2["default"])({
        _itemKey: key
      }, crItemConf(option), {
        optionFetch: optionFetch,
        items: items,
        dataSource: dataSource,
        //sfl
        dfId: dfId,
        timeId: timeId
      }),
      isWithoutAdd: url ? false : true,
      dataSource: _crDataSource(option)
    };
  },
  crChartOption: function crChartOption(ds, data, option) {
    return {
      info: fnAdapter.crInfo(ds, option),
      valueMoving: fnAdapter.crValueMoving(data),
      zhConfig: fnAdapter.crZhConfig(option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map