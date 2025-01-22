"use strict";

exports.__esModule = true;
exports.crTableRows = exports.crTableOptions = exports.crTableFlatHeaders = exports.crTableConfig = exports.crStyleCenter = exports.crStyleBold = exports.crRankProps = exports.crNumberProps = exports.crNameProps = exports.crCaptionItemsProps = void 0;
var _AdapterFn = require("./AdapterFn");
const crNameProps = (name, pnOrIsHideOrVoid, isHideOrVoid) => {
  const [pn, isHide] = (0, _AdapterFn.isStr)(pnOrIsHideOrVoid) ? [pnOrIsHideOrVoid, isHideOrVoid] : [name.toLowerCase(), pnOrIsHideOrVoid];
  return {
    name,
    pn,
    isHide
  };
};
exports.crNameProps = crNameProps;
const _crStyle = styleProps => ({
  style: styleProps
});
const crStyleBold = styleProps => _crStyle({
  fontWeight: "bold",
  ...styleProps
});
exports.crStyleBold = crStyleBold;
const crStyleCenter = styleProps => _crStyle({
  textAlign: "center",
  ...styleProps
});
exports.crStyleCenter = crStyleCenter;
const crNumberProps = n => ({
  toN: [n],
  isF: true,
  ...crStyleBold()
});
exports.crNumberProps = crNumberProps;
const crRankProps = function (title, propName) {
  if (title === void 0) {
    title = "Rank";
  }
  return {
    ...crNameProps(title, propName),
    toN: [],
    ...crStyleCenter()
  };
};
exports.crRankProps = crRankProps;
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
const crTableOptions = (id, title, headers, flatHeaders, rows, dataSource, fns) => ({
  id,
  title,
  headers,
  flatHeaders,
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
    flatHeaders,
    rows,
    dataSource,
    fns
  } = _ref;
  return {
    ...crTableOptions(id, title, headers, flatHeaders, rows, dataSource, fns),
    zhCompType: "TABLE",
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
    idPropName = "id";
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
const crCaptionItemsProps = (caption, items) => ({
  caption,
  items
});
exports.crCaptionItemsProps = crCaptionItemsProps;
const _setIdToHeaderItem = (id, item) => {
    if (id !== 0) {
      item.id = id;
    }
    return item;
  },
  _addItemTo = (arr, item, id) => {
    arr.push(_setIdToHeaderItem(id, item));
    return id + 1;
  };
const crTableFlatHeaders = headers => {
  const _arr = [];
  let id = 0;
  for (const header of headers) {
    if ((0, _AdapterFn.isArr)(header.items)) {
      for (const headerItem of header.items) {
        id = _addItemTo(_arr, headerItem, id);
      }
    } else {
      id = _addItemTo(_arr, header, id);
    }
  }
  return _arr;
};
exports.crTableFlatHeaders = crTableFlatHeaders;
//# sourceMappingURL=toTableFn.js.map