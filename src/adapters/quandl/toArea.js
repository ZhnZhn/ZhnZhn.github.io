import {
  crSeriaConfig,
  crAreaConfig
} from '../../charts/ChartConfigFn';
import Chart from '../../charts/Chart';
import ConfigBuilder from '../../charts/ConfigBuilder';
import {
  valueMoving,
  getColumnNames,
  crZhConfig,
  crDatasetInfo
} from './QuandlFn';

import {
  OPEN,
  CLOSE,
  LOW,
  HIGH,
  VOLUME,
  COLOR_BLUE
} from './C';
import crAreaData from './crAreaData';

const _assign = Object.assign;
const _isMfi = names => names[2] === HIGH
  && names[3] === LOW
  && names[4] === CLOSE
  && names[5] === VOLUME;

const _isMomAth = names => names[1] === OPEN
  && names[4] === CLOSE;

const _addSeriesTo = (
  config,
  legendSeries
) => {
  if (!legendSeries) { return; }

  const legend = [];

  if (config.series.length !== 0){
     legend.push({
        name: config.series[0].name,
        index: 0,
        color: COLOR_BLUE,
        isVisible : true
    });
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
       marker: Chart.fSeriaMarker({ color, symbol })
    });

    if (!isSecondAxes){
      config.series.push(seria);
      legend.push({
        name,
        color,
        index: config.series.length - 1,
        isVisible: false
      });
    } /*else {
       legend.push({
          name : name,
          color : color,
          isVisible : false,
          isSecondAxes : true,
          seria : seria
        });
     }*/
  }

  return legend;
};

const toArea = (json, option) => {
   const columnNames = getColumnNames(json)
   , {
     columnName,
     value:chartId,
     isDrawDeltaExtrems, isNotZoomToMinMax,
     dfR,
     title, subtitle
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

   let config = crAreaConfig({ spacingTop: 25 })
   _assign(config.series[0], {
     data: seria,
     name: columnName
   })

   const legend =  _addSeriesTo(config, legendSeries);

   config = ConfigBuilder(config)
     .addCaption(title, subtitle)
     .addMinMax(seria, {
        minY,
        maxY,
        isNotZoomToMinMax,
        isDrawDeltaExtrems
      })
     .add({
       valueMoving: valueMoving(seria, dfR),
       zhConfig: crZhConfig(option),
       info: crDatasetInfo(json)
     })
     .addZhPointsIf(zhPoints, 'zhIsMfi', _isMfi(columnNames))
     .addZhPointsIf(zhPoints, 'zhIsMomAth', _isMomAth(columnNames))
     .addLegend(legend)
     .addDividend(dataExDividend, minY, maxY)
     .addSplitRatio(dataSplitRatio, minY, maxY)
     .addMiniVolume({
       id: chartId,
       dColumn: dataVolumeColumn,
       dVolume: dataVolume
     })
     .addMiniATH({ id: chartId, data: dataATH })
     .addMiniHL({ id: chartId, data: dataHighLow })
     .toConfig();

   return { config };
};

export default toArea
