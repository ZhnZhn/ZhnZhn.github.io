import Big from 'big.js';
import DOMPurify from 'dompurify';

import mathFn from '../math/mathFn';

import DateUtils from '../utils/DateUtils';
import { Direction } from '../constants/Type';
import ChartConfig from '../charts/ChartConfig';

const QuandlFn2 = {

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
           newest_available_date='', oldest_available_date='',
           frequency='',
           database_code='', dataset_code=''
          } = dataset
         , _description = DOMPurify.sanitize(description)                                   ;

     return  {
       name,
       newest_available_date,
       oldest_available_date,
       frequency,
       database_code, dataset_code,
       description : _description
    };
  },

  createZhConfig(option){
    const {
            item, title, subtitle='',
            value:id, key, columnName, dataColumn,
            itemCaption, fromDate, seriaColumnNames,
            linkFn, dataSource
          } = option
        , _dataSource = dataSource
             ? `Quandl: ${dataSource}`
             : 'Quandl';
    return {
      item,
      title, subtitle,
      id, key,
      columnName, dataColumn, itemCaption,
      fromDate, seriaColumnNames,
      linkFn,      
      dataSource: _dataSource
    }
  },

  createPercent({ bValue=Big('0.0'), bTotal=Big('0.0') }){
    return mathFn.calcPercent({ bValue, bTotal });
  },

  createValueMoving({ bNowValue=Big('0.0'), bPrevValue=Big('0.0') }){
    return mathFn.crValueMoving({
      nowValue: bNowValue,
      prevValue: bPrevValue,
      Direction: Direction,
      fnFormat: ChartConfig.fnNumberFormat
    });
  },

  getRecentDate(seria=[], json){
     const len = seria.length
         , { dataset={} } = json
         , { frequency='' } = dataset
         , millisUTC = (len>0 && seria[len-1][0] && typeof seria[len-1][0]==='number')
              ? seria[len-1][0]
              : ''
         , d = (millisUTC)
              ? (frequency.toLowerCase() === 'annual')
                   ? new Date(millisUTC).getUTCFullYear()
                   : DateUtils.formatTo(millisUTC)
              : '';
      return d
  },

  setTitleToConfig(config={}, option={}){
    const {title, subtitle} = option;
    config.title.text = (title) ? title : '';
    config.subtitle.text = (subtitle) ? `${subtitle}:` : '';
  },

  findColumnIndex(obj, columnName=''){
     const column_names = Array.isArray(obj)
             ? obj
             : obj.dataset.column_names
                  ? obj.dataset.column_names
                  : []
         , _columnName = columnName.toLowerCase();

     if ( columnName && column_names ) {
        for (let i=0, max=column_names.length; i<max; i++){
          if (column_names[i].toLowerCase() === _columnName){
            return i;
          }
        }
     }
     return undefined;
  },

  getDataColumnIndex(json, option){
    const { columnName, dataColumn } = option
        , _dataColumn = this.findColumnIndex(json, columnName)
        , _columnIndex = (_dataColumn)
              ? _dataColumn
              : (dataColumn) ? dataColumn : 1;

     return _columnIndex;
  },

  findMinY(data=[]){
    let minY = Number.POSITIVE_INFINITY;
    for (let i=0, max=data.length; i<max; i++){
      if ( data[i][1]<minY ) {
        minY = data[i][1]
      }
    }

    if ( minY !== Number.POSITIVE_INFINITY) {
      return minY;
    } else {
      return undefined;
    }
  }

};

export default QuandlFn2
