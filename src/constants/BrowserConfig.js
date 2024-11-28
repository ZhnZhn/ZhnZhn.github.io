import {
  BT_STOCK_MARKETS,
  BT_EUROSTAT,
  BT_FGR,
  BT_PE,
  BT_COMEXT,
  BT_SDG,
  BT_MIP,
  BT_CEI,
  BT_UN_COMTRADE,
  BT_FAOSTAT,
  BT_WORLD_BANK,
  BT_WTO,
  BT_DB_NOMICS,
  BT_ENERGY,
  BT_BLOCKCHAIN,
  BT_COMMODITIES,
  BT_CENTRAL_BANKS,
  BT_CURRENCY,
  BT_OECD,
  BT_FRANCE_STATISTICS,
  BT_UK_STATISTICS,
  BT_NORWAY_STATISTICS,
  BT_NORWAY_STAT_ALL,
  BT_SWEDEN_STAT,
  BT_SWEDEN_STAT_ALL,
  BT_FINLAND_STAT_ALL,
  BT_DENMARK_STAT_ALL,
  BT_IRELAND_STAT_ALL,
  BT_SWISS_STAT,
  BT_US_ECONOMICS,
  BT_NYSE_STOCKS,
  BT_STOCKS_BY_SECTORS,
  BT_NASDAQ_STOCKS,
  BT_WATCH_LIST
} from './BrowserType';
import {
  MDT_STOCKS_BY_SECTOR
} from './ModalDialogType';

const S_ITEM_MULTI_LINE = {
  maxWidth: 275,
  lineHeight: 1.3,
  paddingTop: 6,
  paddingBottom: 6
}
, S_ITEM_MULTI_LINE_WHITE_SPACE = {
  ...S_ITEM_MULTI_LINE,
  whiteSpace: 'unset'
}

const _crSourceMenuUrl = (
  token
) => `./data/${token}/source-menu.json`
, _crBrowserItem = (
  browserType,
  caption,
  token,
  itemStyle,
  topicStyle
) => ({
  browserType,
  caption,
  sourceMenuUrl: _crSourceMenuUrl(token),
  itemStyle,
  topicStyle
});

