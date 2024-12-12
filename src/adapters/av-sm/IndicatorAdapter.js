import pipe from '../../utils/pipe';

import {
  crArea2Config,
  fAddSeries,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';
import { crSeriaConfig } from '../../charts/ChartConfigFn';

import {
  assign,
  crGetRoute,
  getColorBlack,
  ymdToUTC
} from './fnAdapter';

const TWO_YEARS_DAYS = 501
, TA = 'Technical Analysis:'
, MACD = 'MACD'
, MACD_S = 'MACD_Signal'
, MACD_H = 'MACD_Hist'

, STOCH = 'STOCH'
, SLOW_K = 'SlowK'
, SLOW_D = 'SlowD'

, BBANDS = 'BBANDS'
, BBANDS_U = 'Real Upper Band'
, BBANDS_M = 'Real Middle Band'
, BBANDS_L = 'Real Lower Band'

, _crColorBlackStyle = { color: getColorBlack() }
, S_RED = { color: '#f44336' }
, S_BLUE = { color: 'rgb(47, 126, 216)' }
, COLOR_BLUE_A = 'rgba(47, 126, 216, 0.75)'
, S_GREEN = { color: '#4caf50' };

const _crZhConfig = (id) => ({
  id: id,
  key: id,
  itemCaption: id,
  dataSource: "Alpha Vantage"
});

const _crValuePropName = (indicator) => {
  switch(indicator){
    case 'AD': return 'Chaikin A/D';
    default: return indicator;
  }
};

const _crValue = ( json, option ) => {
  const {
          indicator,
          forDays=TWO_YEARS_DAYS
        } = option
      , _indicator = _crValuePropName(indicator)
      , value = json[`${TA} ${_indicator}`]
      , dateKeys = value
           ? Object.keys(value).sort().reverse()
           : []
      , _len = dateKeys.length
      , max = _len < forDays
          ? _len-1
          : forDays;
    return { value, dateKeys, max };
}

const _toDataArrs = ({dateKeys, value, max}, arrProp) => {
  let i, j, _date, _x, _v;

  const result=[], _maxProp=arrProp.length;
  for(j=0; j<_maxProp;j++) {
    result.push([])
  }

  for(i=max; i>-1; i--) {
    _date = dateKeys[i]
    _x = ymdToUTC(_date)
    _v = value[_date]
    for(j=0; j<_maxProp; j++){
      result[j].push([_x, parseFloat(_v[arrProp[j]])])
    }
  }
  return result;
}

const _crSplineSeria = ({ data, name }, option) =>
  assign(crSeriaConfig(), {
    data, name,
    type: 'spline',
    visible: true,
    marker: {
      symbol: 'circle'
    }
  }, option);


const _crSeriaData = (json, option) => {
  const { indicator } = option
      , _indicator = _crValuePropName(indicator)
      , { value, dateKeys, max } = _crValue(json, option)
      , _data = [];

  let i=max, _date, _v;
  for(; i>-1; i--) {
    _date = dateKeys[i]
    _v = parseFloat(value[_date][_indicator])
    _data.push([ymdToUTC(_date), _v])
  }

  return _data;
}

const _crDfSeria = (json, option ) => {
  const { indicator } = option
  , _data = _crSeriaData(json, option);
  return _crSplineSeria({
    data: _data,
    name: indicator
  });
}


const _crMacdSeries = (json, option) => {
  const _arrs = _toDataArrs(
     _crValue(json, option),
     [MACD, MACD_S, MACD_H]
  )
  , sMcad = _crSplineSeria({
       data: _arrs[0],
       name: MACD
    }, _crColorBlackStyle())
  , sSignal = _crSplineSeria({
       data: _arrs[1],
       name: MACD_S
    }, S_RED)
  , sHist = assign(crSeriaConfig(), {
       color: COLOR_BLUE_A,
       data: _arrs[2],
       name: MACD_H,
       type: 'column',
       visible: false,
       shadow: false,
       borderWidth: 0,
       pointPlacement: 'on',
       pointPadding: 0,
       groupPadding: 0,
       turboThreshold: 20000
    });

  return [ sHist, sSignal, sMcad ];
}

const _crStochSeries = (json, option) => {
  const _arrs = _toDataArrs(
    _crValue(json, option), [SLOW_K, SLOW_D]
  )
  , sSlowK = _crSplineSeria({
      data: _arrs[0],
      name: SLOW_K
    }, S_BLUE)
 , sSlowD = _crSplineSeria({
      data: _arrs[1],
      name: SLOW_D
   }, S_RED);

  return [sSlowK, sSlowD];
}

const _crBbandsSeries = (json, option) => {
  const _arrs = _toDataArrs(
      _crValue(json, option),
      [BBANDS_M, BBANDS_U, BBANDS_L]
    )
    , sMiddle = _crSplineSeria({
        data: _arrs[0],
        name: BBANDS_M
      }, S_BLUE)
   , sUpper = _crSplineSeria({
        data: _arrs[1],
        name: BBANDS_U
     }, S_GREEN)
   , sLow = _crSplineSeria({
          data: _arrs[2],
          name: BBANDS_L
     }, S_RED);

    return [sMiddle, sUpper, sLow];
}

const _getCrSeries = crGetRoute({
  [MACD]: _crMacdSeries,
  [STOCH]: _crStochSeries,
  [BBANDS]: _crBbandsSeries,
}, _crDfSeria)
, _toSeries = (
  json,
  option
) => _getCrSeries(option.indicator)(json, option);

const IndicatorAdapter = {
  crKey(option){
    return (option.chartId = `${option.ticket}-${option.value}`);
  },

  toConfig(json, option) {
    return {
      config: pipe(
        crArea2Config(`${option.ticket}: ${option.value}`),
        fAddSeries(_toSeries(json, option)),
        fAdd({ zhConfig: _crZhConfig(option.chartId) }),
        toConfig
      ),
      isDrawDeltaExtrems: false,
      isNotZoomToMinMax: false
    };
  },

  toSeries: _toSeries
};

export default IndicatorAdapter