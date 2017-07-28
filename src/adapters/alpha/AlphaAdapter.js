
import AdapterFn from '../AdapterFn'
import ChartConfig from '../../charts/ChartConfig'

const C = {
  TWO_YEARS_DAYS: 501,
  TA: 'Technical Analysis:',

  MACD: 'MACD',
  MACD_S: 'MACD_Signal',
  MACD_H: 'MACD_Hist',

  STOCH: 'STOCH',
  SLOW_K: 'SlowK',
  SLOW_D: 'SlowD',

  BLACK: { color: 'black' },
  RED: { color: 'red' },
  BLUE: { color: 'rgb(47, 126, 216)' },
  BLUE_A: { color: 'rgba(47, 126, 216, 0.75)' }
}

const _crValue = ( json, option ) => {
  const {
          indicator,
          forDays=C.TWO_YEARS_DAYS
        } = option
      , value = json[`${C.TA} ${indicator}`]
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
    _x = AdapterFn.ymdtToUTC(_date)
    _v = value[_date]
    for(j=0; j<_maxProp; j++){
      result[j].push([_x, parseFloat(_v[arrProp[j]])])
    }
  }
  return result;
}

const _crSplineSeria = ({data, ticket, valueText}, option) => {
  return Object.assign(ChartConfig.fSeries(), {
            data: data,
            marker: {
              symbol: 'circle'
            },
            zhSeriaId: ticket + '_' + valueText ,
            zhValueText: valueText
          }, option);
}

const _crSeriaData = (json, option) => {
  const { indicator } = option
      , { value, dateKeys, max } = _crValue(json, option)
      , _data = [];

  let i, _date, _v;
  for(i=max; i>-1; i--) {
    _date = dateKeys[i]
    _v = parseFloat(value[_date][indicator])
    _data.push([ AdapterFn.ymdtToUTC(_date), _v])
  }

  return _data;
}

const _crSeria = (json, option ) => {
  const { indicator, ticket } = option
      , _data = _crSeriaData(json, option);
  return _crSplineSeria({
           data: _data, valueText: indicator, ticket
         });
}


const _crMacdSeries = (json, option) => {
  const { ticket } = option
      , _arrs = _toDataArrs(
           _crValue(json, option),
           [C.MACD, C.MACD_S, C.MACD_H]
        )
      , sMcad = _crSplineSeria({
           data: _arrs[0], valueText: C.MACD, ticket
        }, C.BLACK)
      , sSignal = _crSplineSeria({
           data: _arrs[1], valueText: C.MACD_S, ticket
        }, C.RED)
      , sHist = Object.assign(ChartConfig.fSeries(), {
           color: C.BLUE_A,
           data: _arrs[2],
           zhSeriaId: ticket + '_' + C.MCAD_H,
           zhValueText: C.MCAD_H,
           //type: 'area',
           //visible: true
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
  const { ticket } = option
      , _arrs = _toDataArrs(
           _crValue(json, option), [C.SLOW_K, C.SLOW_D]
        )
      , sSlowK = _crSplineSeria({
          data: _arrs[0], valueText: C.SLOW_K, ticket
        }, C.BLUE)
     , sSlowD = _crSplineSeria({
          data: _arrs[1], valueText: C.SLOW_D, ticket
       }, C.RED);

  return [sSlowK, sSlowD];
}

const AlphaAdapter = {
  toConfig(json, option) {
    const { indicator, ticket } = option
        , _chartId = `${ticket}-${indicator}`
        , config = ChartConfig.fBaseAreaConfig({
            zhConfig: {
              id: _chartId,
              key: _chartId,
              isWithLegend:false,
              dataSource: "Alpha"
            }
          })        
        , _series = this.toSeries(json, option)
        , _isArrSeries = Array.isArray(_series)
        , _data = _isArrSeries
              ? _series[0].data
              : _series.data
        , _type = _isArrSeries
             ? _series[0].type
             : 'spline';

    config.series[0] = {
      data: _data,
      type: _type,
    }
    if (_isArrSeries) {
      for(let i=1; i<_series.length; i++){
        config.series.push(_series[i])
      }
    }
    config.chart.spacingTop = 25

    return {
      config,
      isDrawDeltaExtrems:false,
      isNotZoomToMinMax:false
    };
  },

  toSeries(json, option) {
    const { indicator } = option;
    let series;

    switch (indicator) {
      case C.MACD:
        series = _crMacdSeries(json, option)
        break;
      case C.STOCH:
        series = _crStochSeries(json, option)
        break;
      default:
        series = _crSeria(json, option)
    }

    return series;
  }
};

export default AlphaAdapter
