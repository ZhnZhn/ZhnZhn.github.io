'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogType = require('../../components/dialogs/DialogType3');

var _DialogType2 = _interopRequireDefault(_DialogType);

var _DialogType4A = require('../../components/dialogs/DialogType4A');

var _DialogType4A2 = _interopRequireDefault(_DialogType4A);

var _DialogType3 = require('../../components/dialogs/DialogType5');

var _DialogType4 = _interopRequireDefault(_DialogType3);

var _UNCommodityTradeDialog = require('../../components/quandl-browser/UNCommodityTradeDialog');

var _UNCommodityTradeDialog2 = _interopRequireDefault(_UNCommodityTradeDialog);

var _BigMacDialog = require('../../components/quandl-browser/BigMacDialog');

var _BigMacDialog2 = _interopRequireDefault(_BigMacDialog);

var _FuturesDialog = require('../../components/quandl-browser/FuturesDialog');

var _FuturesDialog2 = _interopRequireDefault(_FuturesDialog);

var _JodiWorldOilDialog = require('../../components/quandl-browser/JodiWorldOilDialog');

var _JodiWorldOilDialog2 = _interopRequireDefault(_JodiWorldOilDialog);

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

var _rDialog = {
  DialogType3: _DialogType2.default,
  DialogType4A: _DialogType4A2.default,
  DialogType5: _DialogType4.default,
  UNCommodityTradeDialog: _UNCommodityTradeDialog2.default,
  BigMacDialog: _BigMacDialog2.default,
  FuturesDialog: _FuturesDialog2.default,
  JodiWorldOilDialog: _JodiWorldOilDialog2.default
};

var _rFnValue = {
  RTwo: function RTwo(one, two) {
    return '' + two;
  },
  ROneTwo: function ROneTwo(one, two) {
    return one + '/' + two;
  },
  ROneDashTwo: function ROneDashTwo(one, two) {
    return one + '_' + two;
  },
  RPrefixOne: function RPrefixOne(prefix, one) {
    return prefix + '_' + one;
  },
  RPrefixOneTwo: function RPrefixOneTwo(prefix, one, two) {
    return prefix + '/' + one + '_' + two;
  },
  RPrefixTwoOne: function RPrefixTwoOne(prefix, one, two) {
    return prefix + '/' + two + '_' + one;
  },

  RZill: function RZill(one, two, three) {
    return 'ZILL/' + two + three + '_' + one;
  },

  RJodiGas: function RJodiGas(one, two, three) {
    return 'JODI/GAS_' + two + three + '_' + one;
  },
  RJodiOil: function RJodiOil(country, product, flow, units) {
    return 'JODI/OIL_' + product + flow + units + '_' + country;
  }
};

var onLoadChart = _ChartActions2.default.loadStock,
    onShowChart = _ChartActions2.default.showChart,
    initFromDate = _DateUtils2.default.getFromDate(2),
    initToDate = _DateUtils2.default.getToDate(),
    onTestDate = _DateUtils2.default.isValidDate;

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
      Comp = conf.dialogType ? _rDialog[conf.dialogType] ? _rDialog[conf.dialogType] : _DialogType2.default : _DialogType2.default,
      _initFromDate = props.nInitFromDate ? _DateUtils2.default.getFromDate(props.nInitFromDate) : initFromDate,
      _fnValue = props.valueFn ? props.valueFnPrefix ? _rFnValue[props.valueFn].bind(null, props.valueFnPrefix) : _rFnValue[props.valueFn] : undefined,
      onClickInfo = props.descrUrl ? _showModalDialogDescription : undefined;

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