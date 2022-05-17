import ChartConfig from '../../charts/ChartConfig'
import Builder from '../../charts/ConfigBuilder'
import Tooltip from '../../charts/Tooltip'

import { compareByValue } from '../compareByFn';
import { legendItem } from '../legendFn'

import { toDescr } from './fnDescr';
import {
  toSeriaNames,
  toHmCategories
} from './fnHm';
import {
  toWorldLegend,
  toAllLegend
} from './fnLegend';

import C from './conf'

const _assign = Object.assign;

const _crInfo = (
  json,
  option
) => ({
  frequency: "Annual",
  description: toDescr(json, option),
});

const _crMarker = color => ({
  fillColor: color,
  lineColor: color,
  lineWidth: 1,
  radius: 4,
  symbol: 'circle'
})

const _crZhConfig = (
  option
) => {
  const { dataSource } = option
  , _id = crChartId(option);
  return {
    id: _id,
    key: _id,
    legend: [],
    dataSource
  };
}

const _addSeriaTo = ({
  config,
  hm,
  name,
  i,
  color,
  seriaOption,
  isShow=false
}) => {
    const { legend } = config.zhConfig
    , _color = color || ChartConfig.getColor(i)
    , _seriaColor = {
         color: _color,
         marker: _crMarker(_color)
      }
    , _seriaOption = (seriaOption !== null)
         ? isShow
           ? { ...C.SPLINE, ..._seriaColor }
           : { ...C.SPLINE_NOT_VISIBLE, ..._seriaColor }
         : null;

    ChartConfig.setSerieData(
      config, hm[name], i, name, _seriaOption
    )
    legend.push(
       legendItem(i, _color, name, isShow)
    )
}

const _addSeriesFromHmTo = ({
  config,
  hm,
  fromIndex
 }) => {
    let i=fromIndex;

    toSeriaNames(hm, compareByValue)
      .forEach(item => {
         const name = item.name
             , _isShow = i<C.MAX_SHOW ? true : false ;
         _addSeriaTo({ config, hm, name, i, isShow: _isShow })
         i++
      })
}

const _addSeriasTo = (
  config,
  json,
  option
) => {
  const { one, measure } = option
  , { dataset=[] } = json
  , pnCountry = (one === C.ALL)
     ? 'rtTitle'
     : void 0
  , { hm, categories } = toHmCategories({
      dataset,
      pnValue: measure,
      pnCountry
  });

  if (hm[C.WORLD] && one !== C.ALL) {
    _addSeriaTo({
       config, hm,
       i: 0, name: C.WORLD, color: C.WORLD_COLOR,
       seriaOption: null, isShow: true
    })
    _addSeriesFromHmTo({ config, hm, fromIndex: 1 });
  } else {
    _addSeriesFromHmTo({ config, hm, fromIndex: 0 });
  }

  const legend = config.zhConfig.legend;
  config.zhConfig.legend = (one === C.ALL)
     ? toAllLegend(legend, hm, measure)
     : toWorldLegend(legend, hm)


  _assign(config.xAxis, { categories })
}

const _crBaseConfig = (
  json,
  option
) =>  {
    const { title, subtitle } = option;
    return Builder()
      .areaConfig()
      .add('chart', C.CHART)
      .addCaption(title, subtitle)
      .add('xAxis', C.X_AXIS)
      .add('yAxis', C.Y_AXIS)
      .addTooltip(Tooltip.categorySimple)
      .add('info', _crInfo(json, option))
      .add('zhConfig', _crZhConfig(option))
      .toConfig();
}

export const crChartId = ({
  value,
  rg=2,
  measure="A"
}) => value + '_' + rg + '_' + measure;

export const toConfig = (
  json,
  option
) => {
  const config = _crBaseConfig(json, option);
  _addSeriasTo(config, json, option)

  return config;
}
