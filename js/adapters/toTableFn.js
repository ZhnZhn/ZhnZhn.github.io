"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crTableRows = exports.crTableConfig = void 0;

var _AdapterFn = _interopRequireDefault(require("./AdapterFn"));

const {
  numberFormat,
  roundBy
} = _AdapterFn.default;

const _isNumber = n => typeof n === 'number',
      _replaceNaN = function (n, str) {
  if (str === void 0) {
    str = '';
  }

  return n - n === 0 ? n : str;
};

const _getCellValue = (r, h) => {
  const {
    pn,
    toN
  } = h,
        _isToNumber = !!toN,
        _toFixedBy = _isToNumber && toN[0],
        _strV = r[pn];

  return _isToNumber ? _isNumber(_toFixedBy) ? roundBy(_strV, _toFixedBy) : _replaceNaN(parseFloat(_strV)) : _strV;
};

const crTableConfig = _ref => {
  let {
    id,
    title,
    headers,
    rows,
    dataSource,
    fns
  } = _ref;
  return {
    id,
    title,
    headers,
    tableFn: {
      numberFormat,
      ...fns
    },
    rows,
    dataSource,
    zhCompType: 'TABLE',
    zhConfig: {
      id: id,
      key: id
    }
  };
};

exports.crTableConfig = crTableConfig;

const crTableRows = function (headers, rows, idPropName) {
  if (headers === void 0) {
    headers = [];
  }

  if (rows === void 0) {
    rows = [];
  }

  if (idPropName === void 0) {
    idPropName = 'id';
  }

  return rows.map((r, rIndex) => {
    headers.forEach(h => {
      r[h.pn] = _getCellValue(r, h);
    });
    r.id = r[idPropName] || "id" + rIndex;
    return r;
  });
};

exports.crTableRows = crTableRows;
//# sourceMappingURL=toTableFn.js.map