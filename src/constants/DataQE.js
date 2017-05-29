

const DataQE = {

  QE_COMMODITY_PRICE : {
      type : 'QE_COMMODITY_PRICE',
      menuTitle : 'Commodity Prices',
      dialogCaption : 'Commodity Price',
      chartContainerCaption : 'Quandl Commodity Prices',
      dialogType : 'DialogType4A',
      dialogProps : {
        descrUrl: './data/quandl/commodity-price.html',
        nInitFromDate : 4,
        oneCaption : 'Type',
        oneURI : './data/quandl/commodity-price.json',
        oneJsonProp : 'commodities',
        twoCaption : 'Commodity',
        valueFn : 'RTwo',
        loadId : 'Q',
        dataSource : 'Combined collection (Codes: ODA, JOHMATT, SHFE, EIA)'
      },
      dataColumn : 1
  },
  QE_COMMODITY_TRADE : {
      type : 'QE_COMMODITY_TRADE',
      menuTitle : 'UN Commodity Trade',
      dialogCaption : 'United Nations Commodity Trade',
      chartContainerCaption : 'Quandl United Nations Commodity Trade',
      dialogType : 'UNCommodityTradeDialog',
      dialogProps : {
        descrUrl: './data/quandl/un-commodity-trade.html',
        nInitFromDate : 10,
        countryURI : './data/quandl/country-area.json',
        countryJsonProp : 'countries',
        commodityURI : './data/quandl/commodity-items.json',
        commodityJsonProp : 'items',
        valueFn : 'RPrefixOneTwo',
        valueFnPrefix : 'UCOM',
        loadId : 'QCT',
        dataSource : 'UN Commodity Trade Statistics (Code: UCOM)'
      },
      dataColumn : 1
  },
  QE_JODI_WORLD_GAS : {
    type : 'QE_JODI_WORLD_GAS',
    menuTitle : 'JODI World Gas',
    dialogCaption : 'JODI World Gas',
    chartContainerCaption : 'Quandl JODI World Gas',
    dialogType : 'DialogType5',
    dialogProps : {
      descrUrl: './data/quandl/jodi.html',
      nInitFromDate : 3,
      oneCaption : 'Country',
      oneURI : './data/quandl/jodi-country-iso.json',
      oneJsonProp : 'countries',
      twoCaption : 'Product',
      twoURI : './data/quandl/jodi-gas-products.json',
      twoJsonProp : 'products',
      threeCaption : 'Flow',
      fnValueType : 'PlusTreeItem',
      valueFn : 'RJodiGas',
      loadId : 'Q',
      dataSource : 'JODI World Database (Code: JODI)'
    },
    dataColumn : 1
  },
  QE_JODI_WORLD_OIL : {
    type : 'QE_JODI_WORLD_OIL',
    menuTitle : 'JODI World Oil',
    dialogCaption : 'JODI World Oil',
    chartContainerCaption : 'Quandl JODI World Oil',
    dialogType : 'JodiWorldOilDialog',
    dialogProps : {
      descrUrl: './data/quandl/jodi.html',
      nInitFromDate : 3,
      oneCaption : 'Country',
      oneURI : './data/quandl/jodi-country-iso.json',
      oneJsonProp : 'countries',
      parentChildURI : './data/quandl/jodi-oil-products.json',
      parentCaption : 'Product',
      parentJsonProp : 'products',
      childCaption : 'Flow',
      valueFn : 'RJodiOil',
      loadId : 'Q',
      dataSource : 'JODI World Database (Code: JODI)'
    },
    dataColumn : 1
  },
  QE_PETROLEUM_PRICES : {
    type : 'QE_PETROLEUM_PRICES',
    menuTitle : 'Petroleum Prices',
    dialogCaption : 'Petroleum Prices',
    chartContainerCaption : 'Global Petroleum Prices',
    dialogProps : {
      descrUrl: './data/quandl/gpp.html',
      optionURI : './data/quandl/gpp.json',
      optionsJsonProp : 'countries',
      optionNames : 'Countries',
      nInitFromDate : 1,
      itemCaption : 'Country:',
      valueFn: 'RPrefixDashOne',
      valueFnPrefix : 'GPP/CFP',
      loadId : 'Q',
      columnName : 'Gasoline Price',
      seriaColumnNames : [ 'Diesel Price' ],
      dataSource : 'Global Petroleum Prices (Code: GPP)'
    }
  },
  QE_EIA_COAL : {
    type : 'QE_EIA_COAL',
    menuTitle : 'U.S. EIA Coal Mining',
    dialogCaption : 'U.S. EIA Coal Mining',
    chartContainerCaption : 'Quandl U.S. Energy Information Administration',
    dialogType : 'DialogType5',
    dialogProps : {
      descrUrl: './data/quandl/eia.html',
      nInitFromDate : 12,
      oneCaption : 'Area',
      oneURI : './data/quandl/eia-coal-areas.json',
      oneJsonProp : 'areas',
      twoCaption : 'Metric',
      twoURI : './data/quandl/eia-coal-metrics.json',
      twoJsonProp : 'metrics',
      threeCaption : 'Frequency',
      valueFn : 'REiaCoal',
      fnValueType : 'PlusTreeItem',
      loadId : 'Q',
      dataSource : 'U.S. Energy Information Administration (Code: EIA)'
    }
  },
  QE_ROGERS_INDICES : {
    type : 'QE_ROGERS_INDICES',
    menuTitle : 'Rogers Indices',
    dialogCaption : 'Rogers International Indices',
    chartContainerCaption : 'Quandl Rogers International Commodity Indices',
    dialogProps : {
      descrUrl : './data/quandl/rogers-indices.html',
      optionURI : './data/quandl/rogers-indices.json',
      optionsJsonProp : 'indices',
      nInitFromDate : 12,
      loadId : 'Q',
      columnName : 'Value',
      dataSource : 'Rogers International Commodity Indices (Code: RICI)'
    }
  },
  QE_BALTIC_INDICES : {
    type : 'QE_BALTIC_INDICES',
    menuTitle: 'Baltic Indices',
    dialogCaption : 'Baltic Indices',
    chartContainerCaption : 'Quandl Baltic Indices',
    dialogProps : {
      descrUrl : './data/quandl/lloyds.html',
      optionURI : './data/quandl/lloyds-indices.json',
      optionsJsonProp : 'indices',
      itemCaption: 'Index:',
      optionNames: 'indices',
      nInitFromDate : 5,
      valueFn : "RPrefixOne",
      valueFnPrefix : "LLOYDS",
      loadId : 'Q',
      columnName : 'Index',
      dataSource : "Lloyd's List (Code: LLOYDS)"
    }
  },
  QE_GLOBAL_INDICATOR : {
      type : 'QE_GLOBAL_INDICATOR',
      menuTitle : 'UN Global Indicator',
      dialogCaption : 'United Nations Global Indicator',
      chartContainerCaption : 'Quandl United Nations Global Indicator',
      dialogType : 'DialogType5',
      dialogProps : {
        descrUrl: './data/quandl/un-global-indicator.html',
        nInitFromDate : 10,
        oneCaption : 'Country',
        oneURI : './data/quandl/country-area.json',
        oneJsonProp : 'countries',
        twoCaption : 'Indicators',
        twoURI : './data/quandl/un-global-indicators.json',
        twoJsonProp : 'indicators',
        threeCaption : 'Metric',
        valueFn : 'RPrefixTwoOne',
        valueFnPrefix : 'UGID',
        loadId : 'Q',
        dataSource : 'UN Global Indicators (Code: UGID)'
      },
      dataColumn : 1
  },
  QE_CURRENCY_HISTORY : {
      type : 'QE_CURRENCY_HISTORY',
      menuTitle : 'Currency History',
      dialogCaption : 'Currency History',
      chartContainerCaption : 'Quandl Currency History',
      dialogType : 'DialogType4A',
      dialogProps : {
        descrUrl: './data/quandl/currency-history.html',
        oneCaption : 'Source',
        oneURI : './data/quandl/currency-history.json',
        oneJsonProp : 'sources',
        twoCaption : 'Currency',
        valueFn : 'ROneTwo',
        loadId : 'Q',
        columnName : 'Value',
        dataSource : 'Combined collection (Codes: BOE, ECB, FRED)'
      }
  },
  QE_WORLDBANK_PRICE : {
      type : 'QE_WORLDBANK_PRICE',
      menuTitle : 'WB Economic Metric',
      dialogCaption : 'WorlBank Economic Metric',
      chartContainerCaption : 'Quandl World Bank Economic Metric',
      dialogType : 'DialogType5',
      dialogProps : {
        descrUrl: './data/quandl/wb-development-indicator.html',
        nInitFromDate : 7,
        oneCaption : 'Country',
        oneURI : './data/quandl/iso3-countries.json',
        oneJsonProp : 'countries',
        twoCaption : 'Group',
        twoURI : './data/quandl/wb-metric-groups.json',
        twoJsonProp : 'groups',
        threeCaption : 'Metric',
        fnValueType : 'TreeItem',
        valueFn : 'RPrefixOneTwo',
        valueFnPrefix : 'WWDI',
        loadId : 'Q',
        dataSource : 'WB World Development Indicators (Code: WWDI)'
      },
      dataColumn : 1
  },
  QE_IMF_CROSSCOUNTRY : {
      type : 'QE_IMF_CROSSCOUNTRY',
      menuTitle : 'IMF Cross Country Metric',
      dialogCaption : 'IMF Cross Country Metric',
      chartContainerCaption : 'Quandl IMF Cross Country Metric',
      dialogType : 'DialogType5',
      dialogProps : {
        descrUrl: './data/quandl/imf-crosscountry-metric.html',
        nInitFromDate : 7,
        nForecastDate : 5,
        oneCaption : 'Country',
        oneURI : './data/quandl/iso3-countries.json',
        oneJsonProp : 'countries',
        twoCaption : 'Group',
        twoURI : './data/quandl/imf-metric-groups.json',
        twoJsonProp : 'groups',
        threeCaption : 'Metric',
        fnValueType : 'TreeItem',
        valueFn : 'RPrefixOneTwo',
        valueFnPrefix : 'ODA',
        loadId : 'Q',
        dataSource : 'IMF Cross Country Macro-Economic Statistics (Code: ODA)'
      },
      dataColumn : 1
  },
  QE_EU_COMMISSION : {
      type : 'QE_EU_COMMISSION',
      menuTitle : 'EU Commission Annual',
      dialogCaption : 'EU Commission Annual',
      chartContainerCaption : 'Quandl EU Commission Annual',
      dialogType : 'DialogType5',
      dialogProps : {
        descrUrl: './data/quandl/ameco.html',
        nInitFromDate : 20,
        oneCaption : 'Country',
        oneURI : './data/quandl/ameco-countries.json',
        oneJsonProp : 'countries',
        twoCaption : 'Group',
        twoURI : './data/quandl/ameco-indicators.json',
        twoJsonProp : 'groups',
        threeCaption : 'Metric',
        fnValueType : 'TreeItem',
        valueFn : 'RPrefixOneTwo',
        valueFnPrefix : 'AMECO',
        loadId : 'Q',
        dataSource : 'EU Commission Annual Macro-Economic (Code: AMECO)'
      },
      dataColumn : 1
  },
  QE_OECD : {
      type : 'QE_OECD',
      menuTitle : 'OECD Index & Indicators',
      dialogCaption : 'OECD Index & Indicators',
      chartContainerCaption : 'Quandl OECD Index & Indicators',
      //dialogType : 'DialogType4',
      dialogType: 'DialogType5',
      dialogProps : {
        descrUrl: './data/quandl/oecd.html',
        nInitFromDate : 10,
        oneCaption : 'Country',
        oneURI : './data/quandl/oecd-countries.json',
        oneJsonProp : 'countries',
        twoCaption : 'Index',
        twoURI : './data/quandl/oecd-indicators.json',
        twoJsonProp : 'indicators',
        threeCaption: 'Frequency',
        valueFn : 'ROecd',
        fnValueType: 'PlusTreeItem',
        //valueFnPrefix : 'OECD',
        loadId : 'Q',
        dataSource : 'Organisation for Economic Co-Operation and Development and  (Code: OECD)',
        dataColumn : 1
      }
  },
  QE_USCENSUS_TRADE : {
      type : 'QE_USCENSUS_TRADE',
      menuTitle : 'U.S. Census : Trade',
      dialogCaption : 'U.S. Census : Trade',
      chartContainerCaption : 'Quandl U.S. Census Bureau : Trade',
      dialogProps : {
        descrUrl : './data/quandl/uscensus.html',
        itemCaption : 'Country:',
        nInitFromDate : 10,
        optionURI : './data/quandl/uscensus-trade.json',
        optionsJsonProp : 'countries',
        valueFn : "RPrefixOne",
        valueFnPrefix : "USCENSUS",
        loadId : 'Q',
        columnName : 'BALANCE',
        seriaColumnNames : [ 'Exports', 'Imports' ],
        dataSource : 'U.S. Census Bureau (Code: USCENSUS)'
      }
  },

  QE_OECD_CPI : {
      type : 'QE_OECD_CPI',
      menuTitle : 'OECD CPI & HCPI',
      dialogCaption : 'OECD Consumer Price Index',
      chartContainerCaption : 'Quandl OECD Consumer Price Index',
      dialogType: 'DialogType5',
      dialogProps : {
        descrUrl: './data/quandl/oecd.html',
        nInitFromDate : 10,
        oneCaption : 'Country',
        oneURI : './data/quandl/oecd-countries.json',
        oneJsonProp : 'countries',
        twoCaption : 'Index',
        twoURI : './data/quandl/oecd-cpi.json',
        twoJsonProp : 'index',
        threeCaption: 'Frequency',
        valueFn : 'ROecd',
        fnValueType: 'PlusTreeItem',
        loadId : 'Q',
        dataSource : 'Organisation for Economic Co-Operation and Development and  (Code: OECD)',
        dataColumn : 1
      }
  },
  QE_RATE_INFLATION : {
    type : 'QE_RATE_INFLATION',
    menuTitle : 'Rate Inflation',
    dialogCaption : 'Rate Inflation',
    chartContainerCaption : 'Quandl Rate Inflation',
    dialogType: 'DialogType4',
    dialogProps : {
      descrUrl: './data/quandl/rate-cpi-inflation.html',
      nInitFromDate : 10,
      oneCaption : 'Country:',
      oneURI : './data/quandl/rate-countries.json',
      oneJsonProp : 'countries',
      twoCaption : 'Metric:',
      twoURI : './data/quandl/rate-metrics.json',
      twoJsonProp : 'metrics',
      valueFn : 'RPrefixTwoOne',
      valueFnPrefix: 'RATEINF',
      loadId : 'Q',
      dataSource : 'Rate Inflation (Code: RATEINF)'
    }
  },
  QE_BIG_MAC : {
      type : 'QE_BIG_MAC',
      menuTitle : 'Big Mac Index',
      dialogCaption : 'Economist Big Mac Index',
      chartContainerCaption : 'Quandl Economist Big Mac Index',
      dialogType : 'DialogType4',
      dialogProps : {
        descrUrl : './data/quandl/big-mac-index.html',
        nInitFromDate : 12,
        oneCaption : 'Country:',
        oneURI : './data/quandl/big-mac-countries.json',
        oneJsonProp : 'countries',
        twoCaption : 'Metric:',
        twoURI : './data/quandl/big-mac-metrics.json',
        twoJsonProp : 'metrics',
        valueFn : 'RPrefixDashOne',
        valueFnPrefix : 'ECONOMIST/BIGMAC',
        loadFnType : 'BigMac',
        loadId : 'Q',
        dataColumn : 1,
        dataSource : 'The Economist - Big Mac Index (Code: ECONOMIST)'
      }
  },
  QE_GDT : {
    type : 'QE_GDT',
    menuTitle : 'Global Dairy Trade',
    dialogCaption : 'Global Dairy Trade',
    chartContainerCaption : 'Quandl Global Dairy Trade',
    dialogProps : {
      itemCaption : "Item:",
      optionNames : "items",
      nInitFromDate : 7,
      descrUrl : './data/quandl/gdt.html',
      optionURI : './data/quandl/gdt.json',
      optionsJsonProp : 'tickets',
      valueFn : "RPrefixOne",
      valueFnPrefix : "GDT",
      loadId : 'Q',
      columnName : 'Value',
      dataSource : 'Global Dairy Trade (Code: GDT)'
    }
  },
  QE_BLSI : {
    type : 'QE_BLSI',
    menuTitle : 'U.S. BLS Inflation',
    dialogCaption : 'U.S. BLS Inflation & Prices',
    chartContainerCaption : 'Quandl U.S. BLS Inflation & Prices',
    dialogProps : {
      itemCaption : "Item:",
      optionNames : "items",
      nInitFromDate : 15,
      descrUrl : './data/quandl/blsi.html',
      optionURI : './data/quandl/blsi.json',
      optionsJsonProp : 'tickets',
      valueFn : "RPrefixOne",
      valueFnPrefix : "BLSI",
      loadId : 'Q',
      columnName : 'Value',
      dataSource: 'U.S. BLS Inflation & Prices (Code: BLSI)'
    }
  },

  QE_EURONEXT_STOCK : {
      type : 'QE_EURONEXT_STOCK',
      menuTitle : 'Euronext',
      dialogCaption : 'Euronext Stock Prices',
      chartContainerCaption : 'Quandl Euronext Stock Prices',
      dialogProps : {
        descrUrl : './data/quandl/euronext.html',
        optionURI : './data/quandl/euronext.json',
        optionsJsonProp : 'tickets',
        valueFn : "RPrefixOne",
        valueFnPrefix : "EURONEXT",
        linkFn : "EURONEXT",
        loadId : 'Q',
        columnName : 'Last',
        seriaColumnNames : [ 'Open', 'High', 'Low', 'Last', 'Volume' ],
        dataSource : 'Euronext Stock Price (Code: EURONEXT)'
      }
  },
  QE_WIKI_STOCK : {
      type : 'QE_WIKI_STOCK',
      menuTitle : 'Wiki',
      dialogCaption : 'Wiki Stock Prices',
      chartContainerCaption : 'Quandl Wiki Stock Prices',
      dialogProps : {
        descrUrl : './data/quandl/wiki.html',
        isTransform: true,
        optionURI : './data/quandl/wiki.json',
        optionsJsonProp : 'tickets',
        valueFn : "RPrefixOne",
        valueFnPrefix : "WIKI",
        linkFn : "NASDAQ",
        loadId : 'Q',
        columnName : 'Close',
        seriaColumnNames : [ 'Open', 'High', 'Low', 'Volume', 'Adj. Close' ],
        dataSource : 'Wiki EOD Stock Prices (Code: WIKI)'
      }
  },
  QE_TOKIO_STOCK : {
      type : 'QE_TOKIO_STOCK',
      menuTitle: 'Tokio',
      dialogCaption : 'Tokio Stock Prices',
      chartContainerCaption : 'Quandl Tokio Stock Prices',
      dialogProps : {
        descrUrl : './data/quandl/tokio.html',
        optionURI : './data/quandl/tokio.json',
        optionsJsonProp : 'tickets',
        valueFn : "RPrefixOne",
        valueFnPrefix : "TSE",
        loadId : 'Q',
        columnName : 'Close',
        seriaColumnNames : [ 'Open', 'High', 'Low', 'Volume'],
        dataSource : 'Tokyo Stock Exchange (Code: TSE)'
      }
  },
  QE_STOCK_INDEXES : {
      type : 'QE_STOCK_INDEXES',
      menuTitle: 'Indices',
      dialogCaption : 'Stock Indices',
      chartContainerCaption : 'Quandl Stock Indices',
      dialogProps : {
        descrUrl : './data/yahoo/yahoo.html',
        optionURI : './data/quandl/stock-index.json',
        optionsJsonProp : 'indexes',
        loadId : 'Q',
        columnName : 'Close',
        seriaColumnNames : [ 'Open', 'High', 'Low', 'Volume'],
        dataSource : 'YFinance (Code: YAHOO)'
      }
  },
  QE_UNICORN_RESEARCH : {
    type : 'QE_UNICORN_RESEARCH',
    menuTitle : 'Unicorn Research',
    dialogCaption : 'Unicorn Research Corporation',
    chartContainerCaption : 'Quandl Unicorn Research Corporation',
    dialogType : 'DialogType4A',
    dialogProps : {
      descrUrl: './data/quandl/unicorn-research.html',
      oneCaption : 'Exchange',
      oneURI : './data/quandl/unicorn-research.json',
      oneJsonProp : 'exchanges',
      twoCaption : 'Metric',
      valueFn : 'ROneDashTwo',
      loadId : 'Q',
      dataSource : 'Unicorn Research Corporation (Code: URC)'
    },
    dataColumn : 1
  },

  QE_CHINA_FINANCE_FUTURE : {
      type : 'QE_CHINA_FINANCE_FUTURE',
      menuTitle : 'China Finance FE',
      dialogCaption : 'China Finance FE',
      chartContainerCaption : 'Quandl China Finance Futures Exchange',
      dialogType : 'Futures3Dialog',
      dialogProps : {
        descrUrl : './data/quandl/china-finance-futures.html',
        futuresURI : './data/quandl/china-finance-futures.json',
        valueFn : 'RFutures',
        valueFnPrefix : 'CFFEX',
        loadId : 'Q',
        columnName : 'Settle',
        seriaColumnNames : ['Open', 'High', 'Low', 'Close', 'Pre Settle' , 'Volume', 'Open Interest', 'Turnover'],
        dataSource : 'Chine Financial Futures Exchange (Code: CFFEX)'
      }
  },
  QE_DCE_FUTURE : {
      type : 'QE_DCE_FUTURE',
      menuTitle : 'Dalian CE',
      dialogCaption : 'Dalian CE Futures',
      chartContainerCaption : 'Quandl Dalian Commodities Exchange Futures',
      dialogType : 'Futures3Dialog',
      dialogProps : {
        descrUrl : './data/quandl/dce-futures.html',
        futuresURI : './data/quandl/dce-futures.json',
        valueFn : 'RFutures',
        valueFnPrefix : 'DCE',
        loadId : 'Q',
        columnName : 'Settle',
        seriaColumnNames : ['Open', 'High', 'Low', 'Close', 'Pre Settle' , 'Volume', 'Open Interest', 'Turnover'],
        dataSource : 'Dalian Commodities Exchange (Code: DCE)'
      }
  },
  QE_ZCE_FUTURE : {
      type : 'QE_ZCE_FUTURE',
      menuTitle : 'Zhengzhou CE',
      dialogCaption : 'Zhengzhou CE Futures',
      chartContainerCaption : 'Quandl Zhengzhou Commodities Exchange Futures',
      dialogType : 'Futures3Dialog',
      dialogProps : {
        descrUrl : './data/quandl/zce-futures.html',
        futuresURI : './data/quandl/zce-futures.json',
        valueFn : 'RFutures',
        valueFnPrefix : 'ZCE',
        loadId : 'Q',
        columnName : 'Settle',
        seriaColumnNames : ['Open', 'High', 'Low', 'Close', 'Pre Settle' , 'Volume', 'Open Interest', 'Turnover'],
        dataSource : 'Zhengzhou Commodities Exchange (Code: ZCE)'
      }
  },
  QE_SHANGHAI_FUTURE : {
      type : 'QE_SHANGHAI_FUTURE',
      menuTitle : 'Shanghai FE',
      dialogCaption : 'Shanghai FE',
      chartContainerCaption : 'Quandl Shanghai Futures Exchange',
      dialogType : 'Futures3Dialog',
      dialogProps : {
        descrUrl : './data/quandl/shanghai-futures.html',
        futuresURI : './data/quandl/shanghai-futures.json',
        valueFn : 'RFutures',
        valueFnPrefix : 'SHFE',
        loadId : 'Q',
        columnName : 'Settle',
        seriaColumnNames : ['Open', 'High', 'Low', 'Close', 'Pre Settle' , 'Volume', 'O.I.'],
        dataSource : 'Shanghai Futures Exchange (Code: SHFE)'
      }
  },
  QE_LIFFE_FUTURE : {
      type : 'QE_LIFFE_FUTURE',
      menuTitle : 'LIFFE FD',
      dialogCaption : 'LIFFE FD',
      chartContainerCaption : 'Quandl LIFFE FD',
      dialogType : 'Futures3Dialog',
      dialogProps : {
        descrUrl : './data/quandl/liffe-futures.html',
        futuresURI : './data/quandl/liffe-futures.json',
        valueFn : 'RFutures',
        valueFnPrefix : 'LIFFE',
        loadId : 'Q',
        columnName : 'Settle',
        seriaColumnNames : ['Open', 'High', 'Low' , 'Volume', 'Prev. Day Open Interest'],
        dataSource : 'LIFFE Futures Data (Code: LIFFE)'
      }
  },
  QE_ICE_FUTURE : {
      type : 'QE_ICE_FUTURE',
      menuTitle : 'Intercontinental FE',
      dialogCaption : 'Intercontinental FE',
      chartContainerCaption : 'Quandl Intercontinental Futures Exchange',
      dialogType : 'Futures3Dialog',
      dialogProps : {
        descrUrl : './data/quandl/ice-futures.html',
        futuresURI : './data/quandl/ice-futures.json',
        valueFn : 'RFutures',
        valueFnPrefix : 'ICE',
        loadId : 'Q',
        columnName : 'Settle',
        seriaColumnNames : ['Open', 'High', 'Low' , 'Volume', 'Prev. Day Open Interest'],
        isContinious : true,
        nInitFromDate : 2,
        dataSource : 'Intercontinental Exchange Futures (Code: ICE)'
      }
  },
  QE_WIKI_FUTURE : {
      type : 'QE_WIKI_FUTURE',
      menuTitle : 'Wiki Continuous',
      dialogCaption : 'Wiki Continuous Futures',
      chartContainerCaption : 'Quandl Wiki Continuous Futures',
      dialogType : 'FuturesWikiDialog',
      dialogProps : {
        descrUrl : './data/quandl/wiki-futures.html',
        futuresURI : './data/quandl/wiki-futures.json',
        valueFn : 'RWikiFutures',
        loadId : 'Q',
        columnName : 'Settle',
        seriaColumnNames : ['Open', 'High', 'Low' , 'Volume', 'Prev. Day Open Interest'],
        isContinious : true,
        nInitFromDate : 2,
        dataSource : 'Wiki Continuous Futures (Code: CHRIS)'
      }
  },

  QE_ZILLOW_REAL_ESTATE : {
      type : 'QE_ZILLOW_REAL_ESTATE',
      menuTitle : 'Zillow Research',
      dialogCaption : 'Zillow Real Estate Research',
      chartContainerCaption : 'Quandl Zillow Real Estate Research',
      //dialogType : 'DialogType5',
      dialogType : 'ZillowDialog',
      dialogProps : {
        descrUrl: './data/quandl/zillow.html',
        nInitFromDate : 10,
        oneCaption : 'Indicator',
        oneURI : './data/quandl/zillow-indicators.json',
        oneJsonProp : 'indicators',
        twoCaption : 'Area Type',
        twoURI : './data/quandl/zillow-area.json',
        twoJsonProp : 'places',
        threeCaption : 'Area Code',
        //fnValueType : 'PlusTreeItem',
        valueFn : 'RZill',
        loadId : 'Q',
        dataSource : 'Zillow Real Estate Research (Code: ZILL)'
      },
      dataColumn : 1
  },
  QE_FMAC : {
    type : 'QE_FMAC',
    menuTitle : 'Freddie Mac',
    dialogCaption : 'Freddie Mac',
    chartContainerCaption : 'Quandl Freddie Mac',
    dialogProps : {
      itemCaption : "Item:",
      optionNames : "items",
      nInitFromDate : 15,
      descrUrl : './data/quandl/fmac.html',
      optionURI : './data/quandl/fmac.json',
      optionsJsonProp : 'tickets',
      valueFn : "RPrefixOne",
      valueFnPrefix : "FMAC",
      loadId : 'Q',
      columnName : 'Value',
      dataSource : 'Freddie Mac (Code: FMAC)'
    }
  }

};

export default DataQE
