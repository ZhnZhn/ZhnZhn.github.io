import { BrowserType as BT, ModalDialog as MD } from './Type';

const BrowserConfig = {
  [BT.STOCK_MARKETS]: {
    browserType: BT.STOCK_MARKETS,
    isDynamic: true,
    caption: 'Stock Markets',
    sourceMenuUrl: './data/stock-markets/source-menu.json'
  },
  [BT.EUROSTAT]: {
    browserType: BT.EUROSTAT,
    isDynamic: true,
    caption: 'European Statistics',
    sourceMenuUrl: './data/eurostat/source-menu.json'
  },
  [BT.UN_COMTRADE]: {
    browserType: BT.UN_COMTRADE,
    isDynamic: true,
    caption: 'UN Comtrade',
    sourceMenuUrl: './data/uncomtrade/source-menu.json'
  },
  [BT.FAOSTAT]: {
    browserType: BT.FAOSTAT,
    isDynamic: true,
    caption: 'FAOSTAT',
    sourceMenuUrl: './data/faostat/source-menu.json'
  },
  [BT.ECONOMIC]: {
    browserType: BT.ECONOMIC,
    isDynamic: false
  },

  [BT.PREMIUM_SAMPLE]: {
    browserType: BT.PREMIUM_SAMPLE,
    isDynamic: true,
    caption: 'Quandl Premium Sample',
    sourceMenuUrl: './data/quandl-sample/source-menu.json'
  },
  [BT.FRANCE_STATISTICS]: {
    browserType: BT.FRANCE_STATISTICS,
    isDynamic: true,
    caption: 'Insee: France Statistics',
    sourceMenuUrl: './data/france-statistics/source-menu.json'
  },
  [BT.NORWAY_STATISTICS]: {
    browserType: BT.NORWAY_STATISTICS,
    isDynamic: true,
    caption: 'Statistics Norway',
    sourceMenuUrl: './data/statistics-norway/source-menu.json'
  },
  [BT.SWEDEN_STAT]: {
    browserType: BT.SWEDEN_STAT,
    isDynamic: true,
    caption: 'Statistics Sweden',
    sourceMenuUrl: './data/stat-sweden/source-menu.json'
  },
  [BT.US_STOCKS]: {
    browserType: BT.US_STOCKS,
    isDynamic: true,
    caption: 'US Stocks by Sectors',
    sourceMenuUrl: './data/us-stocks/source-menu.json',
    withoutItemCounter: true,
    modalDialogType: MD.US_STOCK_BY_SECTOR,
    chartContainerType: BT.US_STOCKS + '_' + BT.STOCKS_BY_SECTORS,
    chartContainerCaption: 'Quandl : Stocks by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType: 'Item',
    descrUrl: './data/us-stocks/description.html'
  },
  [BT.NYSE_STOCKS]: {
    browserType: BT.NYSE_STOCKS,
    isDynamic: true,
    caption: 'US NYSE by Sectors',
    sourceMenuUrl: './data/nyse-stocks/source-menu.json',
    withoutItemCounter: true,
    modalDialogType: MD.STOCKS_BY_SECTOR,
    chartContainerType: BT.NYSE_STOCKS + '_' + BT.STOCKS_BY_SECTORS,
    chartContainerCaption: 'Quandl : US NYSE by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType: 'ItemWithCap',
    descrUrl: './data/nyse-stocks/nyse-stocks.html'
  },
  [BT.NASDAQ_STOCKS]: {
    browserType: BT.NASDAQ_STOCKS,
    isDynamic: true,
    caption: 'US NASDAQ by Sectors',
    sourceMenuUrl: './data/nasdaq-stocks/source-menu.json',
    withoutItemCounter: true,
    modalDialogType: MD.STOCKS_BY_SECTOR,
    chartContainerType: BT.NASDAQ_STOCKS + '_' + BT.STOCKS_BY_SECTORS,
    chartContainerCaption: 'Quandl : US NASDAQ by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType: 'ItemWithCap',
    descrUrl: './data/nasdaq-stocks/nasdaq-stocks.html'
  },
  [BT.LONDON_STOCKS]: {
    browserType: BT.LONDON_STOCKS,
    isDynamic: true,
    caption: 'London Stocks by Sectors',
    sourceMenuUrl: './data/london-stocks/source-menu.json',
    withoutItemCounter: true,
    modalDialogType: MD.STOCKS_BY_SECTOR,
    chartContainerType: BT.LONDON_STOCKS + '_' + BT.STOCKS_BY_SECTORS,
    chartContainerCaption: 'Quandl : London Stock Exchange by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType: 'ItemLse',
    descrUrl: './data/london-stocks/lse-stocks.html'
  },

  [BT.WATCH_LIST]: {
    browserType: BT.WATCH_LIST,
    //isDynamic : false,
    withoutItemCounter: true
  }
};

export default BrowserConfig
