

import ConfigBuilder from '../../charts/ConfigBuilder'
import Tooltip from '../../charts/Tooltip'
import AdapterFn from '../AdapterFn'

import fnDescr from './fnDescr'

import C from './conf'

const _crZhConfig = (id, { dfDomain, oneCaption }) => ({
  id: id,
  key: id,
  isWithoutIndicator: true,
  isWithoutAdd: true,
  dataSource: "FAOSTAT",
  linkFn: "FAO_STAT",
  item: dfDomain,
  itemCaption: oneCaption
});

const _crId = ({ three, value }) => three ? value + '_' + three : value;

const _crUnit = (json) => {
  const { data=[] } = json
  , item = data[data.length-1] || {}
  , _unit = item.Unit === undefined
       ? C.DATASET_EMPTY
       : item.Unit ? item.Unit : C.ONE_BLANK;

  return _unit[0].toUpperCase() + _unit.substr(1);
};

const _crSubtitle = (json, subtitle) => {
  const _unit = _crUnit(json);
  return subtitle + ': ' + _unit;
};

const _crPoint = ({ Year, Value }) => ({
  x: AdapterFn.ymdToUTC('' + Year + C.MM_DD),
  y: Value
})

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
}

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
}

const _hmToPoints = (hm, arr) => {
  const r = [];
  arr.forEach(item => {
    r.push(hm[item.Area])
  })
  return r;
}

const _crSeriesData = (json) => {
  const _hm = _crHm(json)
      , _legend = _crRefLegend(_hm);

  return _hmToPoints(_hm, _legend);
}

const _crSeriaData = (json, option) => {
  const { data=[] } = json
     , points = [];
  data.forEach(item => {
    points.push(_crPoint(item))
  })

  return points;
}

const _toDataPoints = (json, option) => {
  const { one } = option
  return ( (''+one).indexOf('>') === -1 )
    ? _crSeriaData(json, option)
    : _crSeriesData(json, option)
}

const _checkToSeries = option => {
  const { one } = option;
  return ( (''+one).indexOf('>') === -1 )
    ? true
    : false;
}

const FaoStatAdapter = {
  toConfig(json, option){
    const { title, subtitle } = option
    , _id = _crId(option)
    , _subtitle = _crSubtitle(json, subtitle)
    , _points = _toDataPoints(json, option)
    , config = ConfigBuilder()
       .initBaseArea()
       .add('chart', { spacingTop: 25 })
       .addCaption(title, _subtitle)
       .addPoints(_id, _points)
       .addTooltip(Tooltip.fnBasePointFormatter)
       .add('info', fnDescr.toInfo(json, title, _subtitle))
       .add('zhConfig', _crZhConfig(_id, option))
       .toConfig();
    return { config };
  },

  toSeries(json, option){
    const _data = _crSeriaData(json, option)
        , _id = _crId(option)
        , { parentId, oneCaption } = option
        , _isAllow = _checkToSeries(option);
    if (!_isAllow) {
      throw new Error('ZH_1000');
    }
    return ConfigBuilder()
      .initBaseSeria()
      .add({
        data: _data,
        zhSeriaId: parentId + '_' + _id,
        zhValueText: oneCaption,
        zhItemCaption: oneCaption
      })
      .toConfig();
  }
};

export default FaoStatAdapter
