'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ComponentActions = require('../actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ChartActions = require('../actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _BrowserActions = require('../actions/BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

var _Type = require('../../constants/Type');

var _RouterBrowser = require('./RouterBrowser');

var _RouterBrowser2 = _interopRequireDefault(_RouterBrowser);

var _RouterItemOption = require('../../components/zhn-select/RouterItemOption');

var _RouterItemOption2 = _interopRequireDefault(_RouterItemOption);

var _RouterBrowserItem = require('../../components/browser-items/RouterBrowserItem');

var _RouterBrowserItem2 = _interopRequireDefault(_RouterBrowserItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crBrowserWatchList = function _crBrowserWatchList(Comp) {
  return _react2.default.createElement(Comp, {
    key: _Type.BrowserType.WATCH_LIST,
    browserType: _Type.BrowserType.WATCH_LIST,
    caption: "Watch List",
    isInitShow: true,
    store: _ChartStore2.default,
    //showAction: BAT.SHOW_BROWSER,
    showAction: _BrowserActions.BrowserActionTypes.SHOW_BROWSER_DYNAMIC,
    updateAction: _BrowserActions.BrowserActionTypes.UPDATE_WATCH_BROWSER
  });
};

var _crBrowserDynamic = function _crBrowserDynamic(Comp, option) {
  var browserType = option.browserType,
      _option$caption = option.caption,
      caption = _option$caption === undefined ? 'Source Browser' : _option$caption,
      sourceMenuUrl = option.sourceMenuUrl,
      chartContainerType = option.chartContainerType,
      modalDialogType = option.modalDialogType,
      itemOptionType = option.itemOptionType,
      itemType = option.itemType,
      descrUrl = option.descrUrl,
      dfProps = option.dfProps,
      ItemOptionComp = itemOptionType ? _RouterItemOption2.default[itemOptionType] || _RouterBrowserItem2.default.DEFAULT : _RouterBrowserItem2.default.DEFAULT,
      ItemComp = itemType ? _RouterBrowserItem2.default[itemType] || _RouterBrowserItem2.default.DEFAULT : undefined,
      onClickInfo = typeof ItemComp !== "undefined" ? _ComponentActions2.default.showDescription : undefined,
      onShowContainer = _ChartActions2.default.showChart.bind(null, chartContainerType, browserType);

  return _react2.default.createElement(Comp, {
    dfProps: dfProps,
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
};

var fBrowser = {
  crAsyncBrowser: function crAsyncBrowser(option) {
    var browserType = option.browserType;

    switch (browserType) {
      case _Type.BrowserType.WATCH_LIST:
        return _RouterBrowser2.default[_Type.BrowserType.WATCH_LIST].then(_crBrowserWatchList);

      case _Type.BrowserType.SWEDEN_STAT_ALL:
      case _Type.BrowserType.NORWAY_STAT_ALL:
      case _Type.BrowserType.FINLAND_STAT_ALL:
        return _RouterBrowser2.default.STAT_ALL.then(function (Comp) {
          return _crBrowserDynamic(Comp, option);
        });

      default:
        return Promise.resolve(_crBrowserDynamic(_RouterBrowser2.default[browserType] || _RouterBrowser2.default.DEFAULT, option));
    }
  }
};

exports.default = fBrowser;
//# sourceMappingURL=fBrowser.js.map