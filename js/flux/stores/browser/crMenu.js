"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ComponentActions = require("../../actions/ComponentActions");

var _ChartActions = require("../../actions/ChartActions");

const _crItemHandlers = (dT, bT) => ({
  onClick: _ComponentActions.ComponentActions.showDialog.bind(null, dT, bT),
  onBadgeClick: _ChartActions.ChartActions[_ChartActions.CHAT_SHOW].bind(null, dT, bT),
  onBadgeClose: _ComponentActions.ComponentActions.closeChartContainer2.bind(null, dT)
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
    isOpen: false,
    counter: 0,
    ..._crItemHandlers(id, browserType)
  };
};

const _crItems = function (items, menuItems, browserType) {
  if (items === void 0) {
    items = [];
  }

  return items.map(item => item.id ? _crItem(item, menuItems, browserType) : {
    caption: item.caption,
    items: _crItems(item.items, menuItems, browserType)
  });
};

const crMenu = function (menu, menuItems, browserType) {
  if (menu === void 0) {
    menu = [];
  }

  return menu.map(menuPart => {
    const {
      caption,
      isInitOpen,
      items
    } = menuPart,
          _items = _crItems(items, menuItems, browserType);

    return {
      caption,
      isInitOpen,
      items: _items
    };
  });
};

var _default = crMenu;
exports.default = _default;
//# sourceMappingURL=crMenu.js.map