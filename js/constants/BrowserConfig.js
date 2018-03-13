'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _BrowserConfig;

var _Type = require('./Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserConfig = (_BrowserConfig = {}, (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.STOCK_MARKETS, {
  browserType: _Type.BrowserType.STOCK_MARKETS,
  isDynamic: true,
  caption: 'Stock Markets',
  sourceMenuUrl: './data/stock-markets/source-menu.json'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.EUROSTAT, {
  browserType: _Type.BrowserType.EUROSTAT,
  isDynamic: true,
  caption: 'Eurostat Statistics',
  sourceMenuUrl: './data/eurostat/source-menu.json'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.UN_COMTRADE, {
  browserType: _Type.BrowserType.UN_COMTRADE,
  isDynamic: true,
  caption: 'UN Comtrade',
  sourceMenuUrl: './data/uncomtrade/source-menu.json'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.FAOSTAT, {
  browserType: _Type.BrowserType.FAOSTAT,
  isDynamic: true,
  caption: 'FAOSTAT',
  sourceMenuUrl: './data/faostat/source-menu.json'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.ECONOMIC, {
  browserType: _Type.BrowserType.ECONOMIC,
  isDynamic: false
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.BLOCKCHAIN, {
  browserType: _Type.BrowserType.BLOCKCHAIN,
  isDynamic: true,
  caption: 'Blockchain',
  sourceMenuUrl: './data/blockchain/source-menu.json'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.PREMIUM_SAMPLE, {
  browserType: _Type.BrowserType.PREMIUM_SAMPLE,
  isDynamic: true,
  caption: 'Quandl Premium Sample',
  sourceMenuUrl: './data/quandl-sample/source-menu.json'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.FRANCE_STATISTICS, {
  browserType: _Type.BrowserType.FRANCE_STATISTICS,
  isDynamic: true,
  caption: 'Insee: France Statistics',
  sourceMenuUrl: './data/statistics-france/source-menu.json'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.NORWAY_STATISTICS, {
  browserType: _Type.BrowserType.NORWAY_STATISTICS,
  isDynamic: true,
  caption: 'Statistics Norway',
  sourceMenuUrl: './data/statistics-norway/source-menu.json'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.NORWAY_STAT_ALL, {
  browserType: _Type.BrowserType.NORWAY_STAT_ALL,
  isDynamic: true,
  caption: 'Statistics Norway All',
  dfProps: {
    bT: _Type.BrowserType.NORWAY_STAT_ALL,
    lT: 'NST_2',
    sP: 'Stat. Norway',
    dU: './data/statistics-norway/statistics-norway.html',
    rootUrl: 'https://data.ssb.no/api/v0/en/table'
  }
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.SWEDEN_STAT, {
  browserType: _Type.BrowserType.SWEDEN_STAT,
  isDynamic: true,
  caption: 'Statistics Sweden',
  sourceMenuUrl: './data/statistics-sweden/source-menu.json'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.SWEDEN_STAT_ALL, {
  browserType: _Type.BrowserType.SWEDEN_STAT_ALL,
  isDynamic: true,
  caption: 'Statistics Sweden All',
  sourceMenuUrl: './data/statistics-sweden/source-menu.json',
  dfProps: {
    bT: _Type.BrowserType.SWEDEN_STAT_ALL,
    lT: 'SWS',
    sP: 'Stat. Sweden',
    dU: './data/statistics-sweden/statistics-sweden.html',
    rootUrl: 'https://api.scb.se/OV0104/v1/doris/en/ssd'
  }
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.US_ECONOMY, {
  browserType: _Type.BrowserType.US_ECONOMY,
  isDynamic: true,
  caption: 'USA Economy',
  sourceMenuUrl: './data/usa-economy/source-menu.json'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.US_STOCKS, {
  browserType: _Type.BrowserType.US_STOCKS,
  isDynamic: true,
  caption: '1000 Stocks by Sectors',
  sourceMenuUrl: './data/us-stocks/source-menu.json',
  withoutItemCounter: true,
  modalDialogType: _Type.ModalDialog.US_STOCK_BY_SECTOR,
  chartContainerType: _Type.BrowserType.US_STOCKS + '_' + _Type.BrowserType.STOCKS_BY_SECTORS,
  chartContainerCaption: 'Quandl : Stocks by Sectors',
  itemOptionType: 'ItemTopicOption',
  itemType: 'Item',
  descrUrl: './data/us-stocks/description.html'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.NYSE_STOCKS, {
  browserType: _Type.BrowserType.NYSE_STOCKS,
  isDynamic: true,
  caption: 'NYSE by Sectors',
  sourceMenuUrl: './data/nyse-stocks/source-menu.json',
  withoutItemCounter: true,
  modalDialogType: _Type.ModalDialog.STOCKS_BY_SECTOR,
  chartContainerType: _Type.BrowserType.NYSE_STOCKS + '_' + _Type.BrowserType.STOCKS_BY_SECTORS,
  chartContainerCaption: 'Quandl: NYSE by Sectors',
  itemOptionType: 'ItemTopicOption',
  itemType: 'ItemWithCap',
  descrUrl: './data/nyse-stocks/nyse-stocks.html'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.NASDAQ_STOCKS, {
  browserType: _Type.BrowserType.NASDAQ_STOCKS,
  isDynamic: true,
  caption: 'NASDAQ by Sectors',
  sourceMenuUrl: './data/nasdaq-stocks/source-menu.json',
  withoutItemCounter: true,
  modalDialogType: _Type.ModalDialog.STOCKS_BY_SECTOR,
  chartContainerType: _Type.BrowserType.NASDAQ_STOCKS + '_' + _Type.BrowserType.STOCKS_BY_SECTORS,
  chartContainerCaption: 'Quandl: NASDAQ by Sectors',
  itemOptionType: 'ItemTopicOption',
  itemType: 'ItemWithCap',
  descrUrl: './data/nasdaq-stocks/nasdaq-stocks.html'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.LONDON_STOCKS, {
  browserType: _Type.BrowserType.LONDON_STOCKS,
  isDynamic: true,
  caption: 'London Stocks by Sectors',
  sourceMenuUrl: './data/london-stocks/source-menu.json',
  withoutItemCounter: true,
  modalDialogType: _Type.ModalDialog.STOCKS_BY_SECTOR,
  chartContainerType: _Type.BrowserType.LONDON_STOCKS + '_' + _Type.BrowserType.STOCKS_BY_SECTORS,
  chartContainerCaption: 'Quandl : London Stock Exchange by Sectors',
  itemOptionType: 'ItemTopicOption',
  itemType: 'ItemLse',
  descrUrl: './data/london-stocks/lse-stocks.html'
}), (0, _defineProperty3.default)(_BrowserConfig, _Type.BrowserType.WATCH_LIST, {
  browserType: _Type.BrowserType.WATCH_LIST,
  //isDynamic : false,
  withoutItemCounter: true
}), _BrowserConfig);

exports.default = BrowserConfig;
//# sourceMappingURL=BrowserConfig.js.map