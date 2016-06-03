

import DateUtils from '../utils/DateUtils';

import DialogType3 from '../components/dialogs/DialogType3';
import QuandlCommoditiesDialog from '../components/quandl-browser/QuandlCommoditiesDialog';
import QuandlCurrencyDialog from '../components/quandl-browser/QuandlCurrencyDialog';
import QuandlWorldBankEconomicDialog from '../components/quandl-browser/QuandlWorldBankEconomicDialog';
import FuturesDialog from '../components/quandl-browser/FuturesDialog';


const DataQE = {

  QE_COMMODITY_PRICE : {
      type : 'QE_COMMODITY_PRICE',
      menuTitle : 'Commodity Prices',
      dialogCaption : 'Commodity Price',
      chartContainerCaption : 'Quandl Commodity Prices',
      dialogComp : QuandlCommoditiesDialog,
      dataColumn : 1
  },
  QE_CURRENCY_HISTORY : {
      type : 'QE_CURRENCY_HISTORY',
      menuTitle : 'Currency Histories',
      dialogCaption : 'Currency History',
      chartContainerCaption : 'Quandl Currency Histories',
      dialogComp : QuandlCurrencyDialog,
      dataColumn : 1
  },
  QE_WORLDBANK_PRICE : {
      type : 'QE_WORLDBANK_PRICE',
      menuTitle : 'Economic Metrics',
      dialogCaption : 'WorlBank Price',
      chartContainerCaption : 'Quandl World Bank Economic',
      dialogComp : QuandlWorldBankEconomicDialog,
      dialogProps : {
        initFromDate : DateUtils.getFromDate(7)
      },
      dataColumn : 1
  },

  QE_WIKI_STOCK : {
      type : 'QE_WIKI_STOCK',
      menuTitle : 'WIKI',
      dialogCaption : 'Wiki Stocks',
      chartContainerCaption : 'Quandl WIKI Stocks',
      optionURI : './data/quandl/wiki.json',
      optionsJsonProp : 'tickets',
      dataColumn : 4
  },
  QE_TOKIO_STOCK : {
      type : 'QE_TOKIO_STOCK',
      menuTitle: 'Tokio',
      dialogCaption : 'Tokio Stocks',
      chartContainerCaption : 'Quandl Tokio Stocks',
      optionURI : './data/quandl/tokio.json',
      optionsJsonProp : 'tickets',
      dataColumn : 4
  },

  QE_CHINA_DCE_FUTURE : {
      type : 'QE_CHINA_DCE_FUTURE',
      menuTitle : 'China DCE',
      dialogCaption : 'China DCE Futures',
      chartContainerCaption : 'Quandl China DCE Futures',
      dialogComp : FuturesDialog,
      optionURI : './data/quandl/china_dce_futures.json',
      optionsJsonProp : 'futures',
      dataColumn : 4
  },
  QE_CHINA_ZCE_FUTURE : {
      type : 'QE_CHINA_ZCE_FUTURE',
      menuTitle : 'China ZCE',
      dialogCaption : 'China ZCE Futures',
      chartContainerCaption : 'Quandl China ZCE Futures',
      dialogComp : FuturesDialog,
      optionURI : './data/quandl/china_zce_futures.json',
      optionsJsonProp : 'futures',
      dataColumn : 5
  }

};

export default DataQE
