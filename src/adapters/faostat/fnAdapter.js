
import AdapterFn from '../AdapterFn'

import fnDescr from './fnDescr'

const { ymdToUTC, valueMoving } = AdapterFn;

const C = {
  DATASET_EMPTY: "Dataset is empty",
  ONE_BLANK: " ",
  MM_DD: '-12-31'
};

const _crUnit = (json) => {
  const { data=[] } = json
  , item = data[data.length-1] || {}
  , _unit = item.Unit === undefined
       ? C.DATASET_EMPTY
       : item.Unit
            ? item.Unit
            : C.ONE_BLANK;

  return _unit[0].toUpperCase() + _unit.substr(1);
};

const _crPoint = ({ Year, Value }) => ({
  x: ymdToUTC('' + Year + C.MM_DD),
  y: Value
});

const _crHm = (json) => {
  const { data=[]} = json
  , hm = Object.create(null);

  data.forEach(item => {
     const { Area } = item
     if (!hm[Area]) {
       hm[Area] = []
       hm[Area].seriaName = Area
     }
     hm[Area].push(_crPoint(item))
  })
  return hm;
};

const _compareByY = (a, b) => a.y - b.y;

const _crRefLegend = (hm) => {
  const legend = [];
  let propName;
  for(propName in hm) {
    const _arr = hm[propName];
    legend.push({
      ..._arr[_arr.length-1],
      Area: propName
    })
  }
  return legend.sort(_compareByY).reverse();
};

const _hmToPoints = (hm, arr) => {
  return arr.map(item => hm[item.Area]);
};

const _crSeriesData = (json) => {
  const _hm = _crHm(json)
      , _legend = _crRefLegend(_hm);

  return _hmToPoints(_hm, _legend);
};

const _crSeriaData = (json, option) => {
  const { data=[] } = json;
  return data.map(item => _crPoint(item));
};

const fnAdapter = {
  crId: ({ three, value }) => {
    return three
      ? value + '_' + three
      : value;
  },
  crSubtitle: (json, subtitle) => {
    const _unit = _crUnit(json);
    return subtitle + ': ' + _unit;
  },
  crSeriaData: _crSeriaData,
  toDataPoints: (json, option) => {
    const { one } = option
    return ( (''+one).indexOf('>') === -1 )
      ? _crSeriaData(json, option)
      : _crSeriesData(json, option);
  },
  toInfo: fnDescr.toInfo,
  crZhConfig: (id, { dfDomain, oneCaption }) => ({
    id: id,
    key: id,
    isWithoutIndicator: true,
    isWithoutAdd: true,
    dataSource: "FAOSTAT",
    linkFn: "FAO_STAT",
    item: dfDomain,
    itemCaption: oneCaption
  }),
  crValueMoving: (points) => {
    return Array.isArray(points) && !Array.isArray(points[0])
      ? valueMoving(points)
      : undefined;
  },
  checkToSeries: ({ one }) => {
    return ( (''+one).indexOf('>') === -1 )
      ? true
      : false;
  }
};

export default fnAdapter
