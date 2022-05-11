import {
  BrowserType as BT
} from './Type';
import {
  MDT_STOCKS_BY_SECTOR
} from './ModalDialogType';

const BrowserConfig = {
  [BT.STOCK_MARKETS]: {
    browserType: BT.STOCK_MARKETS,
    caption: 'Stock Markets',
    sourceMenuUrl: './data/stock-markets/source-menu.json'
  },
  [BT.EUROSTAT]: {
    browserType: BT.EUROSTAT,
    caption: 'Eurostat Statistics',
    sourceMenuUrl: './data/eurostat/source-menu.json'
  },
  [BT.FGR]: {
    browserType: BT.FGR,
    caption: 'Eurostat: FIGARO',
    sourceMenuUrl: './data/figaro/source-menu.json'
  },
  [BT.PE]: {
    browserType: BT.PE,
    caption: 'Euro Indicators / PEEIs',
    sourceMenuUrl: './data/peeis/source-menu.json'
  },
  [BT.UN_COMTRADE]: {
    browserType: BT.UN_COMTRADE,
    caption: 'UN Comtrade',
    sourceMenuUrl: './data/uncomtrade/source-menu.json'
  },
  [BT.FAOSTAT]: {
    browserType: BT.FAOSTAT,
    caption: 'FAOSTAT',
    sourceMenuUrl: './data/faostat/source-menu.json'
  },
  [BT.WORLD_BANK]: {
    browserType: BT.WORLD_BANK,
    caption: 'World Bank',
    sourceMenuUrl: './data/world-bank/source-menu.json'
  },
  [BT.QUANDL]: {
    browserType: BT.QUANDL,
    caption: 'Quandl',
    sourceMenuUrl: './data/quandl/source-menu.json'
  },
  [BT.DB_NOMICS]: {
    browserType: BT.DB_NOMICS,
    caption: 'DB Nomics',
    sourceMenuUrl: './data/db-nomics/source-menu.json'
  },
  [BT.BLOCKCHAIN]: {
    browserType: BT.BLOCKCHAIN,
    caption: 'Blockchain',
    sourceMenuUrl: './data/blockchain/source-menu.json'
  },
  [BT.FUTURES]: {
    browserType: BT.FUTURES,
    caption: 'Futures Markets',
    sourceMenuUrl: './data/futures-markets/source-menu.json'
  },

  [BT.FRANCE_STATISTICS]: {
    browserType: BT.FRANCE_STATISTICS,
    caption: 'Insee: France Statistics',
    sourceMenuUrl: './data/statistics-france/source-menu.json'
  },
  [BT.UK_STATISTICS]: {
    browserType: BT.UK_STATISTICS,
    caption: 'ONS: UK Statistics',
    sourceMenuUrl: './data/statistics-uk/source-menu.json'
  },
  [BT.NORWAY_STATISTICS]: {
    browserType: BT.NORWAY_STATISTICS,
    caption: 'Statistics Norway',
    sourceMenuUrl: './data/statistics-norway/source-menu.json'
  },
  [BT.NORWAY_STAT_ALL]: {
    browserType: BT.NORWAY_STAT_ALL,
    caption: 'Statistics Norway All',
    dfProps: {
      bT: BT.NORWAY_STAT_ALL,
      lT: 'NST_2',
      sP: 'Stat. Norway',
      dU: './data/statistics-norway/statistics-norway.html',
      dS: 'Statistics Norway',
      rootUrl: 'https://data.ssb.no/api/v0/en/table'
    }
  },
  [BT.SWEDEN_STAT]: {
    browserType: BT.SWEDEN_STAT,
    caption: 'Statistics Sweden',
    sourceMenuUrl: './data/statistics-sweden/source-menu.json'
  },
  [BT.SWEDEN_STAT_ALL]: {
    browserType: BT.SWEDEN_STAT_ALL,
    caption: 'Statistics Sweden All',
    dfProps: {
      bT: BT.SWEDEN_STAT_ALL,
      lT: 'SWS',
      sP: 'Stat. Sweden',
      dU: './data/statistics-sweden/statistics-sweden.html',
      dS: 'Statistics Sweden',
      rootUrl: 'https://api.scb.se/OV0104/v1/doris/en/ssd'
    }
  },
  [BT.FINLAND_STAT_ALL]: {
    browserType: BT.FINLAND_STAT_ALL,
    caption: 'Statistics Finland All',
    dfProps: {
      bT: BT.FINLAND_STAT_ALL,
      lT: 'SFL',
      sP: 'Stat. Finland',
      dU: './data/statistics-finland/statistics-finland.html',
      dS: 'Statistics Finland',
      noTime: true,
      rootUrl: 'https://pxnet2.stat.fi/PXWeb/api/v1/en/StatFin'
    }
  },
  [BT.DENMARK_STAT_ALL]: {
    browserType: BT.DENMARK_STAT_ALL,
    caption: 'Statistics Denmark All',
    dfProps: {
      bT: BT.DENMARK_STAT_ALL,
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
  [BT.IRELAND_STAT_ALL]: {
    browserType: BT.IRELAND_STAT_ALL,
    caption: 'CSO Ireland All',
    dfProps: {
      bT: BT.IRELAND_STAT_ALL,
      lT: 'SIR',
      sP: 'CSO Ireland',
      dU: './data/statistics-ireland/statistics-ireland.html',
      dS: 'CSO Ireland',
      rootUrl: 'https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.PxAPIv1/en'
    }
  },
  [BT.US_ECONOMICS]: {
    browserType: BT.US_ECONOMICS,
    caption: 'USA Economics',
    sourceMenuUrl: './data/usa-economy/source-menu.json'
  },
  [BT.NYSE_STOCKS]: {
    browserType: BT.NYSE_STOCKS,
    caption: 'NYSE by Sectors',
    sourceMenuUrl: './data/nyse-stocks/source-menu.json',
    withoutItemCounter: true,
    modalDialogType: MDT_STOCKS_BY_SECTOR,
    chartContainerType: BT.NYSE_STOCKS + '_' + BT.STOCKS_BY_SECTORS,
    contFullCaption: 'NYSE by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType: 'ItemWithCap',
    descrUrl: './data/nyse-stocks/nyse-stocks.html'
  },
  [BT.NASDAQ_STOCKS]: {
    browserType: BT.NASDAQ_STOCKS,
    caption: 'NASDAQ by Sectors',
    sourceMenuUrl: './data/nasdaq-stocks/source-menu.json',
    withoutItemCounter: true,
    modalDialogType: MDT_STOCKS_BY_SECTOR,
    chartContainerType: BT.NASDAQ_STOCKS + '_' + BT.STOCKS_BY_SECTORS,
    contFullCaption: 'NASDAQ by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType: 'ItemWithCap',
    descrUrl: './data/nasdaq-stocks/nasdaq-stocks.html'
  },

  [BT.WATCH_LIST]: {
    browserType: BT.WATCH_LIST,
    withoutItemCounter: true
  }
};

export default BrowserConfig
