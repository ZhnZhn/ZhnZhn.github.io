
import ChartConfig from '../../charts/ChartConfig'
import Tooltip from '../../charts/Tooltip'
import ConfigBuilder from '../../charts/ConfigBuilder'

import AdapterFn from '../AdapterFn'

const C = {
  CAPTION: '4Q EPS',
  COLOR: '#4caf50',
  COLOR_PLUS: '#4caf50',
  COLOR_MINUS: '#f44336'
};

const _crZhConfig = (option) => {
  const { dataSource } = option
      , id = AdapterFn.crId();
  return {
    id, key: id,
    isWithoutAdd: true,
    isWithLegend: false,
    dataSource
  };
}

const _calcScatterY = (chart) => {
  const { max, min } = chart.yAxis[0]
      , all = max - min
      , one = all/100;
  return (max - 7*one);
}

const _crSeria = (json, option) => {
  const { dfType } = option
      , data = [];

  json[dfType].map(p => {
    const {
            EPSReportDate, actualEPS,
            EPSSurpriseDollar
          } = p
        , _c = EPSSurpriseDollar < 0
                 ? C.COLOR_MINUS
                 : C.COLOR_PLUS
        , _p = ChartConfig.fMarkerExDividend(_c);
    _p.dataLabels.y = 0
    data.push(
      Object.assign(_p, {
         x: AdapterFn.ymdToUTC(EPSReportDate),
         exValue: actualEPS,
         ...p
      }))
  })
  return {
    type: 'scatter',
    tooltip: {
      pointFormatter: Tooltip.eps,
      headerFormat: ''
    },
    data: data
    //zhSeriaId : zhSeriaId
  };
}

const toEarnings = {

  toConfig(json, option){
    const seria = _crSeria(json, option)
        , config = ConfigBuilder()
            .initBaseArea()
            .add({
              zhConfig: _crZhConfig(option)
            })
            .toConfig();

    config.series[0] = seria
    return config;
  },

  toSeries(json, option, chart){
    const seria = _crSeria(json, option)
        , y = _calcScatterY(chart);

    seria.data.forEach(p => p.y = y)
    Object.assign(seria, {
      zhItemCaption: C.CAPTION,
      zhColor: C.COLOR
    })

    return seria;
  }
}

export default toEarnings
