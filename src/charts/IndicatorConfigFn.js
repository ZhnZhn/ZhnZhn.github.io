import DOMPurify from 'dompurify';

import {
  tooltipValueDmy,
  tooltipValueTdmyIf,
  tooltipVolumeTdmyIf,
  tooltipAth
} from './Tooltip';
import {
  crAreaConfig,
  fTooltip,
  fEventsMouseOver
} from './Chart';
import { median, mean } from '../math/seriaFn';
import handleMouseOver from './handleMouseOver';
import {
  COLOR_CHART_TITLE,
  COLOR_METRIC_TITLE,
  COLOR_LEGEND_ITEM_HIDDEN,
  COLOR_LEGEND_ITEM_HOVER
} from '../constants/Color';

const COLOR_MFI = "#90ed7d"
, COLOR_MOM = '#f7a35c'
, COLOR_CLOSE_OPEN = 'rgba(144, 237, 125, 0.75)'
, COLOR_HIGH_LOW = '#2d7474'
, COLOR_MEDIAN = 'darkcyan'
, COLOR_MEAN = '#f7a35c'
, DF_LEGEND_VOLUME_X = 84
, CROSS_LABEL = {
  xDeltaCrossLabel: 4,
  yDeltaCrossLabel: -10
};

const _assign = Object.assign;

const _crHighLowData = data => {
  const highData = []
  , lowData = [];
  let i;
  for(i = 0;i<data.length;i++){
    const { x, high, low } = data[i]
    highData.push([x, high])
    lowData.push([x, low])
  }
  return [highData, lowData];
};

