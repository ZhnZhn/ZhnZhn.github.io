'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var DataQE = {

  QE_COMMODITY_PRICE: {
    type: 'QE_COMMODITY_PRICE',
    menuTitle: 'Commodity Prices',
    dialogCaption: 'Commodity Price',
    chartContainerCaption: 'Quandl Commodity Prices',
    dialogType: 'DialogType4A',
    dialogProps: {
      descrUrl: './data/quandl/commodity-price.html',
      nInitFromDate: 4,
      oneCaption: 'Type',
      oneURI: './data/quandl/commodity-price.json',
      oneJsonProp: 'commodities',
      twoCaption: 'Commodity',
      valueFn: 'RTwo',
      loadId: 'Q'
    },
    dataColumn: 1
  },
  QE_COMMODITY_TRADE: {
    type: 'QE_COMMODITY_TRADE',
    menuTitle: 'UN Commodity Trade',
    dialogCaption: 'United Nations Commodity Trade',
    chartContainerCaption: 'Quandl United Nations Commodity Trade',
    dialogType: 'UNCommodityTradeDialog',
    dialogProps: {
      descrUrl: './data/quandl/un-commodity-trade.html',
      nInitFromDate: 10,
      countryURI: './data/quandl/country-area.json',
      countryJsonProp: 'countries',
      commodityURI: './data/quandl/commodity-items.json',
      commodityJsonProp: 'items',
      valueFn: 'RPrefixOneTwo',
      valueFnPrefix: 'UCOM',
      loadId: 'QCT'
    },
    dataColumn: 1
  },
  QE_JODI_WORLD_GAS: {
    type: 'QE_JODI_WORLD_GAS',
    menuTitle: 'JODI World Gas',
    dialogCaption: 'JODI World Gas',
    chartContainerCaption: 'Quandl JODI World Gas',
    dialogType: 'DialogType5',
    dialogProps: {
      descrUrl: './data/quandl/jodi.html',
      nInitFromDate: 3,
      oneCaption: 'Country',
      oneURI: './data/quandl/jodi-country-iso.json',
      oneJsonProp: 'countries',
      twoCaption: 'Product',
      twoURI: './data/quandl/jodi-gas-products.json',
      twoJsonProp: 'products',
      threeCaption: 'Flow',
      fnValueType: 'PlusTreeItem',
      valueFn: 'RJodiGas',
      loadId: 'Q'
    },
    dataColumn: 1
  },
  QE_JODI_WORLD_OIL: {
    type: 'QE_JODI_WORLD_OIL',
    menuTitle: 'JODI World Oil',
    dialogCaption: 'JODI World Oil',
    chartContainerCaption: 'Quandl JODI World Oil',
    dialogType: 'JodiWorldOilDialog',
    dialogProps: {
      descrUrl: './data/quandl/jodi.html',
      nInitFromDate: 3,
      oneCaption: 'Country',
      oneURI: './data/quandl/jodi-country-iso.json',
      oneJsonProp: 'countries',

      parentChildURI: './data/quandl/jodi-oil-products.json',
      parentCaption: 'Product',
      parentJsonProp: 'products',
      childCaption: 'Flow',

      valueFn: 'RJodiOil',
      loadId: 'Q'
    },
    dataColumn: 1
  },
  QE_GLOBAL_INDICATOR: {
    type: 'QE_GLOBAL_INDICATOR',
    menuTitle: 'UN Global Indicator',
    dialogCaption: 'United Nations Global Indicator',
    chartContainerCaption: 'Quandl United Nations Global Indicator',
    dialogType: 'DialogType5',
    dialogProps: {
      descrUrl: './data/quandl/un-global-indicator.html',
      nInitFromDate: 10,
      oneCaption: 'Country',
      oneURI: './data/quandl/country-area.json',
      oneJsonProp: 'countries',
      twoCaption: 'Indicators',
      twoURI: './data/quandl/un-global-indicators.json',
      twoJsonProp: 'indicators',
      threeCaption: 'Metric',
      valueFn: 'RPrefixTwoOne',
      valueFnPrefix: 'UGID',
      loadId: 'Q'
    },
    dataColumn: 1
  },
  QE_CURRENCY_HISTORY: {
    type: 'QE_CURRENCY_HISTORY',
    menuTitle: 'Currency History',
    dialogCaption: 'Currency History',
    chartContainerCaption: 'Quandl Currency History',
    dialogType: 'DialogType4A',
    dialogProps: {
      descrUrl: './data/quandl/currency-history.html',
      oneCaption: 'Source',
      oneURI: './data/quandl/currency-history.json',
      oneJsonProp: 'sources',
      twoCaption: 'Currency',
      valueFn: 'ROneTwo',
      loadId: 'Q',
      columnName: 'Value'
    }
  },
  QE_WORLDBANK_PRICE: {
    type: 'QE_WORLDBANK_PRICE',
    menuTitle: 'WB Economic Metric',
    dialogCaption: 'WorlBank Economic Metric',
    chartContainerCaption: 'Quandl World Bank Economic Metric',
    dialogType: 'DialogType5',
    dialogProps: {
      descrUrl: './data/quandl/wb-development-indicator.html',
      nInitFromDate: 7,
      oneCaption: 'Country',
      oneURI: './data/quandl/iso3-countries.json',
      oneJsonProp: 'countries',
      twoCaption: 'Group',
      twoURI: './data/quandl/wb-metric-groups.json',
      twoJsonProp: 'groups',
      threeCaption: 'Metric',
      fnValueType: 'TreeItem',
      valueFn: 'RPrefixOneTwo',
      valueFnPrefix: 'WWDI',
      loadId: 'Q'
    },
    dataColumn: 1
  },
  QE_IMF_CROSSCOUNTRY: {
    type: 'QE_IMF_CROSSCOUNTRY',
    menuTitle: 'IMF Cross Country Metric',
    dialogCaption: 'IMF Cross Country Metric',
    chartContainerCaption: 'Quandl IMF Cross Country Metric',
    dialogType: 'DialogType5',
    dialogProps: {
      descrUrl: './data/quandl/imf-crosscountry-metric.html',
      nInitFromDate: 7,
      oneCaption: 'Country',
      oneURI: './data/quandl/iso3-countries.json',
      oneJsonProp: 'countries',
      twoCaption: 'Group',
      twoURI: './data/quandl/imf-metric-groups.json',
      twoJsonProp: 'groups',
      threeCaption: 'Metric',
      fnValueType: 'TreeItem',
      valueFn: 'RPrefixOneTwo',
      valueFnPrefix: 'ODA',
      loadId: 'Q'
    },
    dataColumn: 1
  },
  QE_EU_COMMISSION: {
    type: 'QE_EU_COMMISSION',
    menuTitle: 'EU Commission Annual',
    dialogCaption: 'EU Commission Annual',
    chartContainerCaption: 'Quandl EU Commission Annual',
    dialogType: 'DialogType5',
    dialogProps: {
      descrUrl: './data/quandl/ameco.html',
      nInitFromDate: 20,
      oneCaption: 'Country',
      oneURI: './data/quandl/ameco-countries.json',
      oneJsonProp: 'countries',
      twoCaption: 'Group',
      twoURI: './data/quandl/ameco-indicators.json',
      twoJsonProp: 'groups',
      threeCaption: 'Metric',
      fnValueType: 'TreeItem',
      valueFn: 'RPrefixOneTwo',
      valueFnPrefix: 'AMECO',
      loadId: 'Q'
    },
    dataColumn: 1
  },
  QE_CPI_INFLATION: {
    type: 'QE_CPI_INFLATION',
    menuTitle: 'CPI & Inflation',
    dialogCaption: 'CPI & Inflation',
    chartContainerCaption: 'Consumer Price Index and Inflation',
    dialogProps: {
      descrUrl: './data/quandl/rate-cpi-inflation.html',
      optionURI: './data/quandl/rate-cpi-inflation.json',
      optionsJsonProp: 'codes',
      optionNames: 'Codes',
      nInitFromDate: 7,
      itemCaption: 'Metric:',
      fnItemCaption: function fnItemCaption(value) {
        return value.split('/')[1];
      },
      loadId: 'Q',
      columnName: 'Value'
    }
  },
  QE_BIG_MAC: {
    type: 'QE_BIG_MAC',
    menuTitle: 'Big Mac Index',
    dialogCaption: 'Economist Big Mac Index',
    chartContainerCaption: 'Quandl Economist Big Mac Index',
    dialogType: 'BigMacDialog',
    dialogProps: {
      descrUrl: './data/quandl/big-mac-index.html',
      nInitFromDate: 12,
      countryURI: './data/quandl/big-mac-countries.json',
      countryJsonProp: 'countries',
      valueFn: 'RPrefixOne',
      valueFnPrefix: 'ECONOMIST/BIGMAC',
      loadId: 'Q'
    },
    dataColumn: 1
  },

  QE_WIKI_STOCK: {
    type: 'QE_WIKI_STOCK',
    menuTitle: 'Wiki',
    dialogCaption: 'Wiki Stock Prices',
    chartContainerCaption: 'Quandl Wiki Stock Prices',
    dialogProps: {
      descrUrl: './data/quandl/wiki.html',
      optionURI: './data/quandl/wiki.json',
      optionsJsonProp: 'tickets',
      loadId: 'Q',
      columnName: 'Close',
      seriaColumnNames: ['Open', 'High', 'Low', 'Volume', 'Adj. Close']
    }
  },
  QE_TOKIO_STOCK: {
    type: 'QE_TOKIO_STOCK',
    menuTitle: 'Tokio',
    dialogCaption: 'Tokio Stock Prices',
    chartContainerCaption: 'Quandl Tokio Stock Prices',
    dialogProps: {
      descrUrl: './data/quandl/tokio.html',
      optionURI: './data/quandl/tokio.json',
      optionsJsonProp: 'tickets',
      loadId: 'Q',
      columnName: 'Close',
      seriaColumnNames: ['Open', 'High', 'Low', 'Volume']
    }
  },
  QE_UNICORN_RESEARCH: {
    type: 'QE_UNICORN_RESEARCH',
    menuTitle: 'Unicorn Research',
    dialogCaption: 'Unicorn Research Corporation',
    chartContainerCaption: 'Quandl Unicorn Research Corporation',
    dialogType: 'DialogType4A',
    dialogProps: {
      descrUrl: './data/quandl/unicorn-research.html',
      oneCaption: 'Exchange',
      oneURI: './data/quandl/unicorn-research.json',
      oneJsonProp: 'exchanges',
      twoCaption: 'Metric',
      valueFn: 'ROneDashTwo',
      loadId: 'Q'
    },
    dataColumn: 1
  },

  QE_CHINA_FINANCE_FUTURE: {
    type: 'QE_CHINA_FINANCE_FUTURE',
    menuTitle: 'China Finance FE',
    dialogCaption: 'China Finance FE',
    chartContainerCaption: 'Quandl China Finance Futures Exchange',
    dialogType: 'Futures3Dialog',
    dialogProps: {
      descrUrl: './data/quandl/china-finance-futures.html',
      futuresURI: './data/quandl/china-finance-futures.json',
      valueFn: 'RFutures',
      valueFnPrefix: 'CFFEX',
      loadId: 'Q',
      columnName: 'Settle',
      seriaColumnNames: ['Open', 'High', 'Low', 'Close', 'Pre Settle', 'Volume', 'Open Interest', 'Turnover']
    }
  },
  QE_DCE_FUTURE: {
    type: 'QE_DCE_FUTURE',
    menuTitle: 'Dalian CE',
    dialogCaption: 'Dalian CE Futures',
    chartContainerCaption: 'Quandl Dalian Commodities Exchange Futures',
    dialogType: 'Futures3Dialog',
    dialogProps: {
      descrUrl: './data/quandl/dce-futures.html',
      futuresURI: './data/quandl/dce-futures.json',
      valueFn: 'RFutures',
      valueFnPrefix: 'DCE',
      loadId: 'Q',
      columnName: 'Settle',
      seriaColumnNames: ['Open', 'High', 'Low', 'Close', 'Pre Settle', 'Volume', 'Open Interest', 'Turnover']
    }
  },
  QE_ZCE_FUTURE: {
    type: 'QE_ZCE_FUTURE',
    menuTitle: 'Zhengzhou CE',
    dialogCaption: 'Zhengzhou CE Futures',
    chartContainerCaption: 'Quandl Zhengzhou Commodities Exchange Futures',
    dialogType: 'Futures3Dialog',
    dialogProps: {
      descrUrl: './data/quandl/zce-futures.html',
      futuresURI: './data/quandl/zce-futures.json',
      valueFn: 'RFutures',
      valueFnPrefix: 'ZCE',
      loadId: 'Q',
      columnName: 'Settle',
      seriaColumnNames: ['Open', 'High', 'Low', 'Close', 'Pre Settle', 'Volume', 'Open Interest', 'Turnover']
    }
  },
  QE_SHANGHAI_FUTURE: {
    type: 'QE_SHANGHAI_FUTURE',
    menuTitle: 'Shanghai FE',
    dialogCaption: 'Shanghai FE',
    chartContainerCaption: 'Quandl Shanghai Futures Exchange',
    dialogType: 'Futures3Dialog',
    dialogProps: {
      descrUrl: './data/quandl/shanghai-futures.html',
      futuresURI: './data/quandl/shanghai-futures.json',
      valueFn: 'RFutures',
      valueFnPrefix: 'SHFE',
      loadId: 'Q',
      columnName: 'Settle',
      seriaColumnNames: ['Open', 'High', 'Low', 'Close', 'Pre Settle', 'Volume', 'O.I.']
    }
  },
  QE_LIFFE_FUTURE: {
    type: 'QE_LIFFE_FUTURE',
    menuTitle: 'LIFFE FD',
    dialogCaption: 'LIFFE FD',
    chartContainerCaption: 'Quandl LIFFE FD',
    dialogType: 'Futures3Dialog',
    dialogProps: {
      descrUrl: './data/quandl/liffe-futures.html',
      futuresURI: './data/quandl/liffe-futures.json',
      valueFn: 'RFutures',
      valueFnPrefix: 'LIFFE',
      loadId: 'Q',
      columnName: 'Settle',
      seriaColumnNames: ['Open', 'High', 'Low', 'Volume', 'Prev. Day Open Interest']
    }
  },
  QE_ICE_FUTURE: {
    type: 'QE_ICE_FUTURE',
    menuTitle: 'Intercontinental FE',
    dialogCaption: 'Intercontinental FE',
    chartContainerCaption: 'Quandl Intercontinental Futures Exchange',
    dialogType: 'Futures3Dialog',
    dialogProps: {
      descrUrl: './data/quandl/ice-futures.html',
      futuresURI: './data/quandl/ice-futures.json',
      valueFn: 'RFutures',
      valueFnPrefix: 'ICE',
      loadId: 'Q',
      columnName: 'Settle',
      seriaColumnNames: ['Open', 'High', 'Low', 'Volume', 'Prev. Day Open Interest'],
      isContinious: true,
      nInitFromDate: 2
    }
  },
  QE_WIKI_FUTURE: {
    type: 'QE_WIKI_FUTURE',
    menuTitle: 'Wiki Continuous',
    dialogCaption: 'Wiki Continuous Futures',
    chartContainerCaption: 'Quandl Wiki Continuous Futures',
    dialogType: 'FuturesWikiDialog',
    dialogProps: {
      descrUrl: './data/quandl/wiki-futures.html',
      futuresURI: './data/quandl/wiki-futures.json',
      valueFn: 'RWikiFutures',
      loadId: 'Q',
      columnName: 'Settle',
      seriaColumnNames: ['Open', 'High', 'Low', 'Volume', 'Prev. Day Open Interest'],
      isContinious: true,
      nInitFromDate: 2
    }
  },

  QE_ZILLOW_REAL_ESTATE: {
    type: 'QE_ZILLOW_REAL_ESTATE',
    menuTitle: 'Zillow Research',
    dialogCaption: 'Zillow Real Estate Research',
    chartContainerCaption: 'Quandl Zillow Real Estate Research',
    dialogType: 'DialogType5',
    dialogProps: {
      descrUrl: './data/quandl/zillow.html',
      nInitFromDate: 10,
      oneCaption: 'Indicator',
      oneURI: './data/quandl/zillow-indicators.json',
      oneJsonProp: 'indicators',
      twoCaption: 'Area Type',
      twoURI: './data/quandl/zillow-area.json',
      twoJsonProp: 'places',
      threeCaption: 'Area Code',
      fnValueType: 'PlusTreeItem',
      valueFn: 'RZill',
      loadId: 'Q'
    },
    dataColumn: 1
  }

};

exports.default = DataQE;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\DataQE.js.map