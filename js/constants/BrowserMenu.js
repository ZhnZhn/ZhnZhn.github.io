'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BrowserMenu;

var _Type = require('./Type');

var _DialogType = require('./DialogType');

var _DataQE = require('./DataQE');

var _DataQE2 = _interopRequireDefault(_DataQE);

var _DataQY = require('./DataQY');

var _DataQY2 = _interopRequireDefault(_DataQY);

var _DataQG = require('./DataQG');

var _DataQG2 = _interopRequireDefault(_DataQG);

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
  items: [{ id: _DialogType.Quandl.CURRENCY_HISTORY }, { id: _DialogType.Quandl.COMMODITY_PRICE }, { id: _DialogType.Quandl.COMMODITY_TRADE }, { id: _DialogType.Quandl.GLOBAL_INDICATOR }, { id: _DialogType.Quandl.WORLDBANK_PRICE }, { id: _DialogType.Quandl.CPI_INFLATION }, { id: _DialogType.Quandl.BIG_MAC }]
}, {
  caption: 'World Stocks',
  items: [{ id: _DialogType.Quandl.TOKIO_STOCK }, { id: _DialogType.Quandl.WIKI_STOCK }]
}, {
  caption: 'Futures',
  items: [{ id: _DialogType.Quandl.CHINA_DCE_FUTURE }, { id: _DialogType.Quandl.CHINA_ZCE_FUTURE }]
}];

var menuQuandlYahoo = [{
  caption: 'North American Stocks',
  items: [{ id: _DialogType.QuandlYahoo.TORONTO }, { id: _DialogType.QuandlYahoo.TORONTO_VENTURE }, { id: _DialogType.QuandlYahoo.MONTREAL }, { id: _DialogType.QuandlYahoo.INDICE }]
}, {
  caption: 'European Stocks',
  items: [{ id: _DialogType.QuandlYahoo.LONDON }, { id: _DialogType.QuandlYahoo.PARIS }, { id: _DialogType.QuandlYahoo.AMSTERDAM }, { id: _DialogType.QuandlYahoo.COPPENHAGEN }, { id: _DialogType.QuandlYahoo.OSLO }, { id: _DialogType.QuandlYahoo.STOCKHOLM }, { id: _DialogType.QuandlYahoo.SWISS }, { id: _DialogType.QuandlYahoo.MILAN }, { id: _DialogType.QuandlYahoo.MADRID }]
}, {
  caption: 'World Stocks',
  items: [{ id: _DialogType.QuandlYahoo.AUSTRALIAN }, { id: _DialogType.QuandlYahoo.SHANGHAI }, { id: _DialogType.QuandlYahoo.SHENZHEN }, { id: _DialogType.QuandlYahoo.TAIWAN }, { id: _DialogType.QuandlYahoo.HONG_KONG }, { id: _DialogType.QuandlYahoo.SINGAPURE }, { id: _DialogType.QuandlYahoo.BOMBEY }]
}];

var menuQuandlGoogle = [{
  caption: 'North American Stocks',
  items: [{ id: _DialogType.QuandlGoogle.NASDAQ }, { id: _DialogType.QuandlGoogle.NYSE }, { id: _DialogType.QuandlGoogle.AMEX }, { id: _DialogType.QuandlGoogle.ARCA }]
}, {
  caption: 'European Stocks',
  items: [{ id: _DialogType.QuandlGoogle.BRUSSELS }, { id: _DialogType.QuandlGoogle.LISBON }, { id: _DialogType.QuandlGoogle.TALLIN }, { id: _DialogType.QuandlGoogle.RIGA }, { id: _DialogType.QuandlGoogle.VILNIUS }]
}, {
  caption: 'World Stocks',
  items: [{ id: _DialogType.QuandlGoogle.SHENZHEN }, { id: _DialogType.QuandlGoogle.SINGAPURE }, { id: _DialogType.QuandlGoogle.KOREA }, { id: _DialogType.QuandlGoogle.TAILAND }, { id: _DialogType.QuandlGoogle.NEWZEALAND }, { id: _DialogType.QuandlGoogle.SAO_PAOLO }]
}];

var QuandlMenu = fnCreateMenu(menuQuandl, _DataQE2.default, _Type.BrowserType.QUANDL);
var QuandlYahooMenu = fnCreateMenu(menuQuandlYahoo, _DataQY2.default, _Type.BrowserType.QUANDL_YAHOO);
var QuandlGoogleMenu = fnCreateMenu(menuQuandlGoogle, _DataQG2.default, _Type.BrowserType.QUANDL_GOOGLE);

var BrowserMenu = (_BrowserMenu = {}, _defineProperty(_BrowserMenu, _Type.BrowserType.QUANDL, QuandlMenu), _defineProperty(_BrowserMenu, _Type.BrowserType.QUANDL_YAHOO, QuandlYahooMenu), _defineProperty(_BrowserMenu, _Type.BrowserType.QUANDL_GOOGLE, QuandlGoogleMenu), _BrowserMenu);

exports.default = BrowserMenu;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\BrowserMenu.js.map