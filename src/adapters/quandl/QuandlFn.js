import Big from 'big.js';

import formatAllNumber from '../../utils/formatAllNumber'
import mathFn from '../../math/mathFn';

import dt from '../../utils/DateUtils';
import { Direction } from '../../constants/Type';

import AdapterFn from '../AdapterFn';

const { mlsToDmy } = dt;
const { valueMoving } = AdapterFn;

const _isArr = Array.isArray;
const _isStr = str => typeof str === 'string';
const _isNumber = n => typeof n === 'number'
  && (n - n === 0);

const _crItemCaption = ({ dfItemCaption, items, itemCaption }) => _isNumber(dfItemCaption)
  && _isArr(items) && items[dfItemCaption-1]
      ? items[dfItemCaption-1].caption || itemCaption
      : itemCaption;

const _isStrEqTo = (str, strTo) => _isStr(str)
 && str.toLowerCase() === strTo;

const QuandlFn = {
  valueMoving,
  
  getData: (json) => {
    const { dataset={}, datatable={} } = json;
    return dataset.data || datatable.data || [];
  },

  getColumnNames: (json) => {
    const { dataset, datatable } = json;
    if (dataset) {
      return dataset.column_names || [];
    }
    if (datatable && _isArr(datatable.columns)) {
      return datatable.columns.map(c => c.name);
    }
    return [];
  },

  isPrevDateAfter(arr, checkedDate, predicate){
     const length = arr.length;
     if (length === 0){
       return true;
     }
     const prevDate = arr[length-1].x;
     if (Math.abs((checkedDate.valueOf()-prevDate.valueOf())/(24*60*60*1000)) < predicate){
       return false;
     } else {
       return true;
     }
  },

  createDatasetInfo(json){
     const { dataset={} } = json
     , {
       name='', description='',
       newest_available_date='',
       oldest_available_date='',
       frequency='',
       database_code='',
       dataset_code=''
     } = dataset;

     return  {
       name,
       toDate: newest_available_date,
       fromDate: oldest_available_date,
       frequency,
       database_code,
       dataset_code,
       description
    };
  },

  createZhConfig(option){
    const {
            item, title, subtitle='',
            value:id, key, columnName, dataColumn,
            fromDate, seriaColumnNames,
            linkFn, dataSource
          } = option
        , _dataSource = dataSource
             ? `Quandl: ${dataSource}`
             : 'Quandl'
        , _itemCaption = _crItemCaption(option);
    return {
      item,
      title, subtitle,
      id, key,
      linkFn,
      itemConf: {
        _itemKey: id,
        columnName, dataColumn,
        fromDate, seriaColumnNames
      },
      itemCaption: _itemCaption,
      dataSource: _dataSource
    };
  },

  createPercent({ bValue=Big('0.0'), bTotal=Big('0.0') }){
    return mathFn.calcPercent({ bValue, bTotal });
  },

  createValueMoving({ bNowValue=Big('0.0'), bPrevValue=Big('0.0') }){
    return mathFn.crValueMoving({
      nowValue: bNowValue,
      prevValue: bPrevValue,
      Direction: Direction,
      fnFormat: formatAllNumber
    });
  },

  getRecentDate(seria=[], json){
     const len = seria.length
         , { dataset={} } = json
         , { frequency='' } = dataset
         , mlsUTC = (len>0 && seria[len-1][0] && _isNumber(seria[len-1][0]) )
              ? seria[len-1][0]
              : '';
      return mlsUTC
         ? frequency.toLowerCase() === 'annual'
              ? new Date(mlsUTC).getUTCFullYear()
              : mlsToDmy(mlsUTC)
         : '';
  },

  setTitleToConfig(config, option={}){
    const { title, subtitle } = option;
    config.title.text = title || '';
    config.subtitle.text = subtitle ? `${subtitle}:` : '';
  },

  findColumnIndex(obj, columnName=''){
     const column_names = _isArr(obj)
       ? obj
       : QuandlFn.getColumnNames(obj)
     , _columnName = columnName.toLowerCase();

     if ( _columnName && column_names ) {
      for (let i=0, max=column_names.length; i<max; i++){
       if ( _isStrEqTo(column_names[i], _columnName) ) {
         return i;
       }
      }
     }
     return void 0;
  },

  getDataColumnIndex(json, option){
    const { columnName, dataColumn } = option
    , _dataColumn = QuandlFn.findColumnIndex(json, columnName);
    return _dataColumn || dataColumn || 1;
  }

};

export default QuandlFn
