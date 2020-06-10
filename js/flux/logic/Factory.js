"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _RouterDialog = _interopRequireDefault(require("./RouterDialog"));

var _RouterLoadFn = _interopRequireDefault(require("./RouterLoadFn"));

var _RouterFnValue = _interopRequireDefault(require("./RouterFnValue"));

var _fBrowser = _interopRequireDefault(require("./fBrowser"));

var _Msg = _interopRequireDefault(require("../../constants/Msg"));

var _Type = require("../../constants/Type");

var _ComponentActions = _interopRequireDefault(require("../actions/ComponentActions"));

var _ChartActions = _interopRequireDefault(require("../actions/ChartActions"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

var getFromDate = _DateUtils["default"].getFromDate,
    getToDate = _DateUtils["default"].getToDate,
    isYmd = _DateUtils["default"].isYmd,
    isYmdOrEmpty = _DateUtils["default"].isYmdOrEmpty;
var initFromDate = getFromDate(2),
    initToDate = getToDate();

var _crFnValue = function _crFnValue(valueFn, valueFnPrefix) {
  return valueFn ? valueFnPrefix ? _RouterFnValue["default"][valueFn].bind(null, valueFnPrefix) : _RouterFnValue["default"][valueFn] : undefined;
};

var _crDateProps = function _crDateProps(_ref) {
  var isFd = _ref.isFd,
      nInitFromDate = _ref.nInitFromDate;

  var _props = isFd ? {
    errNotYmdOrEmpty: _Msg["default"].YMD_DATE_OR_EMPTY,
    isYmdOrEmpty: isYmdOrEmpty
  } : void 0;

  return (0, _extends2["default"])({
    initFromDate: nInitFromDate ? getFromDate(nInitFromDate) : initFromDate,
    initToDate: initToDate,
    onTestDate: isYmd
  }, _props);
};

var _onError = function _onError(alertDescr, alertCaption) {
  if (alertCaption === void 0) {
    alertCaption = 'Request Error';
  }

  _ComponentActions["default"].showAlert({
    alertDescr: alertDescr,
    alertCaption: alertCaption
  });
};

var _crClickAbout = function _crClickAbout(_ref2) {
  var rootUri = _ref2.rootUri,
      descr = _ref2.descr,
      descrUrl = _ref2.descrUrl;

  var _descrUrl = descr && rootUri ? rootUri + "/" + descr + ".html" : descrUrl;

  return _descrUrl ? _ComponentActions["default"].showDescription.bind(null, {
    descrUrl: _descrUrl
  }) : void 0;
};

var _crDialogComp = function _crDialogComp(browserType, dialogConf) {
  var itemKey = dialogConf.type,
      _dialogConf$dialogPro = dialogConf.dialogProps,
      dialogProps = _dialogConf$dialogPro === void 0 ? {} : _dialogConf$dialogPro,
      dialogType = dialogConf.dialogType,
      dialogCaption = dialogConf.dialogCaption,
      menuTitle = dialogConf.menuTitle,
      optionURI = dialogConf.optionURI,
      optionsJsonProp = dialogConf.optionsJsonProp,
      dataColumn = dialogConf.dataColumn,
      valueFn = dialogProps.valueFn,
      valueFnPrefix = dialogProps.valueFnPrefix,
      loadFnType = dialogProps.loadFnType,
      loadId = dialogProps.loadId,
      isProxy = dialogProps.isProxy,
      isGetKey = dialogProps.isGetKey,
      onClickInfo = _crClickAbout(dialogProps),
      loadFn = _RouterLoadFn["default"].getFn(loadFnType, dialogType),
      proxy = isProxy ? _ChartStore["default"].getProxy() : void 0,
      getKey = isGetKey && _ChartStore["default"].getKey,
      onError = isGetKey && _onError,
      onLoad = _ChartActions["default"].loadStock.bind(null, {
    chartType: itemKey,
    browserType: browserType,
    dialogConf: dialogConf
  }),
      onShow = _ChartActions["default"].showChart.bind(null, itemKey, browserType, dialogConf);

  if (!loadId) {
    dialogProps.loadId = _Type.LoadType.Q;
  }

  return _RouterDialog["default"].getDialog(dialogType).then(function (Comp) {
    return /*#__PURE__*/_react["default"].createElement(Comp, (0, _extends2["default"])({
      key: itemKey,
      caption: dialogCaption || menuTitle,
      optionURI: optionURI,
      optionsJsonProp: optionsJsonProp,
      dataColumn: dataColumn,
      msgOnNotSelected: _Msg["default"].NOT_SELECTED,
      msgOnNotValidFormat: _Msg["default"].NOT_VALID_FORMAT,
      fnValue: _crFnValue(valueFn, valueFnPrefix)
    }, _crDateProps(dialogProps), {
      onLoad: onLoad,
      onShow: onShow,
      onClickInfo: onClickInfo,
      loadFn: loadFn,
      proxy: proxy,
      getKey: getKey,
      onError: onError
    }, dialogProps));
  });
};

var _crOptionDialogComp = function _crOptionDialogComp(option) {
  var dialogType = option.dialogType;
  return _RouterDialog["default"].getDialog(dialogType).then(function (Comp) {
    return /*#__PURE__*/_react["default"].createElement(Comp, {
      key: dialogType
    });
  });
};

var Factory = (0, _extends2["default"])({}, _fBrowser["default"], {
  //dialogType, browserType, conf
  createDialog: _crDialogComp,
  //option
  createOptionDialog: _crOptionDialogComp
});
var _default = Factory;
exports["default"] = _default;
//# sourceMappingURL=Factory.js.map