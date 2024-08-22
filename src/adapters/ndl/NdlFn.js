export {
  valueMoving,
  crValueMoving
} from '../AdapterFn';

import {
  isArr,
  isNumber,
  isStr,
  assign,
  joinBy,
  mlsToDmy
} from '../AdapterFn';

const EURONEXT_ITEM_URL = 'https://www.euronext.com/en/products/equities'
, EURONEXT_ID = "EURONEXT"
, NDL_DATA_SOURCE = 'NDL';

const _crItemCaption = ({
  dfItemCaption,
  items,
  itemCaption
}) => isNumber(dfItemCaption)
  && isArr(items)
  && items[dfItemCaption-1]
      ? items[dfItemCaption-1].caption || itemCaption
      : itemCaption;

const _isStrEqTo = (
  str,
  strTo
) => isStr(str) && str.toLowerCase() === strTo;

const _crLinkId = (
  database_code,
  dataset_code
) => database_code && dataset_code
  ? `${database_code}/${dataset_code}`
  : void 0;


const _getData = obj => obj.data || [];

export const getData = ({
  dataset,
  datatable
}) => {
  if (dataset) {
    return _getData(dataset);
  }
  if (datatable) {
    return _getData(datatable).map(arrItem => [
      arrItem[arrItem.length - 2],
      arrItem[arrItem.length - 1]
    ]);
  }
  return [];
};

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
   return dataset ? {
      name,
      toDate: newest_available_date,
      fromDate: oldest_available_date,
      frequency,
      linkId,
      description
   } : void 0;
}

const _crEuronextHref = item => {
  const { isin, market } = item
  , _linkId = isin && market
     ? `${isin}-${market}`
     : '';
  return `${EURONEXT_ITEM_URL}/${_linkId}`;
};

export const crZhConfig = (
  option
) => {
  const {
    item,
    items,
    title,
    subtitle='',
    value:id,
    key,
    columnName,
    dataColumn,
    fromDate,
    seriaColumnNames,
    dataSource
  } = option
  , _dataSource = joinBy(' ', NDL_DATA_SOURCE, dataSource)
  , _itemCaption = _crItemCaption(option)
  , _item = (isArr(items)
     ? items[0]
     : item || {})
  , _linkFn = option.dfDbId === EURONEXT_ID
     ? (assign(_item, {
         caption: `Euronext ${_item.c}`,
         href: _crEuronextHref(_item)
       }), 'DF')
     : option.linkFn;
  return {
    linkFn: _linkFn,
    item: _item,
    title,
    subtitle,
    id,
    key,
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
) => findColumnIndex(json, option.columnName)
 || option.dataColumn
 || 1
