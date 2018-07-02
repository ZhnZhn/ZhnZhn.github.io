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
    initToDate = getToDate(),
    onTestDate = isYmd,
    onTestDateOrEmpty = isYmdOrEmpty;

var _showModalDialogDescription = function _showModalDialogDescription(option) {
  _ComponentActions2.default.showModalDialog(_Type.ModalDialog.DESCRIPTION, option);
};

var createDialogComp = function createDialogComp(conf, browserType) {
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
      _initFromDate = nInitFromDate ? getFromDate(nInitFromDate) : initFromDate,
      _fnValue = valueFn ? valueFnPrefix ? _RouterFnValue2.default[valueFn].bind(null, valueFnPrefix) : _RouterFnValue2.default[valueFn] : undefined,
      onClickInfo = descrUrl ? _showModalDialogDescription : undefined,
      loadFn = _RouterLoadFn2.default.getFn(loadFnType, dialogType),
      proxy = isProxy ? _ChartStore2.default.getProxy() : undefined,
      onLoad = onLoadChart.bind(null, {
    chartType: itemKey,
    browserType: browserType, conf: conf
  }),
      onShow = onShowChart.bind(null, itemKey, browserType, conf);

  if (isContinious) {
    Object.assign(dialogProps, {
      msgTestDateOrEmpty: _Msg2.default.TEST_DATE_OR_EMPTY,
      onTestDateOrEmpty: onTestDateOrEmpty
    });
  }
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
      onLoad: onLoad, onShow: onShow,
      fnValue: _fnValue,
      initFromDate: _initFromDate,
      initToDate: initToDate, onTestDate: onTestDate,
      onClickInfo: onClickInfo,
      loadFn: loadFn,
      proxy: proxy
    }, dialogProps));
  });
};

var _createOptionDialog = function _createOptionDialog(option) {
  var dialogType = option.dialogType;

  return _RouterDialog2.default.getDialog(dialogType).then(function (Comp) {
    return _react2.default.createElement(Comp, {
      key: dialogType
    });
  });
};

var onCloseItem = _ChartActions2.default.closeChart;
var fnCloseChartContainer = function fnCloseChartContainer(chartType, browserType) {
  return _ComponentActions2.default.closeChartContainer.bind(null, chartType, browserType);
};
var createChartContainerComp = function createChartContainerComp() {
  var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var browserType = arguments[1];

  var Comp = conf.chartContainerComp ? conf.chartContainerComp : _ChartContainer2.default,
      _type = conf.type ? conf.type : _BrowserConfig2.default[browserType].chartContainerType,
      _caption = conf.chartContainerCaption ? conf.chartContainerCaption : _BrowserConfig2.default[browserType].chartContainerCaption;

  return _react2.default.createElement(Comp, {
    key: _type,
    caption: _caption,
    chartType: _type,
    browserType: browserType,
    onCloseContainer: fnCloseChartContainer(_type, browserType),
    onCloseItem: onCloseItem
  });
};

var _getDialogConf = function _getDialogConf(conf, dialogType) {
  if (conf && conf.dialogConf) {
    return conf;
  }
  var _browserId = dialogType.split('_')[0];
  return _ChartStore2.default.getSourceConfig(_browserId, dialogType);
};

var Factory = (0, _extends3.default)({}, _fBrowser2.default, {
  createDialog: function createDialog(dialogType, browserType, conf) {
    return createDialogComp(_getDialogConf(conf, dialogType), browserType);
  },
  createOptionDialog: function createOptionDialog(option) {
    return _createOptionDialog(option);
  },
  createChartContainer: function createChartContainer(dialogType, browserType, conf) {
    return createChartContainerComp(_getDialogConf(conf, dialogType), browserType);
  }
});

exports.default = Factory;
//# sourceMappingURL=Factory.js.map