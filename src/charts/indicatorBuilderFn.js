import { domSanitize } from '../utils/domSanitize';
import pipe from '../utils/pipe';

import {
  crAreaConfig,
  fTooltip
} from './Chart';
import { tooltipValueDmy } from './Tooltip';
import {
  COLOR_CHART_TITLE,
  COLOR_METRIC_TITLE,
  COLOR_LEGEND_ITEM_HIDDEN,
  COLOR_LEGEND_ITEM_HOVER
} from '../constants/Color';

const DF_LEGEND_VOLUME_X = 84;
const _assign = Object.assign;

const _crColumnSeria = option => _assign({
   type: "column",
   visible: true,
   tooltip: fTooltip(tooltipValueDmy)
 }, option);

export const crIndicatorTitle = (text) => ({
  text: domSanitize(text),
  style: {
    color: COLOR_METRIC_TITLE,
    fontSize: '16px',
    fontWeight: 'bold'
  },
  floating: true,
  align: 'left',
  verticalAlign: 'top',
  x: 8,
  y: 15
})

const _crLegendVolumeX = (
  titleOrX
) => typeof titleOrX === 'number'
  ? titleOrX
  : titleOrX.length*10 + 8;
export const crLegendVolume = (
  titleOrX=DF_LEGEND_VOLUME_X
) => ({
  enabled: true,
  align: 'left',
  verticalAlign: 'top',
  x: _crLegendVolumeX(titleOrX),
  y: -8,
  floating: true,

  symbolHeight: 12,
  symbolWidth: 12,
  symbolRadius: 6,

  itemStyle: {
   color: COLOR_CHART_TITLE,
   fontSize: '16px'
  },
  itemHoverStyle: {
   color: COLOR_LEGEND_ITEM_HOVER
  },
  itemHiddenStyle: {
   color: COLOR_LEGEND_ITEM_HIDDEN
  }
})

export const crIndicatorLineSeria = (
  name,
  color,
  data
) => ({
  name,
  color,
  data,
  zhValueText: name,
  type: "line",
  lineWidth: 2,
  visible: false,
  marker: {
    enabled: false
  }
});

export const fAssign = (
  option
) => config => _assign(config, option)

export const fAssignTo = (
  propName,
  option
) => config => {
  const _to = config[propName];
  if (!_to) {
    config[propName] = option
  } else {
    _assign(_to, option)
  }
  return config;
}

export const fAssignToSeries = (
  index,
  option
) => config => {
  config.series[index] = _assign(
    {},
    config.series[index],
    option
  )
  return config;
}

export const fAddColumnSeria = (
  option
) => config => {
  const { series } = config
  , _seria = _crColumnSeria(option);
  if (!series[0].data) {
    _assign(series[0], _seria)
  } else {
    series.push(_seria)
  }
  return config;
}

export const crIndicatorConfig = ({
  title,
  chartOption
}={}) => pipe(
  crAreaConfig({ title }),
  fAssignTo('navigation', {
     buttonOptions: {
        y: 20
     },
     menuStyle: {
       position: 'relative',
       top: '-24px',
       left: '28px'
     }
  }),
  fAssignTo('chart', {
    height: 160,
    spacingTop: 8,
    spacingBottom: 10,
    ...chartOption
  }),
  fAssignTo('xAxis', {
    labels: {
      y: 16
    }
  }),
  fAssignTo('yAxis', {
    startOnTick: true,
    endOnTick: true,
    tickPixelInterval: 60,
    offset: 4,
    lineWidth: 0,
    labels: {
      x: 8,
      y: 5
    }
  })
)
