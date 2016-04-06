
import React from 'react';

import DialogType3 from '../../components/dialogs/DialogType3';
import ChartContainer2 from '../../components/ChartContainer2';

import DataQE from '../../constants/DataQE';
import DataQG from '../../constants/DataQG';
import DataQY from '../../constants/DataQY';

import ChartActions from '../actions/ChartActions';
import DateUtils from '../../utils/DateUtils';

const onLoadChart = ChartActions.loadStock,
      onShowChart = ChartActions.showChart,
      initFromDate = DateUtils.getFromDate(2),
      initToDate = DateUtils.getToDate(),
      onTestDate = DateUtils.isValidDate;

const noopArr = function(){
  return [];
}

const createDialogComp = function (conf){
   const dialogType = conf.type;
   const props = conf.dialogProps ? conf.dialogProps : {};
   const fnOption = conf.fnOption ? conf.fnOption : noopArr;
   const Comp = conf.dialogComp ? conf.dialogComp : DialogType3;

   return  React.createElement(Comp, {
               key : dialogType,
               caption : conf.dialogCaption,
               optionStocks : fnOption(),
               onLoad  : onLoadChart.bind(null, dialogType),
               onShow  : onShowChart.bind(null, dialogType),
               initFromDate, initToDate, onTestDate,
               ...props
  });
}

const onCloseItem = ChartActions.closeChart;
const createChartContainerComp = function(conf){
  const Comp = conf.chartContainerComp ? conf.chartContainerComp : ChartContainer2;
  return React.createElement(Comp, {
            key : conf.type,
            caption : conf.chartContainerCaption,
            chartType : conf.type,
            onCloseItem
  });
}


const hmDialogData = {
  QE : DataQE,
  QG : DataQG,
  QY : DataQY
}

const getDataConf = function(dialogType){
  const dataId = dialogType.split('_')[0];
  return hmDialogData[dataId][dialogType];
}

const Factory = {};
Factory.createDialog = function(dialogType){
   return createDialogComp(getDataConf(dialogType));
}

Factory.createChartContainer = function(dialogType){
  return createChartContainerComp(getDataConf(dialogType));
}

export default Factory
