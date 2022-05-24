export { crAsyncBrowser } from './fBrowser';

import { createElement } from 'react';
import RouterDialog from './RouterDialog';
import RouterLoadFn from './RouterLoadFn';
import RouterFnValue from './RouterFnValue';

import {
  YMD_DATE_OR_EMPTY,
  NOT_SELECTED,
  NOT_VALID_FORMAT
} from '../../constants/Msg';
import {
  LT_Q,
  LT_EU_STAT
} from '../../constants/LoadType';
import CA from '../actions/ComponentActions';
import ChartActions, {
  CHAT_LOAD,
  CHAT_SHOW
} from '../actions/ChartActions';

import {
  getFromDate,
  getToDate,
  isYmd,
  isYmdOrEmpty
} from '../../utils/DateUtils';
import has from '../../components/has';
import ChartStore from '../stores/ChartStore';

const { isWideWidth } = has
, _isArr = Array.isArray
, _assign = Object.assign
, _initFromDate = getFromDate(2)
, initToDate = getToDate();

const _crFnValue = (
  valueFn,
  valueFnPrefix
) => valueFn
  ? valueFnPrefix
     ? RouterFnValue[valueFn].bind(null, valueFnPrefix)
     : RouterFnValue[valueFn]
  : void 0;

const _crInitFromDate = ({
  isFdw,
  nInitFromDate
}) => isFdw && !isWideWidth
  ? _initFromDate
  : nInitFromDate
     ? getFromDate(nInitFromDate)
     : _initFromDate

const _crDateProps = (dialogProps) => {
  const _props = dialogProps.isFd
    ? {
        errNotYmdOrEmpty: YMD_DATE_OR_EMPTY,
        isYmdOrEmpty
      }
    : void 0;
  return {
    initFromDate: _crInitFromDate(dialogProps),
    initToDate,
    onTestDate: isYmd,
    ..._props
  }
};

const _onError = (
  alertDescr,
  alertCaption='Request Error'
) => {
  CA.showAlert({ alertDescr, alertCaption })
};

const _crClickAbout = ({
  rootUri,
  descr,
  descrUrl
}) => {
  const _descrUrl = descr && rootUri
    ? `${rootUri}/${descr}.html`
    : descrUrl;
  return _descrUrl
    ? CA.showDescription.bind(null, { descrUrl: _descrUrl })
    : void 0;
};

const D_SELECT_N = 'DialogSelectN'
, D_STAT_N = 'DialogStatN';

const _getDialogType = (
  dialogType, {
  selectProps,
  dims,
  dfProps
}) => dialogType
  || (_isArr(selectProps) ? D_SELECT_N : void 0)
  || (_isArr(dims) || (dfProps || {}).dfId ? D_STAT_N : void 0);

const _modifyDialogPropsByLoadId = (
  dialogProps,
  loadId
) => {
  if (!loadId){
    dialogProps.loadId = LT_Q;
  }
  if (loadId === LT_EU_STAT) {
    const { dfProps } = dialogProps
    , { mapFrequency } = dfProps || {};
    dialogProps.dfProps = _assign({}, dfProps, {
       mapFrequency:  mapFrequency || 'M'
    })
  }
};

//dialogType, browserType, conf
export const crDialog = (
  browserType,
  dialogConf
) => {
   const {
     type:itemKey,
     dialogProps={},
     dialogType,
     dialogCaption,
     menuTitle
   } = dialogConf
   , {
     valueFn,
     valueFnPrefix,
     loadFnType,
     loadId,
     isProxy,
     isGetKey
   } = dialogProps
   , _dialogType = _getDialogType(dialogType, dialogProps)
   , onClickInfo = _crClickAbout(dialogProps)
   , loadFn = RouterLoadFn.getFn(loadFnType, _dialogType)
   , proxy = isProxy
        ? ChartStore.getProxy()
        : void 0
   , getKey = isGetKey && ChartStore.getKey
   , onError = isGetKey && _onError
   , onLoad = ChartActions[CHAT_LOAD]
      .bind(null, {
         chartType: itemKey,
         browserType, dialogConf
      })
   , onShow = ChartActions[CHAT_SHOW]
       .bind(null, itemKey, browserType, dialogConf);

  _modifyDialogPropsByLoadId(dialogProps, loadId)

  return RouterDialog
    .getDialog(_dialogType)
    .then(Comp =>
       createElement(Comp, {
          key: itemKey,
          caption: dialogCaption || menuTitle,
          msgOnNotSelected: NOT_SELECTED,
          msgOnNotValidFormat: NOT_VALID_FORMAT,
          fnValue: _crFnValue(valueFn, valueFnPrefix),
          //initFromDate, initToDate, onTestDate,
          //errNotYmdOrEmpty, isYmdOrEmpty
          ..._crDateProps(dialogProps),
          onLoad,
          onShow,
          onClickInfo,
          loadFn,
          proxy,
          getKey,
          onError,
          ...dialogProps
       })
   );
}

//option
export const crOptionDialog = ({
  dialogType
}) => RouterDialog
  .getDialog(dialogType)
  .then(Comp =>
     createElement(Comp, {key: dialogType})
   );
