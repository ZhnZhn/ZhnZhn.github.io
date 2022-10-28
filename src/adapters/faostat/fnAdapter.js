export { crError } from '../crFn';
export { toInfo } from './fnDescr';
export {
  getValue,
  findMinY
} from '../AdapterFn';

import {
  isNumber,
  isYNumber,
  getValue,
  toUpperCaseFirst,
  monthIndex,
  ymdToUTC,
  valueMoving
} from '../AdapterFn';
import { DATASET_EMPTY } from './fnDescr';

const _isArr = Array.isArray
, BLANK = ' '
, MM_DD = '-12-31'
, DF_TITLE = 'More about data on tab Info in Description';

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
) => {
  const hm = Object.create(null);
  data.forEach(item => {
    const _itemKey = item[prName];
    if (!hm[_itemKey]) {
      hm[_itemKey] = []
      hm[_itemKey].seriaName = _itemKey
    }
    hm[_itemKey].push(_crPoint(item))
  })
  return hm;
};

const _compareByY = (a, b) => b.y - a.y;

const _crRefLegend = (hm) => {
  const legend = [];
  let propName;
  for(propName in hm) {
    const _arr = hm[propName];
    legend.push({
      ..._arr[_arr.length-1],
      listPn: propName
    })
  }
  return legend
    .filter(isYNumber)
    .sort(_compareByY);
};

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
) => data
  .map(_crPoint)
  .filter(p => isNumber(p.y))
  .sort(_compareByX);

const _isItemList = item => getValue(item)
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

export const crId = ({ _itemKey }) => _itemKey

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
    return dfTitle
      ? `${dfTitle}: ${title}`
      : title;
  }
  const { data } = json
  , p = data[data.length-1];
  if (p && typeof p === 'object') {
    const {
      Area='',
      Item='',
      Element=''
    } = p;
    return `${Area} ${Item} ${Element}`;
  } else {
    return DF_TITLE;
  }
}

export const crSubtitle = (
  json,
  option
) => option.dfSubtitle
  || `${option.subtitle}: ${_crUnit(json)}`;

export const crSeriaData = _crSeriaData
export const toDataPoints = (
  json,
  option
) => {
  const _prName = _getSeriesPropName(option)
  , _itemCode = getValue(option.items[1])
  , _data = (json.data || []).filter(item => {
    const _itemCodeFao = (item['Item Code (FAO)'] || '').trim();
    return _itemCodeFao
      ? _itemCodeFao === _itemCode
      : true;
  });
  return _prName
    ? _crSeriesData(_data, _prName)
    : _crSeriaData(_data, option);
}

export const crZhConfig = (
  id,
  { dfDomain, itemCaption }
) => ({
  id: id,
  key: id,
  isWithoutSma: true,
  dataSource: "FAOSTAT",
  linkFn: "FAO_STAT",
  item: dfDomain,
  itemCaption: itemCaption
})

export const crValueMoving = (
  points
) => _isArr(points) && !_isArr(points[0])
  ? valueMoving(points)
  : void 0;

export const isSeriesReq = _getSeriesPropName
export const isQueryAllowed = _isListForList
