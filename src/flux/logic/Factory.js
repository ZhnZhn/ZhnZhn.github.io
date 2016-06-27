
import React from 'react';

import DialogType3 from '../../components/dialogs/DialogType3';

import DialogType4A from '../../components/dialogs/DialogType4A';
import DialogType5 from '../../components/dialogs/DialogType5';

import UNCommodityTradeDialog from '../../components/quandl-browser/UNCommodityTradeDialog';
import BigMacDialog from '../../components/quandl-browser/BigMacDialog';
import FuturesDialog from '../../components/quandl-browser/FuturesDialog';

import ChartContainer2 from '../../components/ChartContainer2';



import Msg from '../../constants/Msg';
import { ModalDialog } from '../../constants/Type';

import ComponentActions from '../actions/ComponentActions';
import ChartActions from '../actions/ChartActions';
import DateUtils from '../../utils/DateUtils';

import SourceBrowserDynamic from '../../components/browser-container/SourceBrowserDynamic';
import ChartStore from '../stores/ChartStore';

const _rDialog = {
  DialogType3 : DialogType3,
  DialogType4A : DialogType4A,
  DialogType5 : DialogType5,
  UNCommodityTradeDialog : UNCommodityTradeDialog,
  BigMacDialog : BigMacDialog,
  FuturesDialog : FuturesDialog
}


const _rFnValue = {
  RTwo : (one, two) => `${two}`,
  ROneTwo : (one, two) => `${one}/${two}`,
  RPrefixOne : (prefix, one) => `${prefix}_${one}`,
  RPrefixOneTwo : (prefix, one, two) => `${prefix}/${one}_${two}`,
  RPrefixTwoOne : (prefix, one, two) => `${prefix}/${two}_${one}`
}

const onLoadChart = ChartActions.loadStock,
      onShowChart = ChartActions.showChart,
      initFromDate = DateUtils.getFromDate(2),
      initToDate = DateUtils.getToDate(),
      onTestDate = DateUtils.isValidDate;

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
            ? (_rDialog[conf.dialogType]) ? _rDialog[conf.dialogType] : DialogType3
            : DialogType3
       , _initFromDate = (props.nInitFromDate)
            ? DateUtils.getFromDate(props.nInitFromDate)
            : initFromDate
       , _fnValue = (props.valueFn)
            ? (props.valueFnPrefix )
                   ? _rFnValue[props.valueFn].bind(null, props.valueFnPrefix)
                   : _rFnValue[props.valueFn]
            : undefined
       , onClickInfo = (props.descrUrl) ? _showModalDialogDescription : undefined;

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

const Factory = {};
Factory.createDialog = function(dialogType, browserType){
   return createDialogComp(getDataConf(dialogType), browserType);
}

Factory.createChartContainer = function(dialogType, browserType){
  return createChartContainerComp(getDataConf(dialogType), browserType);
}

Factory.createBrowserDynamic = function({
  browserType, caption='' , sourceMenuUrl
}){
  return React.createElement(SourceBrowserDynamic , {
     key : browserType,
     browserType : browserType,
     store : ChartStore,
     isInitShow : true,
     caption : caption,
     sourceMenuUrl : sourceMenuUrl
  })
}

export default Factory
