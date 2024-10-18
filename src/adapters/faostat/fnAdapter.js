export { toInfo } from './fnDescr';

import {
  isArr,
  isObj,
  isNumber,
  isStr,
  isYNumber,
  getValue,
  getObjectKeys,
  joinBy,
  toUpperCaseFirst,
  monthIndex,
  ymdToUTC,
  valueMoving
} from '../AdapterFn';
import { DATASET_EMPTY } from './fnDescr';

const BLANK = ' '
, MM_DD = '-12-31'
, DF_TITLE = 'More about data on tab Info in Description'
, _createObject = () => Object.create(null);


const _crUnit = (json) => {
  const { data } = json
  , item = data[data.length-1] || {}
  , _unit = item.Unit === void 0
       ? DATASET_EMPTY
       : item.Unit || BLANK;

  return toUpperCaseFirst(_unit);
};

const _crPoint = ({
  Year,
  Months,
  Value
}) => {
  const m = Months
     ? monthIndex(Months) + 1
     : 0
  , Tail = m !== 0
     ? `-${m}`
     : MM_DD;
  return {
    x: ymdToUTC('' + Year + Tail),
    y: parseFloat(Value)
  };
};

const _crHm = (
  data,
  prName
) => data.reduce((hm, item) => {
  const _itemKey = item[prName];
  if (!hm[_itemKey]) {
    hm[_itemKey] = []
    hm[_itemKey].seriaName = _itemKey
  }
  hm[_itemKey].push(_crPoint(item))
  return hm;
}, _createObject());

const _compareByY = (a, b) => b.y - a.y;

const _crRefLegend = (
  hm
) => getObjectKeys(hm)
  .map(propName => {
    const _arr = hm[propName];
    return {
      ..._arr[_arr.length-1],
      listPn: propName
    };
  })
  .filter(isYNumber)
  .sort(_compareByY);

const _hmToPoints = (
  hm,
  arr
) => arr
  .map(item => hm[item.listPn]);

const _crSeriesData = (
  data,
  prName
) => {
  const _hm = _crHm(data, prName)
  , _legend = _crRefLegend(_hm);
  return _hmToPoints(_hm, _legend);
};

const _compareByX = (a, b) => a.x - b.x;

const _crSeriaData = (
  data,
  option
) => isArr(data)
  ? data
     .map(_crPoint)
     .filter(p => isNumber(p.y))
     .sort(_compareByX)
  : [];

export const _isItemList = item => getValue(item)
  .indexOf('>') !== -1;

const _getSeriesPropName = ({
  items
}) => _isItemList(items[0])
  ? 'Area'
  : _isItemList(items[1])
     ? 'Item'
     : void 0;

const _isListForList = ({
  items
}) => _isItemList(items[0])
   && _isItemList(items[1]);

export const crTitle = (
  json,
  option
) => {
  const {
    title,
    dfTitle,
    dfSubtitle,
    subtitle
  } = option;
  if (dfSubtitle) {
    return `${subtitle} ${_crUnit(json)}: ${title}`;
  }
  if (title) {
    return joinBy(': ', dfTitle, title);
  }
  const { data } = json
  , p = data[data.length-1];
  return isObj(p)
    ? joinBy(' ', p.Area, p.Item, p.Element)
    : DF_TITLE;
}

export const crSubtitle = (
  json,
  option
) => option.dfSubtitle
  || `${option.subtitle}: ${_crUnit(json)}`;

export const toDataPoints = (
  json,
  option
) => {
  const _prName = _getSeriesPropName(option)
  , _itemCode = getValue(option.items[1])
  , _data = json.data.filter(item => {
    const _itemCodeFao = (item['Item Code (FAO)'] || '').trim();
    return _itemCodeFao
      ? _itemCodeFao === _itemCode
      : true;
  });
  return _prName
    ? _crSeriesData(_data, _prName)
    : _crSeriaData(_data, option);
}

export const crZhConfig = ({
  itemCaption
}) => ({
  isWithoutSma: true,
  dataSource: "FAOSTAT",
  itemCaption
})

export const crValueMoving = (
  points
) => isArr(points) && !isArr(points[0])
  ? valueMoving(points)
  : void 0;

export const isSeriesReq = _getSeriesPropName
export const isQueryAllowed = _isListForList

export const crCategoryTitle = (
  title,
  json
) => {
  const _unit = (json.data[0] || {}).Unit;
  return joinBy(', ',
    title,
    isStr(_unit)
      ? _unit.length > 2
          ? _unit
          : _unit.toUpperCase()
      : ''
  );
}
