
import React from 'react';

import RouterDialog from './RouterDialog';
import RouterLoadFn from './RouterLoadFn';
import RouterFnValue from './RouterFnValue';

import fBrowser from './fBrowser'

import Msg from '../../constants/Msg';
import {  LoadType } from '../../constants/Type';

import CA from '../actions/ComponentActions';
import CHA from '../actions/ChartActions';

import DateUtils from '../../utils/DateUtils';
import ChartStore from '../stores/ChartStore';

const {
  getFromDate,
  getToDate,
  isYmd,
  isYmdOrEmpty
} = DateUtils;

const onLoadChart = CHA.loadStock
    , onShowChart = CHA.showChart
    , initFromDate = getFromDate(2)
    , initToDate = getToDate();

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

const _onError = (alertDescr, alertCaption='Request Error') => {
  CA.showAlert({ alertDescr, alertCaption })
};

const _crDialogComp = function (browserType, dialogConf){
   const {
           type:itemKey,
           dialogProps={}, dialogType,
           dialogCaption, menuTitle,
           optionURI, optionsJsonProp,
           dataColumn
         } = dialogConf
       , {
           nInitFromDate,
           valueFn, valueFnPrefix,
           descrUrl,
           loadFnType,
           isContinious,
           loadId,
           isProxy,
           isGetKey
         } = dialogProps
       , onClickInfo = (descrUrl)
            ? CA.showDescription
            : void 0
       , loadFn = RouterLoadFn.getFn(loadFnType, dialogType)
       , proxy = isProxy
            ? ChartStore.getProxy()
            : void 0
       , getKey = isGetKey && ChartStore.getKey
       , onError = isGetKey && _onError

       , onLoad = onLoadChart
          .bind(null, {
             chartType: itemKey,
             browserType, dialogConf
          })
       , onShow = onShowChart
           .bind(null, itemKey, browserType, dialogConf);

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
              getKey,
              onError,
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

const Factory = {
  ...fBrowser,
  //dialogType, browserType, conf
  createDialog: _crDialogComp,
  //option
  createOptionDialog: _crOptionDialogComp,
};

export default Factory
