"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crOptionDialog = exports.crDialog = exports.crAsyncBrowser = void 0;
var _fBrowser = require("./fBrowser");
exports.crAsyncBrowser = _fBrowser.crAsyncBrowser;
var _uiApi = require("../../components/uiApi");
var _RouterDialog = require("./RouterDialog");
var _RouterLoadFn = _interopRequireDefault(require("./RouterLoadFn"));
var _RouterFnValue = _interopRequireDefault(require("./RouterFnValue"));
var _Msg = require("../../constants/Msg");
var _LoadType = require("../../constants/LoadType");
var _ComponentActions = require("../actions/ComponentActions");
var _ChartActions = require("../actions/ChartActions");
var _dateFn = require("../../utils/dateFn");
var _has = require("../../components/has");
var _compStore = require("../stores/compStore");
var _settingStore = require("../stores/settingStore");
const HAS_WIDE_WIDTH = (0, _has.isWideWidth)(600),
  _isArr = Array.isArray,
  _assign = Object.assign,
  _initFromDate = (0, _dateFn.getFromDate)(2),
  initToDate = (0, _dateFn.getToDate)();
const _crFnValue = (valueFn, valueFnPrefix) => valueFn ? valueFnPrefix ? (0, _uiApi.bindTo)(_RouterFnValue.default[valueFn], valueFnPrefix) : _RouterFnValue.default[valueFn] : void 0;
const _crFromDate = nInitFromDate => nInitFromDate ? nInitFromDate === '1y+1d' //Coinpaprika
? (0, _dateFn.addDaysToYmd)((0, _dateFn.getFromDate)(1), 1) : (0, _dateFn.getFromDate)(nInitFromDate) : _initFromDate;
const _crInitFromDate = _ref => {
  let {
    isFdw,
    nInitFromDate
  } = _ref;
  return isFdw && !HAS_WIDE_WIDTH ? _initFromDate : _crFromDate(nInitFromDate);
};
const _crDateProps = dialogProps => {
  const _props = dialogProps.isFd ? {
    errNotYmdOrEmpty: _Msg.YMD_DATE_OR_EMPTY,
    isYmdOrEmpty: _dateFn.isYmdOrEmpty
  } : void 0;
  return {
    initFromDate: _crInitFromDate(dialogProps),
    initToDate,
    onTestDate: _dateFn.isYmd,
    ..._props
  };
};
const _onError = function (alertDescr, alertCaption) {
  if (alertCaption === void 0) {
    alertCaption = 'Request Error';
  }
  (0, _compStore.showAlertDialog)({
    alertDescr,
    alertCaption
  });
};
const _crClickAbout = _ref2 => {
  let {
    rootUri,
    descr,
    descrUrl
  } = _ref2;
  const _descrUrl = descr && rootUri ? `${rootUri}${descr}.html` : descrUrl;
  return _descrUrl ? (0, _uiApi.bindTo)(_ComponentActions.ComponentActions.showDescription, {
    descrUrl: _descrUrl
  }) : void 0;
};
const D_SELECT_N = 'DialogSelectN',
  D_STAT_N = 'DialogStatN';
const _getDialogType = (dialogType, _ref3) => {
  let {
    selectProps,
    dims,
    dfProps
  } = _ref3;
  return dialogType || (_isArr(selectProps) ? D_SELECT_N : void 0) || (_isArr(dims) || (dfProps || {}).dfId ? D_STAT_N : void 0);
};
const _modifyDialogPropsByLoadId = (dialogProps, loadId) => {
  if (!loadId) {
    dialogProps.loadId = _LoadType.LT_Q;
  }
  if (loadId === _LoadType.LT_EU_STAT) {
    const {
        dfProps
      } = dialogProps,
      {
        mapFrequency
      } = dfProps || {};
    dialogProps.dfProps = _assign({}, dfProps, {
      mapFrequency: mapFrequency || 'M'
    });
  }
};

//dialogType, browserType, conf
const crDialog = (browserType, dialogConf) => {
  const {
      type: itemKey,
      dialogProps = {},
      dialogType,
      dialogCaption,
      menuTitle
    } = dialogConf,
    {
      valueFn,
      valueFnPrefix,
      loadFnType,
      loadId,
      isProxy,
      isGetKey
    } = dialogProps,
    _dialogType = _getDialogType(dialogType, dialogProps),
    onAbout = _crClickAbout(dialogProps),
    loadFn = _RouterLoadFn.default.getFn(loadFnType, _dialogType),
    proxy = isProxy ? (0, _settingStore.getProxy)() : void 0,
    _getKey = isGetKey && _settingStore.getKey,
    onError = isGetKey && _onError,
    onLoad = (0, _uiApi.bindTo)(_ChartActions.ChartActions[_ChartActions.CHAT_LOAD], {
      chartType: itemKey,
      browserType,
      dialogConf
    }),
    onShow = (0, _uiApi.bindTo)(_ChartActions.ChartActions[_ChartActions.CHAT_SHOW], itemKey, browserType, dialogConf);
  _modifyDialogPropsByLoadId(dialogProps, loadId);
  return (0, _RouterDialog.getDialog)(_dialogType).then(Comp => (0, _uiApi.createElement)(Comp, {
    ...dialogProps,
    //initFromDate, initToDate, onTestDate,
    //errNotYmdOrEmpty, isYmdOrEmpty
    ..._crDateProps(dialogProps),
    key: itemKey,
    caption: dialogCaption || menuTitle,
    msgOnNotSelected: _Msg.NOT_SELECTED,
    msgOnNotValidFormat: _Msg.NOT_VALID_FORMAT,
    fnValue: _crFnValue(valueFn, valueFnPrefix),
    getKey: _getKey,
    onAbout,
    onLoad,
    onShow,
    loadFn,
    proxy,
    onError
  }));
};

//option
exports.crDialog = crDialog;
const crOptionDialog = _ref4 => {
  let {
    dialogType
  } = _ref4;
  return (0, _RouterDialog.getDialog)(dialogType).then(Comp => (0, _uiApi.createElement)(Comp, {
    key: dialogType
  }));
};
exports.crOptionDialog = crOptionDialog;
//# sourceMappingURL=Factory.js.map