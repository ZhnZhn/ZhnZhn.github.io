import { BrowserType, ModalDialog } from './Type';

const BrowserConfig = {
  [BrowserType.STOCK_MARKETS]: {
    browserType: BrowserType.STOCK_MARKETS,
    isDynamic: true,
    caption: 'Stock Markets',
    sourceMenuUrl: './data/stock-markets/source-menu.json'
  },
  [BrowserType.EUROSTAT] : {
    browserType: BrowserType.EUROSTAT,
    isDynamic : true,
    caption: 'European Statistics',
    sourceMenuUrl : './data/eurostat/source-menu.json'
  },
  [BrowserType.ECONOMIC] : {
    browserType: BrowserType.ECONOMIC,
    isDynamic: false
  },
  /*
  [BrowserType.GOOGLE] : {
    browserType: BrowserType.GOOGLE,
    isDynamic : true,
    caption: 'Quandl : Google Stocks',
    sourceMenuUrl : './data/google/source-menu.json'
  },
  [BrowserType.YAHOO] : {
    browserType: BrowserType.YAHOO,
    isDynamic : true,
    caption: 'Quandl : Yahoo Stocks',
    sourceMenuUrl : './data/yahoo/source-menu.json'
  },
  */
  [BrowserType.PREMIUM_SAMPLE] : {
    browserType: BrowserType.PREMIUM_SAMPLE,
    isDynamic : true,
    caption: 'Quandl Premium Sample',
    sourceMenuUrl : './data/quandl-sample/source-menu.json'
  },
  [BrowserType.FRANCE_STATISTICS] : {
    browserType: BrowserType.FRANCE_STATISTICS,
    isDynamic : true,
    caption: 'Quandl : France Statistics',
    sourceMenuUrl: './data/france-statistics/source-menu.json'
  },
  [BrowserType.US_STOCKS] : {
    browserType : BrowserType.US_STOCKS,
    isDynamic : true,
    caption: 'US Stocks by Sectors',
    sourceMenuUrl: './data/us-stocks/source-menu.json',
    withoutItemCounter : true,
    modalDialogType : ModalDialog.US_STOCK_BY_SECTOR,
    chartContainerType : BrowserType.US_STOCKS + '_' + BrowserType.STOCKS_BY_SECTORS,
    chartContainerCaption : 'Quandl : Stocks by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType : 'Item',
    descrUrl : './data/us-stocks/description.html'
  },
  [BrowserType.NYSE_STOCKS] : {
    browserType : BrowserType.NYSE_STOCKS,
    isDynamic : true,
    caption: 'US NYSE by Sectors',
    sourceMenuUrl: './data/nyse-stocks/source-menu.json',
    withoutItemCounter : true,
    modalDialogType : ModalDialog.STOCKS_BY_SECTOR,
    chartContainerType : BrowserType.NYSE_STOCKS + '_' + BrowserType.STOCKS_BY_SECTORS,
    chartContainerCaption : 'Quandl : US NYSE by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType : 'ItemWithCap',
    descrUrl : './data/nyse-stocks/nyse-stocks.html'
  },
  [BrowserType.NASDAQ_STOCKS] : {
    browserType : BrowserType.NASDAQ_STOCKS,
    isDynamic : true,
    caption: 'US NASDAQ by Sectors',
    sourceMenuUrl: './data/nasdaq-stocks/source-menu.json',
    withoutItemCounter : true,
    modalDialogType : ModalDialog.STOCKS_BY_SECTOR,
    chartContainerType : BrowserType.NASDAQ_STOCKS + '_' + BrowserType.STOCKS_BY_SECTORS,
    chartContainerCaption : 'Quandl : US NASDAQ by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType : 'ItemWithCap',
    descrUrl : './data/nasdaq-stocks/nasdaq-stocks.html'
  },
  [BrowserType.LONDON_STOCKS] : {
    browserType : BrowserType.LONDON_STOCKS,
    isDynamic : true,
    caption: 'London Stocks by Sectors',
    sourceMenuUrl: './data/london-stocks/source-menu.json',
    withoutItemCounter : true,
    modalDialogType : ModalDialog.STOCKS_BY_SECTOR,
    chartContainerType : BrowserType.LONDON_STOCKS + '_' + BrowserType.STOCKS_BY_SECTORS,
    chartContainerCaption : 'Quandl : London Stock Exchange by Sectors',
    itemOptionType: 'ItemTopicOption',
    itemType : 'ItemLse',
    descrUrl : './data/london-stocks/lse-stocks.html'
  },

  [BrowserType.WATCH_LIST] : {
    browserType : BrowserType.WATCH_LIST,
    isDynamic : false,
    withoutItemCounter : true
  }
};

export default BrowserConfig
