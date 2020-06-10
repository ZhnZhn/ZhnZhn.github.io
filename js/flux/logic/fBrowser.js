"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

var _ComponentActions = _interopRequireDefault(require("../actions/ComponentActions"));

var _ChartActions = _interopRequireDefault(require("../actions/ChartActions"));

var _BrowserActions = _interopRequireWildcard(require("../actions/BrowserActions"));

var _Type = require("../../constants/Type");

var _RouterBrowser = _interopRequireDefault(require("./RouterBrowser"));

var _RouterItemOption = _interopRequireDefault(require("../../components/zhn-select/RouterItemOption"));

var _RouterBrowserItem = _interopRequireDefault(require("../../components/browser-items/RouterBrowserItem"));

var _crBrowserWatchList = function _crBrowserWatchList(Comp) {
  return /*#__PURE__*/_react["default"].createElement(Comp, {
    key: _Type.BrowserType.WATCH_LIST,
    browserType: _Type.BrowserType.WATCH_LIST,
    caption: "Watch List",
    isInitShow: true,
    store: _ChartStore["default"],
    //showAction: BAT.SHOW_BROWSER,
    showAction: _BrowserActions.BrowserActionTypes.SHOW_BROWSER_DYNAMIC,
    updateAction: _BrowserActions.BrowserActionTypes.UPDATE_WATCH_BROWSER
  });
};

var _crBrowserDynamic = function _crBrowserDynamic(Comp, option) {
  var browserType = option.browserType,
      _option$caption = option.caption,
      caption = _option$caption === void 0 ? 'Source Browser' : _option$caption,
      sourceMenuUrl = option.sourceMenuUrl,
      chartContainerType = option.chartContainerType,
      modalDialogType = option.modalDialogType,
      itemOptionType = option.itemOptionType,
      itemType = option.itemType,
      descrUrl = option.descrUrl,
      dfProps = option.dfProps,
      ItemOptionComp = itemOptionType ? _RouterItemOption["default"][itemOptionType] || _RouterBrowserItem["default"].DEFAULT : _RouterBrowserItem["default"].DEFAULT,
      ItemComp = itemType ? _RouterBrowserItem["default"][itemType] || _RouterBrowserItem["default"].DEFAULT : undefined,
      onClickInfo = typeof ItemComp !== "undefined" ? _ComponentActions["default"].showDescription : undefined,
      onShowContainer = _ChartActions["default"].showChart.bind(null, chartContainerType, browserType);

  return /*#__PURE__*/_react["default"].createElement(Comp, {
    dfProps: dfProps,
    key: browserType,
    browserType: browserType,
    store: _ChartStore["default"],
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
    updateAction: _BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU,
    //for Type
    onLoadMenu: _BrowserActions["default"].loadBrowserDynamic,
    onShowLoadDialog: _ComponentActions["default"].showModalDialog //for Type2

  });
};

var fBrowser = {
  crAsyncBrowser: function crAsyncBrowser(option) {
    var browserType = option.browserType;

    switch (browserType) {
      case _Type.BrowserType.WATCH_LIST:
        return _RouterBrowser["default"][_Type.BrowserType.WATCH_LIST].then(_crBrowserWatchList);

      case _Type.BrowserType.SWEDEN_STAT_ALL:
      case _Type.BrowserType.NORWAY_STAT_ALL:
      case _Type.BrowserType.FINLAND_STAT_ALL:
        return _RouterBrowser["default"].STAT_ALL.then(function (Comp) {
          return _crBrowserDynamic(Comp, option);
        });

      default:
        return Promise.resolve(_crBrowserDynamic(_RouterBrowser["default"][browserType] || _RouterBrowser["default"].DEFAULT, option));
    }
  }
};
var _default = fBrowser;
exports["default"] = _default;
//# sourceMappingURL=fBrowser.js.map