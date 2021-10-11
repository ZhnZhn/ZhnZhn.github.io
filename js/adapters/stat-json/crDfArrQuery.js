"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crArrQuery = _interopRequireDefault(require("./crArrQuery"));

var _crQueryItem = _interopRequireDefault(require("./crQueryItem"));

const _checkTop = (isTop, strN, arr) => {
  if (isTop) {
    arr.push((0, _crQueryItem.default)('Tid', 'top', strN));
  }
};

const crDfArrQuery = ({
  items = [],
  isTop12,
  isTop6
}) => {
  const arrQuery = (0, _crArrQuery.default)(items);

  _checkTop(isTop12, '12', arrQuery);

  _checkTop(isTop6, '6', arrQuery);

  return arrQuery;
};

var _default = crDfArrQuery;
exports.default = _default;
//# sourceMappingURL=crDfArrQuery.js.map