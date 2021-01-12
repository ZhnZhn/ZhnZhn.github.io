"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("./AdapterFn"));

var _crTableConfig = _interopRequireDefault(require("./crTableConfig"));

var roundBy = _AdapterFn["default"].roundBy;

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
},
    _replaceNaN = function _replaceNaN(n, str) {
  if (str === void 0) {
    str = '';
  }

  return n - n === 0 ? n : str;
};

var _getCellValue = function _getCellValue(r, h) {
  var pn = h.pn,
      toN = h.toN,
      _isToNumber = !!toN,
      _toFixedBy = _isToNumber && toN[0],
      _strV = r[pn];

  return _isToNumber ? _isNumber(_toFixedBy) ? roundBy(_strV, _toFixedBy) : _replaceNaN(parseFloat(_strV)) : _strV;
};

var toTableFn = {
  crTableConfig: _crTableConfig["default"],
  crRows: function crRows(headers, rows, idPropName) {
    if (headers === void 0) {
      headers = [];
    }

    if (rows === void 0) {
      rows = [];
    }

    if (idPropName === void 0) {
      idPropName = 'id';
    }

    return rows.map(function (r, rIndex) {
      headers.forEach(function (h) {
        r[h.pn] = _getCellValue(r, h);
      });
      r.id = r[idPropName] || "id" + rIndex;
      return r;
    });
  }
};
var _default = toTableFn;
exports["default"] = _default;
//# sourceMappingURL=toTableFn.js.map