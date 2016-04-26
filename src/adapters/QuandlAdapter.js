
import _ from 'lodash';
import Big from 'big.js';

import {Direction} from '../constants/Type';
import ChartConfigs from '../constants/ChartConfigs';
import {
        markerExDivident,
        markerExDividentUp,
        tooltipExDivident,
        markerSplitRatio,
        tooltipSplitRatio
      } from '../constants/ChartConfigs';

const QuandlAdapter = {};

const fnCheckWithPrev = function(arr, checkedDate, predicate){
   const length = arr.length;
   if (length === 0){
     return true;
   }
   const prevDate = arr[length-1].x;
   if (Math.abs((checkedDate.valueOf()-prevDate.valueOf())/(24*60*60*1000)) < predicate){
     return false;
   } else {
     return true;
   }
}


const addExDividend = function(json, config, yPointIndex){
  let dataExDividend = [];
  json.dataset.data.forEach((point) => {
     if (point[6] !== 0){
       const arrDate = point[0].split('-')
           , x = Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2])
           , exValue = point[6]
           , price = point[yPointIndex];

       if (fnCheckWithPrev(dataExDividend, x , 14)) {
          dataExDividend.push(Object.assign({}, markerExDivident, {x, exValue, price}));
       } else {
          const marker = Object.assign(_.cloneDeep(markerExDivident), {x, exValue, price});
          marker.dataLabels.y = 0;
          dataExDividend.push(marker);
      }
     }
  });

  if (dataExDividend.length>0){
    dataExDividend = _.sortBy(dataExDividend, 'x');
    config.series.push({
       type: 'scatter',
       color: 'green',
       tooltip : tooltipExDivident,
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
       tooltip : tooltipSplitRatio,       
       data : dataSplitRatio
    });
  }
}

const fnGetXAxesConfig = function(){
  return {
    opposite : true,
    tickLength : 0,
    tickPosition : 'inside',
    labels : {
      y : -5
    }
  }
}

const fnGetYAxesConfig = function(maxPoint, minPoint){
  const plotLines = [
   {
      value : maxPoint,
      label : {
        text : maxPoint
      }
   },
   {
      value : minPoint,
      label : {
        text : minPoint
      }
   }
 ];

 plotLines[0].value = maxPoint;
 plotLines[0].label.text = maxPoint;
 plotLines[1].value = minPoint;
 plotLines[1].label.text = minPoint;

 return {
    opposite : true,
    plotLines
  }
}

const fnGetDatasetInfo = function(json){
  return  {
     name : json.dataset.name,
     description : json.dataset.description,
     newest_available_date : json.dataset.newest_available_date,
     oldest_available_date : json.dataset.oldest_available_date,
     frequency : json.dataset.frequency
  };
}

const fnGetValueMoving = function(seria){
  const len = seria.length
      , nowValue = seria[len-1][1]
      , bWasValue = Big(seria[len-2][1])
      , bDelta = bWasValue.minus(nowValue)
      , bPercent = bDelta.times(100).div(bWasValue.toString()).abs().toFixed(2);

  let direction;
  if (bDelta.gt(0.0)){
    direction = Direction.DOWN;
  } else if (!bDelta.gte(0.0)){
    direction = Direction.UP;
  } else {
    direction = Direction.EQUAL;
  }


  return {
    value : nowValue,
    delta : bDelta.abs().toString(),
    percent : bPercent.toString() + '%',
    direction
  };
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

   config.valueMoving = fnGetValueMoving(seria);

   //config.yAxis = fnGetYAxesConfig(maxPoint, minPoint);

   config.yAxis.plotLines[0].value = maxPoint;
   config.yAxis.plotLines[0].label.text = maxPoint;
   config.yAxis.plotLines[1].value = minPoint;
   config.yAxis.plotLines[1].label.text = minPoint;

   config.yAxis.opposite = true;

   config.xAxis = Object.assign({}, config.xAxis, fnGetXAxesConfig());
   config.info = fnGetDatasetInfo(json);

   if (json.dataset.column_names[6] === "Ex-Dividend"){
      addExDividend(json, config, yPointIndex);
   }
   if (json.dataset.column_names[7] === "Split Ratio"){
      addSplitRatio(json, config, yPointIndex);
   }

   return config;
};

export default QuandlAdapter;
