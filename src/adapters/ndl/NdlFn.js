export {
  valueMoving,
  crValueMoving
} from "../AdapterFn";

import {
  isArr,
  isNumber,
  joinBy,
} from "../AdapterFn";

const NDL_DATA_SOURCE = "NDL";

const _crItemCaption = ({
  dfItemCaption,
  items,
  itemCaption
}) => isNumber(dfItemCaption)
  && isArr(items)
  && items[dfItemCaption-1]
      ? items[dfItemCaption-1].caption || itemCaption
      : itemCaption;


const _getData = obj => obj.data || [];

export const getItemIndexTuple = (columns) => {
  let dateIndex = 0,
  valueIndex = 1;
  const _columns = isArr(columns)
    ? columns
    : []
  for(let i=0; i<_columns.length;i++){
    const { name } = columns[i] || {};
    if (name === "date") {
      dateIndex = i
    }
    if (name === "value") {
      valueIndex = i
    }
  }
  return [
    dateIndex,
    valueIndex
  ];
}

export const getData = ({
  datatable
}) => {
  if (datatable) {
    const [
      dateIndex,
      valueIndex
    ] = getItemIndexTuple(datatable.columns)
    return _getData(datatable).map(arrItem => [
      arrItem[dateIndex],
      parseFloat(arrItem[valueIndex])
    ]);
  }
  return [];
};

export const crZhConfig = (
  option
) => {
  const {
    item,
    items,
    title,
    subtitle="",
    key,
    fromDate,
    dataSource
  } = option
  , _dataSource = joinBy(" ", NDL_DATA_SOURCE, dataSource)
  , _itemCaption = _crItemCaption(option)
  , _item = isArr(items)
     ? items[0]
     : item || {};
  return {
    item: _item,
    title,
    subtitle,
    id: key,
    key,
    itemConf: {
      _itemKey: key,
      fromDate
    },
    itemCaption: _itemCaption,
    dataSource: _dataSource
  };
}
