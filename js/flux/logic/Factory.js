"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _RouterDialog = _interopRequireDefault(require("./RouterDialog"));

var _RouterLoadFn = _interopRequireDefault(require("./RouterLoadFn"));

var _RouterFnValue = _interopRequireDefault(require("./RouterFnValue"));

var _fBrowser = _interopRequireDefault(require("./fBrowser"));

var _Msg = require("../../constants/Msg");

var _LoadType = require("../../constants/LoadType");

var _ComponentActions = _interopRequireDefault(require("../actions/ComponentActions"));

var _ChartActions = _interopRequireWildcard(require("../actions/ChartActions"));

var _DateUtils = require("../../utils/DateUtils");

var _has = _interopRequireDefault(require("../../components/has"));

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  isWideWidth
} = _has.default,
      _isArr = Array.isArray,
      _assign = Object.assign,
      _initFromDate = (0, _DateUtils.getFromDate)(2),
      initToDate = (0, _DateUtils.getToDate)();

const _crFnValue = (valueFn, valueFnPrefix) => {
  return valueFn ? valueFnPrefix ? _RouterFnValue.default[valueFn].bind(null, valueFnPrefix) : _RouterFnValue.default[valueFn] : void 0;
};

const _crInitFromDate = _ref => {
  let {
    isFdw,
    nInitFromDate
  } = _ref;

  if (isFdw && !isWideWidth) {
    return _initFromDate;
  }

  return nInitFromDate ? (0, _DateUtils.getFromDate)(nInitFromDate) : _initFromDate;
};

const _crDateProps = dialogProps => {
  const _props = dialogProps.isFd ? {
    errNotYmdOrEmpty: _Msg.YMD_DATE_OR_EMPTY,
    isYmdOrEmpty: _DateUtils.isYmdOrEmpty
  } : void 0;

  return {
    initFromDate: _crInitFromDate(dialogProps),
    initToDate,
    onTestDate: _DateUtils.isYmd,
    ..._props
  };
};

const _onError = function (alertDescr, alertCaption) {
  if (alertCaption === void 0) {
    alertCaption = 'Request Error';
  }

  _ComponentActions.default.showAlert({
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

  const _descrUrl = descr && rootUri ? rootUri + "/" + descr + ".html" : descrUrl;

  return _descrUrl ? _ComponentActions.default.showDescription.bind(null, {
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
        onLoad = _ChartActions.default[_ChartActions.CHAT_LOAD].bind(null, {
    chartType: itemKey,
    browserType,
    dialogConf
  }),
        onShow = _ChartActions.default[_ChartActions.CHAT_SHOW].bind(null, itemKey, browserType, dialogConf);

  _modifyDialogPropsByLoadId(dialogProps, loadId);

  return _RouterDialog.default.getDialog(_dialogType).then(Comp => {
    return /*#__PURE__*/(0, _react.createElement)(Comp, {
      key: itemKey,
      caption: dialogCaption || menuTitle,
      msgOnNotSelected: _Msg.NOT_SELECTED,
      msgOnNotValidFormat: _Msg.NOT_VALID_FORMAT,
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