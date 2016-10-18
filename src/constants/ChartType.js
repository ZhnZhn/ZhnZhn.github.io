import {Quandl, QuandlYahoo, QuandlGoogle} from './DialogType';

const addCharts = function(obj, dialogType, prefix){
    for(var prop in dialogType){
         obj[prefix + prop] = dialogType[prop];
    }
}

const createTypeObject = function(){
  let obj = {};
  addCharts(obj, Quandl, 'QUANDL_');
  addCharts(obj, QuandlYahoo, 'QUANDL_YAHOO_');
  addCharts(obj, QuandlGoogle, 'QUANDL_GOOGLE_');
  obj['WATCH_LIST'] = 'WL_WATCH_LIST';
  obj['QUS_STOCKS'] = 'QUS_STOCKS_BY_SECTOR';
  return obj;
}

const ChartType = createTypeObject();

export default ChartType
