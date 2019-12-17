"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _apiFn = _interopRequireDefault(require("./apiFn"));

var _mapFn = _interopRequireDefault(require("./mapFn"));

var URL = _apiFn["default"].URL,
    DF_TAIL = _apiFn["default"].DF_TAIL,
    isCategory = _apiFn["default"].isCategory;
var toQuery = _mapFn["default"].toQuery,
    toMapSlice = _mapFn["default"].toMapSlice;

var crUrlWithParams = function crUrlWithParams(option) {
  var seriaType = option.seriaType,
      dfTable = option.dfTable,
      time = option.time;

  if (!isCategory(seriaType)) {
    var _q = toQuery(option);

    return "" + URL + dfTable + "?" + _q + "&" + DF_TAIL;
  }

  var _toMapSlice = toMapSlice(DF_TAIL, option),
      query = _toMapSlice.query,
      zhMapSlice = _toMapSlice.zhMapSlice,
      _url = "" + URL + dfTable + "?" + query;

  if (seriaType === 'MAP') {
    option.zhMapSlice = zhMapSlice;
    return _url;
  } else {
    return _url + "&time=" + time;
  }
};

var _default = crUrlWithParams;
exports["default"] = _default;
//# sourceMappingURL=crUrlWithParams.js.map