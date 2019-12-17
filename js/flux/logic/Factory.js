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

var _ChartContainer = _interopRequireDefault(require("../../components/zhn-containers/ChartContainer"));

var _Msg = _interopRequireDefault(require("../../constants/Msg"));

var _Type = require("../../constants/Type");

var _ComponentActions = _interopRequireDefault(require("../actions/ComponentActions"));

var _ChartActions = _interopRequireDefault(require("../actions/ChartActions"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _BrowserConfig = _interopRequireDefault(require("../../constants/BrowserConfig"));

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

var getFromDate = _DateUtils["default"].getFromDate,
    getToDate = _DateUtils["default"].getToDate,
    isYmd = _DateUtils["default"].isYmd,
    isYmdOrEmpty = _DateUtils["default"].isYmdOrEmpty;
var onLoadChart = _ChartActions["default"].loadStock,
    onShowChart = _ChartActions["default"].showChart,
    initFromDate = getFromDate(2),
    initToDate = getToDate();

var _getDialogConf = function _getDialogConf(conf, dialogType) {
  if (conf && conf.dialogConf) {
    return conf;
  }

  var _browserId = dialogType.split('_')[0];
  return _ChartStore["default"].getSourceConfig(_browserId, dialogType);
};

var _crFnValue = function _crFnValue(valueFn, valueFnPrefix) {
  return valueFn ? valueFnPrefix ? _RouterFnValue["default"][valueFn].bind(null, valueFnPrefix) : _RouterFnValue["default"][valueFn] : undefined;
};

var _crDateProps = function _crDateProps(nInitFromDate, isContinious) {
  var _props = isContinious ? {
    msgTestDateOrEmpty: _Msg["default"].TEST_DATE_OR_EMPTY,
    onTestDateOrEmpty: isYmdOrEmpty
  } : undefined;

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

var _crDialogComp = function _crDialogComp(dType, browserType, dConf) {
  var conf = _getDialogConf(dConf, dType);

  var itemKey = conf.type,
      _conf$dialogProps = conf.dialogProps,
      dialogProps = _conf$dialogProps === void 0 ? {} : _conf$dialogProps,
      dialogType = conf.dialogType,
      dialogCaption = conf.dialogCaption,
      menuTitle = conf.menuTitle,
      optionURI = conf.optionURI,
      optionsJsonProp = conf.optionsJsonProp,
      dataColumn = conf.dataColumn,
      nInitFromDate = dialogProps.nInitFromDate,
      valueFn = dialogProps.valueFn,
      valueFnPrefix = dialogProps.valueFnPrefix,
      descrUrl = dialogProps.descrUrl,
      loadFnType = dialogProps.loadFnType,
      isContinious = dialogProps.isContinious,
      loadId = dialogProps.loadId,
      isProxy = dialogProps.isProxy,
      isGetKey = dialogProps.isGetKey,
      onClickInfo = descrUrl ? _ComponentActions["default"].showDescription : void 0,
      loadFn = _RouterLoadFn["default"].getFn(loadFnType, dialogType),
      proxy = isProxy ? _ChartStore["default"].getProxy() : void 0,
      getKey = isGetKey && _ChartStore["default"].getKey,
      onError = isGetKey && _onError,
      onLoad = onLoadChart.bind(null, {
    chartType: itemKey,
    browserType: browserType,
    conf: conf
  }),
      onShow = onShowChart.bind(null, itemKey, browserType, conf);

  if (!loadId) {
    dialogProps.loadId = _Type.LoadType.Q;
  }

  return _RouterDialog["default"].getDialog(dialogType).then(function (Comp) {
    return _react["default"].createElement(Comp, (0, _extends2["default"])({
      key: itemKey,
      caption: dialogCaption || menuTitle,
      optionURI: optionURI,
      optionsJsonProp: optionsJsonProp,
      dataColumn: dataColumn,
      msgOnNotSelected: _Msg["default"].NOT_SELECTED,
      msgOnNotValidFormat: _Msg["default"].NOT_VALID_FORMAT,
      fnValue: _crFnValue(valueFn, valueFnPrefix)
    }, _crDateProps(nInitFromDate, isContinious), {
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
    return _react["default"].createElement(Comp, {
      key: dialogType
    });
  });
};

var _crContCaption = function _crContCaption(conf, browserType) {
  var _caption = conf.chartContainerCaption || conf.contFullCaption || _BrowserConfig["default"][browserType].contFullCaption;

  if (_caption) {
    return _caption;
  }

  var _ref = conf.dialogProps || {},
      _ref$dataSource = _ref.dataSource,
      dataSource = _ref$dataSource === void 0 ? '' : _ref$dataSource;

  _caption = conf.contCaption || conf.dialogCaption || conf.menuTitle || 'Chart Container';
  return dataSource && dataSource.length > 0 ? dataSource + ": " + _caption : _caption;
};

var _crChartContainerComp = function _crChartContainerComp(_ref2) {
  var chartType = _ref2.chartType,
      browserType = _ref2.browserType,
      conf = _ref2.conf;

  var _conf = _getDialogConf(conf, chartType) || {};

  var Comp = _conf.chartContainerComp || _ChartContainer["default"],
      _type = _conf.type || _BrowserConfig["default"][browserType].chartContainerType,
      _caption = _crContCaption(_conf, browserType);

  return _react["default"].createElement(Comp, {
    key: _type,
    caption: _caption,
    chartType: _type,
    browserType: browserType,
    onSetActive: _ComponentActions["default"].setActiveContainer,
    onCloseContainer: _ComponentActions["default"].closeChartContainer.bind(null, _type, browserType),
    onCloseItem: _ChartActions["default"].closeChart,
    onRemoveAll: _ChartActions["default"].removeAll.bind(null, _type, browserType)
  });
};

var Factory = (0, _extends2["default"])({}, _fBrowser["default"], {
  //dialogType, browserType, conf
  createDialog: _crDialogComp,
  //option
  createOptionDialog: _crOptionDialogComp,
  //dialogType, browserType, conf
  createChartContainer: _crChartContainerComp
});
var _default = Factory;
exports["default"] = _default;
//# sourceMappingURL=Factory.js.map