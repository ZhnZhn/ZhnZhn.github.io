
import React from 'react';

import RouterDialog from './RouterDialog';
import RouterLoadFn from './RouterLoadFn';
import RouterFnValue from './RouterFnValue';

import fBrowser from './fBrowser'

import ChartContainer from '../../components/zhn-containers/ChartContainer';

import Msg from '../../constants/Msg';
import {  LoadType } from '../../constants/Type';

import CA from '../actions/ComponentActions';
import ChartActions from '../actions/ChartActions';
import DateUtils from '../../utils/DateUtils';

import BrowserConfig from '../../constants/BrowserConfig';

import ChartStore from '../stores/ChartStore';

const {
  getFromDate,
  getToDate,
  isYmd,
  isYmdOrEmpty
} = DateUtils;

const onLoadChart = ChartActions.loadStock
    , onShowChart = ChartActions.showChart
    , initFromDate = getFromDate(2)
    , initToDate = getToDate();

const _getDialogConf = function(conf, dialogType){
  if (conf && conf.dialogConf) {
    return conf;
  }
  const _browserId = dialogType.split('_')[0];
  return ChartStore.getSourceConfig(_browserId, dialogType);
};

const _crFnValue = (valueFn, valueFnPrefix) => {
  return valueFn
    ? valueFnPrefix
       ? RouterFnValue[valueFn].bind(null, valueFnPrefix)
       : RouterFnValue[valueFn]
    : undefined;
};

const _crDateProps = (nInitFromDate, isContinious) => {
  const _props = isContinious
    ? {
        msgTestDateOrEmpty: Msg.TEST_DATE_OR_EMPTY,
        onTestDateOrEmpty: isYmdOrEmpty
      }
    : undefined;
  return {
    initFromDate: nInitFromDate
      ? getFromDate(nInitFromDate)
      : initFromDate,
    initToDate,
    onTestDate: isYmd,
    ..._props
  }
};

const _crDialogComp = function (dType, browserType, dConf){
   const conf = _getDialogConf(dConf, dType);
   const {
           type:itemKey,
           dialogProps={}, dialogType,
           dialogCaption, menuTitle,
           optionURI, optionsJsonProp,
           dataColumn
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
       , onClickInfo = (descrUrl)
            ? CA.showDescription
            : undefined
       , loadFn = RouterLoadFn.getFn(loadFnType, dialogType)
       , proxy = isProxy
            ? ChartStore.getProxy()
            : undefined
       , onLoad = onLoadChart
          .bind(null, {
             chartType: itemKey,
             browserType, conf
          })
       , onShow = onShowChart
           .bind(null, itemKey, browserType, conf);

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
              fnValue : _crFnValue(valueFn, valueFnPrefix),
              //initFromDate, initToDate, onTestDate,
              //msgTestDateOrEmpty, onTestDateOrEmpty
              ..._crDateProps(nInitFromDate, isContinious),
              onLoad, onShow,
              onClickInfo,
              loadFn,
              proxy,
              ...dialogProps
           });
         })
}


const _crOptionDialogComp = function(option) {
  const { dialogType } = option
  return RouterDialog.getDialog(dialogType)
     .then(Comp => {
        return React.createElement(Comp, {
            key: dialogType
        })
     });
}

const _crContCaption = (conf, browserType) => {
  let _caption = conf.chartContainerCaption
    || conf.contFullCaption
    || BrowserConfig[browserType].contFullCaption;
  if (_caption) {
    return _caption;
  }

  const { dataSource='' } = conf.dialogProps || {};
  _caption = conf.contCaption
     || conf.dialogCaption
     || conf.menuTitle
     || 'Chart Container'
  return dataSource && dataSource.length>0
     ? `${dataSource}: ${_caption}`
     : _caption;
};

const _crChartContainerComp = function(dType, browserType, dConf){
  const conf = _getDialogConf(dConf, dType) || {};
  const Comp = conf.chartContainerComp
    || ChartContainer
  , _type = conf.type
    || BrowserConfig[browserType].chartContainerType
  , _caption = _crContCaption(conf, browserType);

  return React.createElement(Comp, {
    key: _type,
    caption: _caption,
    chartType: _type,
    browserType: browserType,
    onSetActive: CA.setActiveContainer,
    onCloseContainer: CA.closeChartContainer
      .bind(null, _type, browserType),
    onCloseItem: ChartActions.closeChart
  });
}

const Factory = {
  ...fBrowser,

  //dialogType, browserType, conf
  createDialog: _crDialogComp,
  //option
  createOptionDialog: _crOptionDialogComp,
  //dialogType, browserType, conf
  createChartContainer: _crChartContainerComp
}

export default Factory
