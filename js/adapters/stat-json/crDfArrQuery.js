"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("../CategoryFn");
var _crArrQuery = _interopRequireDefault(require("./crArrQuery"));
var _crQueryItem = _interopRequireDefault(require("./crQueryItem"));
const _checkTop = (isTop, strN, arr) => {
  if (isTop) {
    arr.push((0, _crQueryItem.default)('Tid', 'top', strN));
  }
};
const crDfArrQuery = option => {
  const {
      items = [],
      isTop12,
      isTop6
    } = option,
    arrQuery = (0, _crArrQuery.default)(items);
  const {
    dfC
  } = option;
  if (dfC && (0, _CategoryFn.isCategorySeriaType)(option)) {
    const {
        time,
        timeId = 'Tid'
      } = option,
      _arr = arrQuery.filter(item => item.code !== dfC);
    _arr.unshift((0, _crQueryItem.default)(dfC, 'all', '*'));
    _arr.unshift((0, _crQueryItem.default)(timeId, 'item', time));
    return _arr;
  }
  _checkTop(isTop12, '12', arrQuery);
  _checkTop(isTop6, '6', arrQuery);
  return arrQuery;
};
var _default = exports.default = crDfArrQuery;
//# sourceMappingURL=crDfArrQuery.js.map