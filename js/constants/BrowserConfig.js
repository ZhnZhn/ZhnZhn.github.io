"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _Type = require("./Type");

var _BrowserConfig;

var BrowserConfig = (_BrowserConfig = {}, _BrowserConfig[_Type.BrowserType.STOCK_MARKETS] = {
  browserType: _Type.BrowserType.STOCK_MARKETS,
  isDynamic: true,
  caption: 'Stock Markets',
  sourceMenuUrl: './data/stock-markets/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.EUROSTAT] = {
  browserType: _Type.BrowserType.EUROSTAT,
  isDynamic: true,
  caption: 'Eurostat Statistics',
  sourceMenuUrl: './data/eurostat/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.UN_COMTRADE] = {
  browserType: _Type.BrowserType.UN_COMTRADE,
  isDynamic: true,
  caption: 'UN Comtrade',
  sourceMenuUrl: './data/uncomtrade/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.FAOSTAT] = {
  browserType: _Type.BrowserType.FAOSTAT,
  isDynamic: true,
  caption: 'FAOSTAT',
  sourceMenuUrl: './data/faostat/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.WORLD_BANK] = {
  browserType: _Type.BrowserType.WORLD_BANK,
  isDynamic: true,
  caption: 'World Bank',
  sourceMenuUrl: './data/world-bank/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.ECONOMIC] = {
  browserType: _Type.BrowserType.ECONOMIC,
  isDynamic: true,
  caption: 'Quandl: World Economy',
  sourceMenuUrl: './data/quandl/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.DB_NOMICS] = {
  browserType: _Type.BrowserType.DB_NOMICS,
  isDynamic: true,
  caption: 'DB Nomics',
  sourceMenuUrl: './data/db-nomics/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.BLOCKCHAIN] = {
  browserType: _Type.BrowserType.BLOCKCHAIN,
  isDynamic: true,
  caption: 'Blockchain',
  sourceMenuUrl: './data/blockchain/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.PREMIUM_SAMPLE] = {
  browserType: _Type.BrowserType.PREMIUM_SAMPLE,
  isDynamic: true,
  caption: 'Quandl Premium Sample',
  sourceMenuUrl: './data/quandl-sample/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.FRANCE_STATISTICS] = {
  browserType: _Type.BrowserType.FRANCE_STATISTICS,
  isDynamic: true,
  caption: 'Insee: France Statistics',
  sourceMenuUrl: './data/statistics-france/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.NORWAY_STATISTICS] = {
  browserType: _Type.BrowserType.NORWAY_STATISTICS,
  isDynamic: true,
  caption: 'Statistics Norway',
  sourceMenuUrl: './data/statistics-norway/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.NORWAY_STAT_ALL] = {
  browserType: _Type.BrowserType.NORWAY_STAT_ALL,
  isDynamic: true,
  caption: 'Statistics Norway All',
  dfProps: {
    bT: _Type.BrowserType.NORWAY_STAT_ALL,
    lT: 'NST_2',
    sP: 'Stat. Norway',
    dU: './data/statistics-norway/statistics-norway.html',
    dS: 'Statistics Norway',
    rootUrl: 'https://data.ssb.no/api/v0/en/table'
  }
}, _BrowserConfig[_Type.BrowserType.SWEDEN_STAT] = {
  browserType: _Type.BrowserType.SWEDEN_STAT,
  isDynamic: true,
  caption: 'Statistics Sweden',
  sourceMenuUrl: './data/statistics-sweden/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.SWEDEN_STAT_ALL] = {
  browserType: _Type.BrowserType.SWEDEN_STAT_ALL,
  isDynamic: true,
  caption: 'Statistics Sweden All',
  dfProps: {
    bT: _Type.BrowserType.SWEDEN_STAT_ALL,
    lT: 'SWS',
    sP: 'Stat. Sweden',
    dU: './data/statistics-sweden/statistics-sweden.html',
    dS: 'Statistics Sweden',
    rootUrl: 'https://api.scb.se/OV0104/v1/doris/en/ssd'
  }
}, _BrowserConfig[_Type.BrowserType.FINLAND_STAT_ALL] = {
  browserType: _Type.BrowserType.FINLAND_STAT_ALL,
  isDynamic: true,
  caption: 'Statistics Finland All',
  dfProps: {
    bT: _Type.BrowserType.FINLAND_STAT_ALL,
    lT: 'SFL',
    sP: 'Stat. Finland',
    dU: './data/statistics-finland/statistics-finland.html',
    dS: 'Statistics Finland',
    noTime: true,
    rootUrl: 'https://pxnet2.stat.fi/PXWeb/api/v1/en/StatFin'
  }
}, _BrowserConfig[_Type.BrowserType.NBSC] = {
  browserType: _Type.BrowserType.NBSC,
  isDynamic: true,
  caption: 'NBS China (Monthly)',
  sourceMenuUrl: './data/nbsc/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.US_ECONOMY] = {
  browserType: _Type.BrowserType.US_ECONOMY,
  isDynamic: true,
  caption: 'USA Economy',
  sourceMenuUrl: './data/usa-economy/source-menu.json'
}, _BrowserConfig[_Type.BrowserType.US_STOCKS] = {
  browserType: _Type.BrowserType.US_STOCKS,
  isDynamic: true,
  caption: '1000 Stocks by Sectors',
  sourceMenuUrl: './data/us-stocks/source-menu.json',
  withoutItemCounter: true,
  modalDialogType: _Type.ModalDialog.US_STOCK_BY_SECTOR,
  chartContainerType: _Type.BrowserType.US_STOCKS + '_' + _Type.BrowserType.STOCKS_BY_SECTORS,
  contFullCaption: 'Quandl: Stocks by Sectors',
  itemOptionType: 'ItemTopicOption',
  itemType: 'Item',
  descrUrl: './data/us-stocks/description.html'
}, _BrowserConfig[_Type.BrowserType.NYSE_STOCKS] = {
  browserType: _Type.BrowserType.NYSE_STOCKS,
  isDynamic: true,
  caption: 'NYSE by Sectors',
  sourceMenuUrl: './data/nyse-stocks/source-menu.json',
  withoutItemCounter: true,
  modalDialogType: _Type.ModalDialog.STOCKS_BY_SECTOR,
  chartContainerType: _Type.BrowserType.NYSE_STOCKS + '_' + _Type.BrowserType.STOCKS_BY_SECTORS,
  contFullCaption: 'NYSE by Sectors',
  itemOptionType: 'ItemTopicOption',
  itemType: 'ItemWithCap',
  descrUrl: './data/nyse-stocks/nyse-stocks.html'
}, _BrowserConfig[_Type.BrowserType.NASDAQ_STOCKS] = {
  browserType: _Type.BrowserType.NASDAQ_STOCKS,
  isDynamic: true,
  caption: 'NASDAQ by Sectors',
  sourceMenuUrl: './data/nasdaq-stocks/source-menu.json',
  withoutItemCounter: true,
  modalDialogType: _Type.ModalDialog.STOCKS_BY_SECTOR,
  chartContainerType: _Type.BrowserType.NASDAQ_STOCKS + '_' + _Type.BrowserType.STOCKS_BY_SECTORS,
  contFullCaption: 'NASDAQ by Sectors',
  itemOptionType: 'ItemTopicOption',
  itemType: 'ItemWithCap',
  descrUrl: './data/nasdaq-stocks/nasdaq-stocks.html'
}, _BrowserConfig[_Type.BrowserType.LONDON_STOCKS] = {
  browserType: _Type.BrowserType.LONDON_STOCKS,
  isDynamic: true,
  caption: 'London Stocks by Sectors',
  sourceMenuUrl: './data/london-stocks/source-menu.json',
  withoutItemCounter: true,
  modalDialogType: _Type.ModalDialog.STOCKS_BY_SECTOR,
  chartContainerType: _Type.BrowserType.LONDON_STOCKS + '_' + _Type.BrowserType.STOCKS_BY_SECTORS,
  contFullCaption: 'Quandl: London Stock Exchange by Sectors',
  itemOptionType: 'ItemTopicOption',
  itemType: 'ItemLse',
  descrUrl: './data/london-stocks/lse-stocks.html'
}, _BrowserConfig[_Type.BrowserType.WATCH_LIST] = {
  browserType: _Type.BrowserType.WATCH_LIST,
  //isDynamic : false,
  withoutItemCounter: true
}, _BrowserConfig);
var _default = BrowserConfig;
exports["default"] = _default;
//# sourceMappingURL=BrowserConfig.js.map