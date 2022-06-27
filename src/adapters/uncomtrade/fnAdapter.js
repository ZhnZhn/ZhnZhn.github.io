import {
  ymdToUTC,
  valueMoving
} from '../AdapterFn';

import { getSeriaColorByIndex } from '../../charts/ChartTheme';
import { setSeriaDataTo } from '../../charts/ChartConfigFn';
import Builder from '../../charts/ConfigBuilder';
import { fTooltip } from '../../charts/Chart';
import {
  tooltipCategorySimple,
  tooltipValueDmy
} from '../../charts/Tooltip';

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

export const crChartId = ({
  value,
  rg=2,
  measure,
  tp,
  freq
}) => [value, rg, measure, tp, freq]
  .filter(Boolean)
  .join("_");

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
    isWithoutIndicator: true,
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
    , _color = color || getSeriaColorByIndex(i)
    , _seriaColor = {
         color: _color,
         marker: _crMarker(_color)
      }
    , _seriaOption = (seriaOption !== null)
         ? isShow
           ? {...SPLINE, ..._seriaColor}
           : {...SPLINE_NOT_VISIBLE, ..._seriaColor}
         : null;

    setSeriaDataTo(
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

const _compareByPeriod = (
  a,
  b
) => (a || {}).period - (b || {}).period

const _addSeriasTo = (
  config,
  json,
  option
) => {
  const { one, measure } = option
  , { dataset } = json
  , pnCountry = one === ALL
     ? 'rtTitle'
     : void 0
  , { hm, categories } = toHmCategories({
      dataset: dataset.sort(_compareByPeriod),
      pnValue: measure,
      pnCountry
  });

  if (hm[WORLD] && one !== ALL) {
    _addSeriaTo({
       config,
       hm,
       i: 0,
       name: WORLD,
       color: WORLD_COLOR,
       seriaOption: null,
       isShow: true
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
      .addTooltip(tooltipCategorySimple)
      .add('info', _crInfo(json, option))
      .add('zhConfig', _crZhConfig(option))
      .toConfig();
}

const _toMls = yyyymm => {
  const _str = '' + yyyymm
  , _ym = _str.length === 4
      ? _str
      : _str.substring(0,4) + '-' + _str.substring(4)
  return ymdToUTC(_ym);
}

const _transformToDatetime = config => {
  const { series }  = config
  , { data } = series[0]
  , _data = data.map(p => [_toMls(p.x), p.y]);
  series[0].data = _data
  series[0].type = 'spline'
  config.xAxis.categories = void 0
  config.xAxis.type = 'datetime'
  config.tooltip = fTooltip(tooltipValueDmy)
  config.valueMoving = valueMoving(_data)
  config.zhConfig.isWithoutIndicator = false
}

export const toConfig = (
  json,
  option
) => {
  const config = _crBaseConfig(json, option);
  _addSeriasTo(config, json, option)
  if ((config.series || []).length === 1) {
    _transformToDatetime(config)
  }
  return config;
}
