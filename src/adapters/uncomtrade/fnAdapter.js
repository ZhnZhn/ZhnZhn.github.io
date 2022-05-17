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

import {
  MAX_SHOW,
  ALL,
  WORLD,
  WORLD_COLOR,
  SPLINE,
  SPLINE_NOT_VISIBLE,
  S_CHART,
  X_AXIS,
  Y_AXIS
} from './conf';

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
           ? {...SPLINE, ..._seriaColor}
           : {...SPLINE_NOT_VISIBLE, ..._seriaColor}
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
         _addSeriaTo({
            config,
            hm,
            name, i,
            isShow: i<MAX_SHOW
          })
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
  , pnCountry = (one === ALL)
     ? 'rtTitle'
     : void 0
  , { hm, categories } = toHmCategories({
      dataset,
      pnValue: measure,
      pnCountry
  });

  if (hm[WORLD] && one !== ALL) {
    _addSeriaTo({
       config, hm,
       i: 0, name: WORLD, color: WORLD_COLOR,
       seriaOption: null, isShow: true
    })
    _addSeriesFromHmTo({ config, hm, fromIndex: 1 });
  } else {
    _addSeriesFromHmTo({ config, hm, fromIndex: 0 });
  }

  const legend = config.zhConfig.legend;
  config.zhConfig.legend = (one === ALL)
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
      .add('chart', S_CHART)
      .addCaption(title, subtitle)
      .add('xAxis', X_AXIS)
      .add('yAxis', Y_AXIS)
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
