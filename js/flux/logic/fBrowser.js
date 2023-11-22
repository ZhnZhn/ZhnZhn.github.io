"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crAsyncBrowser = void 0;
var _uiApi = require("../../components/uiApi");
var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));
var _ComponentActions = require("../actions/ComponentActions");
var _compStore = require("../stores/compStore");
var _ChartActions = require("../actions/ChartActions");
var _BrowserActions = require("../actions/BrowserActions");
var _BrowserType = require("../../constants/BrowserType");
var _RouterBrowser = _interopRequireDefault(require("./RouterBrowser"));
var _RouterItemOption = _interopRequireDefault(require("../../components/zhn-select/RouterItemOption"));
var _RouterBrowserItem = _interopRequireDefault(require("../../components/browser-items/RouterBrowserItem"));
const _crBrowserWatchList = Comp => (0, _uiApi.createElement)(Comp, {
  key: _BrowserType.BT_WATCH_LIST,
  browserType: _BrowserType.BT_WATCH_LIST,
  caption: "Watch List",
  isInitShow: true,
  store: _ChartStore.default,
  showAction: _BrowserActions.BAT_SHOW_BROWSER_DYNAMIC,
  updateAction: _BrowserActions.BAT_UPDATE_WATCH_BROWSER
});
const _crBrowserDynamic = (Comp, option) => {
  const {
      browserType,
      caption = 'Source Browser',
      sourceMenuUrl,
      chartContainerType,
      modalDialogType,
      itemOptionType,
      itemType,
      descrUrl,
      dfProps
    } = option,
    ItemOptionComp = itemOptionType ? _RouterItemOption.default[itemOptionType] || _RouterBrowserItem.default.DF : _RouterBrowserItem.default.DF,
    ItemComp = itemType ? _RouterBrowserItem.default[itemType] || _RouterBrowserItem.default.DEFAULT : void 0,
    onClickInfo = typeof ItemComp !== "undefined" ? _ComponentActions.ComponentActions.showDescription : void 0
    //for Type2
    ,
    onShowLoadDialog = chartContainerType ? item => (0, _compStore.showModalDialog)(modalDialogType, {
      item,
      browserType,
      chartContainerType,
      onShow: (0, _uiApi.bindTo)(_ChartActions.ChartActions[_ChartActions.CHAT_SHOW], chartContainerType, browserType)
    }) : void 0;
  return (0, _uiApi.createElement)(Comp, {
    dfProps,
    key: browserType,
    browserType,
    store: _ChartStore.default,
    isInitShow: true,
    caption,
    ItemOptionComp,
    ItemComp,
    descrUrl,
    onClickInfo,
    showAction: _BrowserActions.BAT_SHOW_BROWSER_DYNAMIC,
    loadedAction: _BrowserActions.BAT_LOAD_BROWSER_DYNAMIC_COMPLETED,
    failedAction: _BrowserActions.BAT_LOAD_BROWSER_FAILED,
    updateAction: _BrowserActions.BAT_UPDATE_BROWSER_MENU,
    //for Type
    onLoadMenu: (0, _uiApi.bindTo)(_BrowserActions.BrowserActions.loadBrowserDynamic, {
      browserType,
      caption,
      sourceMenuUrl
    }),
    onShowLoadDialog //for Type2
  });
};

const STAT_ALL_TYPES = [_BrowserType.BT_SWEDEN_STAT_ALL, _BrowserType.BT_NORWAY_STAT_ALL, _BrowserType.BT_FINLAND_STAT_ALL, _BrowserType.BT_DENMARK_STAT_ALL, _BrowserType.BT_IRELAND_STAT_ALL];
const _isStatAll = browserType => STAT_ALL_TYPES.indexOf(browserType) !== -1;
const crAsyncBrowser = option => {
  const bT = option.browserType;
  if (bT === _BrowserType.BT_WATCH_LIST) {
    return _RouterBrowser.default[_BrowserType.BT_WATCH_LIST].then(_crBrowserWatchList);
  }
  if (_isStatAll(bT)) {
    return _RouterBrowser.default.STAT_ALL.then(Comp => _crBrowserDynamic(Comp, option));
  }
  return Promise.resolve(_crBrowserDynamic(_RouterBrowser.default[bT] || _RouterBrowser.default.DEFAULT, option));
};
exports.crAsyncBrowser = crAsyncBrowser;
//# sourceMappingURL=fBrowser.js.map