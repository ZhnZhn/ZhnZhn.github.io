'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComponentActions = require('../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ChartActions = require('../flux/actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnClick = function fnClick(dialogType, browserType) {
  return _ComponentActions2.default.showDialog.bind(null, dialogType, browserType);
};

var fnBadgeClick = function fnBadgeClick(dialogType, browserType) {
  return _ChartActions2.default.showChart.bind(null, dialogType, browserType);
};
var fnBadgeClose = function fnBadgeClose(chartType) {
  return _ComponentActions2.default.closeChartContainer2.bind(null, chartType);
};

var fnCreateMenu = function fnCreateMenu() {
  var menu = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var data = arguments[1];
  var browserType = arguments[2];

  return menu.map(function (menuPart) {
    var caption = menuPart.caption,
        isInitOpen = menuPart.isInitOpen,
        _menuPart$items = menuPart.items,
        items = _menuPart$items === undefined ? [] : _menuPart$items,
        _items = items.map(function (item, index) {
      var id = item.id,
          _item$isNew = item.isNew,
          isNew = _item$isNew === undefined ? false : _item$isNew;

      return {
        id: id,
        title: data[id].menuTitle,
        isNew: isNew,
        counter: 0,
        isOpen: false,
        onClick: fnClick(id, browserType),
        onBadgeClick: fnBadgeClick(id, browserType),
        onBadgeClose: fnBadgeClose(id)
      };
    });

    return {
      caption: caption,
      isInitOpen: isInitOpen,
      items: _items
    };
  });
};

var BrowserMenu = {
  createMenu: fnCreateMenu
};

exports.default = BrowserMenu;
//# sourceMappingURL=BrowserMenu.js.map