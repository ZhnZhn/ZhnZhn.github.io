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

var createDialogComp = function createDialogComp(conf) {
  var dialogType = conf.type;
  var props = conf.dialogProps ? conf.dialogProps : {};
  var fnOption = conf.fnOption ? conf.fnOption : noopArr;
  var Comp = conf.dialogComp ? conf.dialogComp : _DialogType2.default;

  return _react2.default.createElement(Comp, _extends({
    key: dialogType,
    caption: conf.dialogCaption,
    optionStocks: fnOption(),
    onLoad: onLoadChart.bind(null, dialogType),
    onShow: onShowChart.bind(null, dialogType),
    initFromDate: initFromDate, initToDate: initToDate, onTestDate: onTestDate
  }, props));
};

var onCloseItem = _ChartActions2.default.closeChart;
var createChartContainerComp = function createChartContainerComp(conf) {
  var Comp = conf.chartContainerComp ? conf.chartContainerComp : _ChartContainer2.default;
  return _react2.default.createElement(Comp, {
    key: conf.type,
    caption: conf.chartContainerCaption,
    chartType: conf.type,
    onCloseItem: onCloseItem
  });
};

var hmDialogData = {
  QE: _DataQE2.default,
  QG: _DataQG2.default,
  QY: _DataQY2.default
};

var getDataConf = function getDataConf(dialogType) {
  var dataId = dialogType.split('_')[0];
  return hmDialogData[dataId][dialogType];
};

var Factory = {};
Factory.createDialog = function (dialogType) {
  return createDialogComp(getDataConf(dialogType));
};

Factory.createChartContainer = function (dialogType) {
  return createChartContainerComp(getDataConf(dialogType));
};

exports.default = Factory;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\Factory.js.map