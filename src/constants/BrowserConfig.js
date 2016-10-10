
const BrowserConfig = {
  EUROSTAT : {
    browserType: 'ES',
    caption: 'European Statistics',
    sourceMenuUrl : './data/eurostat/source-menu.json'
  },
  GOOGLE : {
    browserType: 'QD',
    caption: 'Quandl : Google Stocks',
    sourceMenuUrl : './data/google/source-menu.json'
  },
  YAHOO : {
    browserType: 'QY',
    caption: 'Quandl : Yahoo Stocks',
    sourceMenuUrl : './data/yahoo/source-menu.json'
  },
  PREMIUM_SAMPLE : {
    browserType: 'QPS',
    caption: 'Quandl Premium Sample',
    sourceMenuUrl : './data/quandl-sample/source-menu.json'
  },
  FRANCE_STATISTICS : {
    browserType: 'QFS',
    caption: 'Quandl : France Statistics',
    sourceMenuUrl: './data/france-statistics/source-menu.json'
  }
};

export default BrowserConfig
