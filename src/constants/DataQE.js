

import DateUtils from '../utils/DateUtils';

import DialogType3 from '../components/dialogs/DialogType3';
import DialogType4A from '../components/dialogs/DialogType4A';
import DialogType5 from '../components/dialogs/DialogType5';

import UNCommodityTradeDialog from '../components/quandl-browser/UNCommodityTradeDialog';
import BigMacDialog from '../components/quandl-browser/BigMacDialog';
import FuturesDialog from '../components/quandl-browser/FuturesDialog';


const DataQE = {

  QE_COMMODITY_PRICE : {
      type : 'QE_COMMODITY_PRICE',
      menuTitle : 'Commodity Prices',
      dialogCaption : 'Commodity Price',
      chartContainerCaption : 'Quandl Commodity Prices',
      dialogComp : DialogType4A,
      dialogProps : {
        descrUrl: './data/quandl/commodity-price.html',
        oneCaption : 'Type',
        oneURI : './data/quandl/commodity-price.json',
        oneJsonProp : 'commodities',
        twoCaption : 'Commodity',
        fnValue : (type, commodity) => `${commodity}`
      },
      dataColumn : 1
  },
  QE_COMMODITY_TRADE : {
      type : 'QE_COMMODITY_TRADE',
      menuTitle : 'UN Commodity Trade',
      dialogCaption : 'United Nations Commodity Trade',
      chartContainerCaption : 'Quandl United Nations Commodity Trade',
      dialogComp : UNCommodityTradeDialog,
      dialogProps : {
        descrUrl: './data/quandl/un-commodity-trade.html',
        initFromDate : DateUtils.getFromDate(10),
        countryURI : './data/quandl/country-area.json',
        countryJsonProp : 'countries',
        commodityURI : './data/quandl/commodity-items.json',
        commodityJsonProp : 'items',
        fnValue : (item, country) => `UCOM/${item}_${country}`
      },
      dataColumn : 1
  },
  QE_GLOBAL_INDICATOR : {
      type : 'QE_GLOBAL_INDICATOR',
      menuTitle : 'UN Global Indicator',
      dialogCaption : 'United Nations Global Indicator',
      chartContainerCaption : 'Quandl United Nations Global Indicator',
      dialogComp : DialogType5,
      dialogProps : {
        descrUrl: './data/quandl/un-global-indicator.html',
        initFromDate : DateUtils.getFromDate(10),
        oneCaption : 'Country',
        oneURI : './data/quandl/country-area.json',
        oneJsonProp : 'countries',
        twoCaption : 'Indicators',
        twoURI : './data/quandl/un-global-indicators.json',
        twoJsonProp : 'indicators',
        threeCaption : 'Metric',
        fnValue : (country, item) => `UGID/${item}_${country}`
      },
      dataColumn : 1
  },
  QE_CURRENCY_HISTORY : {
      type : 'QE_CURRENCY_HISTORY',
      menuTitle : 'Currency History',
      dialogCaption : 'Currency History',
      chartContainerCaption : 'Quandl Currency History',
      dialogComp : DialogType4A,
      dialogProps : {
        descrUrl: './data/quandl/currency-history.html',
        oneCaption : 'Source',
        oneURI : './data/quandl/currency-history.json',
        oneJsonProp : 'sources',
        twoCaption : 'Currency',
        fnValue : (source, currency) => `${source}/${currency}`
      },
      dataColumn : 1
  },
  QE_WORLDBANK_PRICE : {
      type : 'QE_WORLDBANK_PRICE',
      menuTitle : 'WB Economic Metric',
      dialogCaption : 'WorlBank Economic Metric',
      chartContainerCaption : 'Quandl World Bank Economic Metric',
      dialogComp : DialogType5,
      dialogProps : {
        descrUrl: './data/quandl/wb-development-indicator.html',
        isTreeItem : true,
        initFromDate : DateUtils.getFromDate(7),
        oneCaption : 'Country',
        oneURI : './data/quandl/iso3-countries.json',
        oneJsonProp : 'countries',
        twoCaption : 'Group',
        twoURI : './data/quandl/wb-metric-groups.json',
        twoJsonProp : 'groups',
        threeCaption : 'Metric',
        fnValue : (country, metric) => `WWDI/${country}_${metric}`
      },
      dataColumn : 1
  },
  QE_IMF_CROSSCOUNTRY : {
      type : 'QE_IMF_CROSSCOUNTRY',
      menuTitle : 'IMF Cross Country Metric',
      dialogCaption : 'IMF Cross Country Metric',
      chartContainerCaption : 'Quandl IMF Cross Country Metric',
      dialogComp : DialogType5,
      dialogProps : {
        descrUrl: './data/quandl/imf-crosscountry-metric.html',
        isTreeItem : true,
        initFromDate : DateUtils.getFromDate(7),
        oneCaption : 'Country',
        oneURI : './data/quandl/iso3-countries.json',
        oneJsonProp : 'countries',
        twoCaption : 'Group',
        twoURI : './data/quandl/imf-metric-groups.json',
        twoJsonProp : 'groups',
        threeCaption : 'Metric',
        fnValue : (country, metric) => `ODA/${country}_${metric}`
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
      initFromDate : DateUtils.getFromDate(7),
      itemCaption : 'Metric:',
      fnItemCaption : (value) => value.split('/')[1]
    },
    dataColumn : 1
  },
  QE_BIG_MAC : {
      type : 'QE_BIG_MAC',
      menuTitle : 'Big Mac Index',
      dialogCaption : 'Economist Big Mac Index',
      chartContainerCaption : 'Quandl Economist Big Mac Index',
      dialogComp : BigMacDialog,
      dialogProps : {
        descrUrl : './data/quandl/big-mac-index.html',
        initFromDate : DateUtils.getFromDate(12),
        countryURI : './data/quandl/big-mac-countries.json',
        countryJsonProp : 'countries',
        fnValue : (country) => `ECONOMIST/BIGMAC_${country}`
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
        optionsJsonProp : 'tickets'
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
        optionsJsonProp : 'tickets'
      },
      dataColumn : 4
  },

  QE_CHINA_DCE_FUTURE : {
      type : 'QE_CHINA_DCE_FUTURE',
      menuTitle : 'China DCE',
      dialogCaption : 'China DCE Futures',
      chartContainerCaption : 'Quandl China DCE Futures',
      dialogComp : FuturesDialog,
      dialogProps : {
        descrUrl : './data/quandl/china-dce-futures.html',
        optionURI : './data/quandl/china_dce_futures.json',
        optionsJsonProp : 'futures'
      },
      dataColumn : 4
  },
  QE_CHINA_ZCE_FUTURE : {
      type : 'QE_CHINA_ZCE_FUTURE',
      menuTitle : 'China ZCE',
      dialogCaption : 'China ZCE Futures',
      chartContainerCaption : 'Quandl China ZCE Futures',
      dialogComp : FuturesDialog,
      dialogProps : {
        descrUrl : './data/quandl/china-zce-futures.html',
        optionURI : './data/quandl/china_zce_futures.json',
        optionsJsonProp : 'futures'
      },
      dataColumn : 5
  }

};

export default DataQE
