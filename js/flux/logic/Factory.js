'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RouterDialog = require('./RouterDialog');

var _RouterDialog2 = _interopRequireDefault(_RouterDialog);

var _RouterFnValue = require('./RouterFnValue');

var _RouterFnValue2 = _interopRequireDefault(_RouterFnValue);

var _ChartContainer = require('../../components/ChartContainer2');

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

var _SourceBrowserDynamic = require('../../components/browser-container/SourceBrowserDynamic');

var _SourceBrowserDynamic2 = _interopRequireDefault(_SourceBrowserDynamic);

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onLoadChart = _ChartActions2.default.loadStock,
    onShowChart = _ChartActions2.default.showChart,
    initFromDate = _DateUtils2.default.getFromDate(2),
    initToDate = _DateUtils2.default.getToDate(),
    onTestDate = _DateUtils2.default.isValidDate,
    onTestDateOrEmpty = _DateUtils2.default.isValidDateOrEmpty;

/*
const noopArr = function(){
  return [];
}
*/

var _showModalDialogDescription = function _showModalDialogDescription(option) {
  _ComponentActions2.default.showModalDialog(_Type.ModalDialog.DESCRIPTION, option);
};

var createDialogComp = function createDialogComp(conf, browserType) {
  var dialogType = conf.type,
      props = conf.dialogProps ? conf.dialogProps : {},
      Comp = conf.dialogType ? _RouterDialog2.default[conf.dialogType] ? _RouterDialog2.default[conf.dialogType] : _RouterDialog2.default.DEFAULT : _RouterDialog2.default.DEFAULT,
      _initFromDate = props.nInitFromDate ? _DateUtils2.default.getFromDate(props.nInitFromDate) : initFromDate,
      _fnValue = props.valueFn ? props.valueFnPrefix ? _RouterFnValue2.default[props.valueFn].bind(null, props.valueFnPrefix) : _RouterFnValue2.default[props.valueFn] : undefined,
      onClickInfo = props.descrUrl ? _showModalDialogDescription : undefined;

  if (props.isContinious) {
    props.msgTestDateOrEmpty = _Msg2.default.TEST_DATE_OR_EMPTY;
    props.onTestDateOrEmpty = onTestDateOrEmpty;
  }

  if (!props.loadId) {
    props.loadId = _Type.LoadType.Q;
  }

  return _react2.default.createElement(Comp, _extends({
    key: dialogType,
    caption: conf.dialogCaption,
    optionURI: conf.optionURI,
    optionsJsonProp: conf.optionsJsonProp,
    dataColumn: conf.dataColumn,
    msgOnNotSelected: _Msg2.default.NOT_SELECTED,
    msgOnNotValidFormat: _Msg2.default.NOT_VALID_FORMAT,
    onLoad: onLoadChart.bind(null, dialogType, browserType),
    onShow: onShowChart.bind(null, dialogType, browserType),
    fnValue: _fnValue,
    initFromDate: _initFromDate,
    initToDate: initToDate, onTestDate: onTestDate,
    onClickInfo: onClickInfo
  }, props));
};

var onCloseItem = _ChartActions2.default.closeChart;
var fnCloseChartContainer = function fnCloseChartContainer(chartType, browserType) {
  return _ComponentActions2.default.closeChartContainer.bind(null, chartType, browserType);
};
var createChartContainerComp = function createChartContainerComp(conf, browserType) {
  var Comp = conf.chartContainerComp ? conf.chartContainerComp : _ChartContainer2.default;
  return _react2.default.createElement(Comp, {
    key: conf.type,
    caption: conf.chartContainerCaption,
    chartType: conf.type,
    browserType: browserType,
    onCloseContainer: fnCloseChartContainer(conf.type, browserType),
    onCloseItem: onCloseItem
  });
};

var getDataConf = function getDataConf(dialogType) {
  var dataId = dialogType.split('_')[0];
  return _ChartStore2.default.getSourceConfig(dataId, dialogType);
};

var Factory = {};
Factory.createDialog = function (dialogType, browserType) {
  return createDialogComp(getDataConf(dialogType), browserType);
};

Factory.createChartContainer = function (dialogType, browserType) {
  return createChartContainerComp(getDataConf(dialogType), browserType);
};

Factory.createBrowserDynamic = function (_ref) {
  var browserType = _ref.browserType;
  var _ref$caption = _ref.caption;
  var caption = _ref$caption === undefined ? '' : _ref$caption;
  var sourceMenuUrl = _ref.sourceMenuUrl;

  return _react2.default.createElement(_SourceBrowserDynamic2.default, {
    key: browserType,
    browserType: browserType,
    store: _ChartStore2.default,
    isInitShow: true,
    caption: caption,
    sourceMenuUrl: sourceMenuUrl
  });
};

exports.default = Factory;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\Factory.js.map