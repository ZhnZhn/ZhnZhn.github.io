export {
  valueMoving,
  crValueMoving
} from "../AdapterFn";


import {
  isArr,
  isNumber
} from "../../utils/isTypeFn";

import {
  isCategory
} from "../CategoryFn";

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
}, {
  dfCi,
  seriaType
} = {}) => {
  if (datatable) {
    const [
      dateIndex,
      valueIndex
    ] = getItemIndexTuple(datatable.columns)
    , _dateIndex = isCategory(seriaType) && isNumber(dfCi)
       ? dfCi
       : dateIndex;
    return _getData(datatable).map(arrItem => [
      arrItem[_dateIndex],
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
    dataSource
  };
}
