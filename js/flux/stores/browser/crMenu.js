"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ComponentActions = _interopRequireDefault(require("../../actions/ComponentActions"));

var _ChartActions = _interopRequireDefault(require("../../actions/ChartActions"));

var _crItemHandlers = function _crItemHandlers(dT, bT) {
  return {
    onClick: _ComponentActions["default"].showDialog.bind(null, dT, bT),
    onBadgeClick: _ChartActions["default"].showChart.bind(null, dT, bT),
    onBadgeClose: _ComponentActions["default"].closeChartContainer2.bind(null, dT)
  };
};

var crMenu = function crMenu(menu, menuItems, browserType) {
  if (menu === void 0) {
    menu = [];
  }

  return menu.map(function (menuPart) {
    var caption = menuPart.caption,
        isInitOpen = menuPart.isInitOpen,
        _menuPart$items = menuPart.items,
        items = _menuPart$items === void 0 ? [] : _menuPart$items,
        _items = items.map(function (item) {
      var id = item.id,
          _item$isNew = item.isNew,
          isNew = _item$isNew === void 0 ? false : _item$isNew;
      return (0, _extends2["default"])({
        id: id,
        title: menuItems[id].menuTitle,
        isNew: isNew,
        counter: 0,
        isOpen: false
      }, _crItemHandlers(id, browserType));
    });

    return {
      caption: caption,
      isInitOpen: isInitOpen,
      items: _items
    };
  });
};

var _default = crMenu;
exports["default"] = _default;
//# sourceMappingURL=crMenu.js.map