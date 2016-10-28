
import React from 'react';

import RouterDialog from './RouterDialog';
import RouterFnValue from './RouterFnValue';
import RouterBrowser from './RouterBrowser';

import RouterItemOption from '../../components/zhn-select/RouterItemOption';
import RouterBrowserItem from '../../components/browser-items/RouterBrowserItem';

import ChartContainer2 from '../../components/ChartContainer2';

import Msg from '../../constants/Msg';
import { ModalDialog, LoadType } from '../../constants/Type';

import ComponentActions from '../actions/ComponentActions';
import ChartActions from '../actions/ChartActions';
import DateUtils from '../../utils/DateUtils';

import BrowserConfig from '../../constants/BrowserConfig';

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
const createChartContainerComp = function(conf={}, browserType){
  const Comp = (conf.chartContainerComp)
                 ? conf.chartContainerComp
                 : ChartContainer2
      , _type = (conf.type)
             ? conf.type
             : BrowserConfig[browserType].chartContainerType
      , _caption = (conf.chartContainerCaption)
             ? conf.chartContainerCaption
             : BrowserConfig[browserType].chartContainerCaption;

  return React.createElement(Comp, {
            key : _type,
            caption : _caption,
            chartType : _type,
            browserType : browserType,
            onCloseContainer : fnCloseChartContainer(_type, browserType),
            onCloseItem
  });
}


const _getDialogConf = function(dialogType){
  const _browserId = dialogType.split('_')[0];
  return ChartStore.getSourceConfig(_browserId, dialogType);
}

const Factory = {
  createDialog(dialogType, browserType){
   return createDialogComp(_getDialogConf(dialogType), browserType);
 },

 createChartContainer(dialogType, browserType){
  return createChartContainerComp(_getDialogConf(dialogType), browserType);
 },

 createBrowserDynamic(option)
 {
    const {
             browserType, caption='' , sourceMenuUrl,
             chartContainerType,
             modalDialogType, itemOptionType, itemType, descrUrl
           } = option
        , comp = RouterBrowser[browserType] || RouterBrowser.DEFAULT
        , ItemOptionComp = (itemOptionType)
              ? ( RouterItemOption[itemOptionType] || RouterBrowserItem.DEFAULT )
              : RouterBrowserItem.DEFAULT
        , ItemComp = (itemType)
              ? ( RouterBrowserItem[itemType] || RouterBrowserItem.DEFAULT )
              : undefined
        , onClickInfo = (typeof ItemComp !== "undefined")
             ? _showModalDialogDescription
             : undefined
        , onShowContainer = ChartActions.showChart.bind(null, chartContainerType, browserType)

    return React.createElement(comp , {
      key : browserType,
      browserType : browserType,
      store : ChartStore,
      isInitShow : true,
      caption : caption,
      sourceMenuUrl : sourceMenuUrl,
      modalDialogType : modalDialogType,
      chartContainerType : chartContainerType,
      ItemOptionComp: ItemOptionComp,
      ItemComp : ItemComp,
      descrUrl : descrUrl,
      onClickInfo : onClickInfo,
      onShowContainer : onShowContainer
    });
  }
}

export default Factory
