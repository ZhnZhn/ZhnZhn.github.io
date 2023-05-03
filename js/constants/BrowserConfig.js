"use strict";

exports.__esModule = true;
exports.default = void 0;
var _BrowserType = require("./BrowserType");
var _ModalDialogType = require("./ModalDialogType");
const BrowserConfig = {
  [_BrowserType.BT_STOCK_MARKETS]: {
    browserType: _BrowserType.BT_STOCK_MARKETS,
    caption: 'Stock Markets',
    sourceMenuUrl: './data/stock-markets/source-menu.json'
  },
  [_BrowserType.BT_EUROSTAT]: {
    browserType: _BrowserType.BT_EUROSTAT,
    caption: 'Eurostat Statistics',
    sourceMenuUrl: './data/eurostat/source-menu.json'
  },
  [_BrowserType.BT_FGR]: {
    browserType: _BrowserType.BT_FGR,
    caption: 'Eurostat: FIGARO',
    sourceMenuUrl: './data/figaro/source-menu.json'
  },
  [_BrowserType.BT_PE]: {
    browserType: _BrowserType.BT_PE,
    caption: 'Euro Indicators / PEEIs',
    sourceMenuUrl: './data/peeis/source-menu.json'
  },
  [_BrowserType.BT_UN_COMTRADE]: {
    browserType: _BrowserType.BT_UN_COMTRADE,
    caption: 'UN Comtrade',
    sourceMenuUrl: './data/uncomtrade/source-menu.json'
  },
  [_BrowserType.BT_FAOSTAT]: {
    browserType: _BrowserType.BT_FAOSTAT,
    caption: 'FAOSTAT',
    sourceMenuUrl: './data/faostat/source-menu.json'
  },
  [_BrowserType.BT_WORLD_BANK]: {
    browserType: _BrowserType.BT_WORLD_BANK,
    caption: 'World Bank',
    sourceMenuUrl: './data/world-bank/source-menu.json'
  },
  [_BrowserType.BT_NDL]: {
    browserType: _BrowserType.BT_NDL,
    caption: 'Nasdaq Data Link',
    sourceMenuUrl: './data/ndl/source-menu.json'
  },
  [_BrowserType.BT_DB_NOMICS]: {
    browserType: _BrowserType.BT_DB_NOMICS,
    caption: 'DB Nomics',
    sourceMenuUrl: './data/db-nomics/source-menu.json'
  },
  [_BrowserType.BT_ENERGY]: {
    browserType: _BrowserType.BT_ENERGY,
    caption: 'Energy',
    sourceMenuUrl: './data/energy/source-menu.json'
  },
  [_BrowserType.BT_BLOCKCHAIN]: {
    browserType: _BrowserType.BT_BLOCKCHAIN,
    caption: 'Blockchain',
    sourceMenuUrl: './data/blockchain/source-menu.json'
  },
  [_BrowserType.BT_FUTURES]: {
    browserType: _BrowserType.BT_FUTURES,
    caption: 'Futures Markets',
    sourceMenuUrl: './data/futures-markets/source-menu.json'
  },
  [_BrowserType.BT_FRANCE_STATISTICS]: {
    browserType: _BrowserType.BT_FRANCE_STATISTICS,
    caption: 'Insee: France Statistics',
    sourceMenuUrl: './data/statistics-france/source-menu.json'
  },
  [_BrowserType.BT_UK_STATISTICS]: {
    browserType: _BrowserType.BT_UK_STATISTICS,
    caption: 'ONS: UK Statistics',
    sourceMenuUrl: './data/statistics-uk/source-menu.json'
  },
  [_BrowserType.BT_NORWAY_STATISTICS]: {
    browserType: _BrowserType.BT_NORWAY_STATISTICS,
    caption: 'Statistics Norway',
    sourceMenuUrl: './data/statistics-norway/source-menu.json'
  },
  [_BrowserType.BT_NORWAY_STAT_ALL]: {
    browserType: _BrowserType.BT_NORWAY_STAT_ALL,
    caption: 'Statistics Norway All',
    dfProps: {
      bT: _BrowserType.BT_NORWAY_STAT_ALL,
      lT: 'NST_2',
      sP: 'Stat. Norway',
      dU: './data/statistics-norway/statistics-norway.html',
      dS: 'Statistics Norway',
      rootUrl: 'https://data.ssb.no/api/v0/en/table'
    }
  },
  [_BrowserType.BT_SWEDEN_STAT]: {
    browserType: _BrowserType.BT_SWEDEN_STAT,
    caption: 'Statistics Sweden',
    sourceMenuUrl: './data/statistics-sweden/source-menu.json'
  },
  [_BrowserType.BT_SWEDEN_STAT_ALL]: {
    browserType: _BrowserType.BT_SWEDEN_STAT_ALL,
    caption: 'Statistics Sweden All',
    dfProps: {
      bT: _BrowserType.BT_SWEDEN_STAT_ALL,
      lT: 'SWS',
      sP: 'Stat. Sweden',
      dU: './data/statistics-sweden/statistics-sweden.html',
      dS: 'Statistics Sweden',
      rootUrl: 'https://api.scb.se/OV0104/v1/doris/en/ssd'
    }
  },
  [_BrowserType.BT_FINLAND_STAT_ALL]: {
    browserType: _BrowserType.BT_FINLAND_STAT_ALL,
    caption: 'Statistics Finland All',
    dfProps: {
      bT: _BrowserType.BT_FINLAND_STAT_ALL,
      lT: 'SFL',
      sP: 'Stat. Finland',
      dU: './data/statistics-finland/statistics-finland.html',
      dS: 'Statistics Finland',
      noTime: true,
      rootUrl: 'https://statfin.stat.fi/PXWeb/api/v1/en/StatFin'
    }
  },
  [_BrowserType.BT_DENMARK_STAT_ALL]: {
    browserType: _BrowserType.BT_DENMARK_STAT_ALL,
    caption: 'Statistics Denmark All',
    dfProps: {
      bT: _BrowserType.BT_DENMARK_STAT_ALL,
      lT: 'SDN',
      sP: 'Stat. Denmark',
      dU: './data/statistics-denmark/statistics-denmark.html',
      dS: 'Statistics Denmark',
      rootUrl: 'https://api.statbank.dk/v1/subjects',
      dfTi: '?lang=en&includeTables=true',
      rootDimUrl: 'https://api.statbank.dk/v1/tableinfo',
      dfDimQuery: '?lang=en'
    }
  },
  [_BrowserType.BT_IRELAND_STAT_ALL]: {
    browserType: _BrowserType.BT_IRELAND_STAT_ALL,
    caption: 'CSO Ireland All',
    dfProps: {
      bT: _BrowserType.BT_IRELAND_STAT_ALL,
      lT: 'SIR',
      sP: 'CSO Ireland',
      dU: './data/statistics-ireland/statistics-ireland.html',
      dS: 'CSO Ireland',
      rootUrl: 'https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.PxAPIv1/en'
    }
  },
  [_BrowserType.BT_US_ECONOMICS]: {
    browserType: _BrowserType.BT_US_ECONOMICS,
    caption: 'US Economics',
    sourceMenuUrl: './data/us-economics/source-menu.json'
  },
  [_BrowserType.BT_NYSE_STOCKS]: {
    browserType: _BrowserType.BT_NYSE_STOCKS,
    caption: 'NYSE by Sectors',
    sourceMenuUrl: './data/nyse-stocks/source-menu.json',
    withoutItemCounter: true,
    modalDialogType: _ModalDialogType.MDT_STOCKS_BY_SECTOR,
    chartContainerType: _BrowserType.BT_NYSE_STOCKS + '_' + _BrowserType.BT_STOCKS_BY_SECTORS,
    contFullCaption: 'NYSE by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType: 'ItemWithCap',
    descrUrl: './data/nyse-stocks/nyse-stocks.html'
  },
  [_BrowserType.BT_NASDAQ_STOCKS]: {
    browserType: _BrowserType.BT_NASDAQ_STOCKS,
    caption: 'NASDAQ by Sectors',
    sourceMenuUrl: './data/nasdaq-stocks/source-menu.json',
    withoutItemCounter: true,
    modalDialogType: _ModalDialogType.MDT_STOCKS_BY_SECTOR,
    chartContainerType: _BrowserType.BT_NASDAQ_STOCKS + '_' + _BrowserType.BT_STOCKS_BY_SECTORS,
    contFullCaption: 'NASDAQ by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType: 'ItemWithCap',
    descrUrl: './data/nasdaq-stocks/nasdaq-stocks.html'
  },
  [_BrowserType.BT_WATCH_LIST]: {
    browserType: _BrowserType.BT_WATCH_LIST,
    withoutItemCounter: true
  }
};
var _default = BrowserConfig;
exports.default = _default;
//# sourceMappingURL=BrowserConfig.js.map