import ChartConfig from '../../charts/ChartConfig';
import Chart from '../../charts/Chart';
import ConfigBuilder from '../../charts/ConfigBuilder';

import QuandlFn from './QuandlFn';

import C from './C';
import crAreaData from './crAreaData';

const {
  valueMoving,
  getColumnNames,
  createZhConfig,
  createDatasetInfo
} = QuandlFn
, _assign = Object.assign;

const _isMfi = names => names[2] === C.HIGH
  && names[3] === C.LOW
  && names[4] === C.CLOSE
  && names[5] === C.VOLUME;

const _isMomAth = names => names[1] === C.OPEN
  && names[4] === C.CLOSE;

const _addSeriesTo = function(config, legendSeries){
  if (!legendSeries) { return; }

  const legend = [];

  if (config.series.length !== 0){
     legend.push({
        name: config.series[0].name,
        index: 0,
        color: C.COLOR_BLUE,
        isVisible : true
    });
  }

  let i=0, max=legendSeries.length;
  for (i; i<max; i++){
    const { data, name, color, symbol, isSecondAxes } = legendSeries[i]
        , seria = ChartConfig.crSeria({
             name : name,
             data : data,
             visible : false,
             color: color,
             marker : Chart.fSeriaMarker({ color, symbol })
          });

     if (!isSecondAxes){
        config.series.push(seria);
        legend.push({
          name : name,
          index : config.series.length - 1,
          color : color,
          isVisible : false
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

const toArea = function(json, option){
   const columnNames = getColumnNames(json)
   , {
     columnName,
     value:chartId,
     isDrawDeltaExtrems, isNotZoomToMinMax,
     dfR,
     title, subtitle
   } = option;

   const {
     seria, minPoint, maxPoint,
     dataExDividend, dataSplitRatio,
     dataVolume, dataVolumeColumn,
     dataATH, dataHighLow,
     legendSeries, zhPoints
   } = crAreaData(json, option);

   let config = ChartConfig.crAreaConfig({ spacingTop: 25 })
   _assign(config.series[0], {
     data: seria,
     name: columnName
   })

   const legend =  _addSeriesTo(config, legendSeries);

   config = ConfigBuilder(config)
     .addCaption(title, subtitle)
     .setMinMax(minPoint, maxPoint, isNotZoomToMinMax)
     .setMinMaxDeltas(minPoint, maxPoint, seria, isDrawDeltaExtrems)
     .add({
       valueMoving: valueMoving(seria, dfR),
       zhConfig: createZhConfig(option),
       info: createDatasetInfo(json)
     })
     .addZhPointsIf(zhPoints, 'zhIsMfi', _isMfi(columnNames))
     .addZhPointsIf(zhPoints, 'zhIsMomAth', _isMomAth(columnNames))
     .addLegend(legend)
     .addDividend(dataExDividend, minPoint, maxPoint)
     .addSplitRatio(dataSplitRatio, minPoint, maxPoint)
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
