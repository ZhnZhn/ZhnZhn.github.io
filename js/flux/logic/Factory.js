'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RouterDialog = require('./RouterDialog');

var _RouterDialog2 = _interopRequireDefault(_RouterDialog);

var _RouterLoadFn = require('./RouterLoadFn');

var _RouterLoadFn2 = _interopRequireDefault(_RouterLoadFn);

var _RouterFnValue = require('./RouterFnValue');

var _RouterFnValue2 = _interopRequireDefault(_RouterFnValue);

var _fBrowser = require('./fBrowser');

var _fBrowser2 = _interopRequireDefault(_fBrowser);

var _ChartContainer = require('../../components/zhn-containers/ChartContainer');

var _ChartContainer2 = _interopRequireDefault(_ChartContainer);

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _Type = require('../../constants/Type');

var _ComponentActions = require('../actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ChartActions = require('../actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _BrowserConfig = require('../../constants/BrowserConfig');

var _BrowserConfig2 = _interopRequireDefault(_BrowserConfig);

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFromDate = _DateUtils2.default.getFromDate,
    getToDate = _DateUtils2.default.getToDate,
    isYmd = _DateUtils2.default.isYmd,
    isYmdOrEmpty = _DateUtils2.default.isYmdOrEmpty;


var onLoadChart = _ChartActions2.default.loadStock,
    onShowChart = _ChartActions2.default.showChart,
    initFromDate = getFromDate(2),
    initToDate = getToDate();

var _getDialogConf = function _getDialogConf(conf, dialogType) {
  if (conf && conf.dialogConf) {
    return conf;
  }
  var _browserId = dialogType.split('_')[0];
  return _ChartStore2.default.getSourceConfig(_browserId, dialogType);
};

var _crFnValue = function _crFnValue(valueFn, valueFnPrefix) {
  return valueFn ? valueFnPrefix ? _RouterFnValue2.default[valueFn].bind(null, valueFnPrefix) : _RouterFnValue2.default[valueFn] : undefined;
};

var _crDateProps = function _crDateProps(nInitFromDate, isContinious) {
  var _props = isContinious ? {
    msgTestDateOrEmpty: _Msg2.default.TEST_DATE_OR_EMPTY,
    onTestDateOrEmpty: isYmdOrEmpty
  } : undefined;
  return (0, _extends3.default)({
    initFromDate: nInitFromDate ? getFromDate(nInitFromDate) : initFromDate,
    initToDate: initToDate,
    onTestDate: isYmd
  }, _props);
};

var _onError = function _onError(alertDescr) {
  var alertCaption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Request Error';

  _ComponentActions2.default.showAlert({ alertDescr: alertDescr, alertCaption: alertCaption });
};

var _crDialogComp = function _crDialogComp(dType, browserType, dConf) {
  var conf = _getDialogConf(dConf, dType);

  var itemKey = conf.type,
      _conf$dialogProps = conf.dialogProps,
      dialogProps = _conf$dialogProps === undefined ? {} : _conf$dialogProps,
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
      onClickInfo = descrUrl ? _ComponentActions2.default.showDescription : void 0,
      loadFn = _RouterLoadFn2.default.getFn(loadFnType, dialogType),
      proxy = isProxy ? _ChartStore2.default.getProxy() : void 0,
      getKey = isGetKey && _ChartStore2.default.getKey,
      onError = isGetKey && _onError,
      onLoad = onLoadChart.bind(null, {
    chartType: itemKey,
    browserType: browserType, conf: conf
  }),
      onShow = onShowChart.bind(null, itemKey, browserType, conf);

  if (!loadId) {
    dialogProps.loadId = _Type.LoadType.Q;
  }

  return _RouterDialog2.default.getDialog(dialogType).then(function (Comp) {
    return _react2.default.createElement(Comp, (0, _extends3.default)({
      key: itemKey,
      caption: dialogCaption || menuTitle,
      optionURI: optionURI,
      optionsJsonProp: optionsJsonProp,
      dataColumn: dataColumn,
      msgOnNotSelected: _Msg2.default.NOT_SELECTED,
      msgOnNotValidFormat: _Msg2.default.NOT_VALID_FORMAT,
      fnValue: _crFnValue(valueFn, valueFnPrefix)
    }, _crDateProps(nInitFromDate, isContinious), {
      onLoad: onLoad, onShow: onShow,
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

  return _RouterDialog2.default.getDialog(dialogType).then(function (Comp) {
    return _react2.default.createElement(Comp, {
      key: dialogType
    });
  });
};

var _crContCaption = function _crContCaption(conf, browserType) {
  var _caption = conf.chartContainerCaption || conf.contFullCaption || _BrowserConfig2.default[browserType].contFullCaption;
  if (_caption) {
    return _caption;
  }

  var _ref = conf.dialogProps || {},
      _ref$dataSource = _ref.dataSource,
      dataSource = _ref$dataSource === undefined ? '' : _ref$dataSource;

  _caption = conf.contCaption || conf.dialogCaption || conf.menuTitle || 'Chart Container';
  return dataSource && dataSource.length > 0 ? dataSource + ': ' + _caption : _caption;
};

var _crChartContainerComp = function _crChartContainerComp(_ref2) {
  var chartType = _ref2.chartType,
      browserType = _ref2.browserType,
      conf = _ref2.conf;

  var _conf = _getDialogConf(conf, chartType) || {};
  var Comp = _conf.chartContainerComp || _ChartContainer2.default,
      _type = _conf.type || _BrowserConfig2.default[browserType].chartContainerType,
      _caption = _crContCaption(_conf, browserType);

  return _react2.default.createElement(Comp, {
    key: _type,
    caption: _caption,
    chartType: _type,
    browserType: browserType,
    onSetActive: _ComponentActions2.default.setActiveContainer,
    onCloseContainer: _ComponentActions2.default.closeChartContainer.bind(null, _type, browserType),
    onCloseItem: _ChartActions2.default.closeChart,
    onRemoveAll: _ChartActions2.default.removeAll.bind(null, _type, browserType)
  });
};

var Factory = (0, _extends3.default)({}, _fBrowser2.default, {

  //dialogType, browserType, conf
  createDialog: _crDialogComp,
  //option
  createOptionDialog: _crOptionDialogComp,
  //dialogType, browserType, conf
  createChartContainer: _crChartContainerComp
});

exports.default = Factory;
//# sourceMappingURL=Factory.js.map