const BrowserConfig = {
  [BT_STOCK_MARKETS]: _crBrowserItem(
    BT_STOCK_MARKETS,
    'Stock Markets',
    'stock-markets'
  ),
  [BT_EUROSTAT]: _crBrowserItem(
    BT_EUROSTAT,
    'Eurostat Overview',
    'eurostat'
  ),
  [BT_FGR]: _crBrowserItem(
    BT_FGR,
    'EU FIGARO',
    'figaro'
  ),
  [BT_PE]: _crBrowserItem(
    BT_PE,
    'Euro Indicators / PEEIs',
    'peeis'
  ),
  [BT_COMEXT]: _crBrowserItem(
    BT_COMEXT,
    'EU Comext',
    'comext'
  ),
  [BT_SDG]: _crBrowserItem(
    BT_SDG,
    'EU SDG',
    'eu-sdg',
    {...S_ITEM_MULTI_LINE},
    {...S_ITEM_MULTI_LINE_WHITE_SPACE}
  ),
  [BT_MIP]: _crBrowserItem(
    BT_MIP,
    'EU MIP',
    'eu-mip',
    {...S_ITEM_MULTI_LINE},
    {...S_ITEM_MULTI_LINE_WHITE_SPACE}
  ),
  [BT_CEI]: _crBrowserItem(
    BT_CEI,
    'Circular economy indicators',
    'eu-cei',
    {...S_ITEM_MULTI_LINE},
    {...S_ITEM_MULTI_LINE_WHITE_SPACE}
  ),
  [BT_UN_COMTRADE]: _crBrowserItem(
    BT_UN_COMTRADE,
    'UN Comtrade',
    'uncomtrade'
  ),
  [BT_FAOSTAT]: _crBrowserItem(
    BT_FAOSTAT,
    'FAOSTAT',
    'faostat'
  ),
  [BT_WORLD_BANK]: _crBrowserItem(
    BT_WORLD_BANK,
    'World Bank',
    'world-bank'
  ),
  [BT_WTO]: _crBrowserItem(
    BT_WTO,
    'WTO',
    'wto'
  ),
  [BT_DB_NOMICS]: _crBrowserItem(
    BT_DB_NOMICS,
    'DBnomics',
    'db-nomics'
  ),
  [BT_ENERGY]: _crBrowserItem(
    BT_ENERGY,
    'Energy',
    'energy'
  ),
  [BT_BLOCKCHAIN]: _crBrowserItem(
    BT_BLOCKCHAIN,
    'Blockchains',
    'blockchain'
  ),
  [BT_COMMODITIES]: _crBrowserItem(
    BT_COMMODITIES,
    'Commodities',
    'commodities'
  ),
  [BT_CENTRAL_BANKS]: _crBrowserItem(
    BT_CENTRAL_BANKS,
    'Central Banks',
    'central-banks'
  ),
  [BT_CURRENCY]: _crBrowserItem(
    BT_CURRENCY,
    'Currencies',
    'currency'
  ),
  [BT_OECD]: _crBrowserItem(
    BT_OECD,
    'OECD',
    'oecd'
  ),

  [BT_FRANCE_STATISTICS]: _crBrowserItem(
    BT_FRANCE_STATISTICS,
    'INSEE: Statistics France',
    'statistics-france'
  ),
  [BT_UK_STATISTICS]: _crBrowserItem(
    BT_UK_STATISTICS,
    'ONS: Statistics UK',
    'statistics-uk'
  ),
  [BT_NORWAY_STATISTICS]: _crBrowserItem(
    BT_NORWAY_STATISTICS,
    'Statistics Norway (A)',
    'statistics-norway'
  ),
  [BT_NORWAY_STAT_ALL]: {
    browserType: BT_NORWAY_STAT_ALL,
    caption: 'Statistics Norway',
    dfProps: {
      bT: BT_NORWAY_STAT_ALL,
      lT: 'NST_2',
      sP: 'Stat. Norway',
      dU: './data/statistics-norway/statistics-norway.html',
      dS: 'Statistics Norway',
      rootUrl: 'https://data.ssb.no/api/v0/en/table'
    }
  },
  [BT_SWEDEN_STAT]: _crBrowserItem(
    BT_SWEDEN_STAT,
    'Statistics Sweden (A)',
    'statistics-sweden'
  ),
  [BT_SWEDEN_STAT_ALL]: {
    browserType: BT_SWEDEN_STAT_ALL,
    caption: 'Statistics Sweden',
    dfProps: {
      bT: BT_SWEDEN_STAT_ALL,
      lT: 'SWS',
      sP: 'Stat. Sweden',
      dU: './data/statistics-sweden/statistics-sweden.html',
      dS: 'Statistics Sweden',
      rootUrl: 'https://api.scb.se/OV0104/v1/doris/en/ssd'
    }
  },
  [BT_SWISS_STAT]: _crBrowserItem(
    BT_SWISS_STAT,
    'FSO: Statistics Swiss',
    'statistics-swiss'
  ),
  [BT_FINLAND_STAT_ALL]: {
    browserType: BT_FINLAND_STAT_ALL,
    caption: 'Statistics Finland',
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
    caption: 'Statistics Denmark',
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
    caption: 'CSO: Statistics Ireland',
    dfProps: {
      bT: BT_IRELAND_STAT_ALL,
      lT: 'SIR',
      sP: 'CSO Ireland',
      dU: './data/statistics-ireland/statistics-ireland.html',
      dS: 'CSO Ireland',
      rootUrl: 'https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.PxAPIv1/en'
    }
  },
  [BT_US_ECONOMICS]: _crBrowserItem(
    BT_US_ECONOMICS,
    'U.S. Economics',
    'us-economics'
  ),
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
