"use strict";

exports.__esModule = true;
exports.default = void 0;
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
let _recentSetValue, _recentChartType, _recentMenu;
const findItemSetValue = (menu, chartType) => menu === _recentMenu && chartType === _recentChartType ? _recentSetValue : (_recentMenu = menu, _recentChartType = chartType, _recentSetValue = ((findItem(menu, chartType) || {}).atomBadge || {}).setValue, _recentSetValue);
var _default = exports.default = findItemSetValue;
//# sourceMappingURL=findItem.js.map