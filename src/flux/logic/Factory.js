
import React from 'react';

import RouterDialog from './RouterDialog';
import RouterFnValue from './RouterFnValue';
import RouterBrowser from './RouterBrowser';

import ChartContainer2 from '../../components/ChartContainer2';

import Msg from '../../constants/Msg';
import { ModalDialog, LoadType } from '../../constants/Type';

import ComponentActions from '../actions/ComponentActions';
import ChartActions from '../actions/ChartActions';
import DateUtils from '../../utils/DateUtils';

import ChartStore from '../stores/ChartStore';

const onLoadChart = ChartActions.loadStock
    , onShowChart = ChartActions.showChart
    , initFromDate = DateUtils.getFromDate(2)
    , initToDate = DateUtils.getToDate()
    , onTestDate = DateUtils.isValidDate
    , onTestDateOrEmpty = DateUtils.isValidDateOrEmpty;


/*
const noopArr = function(){
  return [];
}
*/

const _showModalDialogDescription = function(option){
  ComponentActions.showModalDialog(ModalDialog.DESCRIPTION, option);
}

const createDialogComp = function (conf, browserType){
   const dialogType = conf.type
       , props = conf.dialogProps ? conf.dialogProps : {}
       , Comp = (conf.dialogType)
            ? (RouterDialog[conf.dialogType])
                  ? RouterDialog[conf.dialogType]
                  : RouterDialog.DEFAULT
            : RouterDialog.DEFAULT
       , _initFromDate = (props.nInitFromDate)
            ? DateUtils.getFromDate(props.nInitFromDate)
            : initFromDate
       , _fnValue = (props.valueFn)
            ? (props.valueFnPrefix )
                   ? RouterFnValue[props.valueFn].bind(null, props.valueFnPrefix)
                   : RouterFnValue[props.valueFn]
            : undefined
       , onClickInfo = (props.descrUrl)
            ? _showModalDialogDescription
            : undefined;

       if (props.isContinious) {
         props.msgTestDateOrEmpty = Msg.TEST_DATE_OR_EMPTY;
         props.onTestDateOrEmpty = onTestDateOrEmpty;
       }

       if (!props.loadId){
         props.loadId = LoadType.Q;
       }

   return  React.createElement(Comp, {
               key : dialogType,
               caption : conf.dialogCaption,
               optionURI : conf.optionURI,
               optionsJsonProp : conf.optionsJsonProp,
               dataColumn : conf.dataColumn,
               msgOnNotSelected : Msg.NOT_SELECTED,
               msgOnNotValidFormat : Msg.NOT_VALID_FORMAT,
               onLoad  : onLoadChart.bind(null, dialogType, browserType),
               onShow  : onShowChart.bind(null, dialogType, browserType),
               fnValue : _fnValue,
               initFromDate : _initFromDate,
               initToDate, onTestDate,
               onClickInfo,
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


const getDataConf = function(dialogType){
  const dataId = dialogType.split('_')[0];
  return ChartStore.getSourceConfig(dataId, dialogType);
}

const Factory = {
  createDialog(dialogType, browserType){
   return createDialogComp(getDataConf(dialogType), browserType);
 },

 createChartContainer(dialogType, browserType){
  return createChartContainerComp(getDataConf(dialogType), browserType);
 },

 createBrowserDynamic({ browserType, caption='' , sourceMenuUrl})
 {
    const comp = RouterBrowser[browserType] || RouterBrowser.DEFAULT;
    return React.createElement(comp , {
      key : browserType,
      browserType : browserType,
      store : ChartStore,
      isInitShow : true,
      caption : caption,
      sourceMenuUrl : sourceMenuUrl
    });
  }
}

export default Factory
