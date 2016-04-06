import _ from 'lodash';

import ChartConfigs from '../constants/ChartConfigs';

const QuandlAdapter = {};

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

   let config = Object.assign({}, ChartConfigs.baseAreaConfig);

   seria = _.sortBy(seria, '0');

   config.series[0].data = seria;

   config.yAxis.plotLines[0].value = maxPoint;
   config.yAxis.plotLines[0].label.text = maxPoint;
   config.yAxis.plotLines[1].value = minPoint;
   config.yAxis.plotLines[1].label.text = minPoint;

   config.info = {
     name : json.dataset.name,
     description : json.dataset.description,
     newest_available_date : json.dataset.newest_available_date,
     oldest_available_date : json.dataset.oldest_available_date,
     frequency : json.dataset.frequency
   };

   return config;
};

export default QuandlAdapter;
