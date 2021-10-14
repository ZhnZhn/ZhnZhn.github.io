"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crQueryItem = _interopRequireDefault(require("./crQueryItem"));

const crArrQuery = items => {
  const arrQuery = [];
  items.forEach(item => {
    const {
      slice
    } = item || {};

    for (const propName in slice) {
      arrQuery.push((0, _crQueryItem.default)(propName, 'item', slice[propName]));
    }
  });
  return arrQuery;
};

var _default = crArrQuery;
exports.default = _default;
//# sourceMappingURL=crArrQuery.js.map