"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crDfArrQuery = _interopRequireDefault(require("./crDfArrQuery"));

var _crQueryItem = _interopRequireDefault(require("./crQueryItem"));

const _isCategory = seriaType => seriaType === "BAR_CLUSTER" || seriaType === "BAR_SET" || seriaType === "COLUMN_SET" || seriaType === "COLUMN_CLUSTER" || seriaType === "TREE_MAP" || seriaType === "TREE_MAP_CLUSTER" || seriaType === "TREE_MAP_2" || seriaType === "TREE_MAP_2_CLUSTER";

const _checkSeriaCategory = option => {
  const arrQuery = (0, _crDfArrQuery.default)(option),
        {
    dfC,
    seriaType
  } = option;

  if (dfC && _isCategory(seriaType)) {
    const _arr = arrQuery.filter(item => item.code !== dfC);

    _arr.unshift((0, _crQueryItem.default)(dfC, 'all', '*'));

    return _arr;
  }

  return arrQuery;
};

const crDfQuery = option => ({
  method: 'POST',
  body: JSON.stringify({
    query: _checkSeriaCategory(option),
    response: {
      format: "json-stat"
    }
  })
});

var _default = crDfQuery;
exports.default = _default;
//# sourceMappingURL=crDfQuery.js.map