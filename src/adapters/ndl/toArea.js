import { crSeriaConfig } from '../../charts/ChartConfigFn';
import { fSeriaMarker } from '../../charts/Chart';

import pipe from '../../utils/pipe';
import {
  crAreaConfig,
  crSplineConfig,
  fAddCaption,
  fAddMinMax,
  fAdd,
  fAddLegend,
  fAddZhPoints,
  toConfig
} from '../../charts/configBuilderFn';
import {
  fAddDividend,
  fAddSplitRatio,
  fAddMiniVolume,
  fAddMiniATH,
  fAddMiniHL
} from '../../charts/stockBuilderFn';

import {
  valueMoving,
  getColumnNames,
  crZhConfig,
  crDatasetInfo
} from './NdlFn';
import {
  OPEN,
  CLOSE,
  LOW,
  HIGH,
  VOLUME,
  COLOR_BLUE
} from './C';
import crAreaData from './crAreaData';

const _isArr = Array.isArray
const _assign = Object.assign;
const _isMfi = names => names[2] === HIGH
  && names[3] === LOW
  && names[4] === CLOSE
  && names[5] === VOLUME;

const _isMomAth = names => names[1] === OPEN
  && names[4] === CLOSE;

const _crLegendItem = (
  name,
  index,
  color,
  isVisible
) => ({
  name,
  index,
  color,
  isVisible
});

const _addSeriesTo = (
  config,
  legendSeries,
  seriaColor
) => {
  if (!legendSeries) {
    return;
  }

  const legend = [];

  if (config.series.length !== 0){
     legend.push(_crLegendItem(
       config.series[0].name,
       0,
       seriaColor || COLOR_BLUE,
       true
     ));
  }

  let i=0, max=legendSeries.length;
  for (i; i<max; i++){
    const {
      data,
      name,
      color,
      symbol,
      isSecondAxes
    } = legendSeries[i]
    , seria = crSeriaConfig({
       name,
       data,
       color,
       visible: false,
       marker: fSeriaMarker(symbol)
    });

    if (!isSecondAxes){
      config.series.push(seria);
      legend.push(_crLegendItem(
        name,
        config.series.length - 1,
        color,
        false
      ));
    }
  }

  return legend;
};

const toArea = (json, option) => {
   const columnNames = getColumnNames(json)
   , {
     columnName,
     value:chartId,
     isDrawDeltaExtrems,
     isNotZoomToMinMax,
     dfR,
     title,
     subtitle
   } = option
   , {
     seria,
     minY,
     maxY,
     dataExDividend,
     dataSplitRatio,
     dataVolume,
     dataVolumeColumn,
     dataATH,
     dataHighLow,
     legendSeries,
     zhPoints
   } = crAreaData(json, option);

   const config = _isArr(option.items)
     ? crSplineConfig(seria, option)
     : crAreaConfig();

   _assign(config.series[0], {
     data: seria,
     name: columnName
   })


   const legend =  _addSeriesTo(
     config,
     legendSeries,
     option.seriaColor
   );

   return {
     config: pipe(
        config,
        fAddCaption(title, subtitle),
        fAddMinMax(seria, {
          minY,
          maxY,
          isNotZoomToMinMax,
          isDrawDeltaExtrems
        }),
        fAdd({
          valueMoving: valueMoving(seria, dfR),
          zhConfig: crZhConfig(option),
          info: crDatasetInfo(json)
        }),
        fAddLegend(legend),
        fAddDividend(dataExDividend, minY, maxY),
        fAddSplitRatio(dataSplitRatio, minY, maxY),
        fAddMiniVolume({
          id: chartId,
          data: dataVolume,
          dColumn: dataVolumeColumn          
        }),
        fAddMiniATH({ id: chartId, data: dataATH }),
        fAddMiniHL({ id: chartId, data: dataHighLow }),
        ...[
          _isMfi(columnNames) && fAddZhPoints(zhPoints),
          _isMomAth(columnNames) && fAddZhPoints(zhPoints, 'zhIsMomAth')
        ].filter(Boolean),
        toConfig
     )
   };
};

export default toArea
