'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogType = require('../../components/dialogs/DialogType3');

var _DialogType2 = _interopRequireDefault(_DialogType);

var _ChartContainer = require('../../components/ChartContainer2');

var _ChartContainer2 = _interopRequireDefault(_ChartContainer);

var _DataQE = require('../../constants/DataQE');

var _DataQE2 = _interopRequireDefault(_DataQE);

var _DataQG = require('../../constants/DataQG');

var _DataQG2 = _interopRequireDefault(_DataQG);

var _DataQY = require('../../constants/DataQY');

var _DataQY2 = _interopRequireDefault(_DataQY);

var _DataWL = require('../../constants/DataWL');

var _DataWL2 = _interopRequireDefault(_DataWL);

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _Type = require('../../constants/Type');

var _ComponentActions = require('../actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ChartActions = require('../actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onLoadChart = _ChartActions2.default.loadStock,
    onShowChart = _ChartActions2.default.showChart,
    initFromDate = _DateUtils2.default.getFromDate(2),
    initToDate = _DateUtils2.default.getToDate(),
    onTestDate = _DateUtils2.default.isValidDate;

var noopArr = function noopArr() {
  return [];
};

var _showModalDialogDescription = function _showModalDialogDescription(option) {
  _ComponentActions2.default.showModalDialog(_Type.ModalDialog.DESCRIPTION, option);
};

var createDialogComp = function createDialogComp(conf, browserType) {
  var dialogType = conf.type,
      props = conf.dialogProps ? conf.dialogProps : {},
      fnOption = conf.fnOption ? conf.fnOption : noopArr,
      Comp = conf.dialogComp ? conf.dialogComp : _DialogType2.default,
      onClickInfo = props.descrUrl ? _showModalDialogDescription : undefined;

  return _react2.default.createElement(Comp, _extends({
    key: dialogType,
    caption: conf.dialogCaption,
    optionStocks: fnOption(),
    optionURI: conf.optionURI,
    optionsJsonProp: conf.optionsJsonProp,
    dataColumn: conf.dataColumn,
    msgOnNotSelected: _Msg2.default.NOT_SELECTED,
    msgOnNotValidFormat: _Msg2.default.NOT_VALID_FORMAT,
    onLoad: onLoadChart.bind(null, dialogType, browserType),
    onShow: onShowChart.bind(null, dialogType, browserType),
    initFromDate: initFromDate, initToDate: initToDate, onTestDate: onTestDate,
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

var hmDialogData = {
  QE: _DataQE2.default,
  QG: _DataQG2.default,
  QY: _DataQY2.default,

  WL: _DataWL2.default
};

var getDataConf = function getDataConf(dialogType) {
  var dataId = dialogType.split('_')[0];
  return hmDialogData[dataId][dialogType];
};

var Factory = {};
Factory.createDialog = function (dialogType, browserType) {
  return createDialogComp(getDataConf(dialogType), browserType);
};

Factory.createChartContainer = function (dialogType, browserType) {
  return createChartContainerComp(getDataConf(dialogType), browserType);
};

exports.default = Factory;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\Factory.js.map