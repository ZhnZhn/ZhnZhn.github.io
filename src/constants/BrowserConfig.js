import {
  BT_STOCK_MARKETS,
  BT_EUROSTAT,
  BT_FGR,
  BT_PE,
  BT_UN_COMTRADE,
  BT_FAOSTAT,
  BT_WORLD_BANK,
  BT_NDL,
  BT_DB_NOMICS,
  BT_ENERGY,
  BT_BLOCKCHAIN,
  BT_COMMODITIES,
  BT_FRANCE_STATISTICS,
  BT_UK_STATISTICS,
  BT_NORWAY_STATISTICS,
  BT_NORWAY_STAT_ALL,
  BT_SWEDEN_STAT,
  BT_SWEDEN_STAT_ALL,
  BT_FINLAND_STAT_ALL,
  BT_DENMARK_STAT_ALL,
  BT_IRELAND_STAT_ALL,
  BT_US_ECONOMICS,
  BT_NYSE_STOCKS,
  BT_STOCKS_BY_SECTORS,
  BT_NASDAQ_STOCKS,
  BT_WATCH_LIST
} from './BrowserType';
import {
  MDT_STOCKS_BY_SECTOR
} from './ModalDialogType';

const BrowserConfig = {
  [BT_STOCK_MARKETS]: {
    browserType: BT_STOCK_MARKETS,
    caption: 'Stock Markets',
    sourceMenuUrl: './data/stock-markets/source-menu.json'
  },
  [BT_EUROSTAT]: {
    browserType: BT_EUROSTAT,
    caption: 'Eurostat Statistics',
    sourceMenuUrl: './data/eurostat/source-menu.json'
  },
  [BT_FGR]: {
    browserType: BT_FGR,
    caption: 'Eurostat: FIGARO',
    sourceMenuUrl: './data/figaro/source-menu.json'
  },
  [BT_PE]: {
    browserType: BT_PE,
    caption: 'Euro Indicators / PEEIs',
    sourceMenuUrl: './data/peeis/source-menu.json'
  },
  [BT_UN_COMTRADE]: {
    browserType: BT_UN_COMTRADE,
    caption: 'UN Comtrade',
    sourceMenuUrl: './data/uncomtrade/source-menu.json'
  },
  [BT_FAOSTAT]: {
    browserType: BT_FAOSTAT,
    caption: 'FAOSTAT',
    sourceMenuUrl: './data/faostat/source-menu.json'
  },
  [BT_WORLD_BANK]: {
    browserType: BT_WORLD_BANK,
    caption: 'World Bank',
    sourceMenuUrl: './data/world-bank/source-menu.json'
  },
  [BT_NDL]: {
    browserType: BT_NDL,
    caption: 'Nasdaq Data Link',
    sourceMenuUrl: './data/ndl/source-menu.json'
  },
  [BT_DB_NOMICS]: {
    browserType: BT_DB_NOMICS,
    caption: 'DB Nomics',
    sourceMenuUrl: './data/db-nomics/source-menu.json'
  },
  [BT_ENERGY]: {
    browserType: BT_ENERGY,
    caption: 'Energy',
    sourceMenuUrl: './data/energy/source-menu.json'
  },
  [BT_BLOCKCHAIN]: {
    browserType: BT_BLOCKCHAIN,
    caption: 'Blockchain',
    sourceMenuUrl: './data/blockchain/source-menu.json'
  },
  [BT_COMMODITIES]: {
    browserType: BT_COMMODITIES,
    caption: 'Commodities',
    sourceMenuUrl: './data/commodities/source-menu.json'
  },

  [BT_FRANCE_STATISTICS]: {
    browserType: BT_FRANCE_STATISTICS,
    caption: 'Insee: France Statistics',
    sourceMenuUrl: './data/statistics-france/source-menu.json'
  },
  [BT_UK_STATISTICS]: {
    browserType: BT_UK_STATISTICS,
    caption: 'ONS: UK Statistics',
    sourceMenuUrl: './data/statistics-uk/source-menu.json'
  },
  [BT_NORWAY_STATISTICS]: {
    browserType: BT_NORWAY_STATISTICS,
    caption: 'Statistics Norway',
    sourceMenuUrl: './data/statistics-norway/source-menu.json'
  },
  [BT_NORWAY_STAT_ALL]: {
    browserType: BT_NORWAY_STAT_ALL,
    caption: 'Statistics Norway All',
    dfProps: {
      bT: BT_NORWAY_STAT_ALL,
      lT: 'NST_2',
      sP: 'Stat. Norway',
      dU: './data/statistics-norway/statistics-norway.html',
      dS: 'Statistics Norway',
      rootUrl: 'https://data.ssb.no/api/v0/en/table'
    }
  },
  [BT_SWEDEN_STAT]: {
    browserType: BT_SWEDEN_STAT,
    caption: 'Statistics Sweden',
    sourceMenuUrl: './data/statistics-sweden/source-menu.json'
  },
  [BT_SWEDEN_STAT_ALL]: {
    browserType: BT_SWEDEN_STAT_ALL,
    caption: 'Statistics Sweden All',
    dfProps: {
      bT: BT_SWEDEN_STAT_ALL,
      lT: 'SWS',
      sP: 'Stat. Sweden',
      dU: './data/statistics-sweden/statistics-sweden.html',
      dS: 'Statistics Sweden',
      rootUrl: 'https://api.scb.se/OV0104/v1/doris/en/ssd'
    }
  },
  [BT_FINLAND_STAT_ALL]: {
    browserType: BT_FINLAND_STAT_ALL,
    caption: 'Statistics Finland All',
    dfProps: {
      bT: BT_FINLAND_STAT_ALL,
      lT: 'SFL',
      sP: 'Stat. Finland',
      dU: './data/statistics-finland/statistics-finland.html',
      dS: 'Statistics Finland',
      noTime: true,
      rootUrl: 'https://statfin.stat.fi/PXWeb/api/v1/en/StatFin'
    }
  },
  [BT_DENMARK_STAT_ALL]: {
    browserType: BT_DENMARK_STAT_ALL,
    caption: 'Statistics Denmark All',
    dfProps: {
      bT: BT_DENMARK_STAT_ALL,
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
  [BT_IRELAND_STAT_ALL]: {
    browserType: BT_IRELAND_STAT_ALL,
    caption: 'CSO Ireland All',
    dfProps: {
      bT: BT_IRELAND_STAT_ALL,
      lT: 'SIR',
      sP: 'CSO Ireland',
      dU: './data/statistics-ireland/statistics-ireland.html',
      dS: 'CSO Ireland',
      rootUrl: 'https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.PxAPIv1/en'
    }
  },
  [BT_US_ECONOMICS]: {
    browserType: BT_US_ECONOMICS,
    caption: 'US Economics',
    sourceMenuUrl: './data/us-economics/source-menu.json'
  },
  [BT_NYSE_STOCKS]: {
    browserType: BT_NYSE_STOCKS,
    caption: 'NYSE by Sectors',
    sourceMenuUrl: './data/nyse-stocks/source-menu.json',
    withoutItemCounter: true,
    modalDialogType: MDT_STOCKS_BY_SECTOR,
    chartContainerType: BT_NYSE_STOCKS + '_' + BT_STOCKS_BY_SECTORS,
    contFullCaption: 'NYSE by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType: 'ItemWithCap',
    descrUrl: './data/nyse-stocks/nyse-stocks.html'
  },
  [BT_NASDAQ_STOCKS]: {
    browserType: BT_NASDAQ_STOCKS,
    caption: 'NASDAQ by Sectors',
    sourceMenuUrl: './data/nasdaq-stocks/source-menu.json',
    withoutItemCounter: true,
    modalDialogType: MDT_STOCKS_BY_SECTOR,
    chartContainerType: BT_NASDAQ_STOCKS + '_' + BT_STOCKS_BY_SECTORS,
    contFullCaption: 'NASDAQ by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType: 'ItemWithCap',
    descrUrl: './data/nasdaq-stocks/nasdaq-stocks.html'
  },

  [BT_WATCH_LIST]: {
    browserType: BT_WATCH_LIST,
    withoutItemCounter: true
  }
};

export default BrowserConfig
