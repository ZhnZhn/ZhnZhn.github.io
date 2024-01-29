"use strict";

exports.__esModule = true;
exports.crTableRows = exports.crTableOptions = exports.crTableConfig = exports.crNumberProps = exports.crNameProps = void 0;
var _AdapterFn = require("./AdapterFn");
const _isStr = v => typeof v === 'string';
const crNameProps = (name, pnOrIsHideOrVoid, isHideOrVoid) => {
  const [pn, isHide] = _isStr(pnOrIsHideOrVoid) ? [pnOrIsHideOrVoid, isHideOrVoid] : [name.toLowerCase(), pnOrIsHideOrVoid];
  return {
    name,
    pn,
    isHide
  };
};
exports.crNameProps = crNameProps;
const crNumberProps = n => ({
  toN: [n],
  isF: true,
  style: {
    fontWeight: 'bold'
  }
});
exports.crNumberProps = crNumberProps;
const _replaceNaN = function (n, str) {
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
  return _isToNumber ? (0, _AdapterFn.isTypeNumber)(_toFixedBy) ? (0, _AdapterFn.roundBy)(_strV, _toFixedBy) : _replaceNaN(parseFloat(_strV)) : _strV;
};
const crTableOptions = (id, title, headers, rows, dataSource, fns) => ({
  id,
  title,
  headers,
  rows,
  dataSource,
  tableFn: {
    numberFormat: _AdapterFn.numberFormat,
    ...fns
  }
});
exports.crTableOptions = crTableOptions;
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
    ...crTableOptions(id, title, headers, rows, dataSource, fns),
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
    r.id = r[idPropName] || `id${rIndex}`;
    return r;
  });
};
exports.crTableRows = crTableRows;
//# sourceMappingURL=toTableFn.js.map