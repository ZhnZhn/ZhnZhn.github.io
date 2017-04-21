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

var _RouterBrowser = require('./RouterBrowser');

var _RouterBrowser2 = _interopRequireDefault(_RouterBrowser);

var _RouterItemOption = require('../../components/zhn-select/RouterItemOption');

var _RouterItemOption2 = _interopRequireDefault(_RouterItemOption);

var _RouterBrowserItem = require('../../components/browser-items/RouterBrowserItem');

var _RouterBrowserItem2 = _interopRequireDefault(_RouterBrowserItem);

var _ChartContainer = require('../../components/zhn-containers/ChartContainer');

var _ChartContainer2 = _interopRequireDefault(_ChartContainer);

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _Type = require('../../constants/Type');

var _ComponentActions = require('../actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ChartActions = require('../actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _BrowserActions = require('../actions/BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _BrowserConfig = require('../../constants/BrowserConfig');

var _BrowserConfig2 = _interopRequireDefault(_BrowserConfig);

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onLoadChart = _ChartActions2.default.loadStock,
    onShowChart = _ChartActions2.default.showChart,
    initFromDate = _DateUtils2.default.getFromDate(2),
    initToDate = _DateUtils2.default.getToDate(),
    onTestDate = _DateUtils2.default.isValidDate,
    onTestDateOrEmpty = _DateUtils2.default.isValidDateOrEmpty;

var _showModalDialogDescription = function _showModalDialogDescription(option) {
  _ComponentActions2.default.showModalDialog(_Type.ModalDialog.DESCRIPTION, option);
};

var createDialogComp = function createDialogComp(conf, browserType) {
  var dialogType = conf.type,
      props = conf.dialogProps ? conf.dialogProps : {},
      Comp = conf.dialogType ? _RouterDialog2.default[conf.dialogType] ? _RouterDialog2.default[conf.dialogType] : _RouterDialog2.default.DEFAULT : _RouterDialog2.default.DEFAULT,
      _initFromDate = props.nInitFromDate ? _DateUtils2.default.getFromDate(props.nInitFromDate) : initFromDate,
      _fnValue = props.valueFn ? props.valueFnPrefix ? _RouterFnValue2.default[props.valueFn].bind(null, props.valueFnPrefix) : _RouterFnValue2.default[props.valueFn] : undefined
  /*
   , _fnLink = (props.linkFn)
        ? RouterFnLink[props.linkFn]
        : undefined
  */
  ,
      onClickInfo = props.descrUrl ? _showModalDialogDescription : undefined,
      loadFn = _RouterLoadFn2.default.getFn(props.loadFnType, conf.dialogType);

  if (props.isContinious) {
    props.msgTestDateOrEmpty = _Msg2.default.TEST_DATE_OR_EMPTY;
    props.onTestDateOrEmpty = onTestDateOrEmpty;
  }

  if (!props.loadId) {
    props.loadId = _Type.LoadType.Q;
  }

  return _react2.default.createElement(Comp, (0, _extends3.default)({
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
    //fnLink : _fnLink,
    initFromDate: _initFromDate,
    initToDate: initToDate, onTestDate: onTestDate,
    onClickInfo: onClickInfo,
    loadFn: loadFn
  }, props));
};

var _createOptionDialog = function _createOptionDialog(option) {
  var dialogType = option.dialogType,
      Comp = _RouterDialog2.default[dialogType];

  return _react2.default.createElement(Comp, {
    key: dialogType
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

var _getDialogConf = function _getDialogConf(dialogType) {
  var _browserId = dialogType.split('_')[0];
  return _ChartStore2.default.getSourceConfig(_browserId, dialogType);
};

var Factory = {
  createDialog: function createDialog(dialogType, browserType) {
    return createDialogComp(_getDialogConf(dialogType), browserType);
  },
  createOptionDialog: function createOptionDialog(option) {
    return _createOptionDialog(option);
  },
  createChartContainer: function createChartContainer(dialogType, browserType) {
    return createChartContainerComp(_getDialogConf(dialogType), browserType);
  },
  createBrowserDynamic: function createBrowserDynamic(option) {
    var browserType = option.browserType,
        _option$caption = option.caption,
        caption = _option$caption === undefined ? 'Source Browser' : _option$caption,
        sourceMenuUrl = option.sourceMenuUrl,
        chartContainerType = option.chartContainerType,
        modalDialogType = option.modalDialogType,
        itemOptionType = option.itemOptionType,
        itemType = option.itemType,
        descrUrl = option.descrUrl,
        comp = _RouterBrowser2.default[browserType] || _RouterBrowser2.default.DEFAULT,
        ItemOptionComp = itemOptionType ? _RouterItemOption2.default[itemOptionType] || _RouterBrowserItem2.default.DEFAULT : _RouterBrowserItem2.default.DEFAULT,
        ItemComp = itemType ? _RouterBrowserItem2.default[itemType] || _RouterBrowserItem2.default.DEFAULT : undefined,
        onClickInfo = typeof ItemComp !== "undefined" ? _showModalDialogDescription : undefined,
        onShowContainer = _ChartActions2.default.showChart.bind(null, chartContainerType, browserType);

    return _react2.default.createElement(comp, {
      key: browserType,
      browserType: browserType,
      store: _ChartStore2.default,
      isInitShow: true,
      caption: caption,
      sourceMenuUrl: sourceMenuUrl,
      modalDialogType: modalDialogType,
      chartContainerType: chartContainerType,
      ItemOptionComp: ItemOptionComp,
      ItemComp: ItemComp,
      descrUrl: descrUrl,
      onClickInfo: onClickInfo,
      onShowContainer: onShowContainer,

      showAction: _BrowserActions.BrowserActionTypes.SHOW_BROWSER_DYNAMIC,
      loadCompletedAction: _BrowserActions.BrowserActionTypes.LOAD_BROWSER_DYNAMIC_COMPLETED,
      updateAction: _BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU, //for Type
      onLoadMenu: _BrowserActions2.default.loadBrowserDynamic,
      onShowLoadDialog: _ComponentActions2.default.showModalDialog //for Type2

    });
  }
};

exports.default = Factory;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\Factory.js.map