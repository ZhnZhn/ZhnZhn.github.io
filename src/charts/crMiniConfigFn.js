import {
  median,
  mean
} from '../math/seriaFn';

import pipe from '../utils/pipe';
import {
  crIndicatorConfig,
  crIndicatorTitle,
  crLegendVolume,
  crIndicatorLineSeria,
  fAssign,
  fAssignTo,
  fAssignToSeries,
  fAddColumnSeria
} from './indicatorBuilderFn';

import {
  tooltipValueDmy,
  tooltipValueTdmyIf,
  tooltipAth
} from './Tooltip';
import {
  fTooltip,
  fEventsMouseOver
} from './Chart';
import handleMouseOver from './handleMouseOver';

const COLOR_MFI = "#90ed7d"
, COLOR_MOM = '#f7a35c'
, COLOR_CLOSE_OPEN = 'rgba(144, 237, 125, 0.75)'
, COLOR_HIGH_LOW = '#2d7474'
, COLOR_MEDIAN = 'darkcyan'
, COLOR_MEAN = '#f7a35c'
, CROSS_LABEL = {
  xDeltaCrossLabel: 4,
  yDeltaCrossLabel: -10
};

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

const _fCrSplineMiniConfig = (
  name,
  color
) => ({
  id,
  title,
  data
}) => ({
  btTitle: name,
  config: pipe(
    crIndicatorConfig({
      title: crIndicatorTitle(title || name),
      chartOption: CROSS_LABEL
    }),
    fAssignToSeries(0, {
      name,
      color,
      data,
      type: "spline",
      zhValueText: id,
      point: fEventsMouseOver(handleMouseOver)
    })
  )
});

export const crMiniMfiConfig = _fCrSplineMiniConfig("MFI", COLOR_MFI)

const _fCrSplineColumnMiniConfig = (
  name
) => ({
  btTitle=name,
  title,
  data,
  dColumn=[],
  tooltipColumn
}) => {
  const _title = title || btTitle
  , _hasColumn = dColumn.length !== 0
  , config = pipe(
    crIndicatorConfig({
      chartOption: CROSS_LABEL
    }),
    fAssign({
      title: crIndicatorTitle(_title),
      legend: crLegendVolume(_title)
    }),
    fAssignToSeries(0, {
      data,
      zhValueText: name,
      visible: !_hasColumn,
      name: "Spline",
      point: fEventsMouseOver(handleMouseOver)
    })
  )
  , { series } = config;

  if (_hasColumn) {
    series.push({
      zhValueText: name,
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
      tooltip: tooltipColumn || fTooltip(tooltipValueTdmyIf)
    });
    series.push(crIndicatorLineSeria(
      'Median',
      COLOR_MEDIAN,
      median(data)
    ))
    series.push(crIndicatorLineSeria(
      'Mean',
      COLOR_MEAN,
      mean(data)
    ))
  }

  return {
    btTitle,
    config
  };
};

export const crMiniVolumeConfig = _fCrSplineColumnMiniConfig("Volume")
export const crMiniNumberOfTradesConfig = _fCrSplineColumnMiniConfig("N of Trades")

export const crMiniATHConfig = ({
   btTitle="ATH",
   data
 }) => {
  const config = pipe(
    crIndicatorConfig({
      title: crIndicatorTitle('ATH')
    }),
    fAddColumnSeria({
       name: "ATH",
       borderWidth: 0,
       pointPlacement: 'on',
       minPointLength: 4,
       groupPadding: 0.1,
       data: data,
       tooltip: fTooltip(tooltipAth)
    })
  );
  return {
    btTitle,
    config
  };
}

export const crMiniMomAthConfig = ({
  dataMom,
  dataAth,
  dataSum
}) => pipe(
  crIndicatorConfig(),
  fAssign({
    title: crIndicatorTitle(),
    legend: crLegendVolume(),
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
  }),
  fAssignTo('yAxis', {
    startOnTick: false,
    endOnTick: false,
    tickPixelInterval: 20
  }),
  fAddColumnSeria({
    zhValueText: "MOM(1)",
    name: "MOM(1)",
    color: COLOR_MOM,
    pointPadding: 0.3,
    data: dataMom
  }),
  fAddColumnSeria({
    name: "ATH",
    data: dataAth
  }),
  fAddColumnSeria({
    name: "Close-Open",
    color: COLOR_CLOSE_OPEN,
    visible: false,
    data: dataSum
  })
)

export const crMiniHLConfig = ({
   btTitle="Daily HighLow",
   data
 }) => {
  const [
    highData,
    lowData
  ] = _crHighLowData(data)
  , config = pipe(
    crIndicatorConfig({
      title: crIndicatorTitle('HighLow')
    }),
    fAssignToSeries(0, {
      name: "H",
      type: "area",
      visible: true,
      color: COLOR_HIGH_LOW,
      fillColor: COLOR_HIGH_LOW,
      data: highData,
    }),
    fAssignToSeries(1, {
      name: "L",
      type: "area",
      visible: true,
      color: COLOR_HIGH_LOW,
      fillColor: COLOR_HIGH_LOW,
      data: lowData,
      tooltip: fTooltip(tooltipValueTdmyIf)
    })
  );
  return {
    btTitle,
    config
  };
}
