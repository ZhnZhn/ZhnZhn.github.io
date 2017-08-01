import AdapterFn from '../AdapterFn'

import ChartConfig from '../../charts/ChartConfig'
import Chart from '../../charts/Chart'

import { fnAddSeriesSma, fnRemoveSeries } from '../IndicatorSma';

const _parser = new window.DOMParser();

//€

const _toData = (str) => {
  const xml = _parser.parseFromString(str, 'text/xml')
      , series = xml.getElementsByTagName('Series')
      , data = [], info = [];
  let i=0, max = series.length, _seria, _v;
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
      }
    })
  }

  return {
    data: data.sort(AdapterFn.compareByDate),
    info: info
  };
}

const ST_TITLE = 'style="color:#1b75bb;"';
const _toInfo = (info, title) => {
  let strDom='';
  info.forEach(seria => {
    const {
            title, id, updatedOn,
            frequency, unitMeasure, unitMult
          } = seria;
    strDom += `
      <div style="color:black;">${title}</div>
      <div>
        <span ${ST_TITLE}>IDBANK:</span><span>${id}</span>
        <span ${ST_TITLE}>Frequency:</span><span>${frequency}&nbsp;</span>
        <span ${ST_TITLE}>UpdatedOn:</span><span>${updatedOn}&nbsp;</span>
      </div>
      <div>
        <span ${ST_TITLE}>UnitMeasure:</span><span>${unitMeasure}&nbsp;</span>
        <span ${ST_TITLE}>UnitMult:</span><span>${unitMult}&nbsp;</span>
      </div>
      <div>
        <a href="https://www.insee.fr/en/statistiques/serie/${id}">INSEE Data Link</a>
      </div>
      <br/>
    `
  })
  return {
    name: title,
    description: strDom
  };
}

const InseeAdapter = {
  toConfig(str, option) {
    const { value, title, subtitle } = option
        , config = ChartConfig.fBaseAreaConfig()
        , { data, info } = _toData(str);

    Object.assign(config.series[0], {
      data: data,
      type: 'spline',
      zhSeriaId: value,
    })
    Object.assign(config, {
      title: Chart.fTitle({
        text: title,
        y: Chart.STACKED_TITLE_Y
      }),
      subtitle: Chart.fSubtitle({
         text : subtitle ? subtitle: 'INSEE',
         y : Chart.STACKED_SUBTITLE_Y
      }),
      info: _toInfo(info, title),
      valueMoving: AdapterFn.valueMoving(data),
      zhConfig: {
        id: value,
        key: value,
        isWithLegend: false,
        dataSource: "INSEE"
      },
      zhFnAddSeriesSma: fnAddSeriesSma,
      zhFnRemoveSeries: fnRemoveSeries
    })
    config.chart.spacingTop = 25

    return { config };
  },

  toSeries(str, option) {
     return Object.assign(ChartConfig.fSeries(), {
               zhSeriaId:  'not_implemented',
               zhValueText: 'not implemented'
             });
  }
}

export default InseeAdapter
