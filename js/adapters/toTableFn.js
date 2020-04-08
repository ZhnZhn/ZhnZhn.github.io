"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("./AdapterFn"));

var roundBy = _AdapterFn["default"].roundBy;
var DF = {
  TO_FIXED_BY: 2
};

var _getCellValue = function _getCellValue(r, h) {
  var pn = h.pn,
      isToN = h.isToN,
      isToFixed = h.isToFixed,
      _h$toFixedBy = h.toFixedBy,
      toFixedBy = _h$toFixedBy === void 0 ? DF.TO_FIXED_BY : _h$toFixedBy;
  return isToN ? isToFixed ? roundBy(r[pn], toFixedBy) : parseFloat(r[pn]) : r[pn];
};

var toTableFn = {
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

    return rows.map(function (r) {
      headers.forEach(function (h) {
        r[h.pn] = _getCellValue(r, h);
      });
      r.id = r[idPropName];
      return r;
    });
  }
};
var _default = toTableFn;
exports["default"] = _default;
//# sourceMappingURL=toTableFn.js.map