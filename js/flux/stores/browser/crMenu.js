'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ComponentActions = require('../../actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ChartActions = require('../../actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crItemHandlers = function _crItemHandlers(dT, bT) {
  return {
    onClick: _ComponentActions2.default.showDialog.bind(null, dT, bT),
    onBadgeClick: _ChartActions2.default.showChart.bind(null, dT, bT),
    onBadgeClose: _ComponentActions2.default.closeChartContainer2.bind(null, dT)
  };
};

var crMenu = function crMenu() {
  var menu = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var menuItems = arguments[1];
  var browserType = arguments[2];

  return menu.map(function (menuPart) {
    var caption = menuPart.caption,
        isInitOpen = menuPart.isInitOpen,
        _menuPart$items = menuPart.items,
        items = _menuPart$items === undefined ? [] : _menuPart$items,
        _items = items.map(function (item) {
      var id = item.id,
          _item$isNew = item.isNew,
          isNew = _item$isNew === undefined ? false : _item$isNew;

      return (0, _extends3.default)({
        id: id,
        title: menuItems[id].menuTitle,
        isNew: isNew,
        counter: 0,
        isOpen: false
      }, _crItemHandlers(id, browserType));
    });

    return {
      caption: caption, isInitOpen: isInitOpen,
      items: _items
    };
  });
};

exports.default = crMenu;
//# sourceMappingURL=crMenu.js.map