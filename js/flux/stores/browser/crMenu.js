"use strict";

exports.__esModule = true;
exports.default = void 0;
var _storeApi = require("../../storeApi");
var _ChartActions = require("../../actions/ChartActions");
var _compStore = require("../compStore");
const _isArr = Array.isArray,
  _isBool = v => typeof v === 'boolean',
  _getBoolProperty = property => _isBool(property) ? property : void 0;
const _crItemHandlers = (dT, bT) => ({
  onClick: (0, _storeApi.bindTo)(_compStore.showDialog, dT, bT),
  onBadgeClick: (0, _storeApi.bindTo)(_ChartActions.ChartActions[_ChartActions.CHAT_SHOW], dT, bT),
  onBadgeClose: (0, _storeApi.bindTo)(_compStore.closeChartCont, dT)
});
const _crItem = (_ref, menuItems, browserType) => {
  let {
    id,
    isNew = false
  } = _ref;
  return {
    id,
    title: menuItems[id].menuTitle,
    isNew: isNew,
    atomBadge: (0, _storeApi.atom)({
      is: false,
      value: 0
    }),
    ..._crItemHandlers(id, browserType)
  };
};
const _crItems = function (items, menuItems, browserType) {
  if (items === void 0) {
    items = [];
  }
  return items.map(item => item.id ? _crItem(item, menuItems, browserType) : {
    isInitOpen: _getBoolProperty(item.isInitOpen),
    caption: item.caption,
    items: _crItems(item.items, menuItems, browserType)
  });
};
const crMenu = function (menu, menuItems, browserType) {
  if (menu === void 0) {
    menu = [];
  }
  return menu.map(menuPart => _isArr(menuPart.items) ? {
    caption: menuPart.caption,
    isInitOpen: _getBoolProperty(menuPart.isInitOpen),
    items: _crItems(menuPart.items, menuItems, browserType)
  } : _crItem(menuPart, menuItems, browserType));
};
var _default = exports.default = crMenu;
//# sourceMappingURL=crMenu.js.map