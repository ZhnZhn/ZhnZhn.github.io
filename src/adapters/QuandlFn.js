
import Big from 'big.js';
import createDOMPurify from 'dompurify';

import {Direction} from '../constants/Type';
import ChartConfig from '../constants/ChartConfig';

const DOMPurify = createDOMPurify(window)


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

  const _bDelta = bPrevValue.minus(bNowValue)
      , _bPercent = fnCreatePercent({bValue:_bDelta, bTotal: bPrevValue})

  let _direction;
  if (_bDelta.gt(0.0)){
    _direction = Direction.DOWN;
  } else if (!_bDelta.gte(0.0)){
    _direction = Direction.UP;
  } else {
    _direction = Direction.EQUAL;
  }

  return {
    value : ChartConfig.fnNumberFormat(bNowValue),
    delta : ChartConfig.fnNumberFormat(_bDelta.abs().toString()),
    percent : _bPercent.toString() + '%',
    direction : _direction
  };
}

export const fnCreateValueMovingFromSeria = function(seria){
  const len = seria.length
      , bNowValue = (len>0) ?
            ( (seria[len-1][1]) ? seria[len-1][1] : '0.0' ) : '0.0'
      , bPrevValue = (len>1) ?
            ( (seria[len-2][1] ) ? Big(seria[len-2][1]) : Big(0.0) ) : Big(0.0);

  return  fnCreateValueMoving({bNowValue, bPrevValue})
}

export const fnSetTitleToConfig = function(config={}, option={}){
  const {title, subtitle} = option;
  config.title.text = (title) ? title : '';
  config.subtitle.text = (subtitle) ? `${subtitle}:` : '';
}
