
import AdapterFn from '../AdapterFn'
import ChartConfig from '../../charts/ChartConfig'

const TWO_YEARS_DAYS = 501;

const _createSeriaData = (json, option ) => {
  const {
          indicator,
          forDays=TWO_YEARS_DAYS          
        } = option
      , _propName = `Technical Analysis: ${indicator}`
      , _value = json[_propName]
      , _dateKeys = ( _value)
           ? Object.keys(_value).sort().reverse()
           : []
      , _len = _dateKeys.length
      , _max = (_len < forDays ) ? _len : forDays
      , _data = [];

  let i = 1, _date, _v;
  for(i=_max; i>1; i--) {
    _date = _dateKeys[i]
    _v = parseFloat(_value[_date][indicator])
    _data.push([ AdapterFn.ymdToUTC(_date), _v])
  }

  return _data;
}

const AlphaAdapter = {
  toConfig(json, option) {
    const config = ChartConfig.fBaseAreaConfig()
        , { indicator, ticket } = option
        , _chartId = `${ticket}-${indicator}`
        , _data = _createSeriaData(json, option );

    config.series[0] = {
      data: _data,
      type: 'area',
      lineWidth: 1
    }
    config.chart.spacingTop = 25
    config.zhConfig = {
      columnName: "Close",
      dataColumn: 4,
      dataSource: "Alpha",
      id: _chartId,
      isWithLegend:false,
      key: _chartId,
      linkFn:"NASDAQ"
    }

    return {
      config,
      isDrawDeltaExtrems:false,
      isNotZoomToMinMax:false
    };
  },

  toSeries(json, option) {
    const seria = ChartConfig.fSeries()
        , { indicator, ticket } = option;

    seria.data = _createSeriaData(json, option)
    seria.zhSeriaId = ticket + '_' + indicator
    seria.zhValueText = indicator

    return seria;
  }
};

export default AlphaAdapter
