"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _apiFn = _interopRequireDefault(require("./apiFn"));

var _mapFn = _interopRequireDefault(require("./mapFn"));

var URL = _apiFn["default"].URL,
    QUERY_TAIL = _apiFn["default"].QUERY_TAIL,
    isCategory = _apiFn["default"].isCategory,
    isMap = _apiFn["default"].isMap;
var createMapValue = _mapFn["default"].createMapValue,
    createMapSlice = _mapFn["default"].createMapSlice;

var crUrl = function crUrl(option) {
  var seriaType = option.seriaType,
      metric = option.metric,
      geo = option.geo,
      itemMap = option.itemMap,
      time = option.time;

  if (!isCategory(seriaType)) {
    var _geo = "geo=" + geo,
        _metric = metric.indexOf('?') === -1 ? metric + "?" : metric;

    return "" + URL + _metric + "&" + _geo + QUERY_TAIL;
  }

  var mapValue = itemMap.mapValue,
      mapSlice = itemMap.mapSlice,
      _mapValue = mapValue || createMapValue(option, itemMap);

  if (isMap(seriaType)) {
    option.zhMapSlice = mapSlice ? (0, _extends2["default"])({}, mapSlice, {
      time: time
    }) : (0, _extends2["default"])({}, createMapSlice(option, itemMap), {
      time: time
    });
    return "" + URL + _mapValue;
  } else {
    return "" + URL + _mapValue + "&time=" + time;
  }
};

var _default = crUrl;
exports["default"] = _default;
//# sourceMappingURL=crUrl.js.map