export { valueMoving } from '../AdapterFn';

import Big from 'big.js';

import {
  isArr,
  isNumber,
  joinBy,
  mlsToDmy
} from '../AdapterFn';
import formatAllNumber from '../../utils/formatAllNumber';
import {
  calcPercent,
  crValueMoving as crVm
} from '../../math/mathFn';

const _isStr = str => typeof str === 'string';

const _crItemCaption = ({
  dfItemCaption,
  items,
  itemCaption
}) => isNumber(dfItemCaption)
  && isArr(items) && items[dfItemCaption-1]
      ? items[dfItemCaption-1].caption || itemCaption
      : itemCaption;

const _isStrEqTo = (
  str,
  strTo
) => _isStr(str) && str.toLowerCase() === strTo;

const _crLinkId = (
  database_code,
  dataset_code
) => database_code && dataset_code
  ? `${database_code}/${dataset_code}`
  : void 0;

export const getData = ({
  dataset,
  datatable
}) => (dataset || {}).data
  || (datatable || {}).data
  || [];

export const getColumnNames = ({
  dataset,
  datatable
}) => dataset
 ? dataset.column_names || []
 : datatable && isArr(datatable.columns)
     ? datatable.columns.map(c => c.name)
     : []

export const isPrevDateAfter = (
  arr,
  checkedDate,
  predicate
) => {
  const length = arr.length;
  if (length === 0){
   return true;
  }
  const prevDate = arr[length-1].x;
  return !(Math.abs((checkedDate.valueOf()-prevDate.valueOf())/(24*60*60*1000)) < predicate)
}

export const crDatasetInfo = ({
  dataset
}) => {
   const {
     name,
     description,
     newest_available_date,
     oldest_available_date,
     frequency,
     database_code,
     dataset_code
   } = dataset || {}
   , linkId = _crLinkId(database_code, dataset_code);

   return {
     name,
     toDate: newest_available_date,
     fromDate: oldest_available_date,
     frequency,
     linkId,
     description
  };
}

const DATA_SOURCE = 'Nasdaq Data Link';

export const crZhConfig = (
  option
) => {
  const {
    item,
    title,
    subtitle='',
    value:id,
    key,
    columnName,
    dataColumn,
    fromDate,
    seriaColumnNames,
    linkFn,
    dataSource
  } = option
  , _dataSource = joinBy(' ', DATA_SOURCE, dataSource)
  , _itemCaption = _crItemCaption(option);
  return {
    item,
    title,
    subtitle,
    id,
    key,
    linkFn,
    itemConf: {
      _itemKey: id,
      columnName,
      dataColumn,
      fromDate,
      seriaColumnNames
    },
    itemCaption: _itemCaption,
    dataSource: _dataSource
  };
}

export const crPercent = calcPercent

export const crValueMoving = ({
   bNowValue=Big('0.0'),
   bPrevValue=Big('0.0')
 }) => crVm({
  nowValue: bNowValue,
  prevValue: bPrevValue,
  fnFormat: formatAllNumber
})

export const getRecentDate = (
  seria,
  json
) => {
  const len = (seria || []).length
  , { dataset } = json
  , { frequency='' } = dataset || {}
  , mlsUTC = len>0 && seria[len-1][0] && isNumber(seria[len-1][0])
      ? seria[len-1][0]
      : '';
  return mlsUTC
    ? frequency.toLowerCase() === 'annual'
        ? new Date(mlsUTC).getUTCFullYear()
        : mlsToDmy(mlsUTC)
    : '';
}

export const setTitleToConfig = (
  config,
  option
) => {
  const {
    title,
    subtitle
  } = option || {};
  config.title.text = title || '';
  config.subtitle.text = subtitle ? `${subtitle}:` : '';
}

export const findColumnIndex = (
  obj,
  columnName=''
) => {
  const column_names = isArr(obj)
    ? obj
    : getColumnNames(obj)
  , _columnName = columnName.toLowerCase();

  if (_columnName && column_names) {
    for (let i=0, max=column_names.length; i<max; i++){
      if (_isStrEqTo(column_names[i], _columnName)) {
        return i;
      }
    }
  }
  return;
}

export const getDataColumnIndex = (
  json,
  option
) => {
  const {
    columnName,
    dataColumn
  } = option
  , _dataColumn = findColumnIndex(json, columnName);
  return _dataColumn || dataColumn || 1;
}
