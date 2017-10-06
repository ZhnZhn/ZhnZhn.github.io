import AdapterFn from '../AdapterFn'

import ConfigBuilder from '../../charts/ConfigBuilder'

import { fnAddSeriesSma, fnRemoveSeries } from '../IndicatorSma'
import fnDescr from './fnDescr'

const _parser = new window.DOMParser();

//€

const _crZhConfig = id => ({
  id: id,
  key: id,
  isWithLegend: false,
  dataSource: "INSEE"
});

const _toData = (str) => {
  const xml = _parser.parseFromString(str, 'text/xml')
      , series = xml.getElementsByTagName('Series')
      , data = [], info = [];
  let i=0, max = series.length, _seria, _v
    , minClose = Number.POSITIVE_INFINITY
    , maxClose = Number.NEGATIVE_INFINITY;
  for(i; i<max; i++){
    _seria = series[i]
    info.push({
      id: _seria.getAttribute('IDBANK'),
      title: _seria.getAttribute('TITLE_EN'),
      frequency: _seria.getAttribute('FREQ'),
      updatedOn: _seria.getAttribute('LAST_UPDATE'),
      unitMeasure: _seria.getAttribute('UNIT_MEASURE'),
      unitMult: _seria.getAttribute('UNIT_MULT')
    })

    _seria.childNodes.forEach(node => {
      _v = parseFloat(node.getAttribute('OBS_VALUE'))
      if (!Number.isNaN(_v)) {
        data.push([
          AdapterFn.ymdToUTC(node.getAttribute('TIME_PERIOD')),
          _v
        ])

        if (minClose > _v) {
          minClose = _v
        }
        if (maxClose < _v ) {
          maxClose = _v
        }
      }
    })
  }

  return {
    data: data.sort(AdapterFn.compareByDate),
    info: info,
    minClose, maxClose
  };
}

const InseeAdapter = {
  toConfig(str, option) {
    const { value, title, subtitle } = option
        , { data, info, minClose, maxClose } = _toData(str)
        , config = ConfigBuilder()
            .initBaseArea()
            .add('chart', { spacingTop: 25 })
            .addCaption(title, subtitle)
            .addPoints(value, data)
            .setMinMax(minClose, maxClose)
            .add({
              info: fnDescr.toInfo(info, title),
              valueMoving: AdapterFn.valueMoving(data),
              zhConfig: _crZhConfig(value),
              zhFnAddSeriesSma: fnAddSeriesSma,
              zhFnRemoveSeries: fnRemoveSeries
            })
            .toConfig();

    return { config };
  },

  toSeries(str, option) {
     const { value, title, subtitle } = option
         , _text = subtitle ? subtitle : title
         , { data } = _toData(str);
      return ConfigBuilder()
        .initBaseSeria()
        .addPoints(value, data, _text)
        .toConfig();
  }
}

export default InseeAdapter
