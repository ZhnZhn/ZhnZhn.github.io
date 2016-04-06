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
  return obj;
}

const ChartType = createTypeObject();
export default ChartType
