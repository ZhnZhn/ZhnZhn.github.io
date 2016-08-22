'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BrowserMenu;

var _Type = require('./Type');

var _DialogType = require('./DialogType');

var _DataQE = require('./DataQE');

var _DataQE2 = _interopRequireDefault(_DataQE);

var _ComponentActions = require('../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ChartActions = require('../flux/actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fnClick = function fnClick(dialogType, browserType) {
  return _ComponentActions2.default.showDialog.bind(null, dialogType, browserType);
};

var fnBadgeClick = function fnBadgeClick(dialogType, browserType) {
  return _ChartActions2.default.showChart.bind(null, dialogType, browserType);
};
var fnBadgeClose = function fnBadgeClose(chartType) {
  return _ComponentActions2.default.closeChartContainer2.bind(null, chartType);
};

var fnCreateMenu = function fnCreateMenu(menu, data, browserType) {
  return menu.map(function (menuPart) {
    var items = menuPart.items.map(function (item, index) {
      return {
        id: item.id,
        title: data[item.id].menuTitle,
        counter: 0,
        isOpen: false,
        onClick: fnClick(item.id, browserType),
        onBadgeClick: fnBadgeClick(item.id, browserType),
        onBadgeClose: fnBadgeClose(item.id)
      };
    });
    return {
      caption: menuPart.caption,
      items: items
    };
  });
};

var menuQuandl = [{
  caption: 'Economic',
  items: [{ id: _DialogType.Quandl.CURRENCY_HISTORY }, { id: _DialogType.Quandl.GLOBAL_INDICATOR }, { id: _DialogType.Quandl.WORLDBANK_PRICE }, { id: _DialogType.Quandl.IMF_CROSSCOUNTRY }, { id: _DialogType.Quandl.EU_COMMISSION }, { id: _DialogType.Quandl.CPI_INFLATION }, { id: _DialogType.Quandl.BIG_MAC }]
}, {
  caption: 'Commodity',
  items: [{ id: _DialogType.Quandl.COMMODITY_PRICE }, { id: _DialogType.Quandl.COMMODITY_TRADE }, { id: _DialogType.Quandl.JODI_WORLD_GAS }, { id: _DialogType.Quandl.JODI_WORLD_OIL }, { id: _DialogType.Quandl.EIA_COAL }]
}, {
  caption: 'World Stocks',
  items: [{ id: _DialogType.Quandl.TOKIO_STOCK }, { id: _DialogType.Quandl.WIKI_STOCK }, { id: _DialogType.Quandl.UNICORN_RESEARCH }]
}, {
  caption: 'Futures',
  items: [{ id: _DialogType.Quandl.CHINA_FINANCE_FUTURE }, { id: _DialogType.Quandl.DCE_FUTURE }, { id: _DialogType.Quandl.ZCE_FUTURE }, { id: _DialogType.Quandl.SHANGHAI_FUTURE }, { id: _DialogType.Quandl.LIFFE_FUTURE }, { id: _DialogType.Quandl.ICE_FUTURE }, { id: _DialogType.Quandl.WIKI_FUTURE }]
}, {
  caption: 'Real Estate',
  items: [{ id: _DialogType.Quandl.ZILLOW_REAL_ESTATE }]
}];

var BrowserMenu = (_BrowserMenu = {}, _defineProperty(_BrowserMenu, _Type.BrowserType.QUANDL, fnCreateMenu(menuQuandl, _DataQE2.default, _Type.BrowserType.QUANDL)), _defineProperty(_BrowserMenu, 'createMenu', fnCreateMenu), _BrowserMenu);

exports.default = BrowserMenu;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\BrowserMenu.js.map