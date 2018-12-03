
import AdapterFn from '../AdapterFn'

import fnDescr from './fnDescr'

const {
       isYNumber,
       toUpperCaseFirst,
       monthIndex,
       ymdToUTC,
       valueMoving
     } = AdapterFn;

const C = {
  DATASET_EMPTY: 'Dataset is empty',
  ENPTY: '',
  BLANK: ' ',
  MM_DD: '-12-31',
  DF_TITLE: 'More about data on tab Info in Description'
};

const _crUnit = (json) => {
  const { data=[] } = json
  , item = data[data.length-1] || {}
  , _unit = item.Unit === undefined
       ? C.DATASET_EMPTY
       : item.Unit || C.BLANK;

  return toUpperCaseFirst(_unit);
};

const _crPoint = ({ Year, Months, Value }) => {
  const m = Months
     ? monthIndex(Months) + 1
     : 0
  , Tail = m !== 0
     ? `-${m}`
     : C.MM_DD;
  return {
    x: ymdToUTC('' + Year + Tail),
    y: Value
  };
};


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
  return legend
    .filter(isYNumber)
    .sort(_compareByY)
    .reverse();
};

const _hmToPoints = (hm, arr) => {
  return arr.map(item => hm[item.Area]);
};

const _crSeriesData = (json) => {
  const _hm = _crHm(json)
      , _legend = _crRefLegend(_hm);

  return _hmToPoints(_hm, _legend);
};

const _compareByX = (a, b) => a.x - b.x;

const _crSeriaData = (json, option) => {
  const { data=[] } = json;
  return data
    .map(_crPoint)
    .sort(_compareByX);
};

const fnAdapter = {
  crId: ({ three, value }) => {
    const _v = value || 'faoId';
    return three
      ? `${_v}_${three}`
      : _v;
  },
  crTitle: (json, option) => {
     const {
       title, dfTitle,
       dfSubtitle, subtitle
     } = option;
     if (dfSubtitle) {
       return `${subtitle} ${_crUnit(json)}: ${title}`;
     }
     if (title) {
       return dfTitle
         ? `${dfTitle}: ${title}`
         : title;
     }
     const { data=[] } = json
         , p = data[data.length-1];
     if (p && typeof p === 'object') {
       const { Area='', Item='', Element='' } = p;
       return `${Area} ${Item} ${Element}`;
     } else {
       return C.DF_TITLE;
     }
  },
  crSubtitle: (json, option) => {
    const { dfSubtitle, subtitle } = option;
    return dfSubtitle
      ? dfSubtitle
      : `${subtitle}: ${_crUnit(json)}`;
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
