import { getObjectKeys } from '../../utils/isTypeFn';
import pipe from '../../utils/pipe';

import {
  crAreaConfig,
  fAdd,
  fAddCaption,
  fAddTooltip,
  fAddLegend,
  toConfig
} from '../../charts/configBuilderFn';
import { fTooltip } from '../../charts/Chart';
import {
  tooltipCategorySimple,
  tooltipValueDmy
} from '../../charts/Tooltip';

import { getSeriaColorByIndex } from '../../charts/ChartTheme';
import { setSeriaDataTo } from '../../charts/ChartConfigFn';

import {
  valueMoving,
  ymdToUTC
} from '../AdapterFn';
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
  crEmptyHmObject,
  crInfo,
  crZhConfig,
  getHmTradePartners
} from './fnAdapter';

import {
  MAX_SHOW,
  ALL,
  WORLD_ITEM_NAME,
  WORLD_COLOR,
  SPLINE,
  SPLINE_NOT_VISIBLE,
  S_CHART,
  X_AXIS,
  Y_AXIS
} from './conf';

const _assign = Object.assign;

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

    toSeriaNames(hm)
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

const _crHmNames = (
  hmData,
  hmTradePartners
) => {
  return getObjectKeys(hmData)
   .reduce((_hm, tpKey) => {
      _hm[hmTradePartners[tpKey] || tpKey] = hmData[tpKey]
      return _hm;
    }, crEmptyHmObject());
}

const _addSeriasTo = (
  config,
  json,
  option
) => {
  const {
    data
  } = json
  , {
    one,
    measure
  } = option
  , pnCountry = one === ALL
     ? 'reporterCode'
     : 'partnerCode'
  , [
    hm,
    categories
  ] = toHmCategories(
      data.sort(_compareByPeriod),
      pnCountry,
      measure
  )
  , _hmTradePartners = getHmTradePartners(option.tradePartners)
  , _hm = _crHmNames(hm, _hmTradePartners)

  if (_hm[WORLD_ITEM_NAME] && one !== ALL) {
    _addSeriaTo({
       config,
       hm: _hm,
       i: 0,
       name: WORLD_ITEM_NAME,
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
    crAreaConfig(),
    fAdd({
      chart: S_CHART,
      xAxis: X_AXIS,
      yAxis: Y_AXIS
    }),
    fAddCaption(title, subtitle),
    fAddTooltip(tooltipCategorySimple),
    fAdd({
      info: crInfo(json, option),
      zhConfig: crZhConfig(option)
    }),
    fAddLegend([], true),
    toConfig
  );
}

const _toMls = yyyymm => {
  const _str = '' + yyyymm
  , _ym = _str.length === 4
      ? _str
      : _str.slice(0,4) + '-' + _str.slice(4, 6)
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
};

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
