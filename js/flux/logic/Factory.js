"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _RouterDialog = _interopRequireDefault(require("./RouterDialog"));

var _RouterLoadFn = _interopRequireDefault(require("./RouterLoadFn"));

var _RouterFnValue = _interopRequireDefault(require("./RouterFnValue"));

var _fBrowser = _interopRequireDefault(require("./fBrowser"));

var _Msg = _interopRequireDefault(require("../../constants/Msg"));

var _Type = require("../../constants/Type");

var _ComponentActions = _interopRequireDefault(require("../actions/ComponentActions"));

var _ChartActions = _interopRequireDefault(require("../actions/ChartActions"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _has = _interopRequireDefault(require("../../components/has"));

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

const {
  getFromDate,
  getToDate,
  isYmd,
  isYmdOrEmpty
} = _DateUtils.default;
const {
  isWideWidth
} = _has.default;

const _isArr = Array.isArray,
      _assign = Object.assign,
      _initFromDate = getFromDate(2),
      initToDate = getToDate();

const _crFnValue = (valueFn, valueFnPrefix) => {
  return valueFn ? valueFnPrefix ? _RouterFnValue.default[valueFn].bind(null, valueFnPrefix) : _RouterFnValue.default[valueFn] : void 0;
};

const _crInitFromDate = ({
  isFdw,
  nInitFromDate
}) => {
  if (isFdw && !isWideWidth) {
    return _initFromDate;
  }

  return nInitFromDate ? getFromDate(nInitFromDate) : _initFromDate;
};

const _crDateProps = dialogProps => {
  const _props = dialogProps.isFd ? {
    errNotYmdOrEmpty: _Msg.default.YMD_DATE_OR_EMPTY,
    isYmdOrEmpty
  } : void 0;

  return {
    initFromDate: _crInitFromDate(dialogProps),
    initToDate,
    onTestDate: isYmd,
    ..._props
  };
};

const _onError = (alertDescr, alertCaption = 'Request Error') => {
  _ComponentActions.default.showAlert({
    alertDescr,
    alertCaption
  });
};

const _crClickAbout = ({
  rootUri,
  descr,
  descrUrl
}) => {
  const _descrUrl = descr && rootUri ? rootUri + "/" + descr + ".html" : descrUrl;

  return _descrUrl ? _ComponentActions.default.showDescription.bind(null, {
    descrUrl: _descrUrl
  }) : void 0;
};

const D_SELECT_N = 'DialogSelectN',
      D_STAT_N = 'DialogStatN';

const _getDialogType = (dialogType, {
  selectProps,
  dims,
  dfProps
}) => dialogType || (_isArr(selectProps) ? D_SELECT_N : void 0) || (_isArr(dims) || (dfProps || {}).dfId ? D_STAT_N : void 0);

const _modifyDialogPropsByLoadId = (dialogProps, loadId) => {
  if (!loadId) {
    dialogProps.loadId = _Type.LoadType.Q;
  }

  if (loadId === _Type.LoadType.EU_STAT) {
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

const _crDialogComp = function (browserType, dialogConf) {
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
        onClickInfo = _crClickAbout(dialogProps),
        loadFn = _RouterLoadFn.default.getFn(loadFnType, _dialogType),
        proxy = isProxy ? _ChartStore.default.getProxy() : void 0,
        getKey = isGetKey && _ChartStore.default.getKey,
        onError = isGetKey && _onError,
        onLoad = _ChartActions.default.loadStock.bind(null, {
    chartType: itemKey,
    browserType,
    dialogConf
  }),
        onShow = _ChartActions.default.showChart.bind(null, itemKey, browserType, dialogConf);

  _modifyDialogPropsByLoadId(dialogProps, loadId);

  return _RouterDialog.default.getDialog(_dialogType).then(Comp => {
    return /*#__PURE__*/(0, _react.createElement)(Comp, {
      key: itemKey,
      caption: dialogCaption || menuTitle,
      msgOnNotSelected: _Msg.default.NOT_SELECTED,
      msgOnNotValidFormat: _Msg.default.NOT_VALID_FORMAT,
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
    });
  });
};

const _crOptionDialogComp = function (option) {
  const {
    dialogType
  } = option;
  return _RouterDialog.default.getDialog(dialogType).then(Comp => {
    return /*#__PURE__*/(0, _react.createElement)(Comp, {
      key: dialogType
    });
  });
};

const Factory = { ..._fBrowser.default,
  //dialogType, browserType, conf
  createDialog: _crDialogComp,
  //option
  createOptionDialog: _crOptionDialogComp
};
var _default = Factory;
exports.default = _default;
//# sourceMappingURL=Factory.js.map