import { Quandl } from './DialogType'

const addCharts = function(obj, dialogType, prefix){
    for(let prop in dialogType){
         obj[prefix + prop] = dialogType[prop];
    }
}

const createTypeObject = function(){
  let obj = {};
  addCharts(obj, Quandl, 'QUANDL_');
  obj['WATCH_LIST'] = 'WL_WATCH_LIST';

  return obj;
}

const ChartType = createTypeObject();

export default ChartType
