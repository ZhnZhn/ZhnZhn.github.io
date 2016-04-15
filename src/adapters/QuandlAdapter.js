
import _ from 'lodash';

import ChartConfigs from '../constants/ChartConfigs';
import {markerExDivident, markerSplitRatio} from '../constants/ChartConfigs';

const QuandlAdapter = {};

const addExDividend = function(json, config, yPointIndex){
  let dataExDividend = [];
  json.dataset.data.forEach((point) => {
     if (point[6] !== 0){
       let arrDate = point[0].split('-');
       let x = Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]);
       let exValue = point[6];
       let price = point[yPointIndex];
       dataExDividend.push(Object.assign({}, markerExDivident, {x, exValue, price}));
     }
  });

  if (dataExDividend.length>0){
    dataExDividend = _.sortBy(dataExDividend, 'x');
    config.series.push({
       type: 'scatter',
       color: 'green',
       tooltip : {
         headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
         pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Ex-Dividend:</span><b>{point.exValue}</b><br/>'+
                      '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Stock Price:</span><b>{point.price}</b>',
       },
       data : dataExDividend
    });
  }
}

const addSplitRatio = function(json, config, yPointIndex){
  let dataSplitRatio = [];
  json.dataset.data.forEach((point) => {
     if (point[7] !== 1){
       let arrDate = point[0].split('-');
       let x = Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]);
       let splitRatio = point[7];
       let price = point[yPointIndex];
       dataSplitRatio.push(Object.assign({}, markerSplitRatio, {x, splitRatio, price}));
     }
  });

  if (dataSplitRatio.length>0){
    dataSplitRatio = _.sortBy(dataSplitRatio, 'x');
    config.series.push({
       type: 'scatter',
       color: '#ED5813',
       tooltip : {
         style: {
         },
         headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
         pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Split Ratio:</span><b>{point.splitRatio}</b><br/>'+
                      '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Stock Price:</span><b>{point.price}</b>',
       },
       data : dataSplitRatio
    });
  }
}


QuandlAdapter.toConfig = function(json, yPointIndex){
  let minPoint = Number.POSITIVE_INFINITY;
  let maxPoint = Number.NEGATIVE_INFINITY;
  let seria = json.dataset.data.map((point, index)=> {
    let arrDate = point[0].split('-');

    if (point[yPointIndex]>=maxPoint){
      maxPoint = point[yPointIndex];
    }
    if (point[yPointIndex]<=minPoint){
      minPoint = point[yPointIndex];
    }

    return [Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]), point[yPointIndex]];
  });

   const config = _.cloneDeep(ChartConfigs.baseAreaConfig);

   seria = _.sortBy(seria, '0');

   config.series[0].data = seria;

   config.yAxis.plotLines[0].value = maxPoint;
   config.yAxis.plotLines[0].label.text = maxPoint;
   config.yAxis.plotLines[1].value = minPoint;
   config.yAxis.plotLines[1].label.text = minPoint;

   config.yAxis.opposite = true;

   config.xAxis.opposite = true;
   config.xAxis.tickLength = 0;
   config.xAxis.tickPosition = 'inside';
   config.xAxis.labels.y = -5;

   config.info = {
     name : json.dataset.name,
     description : json.dataset.description,
     newest_available_date : json.dataset.newest_available_date,
     oldest_available_date : json.dataset.oldest_available_date,
     frequency : json.dataset.frequency
   };


   if (json.dataset.column_names[6] === "Ex-Dividend"){
      addExDividend(json, config, yPointIndex);
   }
   if (json.dataset.column_names[7] === "Split Ratio"){
      addSplitRatio(json, config, yPointIndex);
   }

   return config;
};

export default QuandlAdapter;
