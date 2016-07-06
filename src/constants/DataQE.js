

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
        //fnValue : (type, commodity) => `${commodity}`
        loadId : 'Q'
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
        //fnValue : (item, country) => `UCOM/${item}_${country}`
        loadId : 'QCT'
      },
      dataColumn : 1
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
        //fnValue : (country, item) => `UGID/${item}_${country}`
        loadId : 'Q'
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
        //fnValue : (source, currency) => `${source}/${currency}`
        loadId : 'Q'
      },
      dataColumn : 1
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
        //fnValue : (country, metric) => `WWDI/${country}_${metric}`
        loadId : 'Q'
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
        //fnValue : (country, metric) => `ODA/${country}_${metric}`
        loadId : 'Q'
      },
      dataColumn : 1
  },
  QE_CPI_INFLATION : {
    type : 'QE_CPI_INFLATION',
    menuTitle : 'CPI & Inflation',
    dialogCaption : 'CPI & Inflation',
    chartContainerCaption : 'Consumer Price Index and Inflation',
    dialogProps : {
      descrUrl: './data/quandl/rate-cpi-inflation.html',
      optionURI : './data/quandl/rate-cpi-inflation.json',
      optionsJsonProp : 'codes',
      optionNames : 'Codes',
      nInitFromDate : 7,
      itemCaption : 'Metric:',
      fnItemCaption : (value) => value.split('/')[1],
      loadId : 'Q'
    },
    dataColumn : 1
  },
  QE_BIG_MAC : {
      type : 'QE_BIG_MAC',
      menuTitle : 'Big Mac Index',
      dialogCaption : 'Economist Big Mac Index',
      chartContainerCaption : 'Quandl Economist Big Mac Index',
      dialogType : 'BigMacDialog',
      dialogProps : {
        descrUrl : './data/quandl/big-mac-index.html',
        nInitFromDate : 12,
        countryURI : './data/quandl/big-mac-countries.json',
        countryJsonProp : 'countries',
        valueFn : 'RPrefixOne',
        valueFnPrefix : 'ECONOMIST/BIGMAC',
        //fnValue : (country) => `ECONOMIST/BIGMAC_${country}`
        loadId : 'Q'
      },
      dataColumn : 1
  },

  QE_WIKI_STOCK : {
      type : 'QE_WIKI_STOCK',
      menuTitle : 'WIKI',
      dialogCaption : 'Wiki Stock Prices',
      chartContainerCaption : 'Quandl WIKI Stock Prices',
      dialogProps : {
        descrUrl : './data/quandl/wiki.html',
        optionURI : './data/quandl/wiki.json',
        optionsJsonProp : 'tickets',
        loadId : 'Q'
      },
      dataColumn : 4
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
        loadId : 'Q'
      },
      dataColumn : 4
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
      //fnValue : (source, currency) => `${source}/${currency}`
      loadId : 'Q'
    },
    dataColumn : 1
  },

  QE_CHINA_DCE_FUTURE : {
      type : 'QE_CHINA_DCE_FUTURE',
      menuTitle : 'China DCE',
      dialogCaption : 'China DCE Futures',
      chartContainerCaption : 'Quandl China DCE Futures',
      dialogType : 'FuturesDialog',
      dialogProps : {
        descrUrl : './data/quandl/china-dce-futures.html',
        optionURI : './data/quandl/china_dce_futures.json',
        optionsJsonProp : 'futures',
        loadId : 'Q'
      },
      dataColumn : 4
  },
  QE_CHINA_ZCE_FUTURE : {
      type : 'QE_CHINA_ZCE_FUTURE',
      menuTitle : 'China ZCE',
      dialogCaption : 'China ZCE Futures',
      chartContainerCaption : 'Quandl China ZCE Futures',
      dialogType : 'FuturesDialog',
      dialogProps : {
        descrUrl : './data/quandl/china-zce-futures.html',
        optionURI : './data/quandl/china_zce_futures.json',
        optionsJsonProp : 'futures',
        loadId : 'Q'
      },
      dataColumn : 5
  },
  QE_ZILLOW_REAL_ESTATE : {
      type : 'QE_ZILLOW_REAL_ESTATE',
      menuTitle : 'Zillow Research',
      dialogCaption : 'Zillow Real Estate Research',
      chartContainerCaption : 'Quandl Zillow Real Estate Research',
      dialogType : 'DialogType5',
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
        fnValueType : 'PlusTreeItem',
        valueFn : 'RZill',
        loadId : 'Q'
      },
      dataColumn : 1
  }

};

export default DataQE
