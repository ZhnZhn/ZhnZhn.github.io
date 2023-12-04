"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crAsyncBrowser = void 0;
var _uiApi = require("../../components/uiApi");
var _ComponentActions = require("../actions/ComponentActions");
var _compStore = require("../stores/compStore");
var _browserStore = require("../stores/browserStore");
var _watchListStore = require("../watch-list/watchListStore");
var _settingStore = require("../stores/settingStore");
var _itemStore = require("../stores/itemStore");
var _BrowserType = require("../../constants/BrowserType");
var _RouterBrowser = _interopRequireDefault(require("./RouterBrowser"));
var _RouterItemOption = _interopRequireDefault(require("../../components/zhn-select/RouterItemOption"));
var _RouterBrowserItem = _interopRequireDefault(require("../../components/browser-items/RouterBrowserItem"));
const _crBrowserWatchList = Comp => (0, _uiApi.createElement)(Comp, {
  key: _BrowserType.BT_WATCH_LIST,
  browserType: _BrowserType.BT_WATCH_LIST,
  caption: "Watch List",
  isInitShow: true,
  useMsBrowserShow: _browserStore.useMsBrowserShow,
  useWatchList: _watchListStore.useWatchList
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
      onShow: (0, _uiApi.bindTo)(_itemStore.showItemsContainer, chartContainerType, browserType)
    }) : void 0;
  return (0, _uiApi.createElement)(Comp, {
    dfProps,
    key: browserType,
    browserType,
    isInitShow: true,
    caption,
    ItemOptionComp,
    ItemComp,
    descrUrl,
    onClickInfo,
    useMsBrowserShow: _browserStore.useMsBrowserShow,
    useMsBrowserLoad: _browserStore.useMsBrowserLoad,
    onLoadMenu: (0, _uiApi.bindTo)(_browserStore.loadBrowser, {
      browserType,
      caption,
      sourceMenuUrl
    }),
    onShowLoadDialog,
    //for Type2
    getProxy: _settingStore.getProxy // for BrowserSlider
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