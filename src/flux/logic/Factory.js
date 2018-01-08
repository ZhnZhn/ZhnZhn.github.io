
import React from 'react';

import RouterDialog from './RouterDialog';
import RouterLoadFn from './RouterLoadFn';
import RouterFnValue from './RouterFnValue';

import fBrowser from './fBrowser'

import ChartContainer from '../../components/zhn-containers/ChartContainer';

import Msg from '../../constants/Msg';
import {
  ModalDialog,
  LoadType
} from '../../constants/Type';

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

const _showModalDialogDescription = function(option){
  ComponentActions.showModalDialog(ModalDialog.DESCRIPTION, option);
}


const createDialogComp = function (conf, browserType){   
   const {
           type:itemKey,
           dialogProps={}, dialogType,
           dialogCaption, menuTitle,
           optionURI, optionsJsonProp,
           dataColumn,
         } = conf
       , {
           nInitFromDate,
           valueFn, valueFnPrefix,
           descrUrl,
           loadFnType,
           isContinious,
           loadId,
           isProxy
         } = dialogProps
       , _initFromDate = (nInitFromDate)
            ? DateUtils.getFromDate(nInitFromDate)
            : initFromDate
       , _fnValue = (valueFn)
            ? (valueFnPrefix )
                 ? RouterFnValue[valueFn].bind(null, valueFnPrefix)
                 : RouterFnValue[valueFn]
            : undefined
       , onClickInfo = (descrUrl)
            ? _showModalDialogDescription
            : undefined
       , loadFn = RouterLoadFn.getFn(loadFnType, dialogType)
       , proxy = isProxy
            ? ChartStore.getProxy()
            : undefined
       , onLoad = onLoadChart.bind(null, {
            chartType: itemKey,
            browserType, conf
          })
       , onShow = onShowChart.bind(null, itemKey, browserType, conf);

       if (isContinious) {
         Object.assign(dialogProps, {
           msgTestDateOrEmpty: Msg.TEST_DATE_OR_EMPTY,
           onTestDateOrEmpty: onTestDateOrEmpty
         })
       }
       if (!loadId){
         dialogProps.loadId = LoadType.Q;
       }

      return RouterDialog.getDialog(dialogType)
         .then(Comp => {
            return React.createElement(Comp, {
              key : itemKey,
              caption : dialogCaption || menuTitle,
              optionURI : optionURI,
              optionsJsonProp : optionsJsonProp,
              dataColumn : dataColumn,
              msgOnNotSelected : Msg.NOT_SELECTED,
              msgOnNotValidFormat : Msg.NOT_VALID_FORMAT,
              onLoad, onShow,
              fnValue : _fnValue,
              initFromDate : _initFromDate,
              initToDate, onTestDate,
              onClickInfo,
              loadFn,
              proxy,
              ...dialogProps
           });
         })
}


const _createOptionDialog = function(option) {
  const { dialogType } = option
  return RouterDialog.getDialog(dialogType)
     .then(Comp => {
        return React.createElement(Comp, {
            key: dialogType
        })
     });
}


const onCloseItem = ChartActions.closeChart;
const fnCloseChartContainer = function(chartType, browserType){
  return ComponentActions.closeChartContainer.bind(null, chartType, browserType);
}
const createChartContainerComp = function(conf={}, browserType){
  const Comp = (conf.chartContainerComp)
                 ? conf.chartContainerComp
                 : ChartContainer
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
  ...fBrowser,

  createDialog(dialogType, browserType, conf){
    const _conf = !conf.dialogConf
            ? _getDialogConf(dialogType)
            : conf;
    return createDialogComp(_conf, browserType);
 },
 createOptionDialog(option){
   return _createOptionDialog(option)
 },

 createChartContainer(dialogType, browserType, conf){
   const _conf = conf && conf.dialogConf
            ? conf
            : _getDialogConf(dialogType);
   return createChartContainerComp(_conf, browserType);
   //return createChartContainerComp(_getDialogConf(dialogType), browserType);
 }

}

export default Factory