const _crTitle = (text) => ({
  text: DOMPurify.sanitize(text || ''),
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

const _crLegendVolume = (
  titleOrX=DF_LEGEND_VOLUME_X
) => {
  const _x = typeof titleOrX === 'number'
     ? titleOrX
     : titleOrX.length*10 + 8;
  return {
   enabled: true,
   align: 'left',
   verticalAlign: 'top',
   x: _x,
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
  }
}

const _crLineSeria = (
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

const _crColumnSeria = option => _assign({
   type: "column",
   visible: true,
   tooltip: fTooltip(tooltipValueDmy)
 }, option);

function _Builder(config) {
  if (!(this instanceof _Builder)) {
    return new _Builder(config);
  }
  this.config = config
}
_Builder.prototype = _assign(_Builder.prototype, {
  assign(option){
    _assign(this.config, option)
    return this;
  },
  assignTo(propName, option){
    const _to = this.config[propName];
    if (!_to) {
      this.config[propName] = option
    } else {
      _assign(_to, option)
    }
    return this;
  },
  assignToSeries(index, option){
    this.config.series[index] = _assign({}, this.config.series[index], option)
    return this;
  },
  addColumnSeria(option){
    const { config } = this
    , { series } = config
    , _seria = _crColumnSeria(option);
    if (!series[0].data) {
      _assign(series[0], _seria)
    } else {
      series.push(_seria)
    }
    return this;
  },
  toConfig(){
    return this.config;
  }
});

const _crConfig = ({
  title,
  chartOption
}={}) => _Builder(crAreaConfig({ title }))
  .assignTo('navigation', {
     buttonOptions: {
        y: 20
     },
     menuStyle: {
       position: 'relative',
       top: '-24px',
       left: '28px'
     }
  })
  .assignTo('chart', {
    height: 160,
    spacingTop: 8,
    spacingBottom: 10,
    ...chartOption
  })
  .assignTo('yAxis', {
    startOnTick: true,
    endOnTick: true,
    tickPixelInterval: 60,
    offset: 4,
    lineWidth: 0,
    tickLength: 0,
    labels: {
      x: 8,
      y: 5
    }
  })
  .toConfig();


export const crMfiConfig = (
  id,
  title,
  data
) => _Builder(_crConfig({
    title: _crTitle(title),
    chartOption: CROSS_LABEL
  }))
  .assignToSeries(0, {
    name: "MFI",
    type: "spline",
    color: COLOR_MFI,
    zhValueText: id,
    data: data,
    point: fEventsMouseOver(handleMouseOver)
  })
  .toConfig();


export const crMiniVolumeConfig = ({
  btTitle='Volume',
  title,
  dColumn=[],
  dVolume,
  tooltipColumn
}) => {
  const _title = title || btTitle
  , _hasColumn = dColumn.length !== 0
  , config = _Builder(_crConfig({
       chartOption: CROSS_LABEL
     }))
     .assign({
       title: _crTitle(_title),
       legend: _crLegendVolume(_title)
     })
     .assignToSeries(0, {
       zhValueText: "Volume",
       data: dVolume,
       visible: !_hasColumn,
       name: "Spline",
       point: fEventsMouseOver(handleMouseOver)
     })
     .toConfig()
  , { series } = config;

  if (_hasColumn) {
    series.push({
      zhValueText: "Volume",
      turboThreshold: 20000,
      type: "column",
      name: "Column",
      data: dColumn,
      borderWidth: 0,
      pointPlacement: 'on',
      groupPadding: 0.1,
      states: {
        hover: {
          enabled: true,
          brightness: 0.07
        }
      },
      tooltip: tooltipColumn || fTooltip(tooltipVolumeTdmyIf)
    });
    series.push(_crLineSeria(
      'Median', COLOR_MEDIAN, median(dVolume)
    ))
    series.push(_crLineSeria(
      'Mean', COLOR_MEAN, mean(dVolume)
    ))
  }

  return {
    btTitle,
    config
  };
}

export const crMiniATHConfig = ({
   btTitle="ATH",
   data
 }) => {
  const config = _Builder(_crConfig({
      title: _crTitle('ATH')
    }))
    .addColumnSeria({
       name: "ATH",
       borderWidth: 0,
       pointPlacement: 'on',
       minPointLength: 4,
       groupPadding: 0.1,
       data: data,
       tooltip: fTooltip(tooltipAth)
    })
    .toConfig();
  return {
    btTitle,
    config
  };
}

export const crMomAthConfig = ({
  dataMom,
  dataAth,
  dataSum
}) => _Builder(_crConfig())
  .assign({
    title: _crTitle(),
    legend: _crLegendVolume(),
    plotOptions: {
      column : {
        grouping: false,
        shadow: false,
        borderWidth: 0,
        pointPlacement: 'on',
        pointPadding: 0,
        groupPadding: 0,
        turboThreshold: 20000,
        tooltip: fTooltip(tooltipValueDmy)
      }
    }
  })
  .assignTo('yAxis', {
    startOnTick: false,
    endOnTick: false,
    tickPixelInterval: 20
  })
  .addColumnSeria({
    zhValueText: "MOM(1)",
    name: "MOM(1)",
    color: COLOR_MOM,
    pointPadding: 0.3,
    data: dataMom
  })
  .addColumnSeria({
    name: "ATH",
    data: dataAth
  })
  .addColumnSeria({
    name: "Close-Open",
    color: COLOR_CLOSE_OPEN,
    visible: false,
    data: dataSum
  })
  .toConfig();

export const crMiniHLConfig = ({
   btTitle="Daily HighLow",
   data
 }) => {
  const [highData, lowData] = _crHighLowData(data)
  , config = _Builder(_crConfig({
      title: _crTitle('HighLow')
    }))
    .assignToSeries(0, {
      name: "H",
      type: "area",
      visible: true,
      color: COLOR_HIGH_LOW,
      fillColor: COLOR_HIGH_LOW,
      data: highData,
    })
    .assignToSeries(1, {
      name: "L",
      type: "area",
      visible: true,
      color: COLOR_HIGH_LOW,
      fillColor: COLOR_HIGH_LOW,
      data: lowData,
      tooltip: fTooltip(tooltipValueTdmyIf)
    })
    .toConfig();

  return {
    btTitle,
    config
  };
}
