import Big from 'big.js';
import DOMPurify from 'purify';

import DateUtils from '../utils/DateUtils';
import {Direction} from '../constants/Type';
import ChartConfig from '../constants/ChartConfig';

export const fnCreateDatasetInfo = function(json){
  const { dataset={} } = json
      , {
         name='', description='',
         newest_available_date='', oldest_available_date='',
         frequency=''
       } = dataset
      , _description = DOMPurify.sanitize( description );

  return  {
     name : name,
     description : _description,
     newest_available_date : newest_available_date,
     oldest_available_date : oldest_available_date,
     frequency : frequency
  };
}

export const fnCreateZhConfig = function(option){
  return {
    id : option.value,
    columnName : option.columnName,
    dataColumn: option.dataColumn,
    itemCaption : option.itemCaption
  }
}


export const fnCreatePercent = function({
  bValue=Big('0.0'), bTotal=Big('0.0')
}){
  return (!bTotal.eq(Big(0.0)) )
            ? bValue.times(100).div(bTotal).abs().toFixed(2) : Big(0.0);
}


export const fnCreateValueMoving = function({
  bNowValue=Big('0.0'), bPrevValue=Big('0.0')
}){

  let _bDelta = bPrevValue.minus(bNowValue)
    , _direction;
  if (_bDelta.gt(0.0)){
    _direction = Direction.DOWN;
  } else if (!_bDelta.gte(0.0)){
    _direction = Direction.UP;
  } else {
    _direction = Direction.EQUAL;
  }

  _bDelta = _bDelta.abs().round(4);

  const _bPercent = fnCreatePercent({bValue:_bDelta, bTotal: bPrevValue});

  let _bNowValue = Big(bNowValue).round(4);
  if ( _bNowValue.gt('1000000') ){
    _bNowValue = bNowValue.toFixed(0);
    _bDelta = _bDelta.toFixed(0);
  }

  return {
    value : ChartConfig.fnNumberFormat(_bNowValue),
    delta : ChartConfig.fnNumberFormat(_bDelta),
    percent : _bPercent.toString() + '%',
    direction : _direction
  };
}

export const fnCreateValueMovingFromSeria = function(seria){
  const len = seria.length
      , bNowValue = (len>0)
           ? ( (seria[len-1][1]) ? seria[len-1][1] : '0.0' )
           : '0.0'
      , bPrevValue = (len>1)
           ? ( (seria[len-2][1] ) ? Big(seria[len-2][1]) : Big(0.0) )
           : Big(0.0);

  return  fnCreateValueMoving({bNowValue, bPrevValue})
}

export const fnGetRecentDate = function(seria=[], json){
   const len = seria.length
       , { dataset={} } = json
       , { frequency='' } = dataset
       , millisUTC = ( len>0 && seria[len-1][0] && typeof seria[len-1][0]==='number' )
            ? seria[len-1][0]
            : ''
       , d = ( millisUTC )
           ? ( frequency.toLowerCase() === 'annual' )
                 ? new Date(millisUTC).getUTCFullYear()
                 : DateUtils.formatTo(millisUTC)
           : '';
    return d
}

export const fnSetTitleToConfig = function(config={}, option={}){
  const {title, subtitle} = option;
  config.title.text = (title) ? title : '';
  config.subtitle.text = (subtitle) ? `${subtitle}:` : '';
}

export const fnFindColumnIndex = function(obj, columnName=''){
   const column_names = (Array.isArray(obj))
           ? obj
           : (obj.dataset.column_names) ? obj.dataset.column_names : []
       , _columnName = columnName.toLowerCase();

   if ( columnName && column_names ) {
      for (let i=0, max=column_names.length; i<max; i++){
        if (column_names[i].toLowerCase() === _columnName){
          return i;
        }
      }
   }
   return -1;
}
