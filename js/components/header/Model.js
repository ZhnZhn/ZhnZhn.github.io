'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Type = require('../../constants/Type');

var CL = {
  BR: 'item__browser',
  EU: 'item__eurostat',
  W: 'item__watch',
  AB: 'item__about'
};

var MODEL = {
  page_0: [{
    id: 'page_01',
    type: 'sub',
    cn: CL.BR,
    title: 'Statistics Agencies'
  }, {
    id: _Type.BrowserType.STOCK_MARKETS,
    cn: CL.BR,
    title: 'Stock Markets'
  }, {
    id: _Type.BrowserType.UN_COMTRADE,
    cn: CL.EU,
    title: 'UN Comtrade'
  }, {
    id: _Type.BrowserType.FAOSTAT,
    cn: CL.EU,
    title: 'FAOSTAT'
  }, {
    id: _Type.BrowserType.QUANDL,
    isQuandl: true,
    title: 'Quandl Economic'
  }, {
    id: _Type.BrowserType.US_STOCKS,
    title: 'US Stocks by Sectors'
  }, {
    id: _Type.BrowserType.NYSE_STOCKS,
    title: 'US NYSE by Sectors'
  }, {
    id: _Type.BrowserType.NASDAQ_STOCKS,
    title: 'US NASDAQ by Sectors'
  }, {
    id: _Type.BrowserType.LONDON_STOCKS,
    title: 'LSE by Sectors'
  }, {
    id: _Type.BrowserType.PREMIUM_SAMPLE,
    title: 'Quandl Premium Sample'
  }, {
    id: _Type.BrowserType.WATCH_LIST,
    cn: CL.W,
    title: 'Watch'
  }
  /*
  ,{
    id: 'ABOUT',
    cn: CL.AB,
    title: 'About'
  }
  */
  ],
  page_01: [{
    id: _Type.BrowserType.EUROSTAT,
    cn: CL.EU,
    title: 'Eurostat'
  }, {
    id: _Type.BrowserType.FRANCE_STATISTICS,
    cn: CL.EU,
    title: 'Insee: France Statistics'
  }, {
    id: _Type.BrowserType.NORWAY_STATISTICS,
    cn: CL.EU,
    title: 'Statistics Norway'
  }, {
    id: _Type.BrowserType.NORWAY_STAT_ALL,
    cn: CL.EU,
    title: 'Statistics Norway All',
    isNew: true
  }, {
    id: _Type.BrowserType.SWEDEN_STAT,
    cn: CL.EU,
    title: 'Statistics Sweden'
  }, {
    id: _Type.BrowserType.SWEDEN_STAT_ALL,
    cn: CL.EU,
    title: 'Statistics Sweden All',
    isNew: true
  }]
};

exports.default = MODEL;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\Model.js.map