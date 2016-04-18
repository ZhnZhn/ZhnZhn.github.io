
import React from 'react';

import DialogType3 from '../../components/dialogs/DialogType3';
import ChartContainer2 from '../../components/ChartContainer2';

import DataQE from '../../constants/DataQE';
import DataQG from '../../constants/DataQG';
import DataQY from '../../constants/DataQY';

import ComponentActions from '../actions/ComponentActions';
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

const createDialogComp = function (conf, browserType){
   const dialogType = conf.type;
   const props = conf.dialogProps ? conf.dialogProps : {};
   const fnOption = conf.fnOption ? conf.fnOption : noopArr;
   const Comp = conf.dialogComp ? conf.dialogComp : DialogType3;

   return  React.createElement(Comp, {
               key : dialogType,
               caption : conf.dialogCaption,
               optionStocks : fnOption(),
               onLoad  : onLoadChart.bind(null, dialogType, browserType),
               onShow  : onShowChart.bind(null, dialogType, browserType),
               initFromDate, initToDate, onTestDate,
               ...props
  });
}

const onCloseItem = ChartActions.closeChart;
const fnCloseChartContainer = function(chartType, browserType){
  return ComponentActions.closeChartContainer.bind(null, chartType, browserType);
}
const createChartContainerComp = function(conf, browserType){
  const Comp = conf.chartContainerComp ? conf.chartContainerComp : ChartContainer2;
  return React.createElement(Comp, {
            key : conf.type,
            caption : conf.chartContainerCaption,
            chartType : conf.type,
            browserType : browserType,
            onCloseContainer : fnCloseChartContainer(conf.type, browserType),
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
Factory.createDialog = function(dialogType, browserType){
   return createDialogComp(getDataConf(dialogType), browserType);
}

Factory.createChartContainer = function(dialogType, browserType){
  return createChartContainerComp(getDataConf(dialogType), browserType);
}

export default Factory
