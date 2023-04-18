import pipe from '../../utils/pipe';
import {
  crAreaDfConfig,
  fAdd,
  fAddCaption,
  fAddTooltip,
  toConfig
} from '../../charts/configBuilderFn';
import { fTooltip } from '../../charts/Chart';
import {
  tooltipCategorySimple,
  tooltipValueDmy
} from '../../charts/Tooltip';

import { getSeriaColorByIndex } from '../../charts/ChartTheme';
import { setSeriaDataTo } from '../../charts/ChartConfigFn';

import { compareByValue } from '../compareByFn';
import { legendItem } from '../legendFn'

import {
  toSeriaNames,
  toHmCategories
} from './fnHm';
import {
  toWorldLegend,
  toAllLegend
} from './fnLegend';

import {
  ymdToUTC,
  valueMoving,
  getHmTradePartners,
  crInfo,
  crZhConfig
} from './fnAdapter';

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

const _assign = Object.assign

const _crMarker = color => ({
  fillColor: color,
  lineColor: color,
  lineWidth: 1,
  radius: 4,
  symbol: 'circle'
})

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
      .forEach((item, itemIndex) => {
         if (itemIndex >= i) {
           const name = item.name;
           _addSeriaTo({
              config,
              hm,
              name, i,
              isShow: i<MAX_SHOW
            })
            i++
        }
      })
}

const _compareByPeriod = (
  a,
  b
) => (a || {}).period - (b || {}).period

const _getObjectKeys = Object.keys;
const _crHmObject = () => Object.create(null)

const _crHmNames = (
  hmData,
  hmTradePartners
) => {
  return _getObjectKeys(hmData)
   .reduce((_hm, tpKey) => {
      _hm[hmTradePartners[tpKey] || tpKey] = hmData[tpKey]
      return _hm;
    }, _crHmObject());
}

const _addSeriasTo = (
  config,
  json,
  option
) => {
  const {
    dataset
  } = json
  , {
    one,
    measure
  } = option
  , pnCountry = one === ALL
     ? 'reporterCode'
     : 'partnerCode'
  , {
    hm,
    categories
  } = toHmCategories({
      dataset: dataset.sort(_compareByPeriod),
      pnValue: measure,
      pnCountry
  })
  , _hmTradePartners = getHmTradePartners(option.tradePartners)
  , _hm = _crHmNames(hm, _hmTradePartners)

  if (_hm[WORLD] && one !== ALL) {
    _addSeriaTo({
       config,
       hm: _hm,
       i: 0,
       name: WORLD,
       color: WORLD_COLOR,
       seriaOption: null,
       isShow: true
    })
    _addSeriesFromHmTo({ config, hm: _hm, fromIndex: 1 });
  } else {
    _addSeriesFromHmTo({ config, hm: _hm, fromIndex: 0 });
  }

  const { legend } = config.zhConfig;
  config.zhConfig.legend = (one === ALL)
     ? toAllLegend(legend, _hm, measure)
     : toWorldLegend(legend, _hm)

  _assign(config.xAxis, { categories })
}

const _crSeriesConfig = (
  json,
  option
) => {
  const { title, subtitle } = option;
  return pipe(
    crAreaDfConfig(),
    fAdd({
      chart: S_CHART,
      xAxis: X_AXIS,
      yAxis: Y_AXIS
    }),
    fAddCaption(title, subtitle),
    fAddTooltip(tooltipCategorySimple),
    fAdd({
      info: crInfo(json, option),
      zhConfig: crZhConfig(option, {isLegend: true})
    }),
    toConfig
  );
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
  , _data = (data || []).map(p => [_toMls(p.c), p.y]);
  series[0].data = _data
  series[0].type = 'spline'
  config.xAxis.categories = void 0
  config.xAxis.type = 'datetime'
  config.tooltip = fTooltip(tooltipValueDmy)
  config.valueMoving = valueMoving(_data)
  config.zhConfig.isWithoutIndicator = false
}


const toSeriesConfig = (
  json,
  option
) => {
  const config = _crSeriesConfig(json, option);
  _addSeriasTo(config, json, option)
  if ((config.series || []).length === 1) {
    _transformToDatetime(config)
  }
  return config;
}

export default toSeriesConfig
