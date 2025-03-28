"use strict";

exports.__esModule = true;
exports.default = void 0;
var _BrowserType = require("./BrowserType");
var _ModalDialogType = require("./ModalDialogType");
const S_ITEM_MULTI_LINE = {
    maxWidth: 275,
    lineHeight: 1.3,
    paddingTop: 6,
    paddingBottom: 6
  },
  S_ITEM_MULTI_LINE_WHITE_SPACE = {
    ...S_ITEM_MULTI_LINE,
    whiteSpace: 'unset'
  };
const _crSourceMenuUrl = token => `./data/${token}/source-menu.json`,
  _crBrowserItem = (browserType, caption, token, itemStyle, topicStyle) => ({
    browserType,
    caption,
    sourceMenuUrl: _crSourceMenuUrl(token),
    itemStyle,
    topicStyle
  });
const BrowserConfig = {
  [_BrowserType.BT_STOCK_MARKETS]: _crBrowserItem(_BrowserType.BT_STOCK_MARKETS, 'Stock Markets', 'stock-markets'),
  [_BrowserType.BT_EUROSTAT]: _crBrowserItem(_BrowserType.BT_EUROSTAT, 'Eurostat Overview', 'eurostat'),
  [_BrowserType.BT_FGR]: _crBrowserItem(_BrowserType.BT_FGR, 'EU FIGARO', 'figaro'),
  [_BrowserType.BT_PE]: _crBrowserItem(_BrowserType.BT_PE, 'Euro Indicators / PEEIs', 'peeis'),
  [_BrowserType.BT_COMEXT]: _crBrowserItem(_BrowserType.BT_COMEXT, 'EU Comext', 'comext'),
  [_BrowserType.BT_SDG]: _crBrowserItem(_BrowserType.BT_SDG, 'EU SDG', 'eu-sdg', {
    ...S_ITEM_MULTI_LINE
  }, {
    ...S_ITEM_MULTI_LINE_WHITE_SPACE
  }),
  [_BrowserType.BT_MIP]: _crBrowserItem(_BrowserType.BT_MIP, 'EU MIP', 'eu-mip', {
    ...S_ITEM_MULTI_LINE
  }, {
    ...S_ITEM_MULTI_LINE_WHITE_SPACE
  }),
  [_BrowserType.BT_CEI]: _crBrowserItem(_BrowserType.BT_CEI, 'Circular economy indicators', 'eu-cei', {
    ...S_ITEM_MULTI_LINE
  }, {
    ...S_ITEM_MULTI_LINE_WHITE_SPACE
  }),
  [_BrowserType.BT_UN_COMTRADE]: _crBrowserItem(_BrowserType.BT_UN_COMTRADE, 'UN Comtrade', 'uncomtrade'),
  [_BrowserType.BT_FAOSTAT]: _crBrowserItem(_BrowserType.BT_FAOSTAT, 'FAOSTAT', 'faostat'),
  [_BrowserType.BT_WORLD_BANK]: _crBrowserItem(_BrowserType.BT_WORLD_BANK, 'World Bank', 'world-bank'),
  [_BrowserType.BT_WTO]: _crBrowserItem(_BrowserType.BT_WTO, 'WTO', 'wto'),
  [_BrowserType.BT_DB_NOMICS]: _crBrowserItem(_BrowserType.BT_DB_NOMICS, 'DBnomics', 'db-nomics'),
  [_BrowserType.BT_ENERGY]: _crBrowserItem(_BrowserType.BT_ENERGY, 'Energy', 'energy'),
  [_BrowserType.BT_BLOCKCHAIN]: _crBrowserItem(_BrowserType.BT_BLOCKCHAIN, 'Blockchains', 'blockchain'),
  [_BrowserType.BT_COMMODITIES]: _crBrowserItem(_BrowserType.BT_COMMODITIES, 'Commodities', 'commodities'),
  [_BrowserType.BT_CENTRAL_BANKS]: _crBrowserItem(_BrowserType.BT_CENTRAL_BANKS, 'Central Banks', 'central-banks'),
  [_BrowserType.BT_CURRENCY]: _crBrowserItem(_BrowserType.BT_CURRENCY, 'Currencies', 'currency'),
  [_BrowserType.BT_OECD]: _crBrowserItem(_BrowserType.BT_OECD, 'OECD', 'oecd'),
  [_BrowserType.BT_FRANCE_STATISTICS]: _crBrowserItem(_BrowserType.BT_FRANCE_STATISTICS, 'INSEE: Statistics France', 'statistics-france'),
  [_BrowserType.BT_UK_STATISTICS]: _crBrowserItem(_BrowserType.BT_UK_STATISTICS, 'ONS: Statistics UK', 'statistics-uk'),
  [_BrowserType.BT_NORWAY_STATISTICS]: _crBrowserItem(_BrowserType.BT_NORWAY_STATISTICS, 'Statistics Norway (A)', 'statistics-norway'),
  [_BrowserType.BT_NORWAY_STAT_ALL]: {
    browserType: _BrowserType.BT_NORWAY_STAT_ALL,
    caption: 'Statistics Norway',
    dfProps: {
      bT: _BrowserType.BT_NORWAY_STAT_ALL,
      lT: 'NST_2',
      sP: 'Stat. Norway',
      dU: './data/statistics-norway/statistics-norway.html',
      dS: 'Statistics Norway',
      rootUrl: 'https://data.ssb.no/api/v0/en/table'
    }
  },
  [_BrowserType.BT_SWEDEN_STAT]: _crBrowserItem(_BrowserType.BT_SWEDEN_STAT, 'Statistics Sweden (A)', 'statistics-sweden'),
  [_BrowserType.BT_SWEDEN_STAT_ALL]: {
    browserType: _BrowserType.BT_SWEDEN_STAT_ALL,
    caption: 'Statistics Sweden',
    dfProps: {
      bT: _BrowserType.BT_SWEDEN_STAT_ALL,
      lT: 'SWS',
      sP: 'Stat. Sweden',
      dU: './data/statistics-sweden/statistics-sweden.html',
      dS: 'Statistics Sweden',
      rootUrl: 'https://api.scb.se/OV0104/v1/doris/en/ssd'
    }
  },
  [_BrowserType.BT_SWISS_STAT]: _crBrowserItem(_BrowserType.BT_SWISS_STAT, 'FSO: Statistics Swiss', 'statistics-swiss'),
  [_BrowserType.BT_FINLAND_STAT_ALL]: {
    browserType: _BrowserType.BT_FINLAND_STAT_ALL,
    caption: 'Statistics Finland',
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
    caption: 'Statistics Denmark',
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
    caption: 'CSO: Statistics Ireland',
    dfProps: {
      bT: _BrowserType.BT_IRELAND_STAT_ALL,
      lT: 'SIR',
      sP: 'CSO Ireland',
      dU: './data/statistics-ireland/statistics-ireland.html',
      dS: 'CSO Ireland',
      rootUrl: 'https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.PxAPIv1/en'
    }
  },
  [_BrowserType.BT_US_ECONOMICS]: _crBrowserItem(_BrowserType.BT_US_ECONOMICS, 'U.S. Economics', 'us-economics'),
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
var _default = exports.default = BrowserConfig;
//# sourceMappingURL=BrowserConfig.js.map