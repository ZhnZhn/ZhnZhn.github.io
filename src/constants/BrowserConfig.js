import { BrowserType, ModalDialog } from './Type';

const BrowserConfig = {
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
    caption: 'Quandl : Stocks by Sectors',
    sourceMenuUrl: './data/us-stocks/source-menu.json',
    withoutItemCounter : true,
    modalDialogType : ModalDialog.US_STOCK_BY_SECTOR,
    itemType : 'Item',
    descrUrl : './data/us-stocks/description.html'
  },
  [BrowserType.NYSE_STOCKS] : {
    browserType : BrowserType.NYSE_STOCKS,
    isDynamic : true,
    caption: 'Quandl : US NYSE by Sectors',
    sourceMenuUrl: './data/nyse-stocks/source-menu.json',
    withoutItemCounter : true,
    modalDialogType : ModalDialog.STOCKS_BY_SECTOR,
    itemType : 'ItemWithCap',
    descrUrl : './data/nyse-stocks/nyse-stocks.html'
  },
  [BrowserType.WATCH_LIST] : {
    browserType : BrowserType.WATCH_LIST,
    isDynamic : false,
    withoutItemCounter : true
  }
};

export default BrowserConfig
