"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crArrQuery = _interopRequireDefault(require("./crArrQuery"));

var _crQueryItem = _interopRequireDefault(require("./crQueryItem"));

const _isCategory = seriaType => seriaType === "BAR_CLUSTER" || seriaType === "BAR_SET" || seriaType === "COLUMN_SET" || seriaType === "COLUMN_CLUSTER" || seriaType === "TREE_MAP" || seriaType === "TREE_MAP_CLUSTER" || seriaType === "TREE_MAP_2" || seriaType === "TREE_MAP_2_CLUSTER";

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
    dfC,
    seriaType
  } = option;

  if (dfC && _isCategory(seriaType)) {
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

var _default = crDfArrQuery;
exports.default = _default;
//# sourceMappingURL=crDfArrQuery.js.map