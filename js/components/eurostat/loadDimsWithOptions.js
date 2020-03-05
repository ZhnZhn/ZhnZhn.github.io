"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _loadJson = _interopRequireDefault(require("./loadJson"));

var _isArr = Array.isArray;

var _toFirstUpperCase = function _toFirstUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

var _crDimOptions = function _crDimOptions(_ref) {
  var values = _ref.values,
      valueTexts = _ref.valueTexts,
      code = _ref.code;

  if (!_isArr(values) || !_isArr(valueTexts) || values.length !== valueTexts.length) {
    return;
  }

  var _arr = [];

  for (var i = 0; i < valueTexts.length; i++) {
    var _slice;

    _arr.push({
      caption: valueTexts[i],
      slice: (_slice = {}, _slice[code] = values[i], _slice)
    });
  }

  return _arr;
};

var TIME_IDS = ['Tid', 'Year', 'Month', 'Vuosi', 'Vuosineljännes'];
var FREQUENCY_HM = {
  month: 'M',
  quarter: 'K'
};

var _crDimsConfig = function _crDimsConfig(json) {
  var dims = [],
      _json$variables = json.variables,
      variables = _json$variables === void 0 ? [] : _json$variables;
  var timeId,
      mapFrequency = 'Y';
  variables.forEach(function (item) {
    var code = item.code,
        time = item.time,
        _text = item.text || '';

    if (!time && TIME_IDS.indexOf(code) === -1) {
      dims.push({
        c: _toFirstUpperCase(_text),
        v: code,
        options: _crDimOptions(item)
      });
    } else {
      timeId = code;
      mapFrequency = FREQUENCY_HM[_text.toLowerCase()];
    }
  });
  return {
    mapFrequency: mapFrequency,
    dims: dims,
    timeId: timeId
  };
};

var loadDimsWithOptions = function loadDimsWithOptions(url) {
  return (0, _loadJson["default"])(url).then(_crDimsConfig);
};

var _default = loadDimsWithOptions;
exports["default"] = _default;
//# sourceMappingURL=loadDimsWithOptions.js.map