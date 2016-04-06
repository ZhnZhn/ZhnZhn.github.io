

import QuandlWikiStock from '../services/qe/QuandlWikiStock';
import QuandlTokioStock from '../services/qe/QuandlTokioStock';
import DateUtils from '../utils/DateUtils';

import DialogType3 from '../components/dialogs/DialogType3';
import QuandlCommoditiesDialog from '../components/quandl-browser/QuandlCommoditiesDialog';
import QuandlCurrencyDialog from '../components/quandl-browser/QuandlCurrencyDialog';
import QuandlWorldBankEconomicDialog from '../components/quandl-browser/QuandlWorldBankEconomicDialog';
import QuandlFuturesChinaDceDialog from '../components/quandl-browser/QuandlFuturesChinaDceDialog';


const DataQE = {

  QE_COMMODITY_PRICE : {
      type : 'QE_COMMODITY_PRICE',
      dialogCaption : 'Commodity Price',
      chartContainerCaption : 'Quandl Commodity Prices',
      dialogComp : QuandlCommoditiesDialog,
  },
  QE_CURRENCY_HISTORY : {
      type : 'QE_CURRENCY_HISTORY',
      dialogCaption : 'Currency History',
      chartContainerCaption : 'Quandl Currency Histories',
      dialogComp : QuandlCurrencyDialog,
  },
  QE_WORLDBANK_PRICE : {
      type : 'QE_WORLDBANK_PRICE',
      dialogCaption : 'WorlBank Price',
      chartContainerCaption : 'Quandl World Bank Economic',
      dialogComp : QuandlWorldBankEconomicDialog,
      dialogProps : {
        initFromDate : DateUtils.getFromDate(7)
      }
  },

  QE_WIKI_STOCK : {
      type : 'QE_WIKI_STOCK',
      dialogCaption : 'Wiki Stocks',
      chartContainerCaption : 'Quandl WIKI Stocks',
      fnOption : QuandlWikiStock.getTickets
  },
  QE_TOKIO_STOCK : {
      type : 'QE_TOKIO_STOCK',
      dialogCaption : 'Tokio Stocks',
      chartContainerCaption : 'Quandl Tokio Stocks',
      fnOption : QuandlTokioStock.getTickets
  },

  QE_CHINA_DCE_FUTURE : {
      type : 'QE_CHINA_DCE_FUTURE',
      dialogCaption : 'China DCE Future',
      chartContainerCaption : 'Quandl China DCE Futures',
      dialogComp : QuandlFuturesChinaDceDialog,
  }

};

export default DataQE
