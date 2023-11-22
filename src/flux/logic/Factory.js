export { crAsyncBrowser } from './fBrowser';

import {
  bindTo,
  createElement
} from '../../components/uiApi';

import { getDialog } from './RouterDialog';
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
import {
  ComponentActions
} from '../actions/ComponentActions';
import {
  CHAT_LOAD,
  CHAT_SHOW,
  ChartActions
} from '../actions/ChartActions';

import {
  getFromDate,
  getToDate,
  isYmd,
  isYmdOrEmpty,
  addDaysToYmd
} from '../../utils/dateFn';
import { isWideWidth } from '../../components/has';
import ChartStore from '../stores/ChartStore';

const HAS_WIDE_WIDTH = isWideWidth(600)
, _isArr = Array.isArray
, _assign = Object.assign
, _initFromDate = getFromDate(2)
, initToDate = getToDate();

const _crFnValue = (
  valueFn,
  valueFnPrefix
) => valueFn
  ? valueFnPrefix
     ? bindTo(RouterFnValue[valueFn], valueFnPrefix)
     : RouterFnValue[valueFn]
  : void 0;

const _crFromDate = (
  nInitFromDate,
) => nInitFromDate
  ? nInitFromDate === '1y+1d' //Coinpaprika
     ? addDaysToYmd(getFromDate(1), 1)
     : getFromDate(nInitFromDate)
  : _initFromDate;

const _crInitFromDate = ({
  isFdw,
  nInitFromDate
}) => isFdw && !HAS_WIDE_WIDTH
  ? _initFromDate
  : _crFromDate(nInitFromDate);

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
  ComponentActions.showAlert({
    alertDescr,
    alertCaption
  })
};

const _crClickAbout = ({
  rootUri,
  descr,
  descrUrl
}) => {
  const _descrUrl = descr && rootUri
    ? `${rootUri}${descr}.html`
    : descrUrl;
  return _descrUrl
    ? bindTo(ComponentActions.showDescription, { descrUrl: _descrUrl })
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
   , onAbout = _crClickAbout(dialogProps)
   , loadFn = RouterLoadFn.getFn(loadFnType, _dialogType)
   , proxy = isProxy
        ? ChartStore.getProxy()
        : void 0
   , getKey = isGetKey && ChartStore.getKey
   , onError = isGetKey && _onError
   , onLoad = bindTo(ChartActions[CHAT_LOAD], {
         chartType: itemKey,
         browserType, dialogConf
      })
   , onShow = bindTo(ChartActions[CHAT_SHOW], itemKey, browserType, dialogConf);

  _modifyDialogPropsByLoadId(dialogProps, loadId)

  return getDialog(_dialogType)
    .then(Comp =>
       createElement(Comp, {
          ...dialogProps,
          //initFromDate, initToDate, onTestDate,
          //errNotYmdOrEmpty, isYmdOrEmpty
          ..._crDateProps(dialogProps),
          key: itemKey,
          caption: dialogCaption || menuTitle,
          msgOnNotSelected: NOT_SELECTED,
          msgOnNotValidFormat: NOT_VALID_FORMAT,
          fnValue: _crFnValue(valueFn, valueFnPrefix),
          onAbout,
          onLoad,
          onShow,
          loadFn,
          proxy,
          getKey,
          onError
       })
   );
}

//option
export const crOptionDialog = ({
  dialogType
}) => getDialog(dialogType)
  .then(Comp =>
     createElement(Comp, {key: dialogType})
   );
