"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoizeOne = _interopRequireDefault(require("memoize-one"));
const _isArr = Array.isArray;
const _findItem = (item, chartType) => {
  if (_isArr(item.items)) {
    for (const subItem of item.items) {
      if (subItem.id === chartType) {
        return subItem;
      }
    }
  } else if (item.id === chartType) {
    return item;
  }
};
const findItem = (menu, chartType) => {
  if (!_isArr(menu)) {
    return;
  }
  for (const topics of menu) {
    const items = topics.items;
    if (_isArr(items)) {
      for (const item of items) {
        const _item = _findItem(item, chartType);
        if (_item) {
          return _item;
        }
      }
    } else {
      const _item = _findItem(topics, chartType);
      if (_item) {
        return _item;
      }
    }
  }
};
const findItemSetValue = (menu, chartType) => ((findItem(menu, chartType) || {}).atomBadge || {}).setValue;
var _default = (0, _memoizeOne.default)(findItemSetValue);
exports.default = _default;
//# sourceMappingURL=findItem.js.map