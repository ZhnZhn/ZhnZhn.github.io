"use strict";

exports.__esModule = true;
exports.crAsyncBrowser = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _bindTo = require("../../utils/bindTo");
var _arrFn = require("../../utils/arrFn");
var _BrowserType = require("../../constants/BrowserType");
var _ComponentActions = require("../actions/ComponentActions");
var _compStore = require("../stores/compStore");
var _itemStore = require("../stores/itemStore");
var _settingStore = require("../stores/settingStore");
var _browserStore = require("../stores/browserStore");
var _watchListStore = require("../watch-list/watchListStore");
var _RouterItemOption = require("../../components/zhn-select/RouterItemOption");
var _RouterBrowserItem = require("../../components/browser-items/RouterBrowserItem");
var _RouterBrowser = require("./RouterBrowser");
var _jsxRuntime = require("react/jsx-runtime");
const _crBrowserWatchList = Comp => /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
  isInitShow: true,
  browserType: _BrowserType.BT_WATCH_LIST,
  caption: "Watch List",
  useMsBrowserShow: _browserStore.useMsBrowserShow,
  useWatchList: _watchListStore.useWatchList
}, _BrowserType.BT_WATCH_LIST);
const _crBrowserDynamic = (Comp, option) => {
  const {
      browserType,
      caption = "Source Browser",
      itemStyle,
      topicStyle,
      sourceMenuUrl,
      chartContainerType,
      modalDialogType,
      itemOptionType,
      itemType,
      descrUrl,
      dfProps
    } = option,
    ItemComp = (0, _RouterBrowserItem.getBrowserItemComp)(itemType);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
    isInitShow: true,
    dfProps: dfProps,
    browserType: browserType,
    caption: caption,
    descrUrl: descrUrl,
    itemStyle: itemStyle,
    topicStyle: topicStyle,
    ItemOptionComp: (0, _RouterItemOption.getItemOptionComp)(itemOptionType),
    ItemComp: ItemComp,
    onClickInfo: (0, _isTypeFn.isUndef)(ItemComp) ? void 0 : _ComponentActions.showDescription,
    useMsBrowserShow: _browserStore.useMsBrowserShow,
    useMsBrowserLoad: _browserStore.useMsBrowserLoad,
    onLoadMenu: (0, _bindTo.bindTo)(_browserStore.loadBrowser, {
      browserType,
      caption,
      sourceMenuUrl
    }),
    onShowLoadDialog: chartContainerType ? item => (0, _compStore.showModalDialog)(modalDialogType, {
      item,
      browserType,
      chartContainerType,
      onShow: (0, _bindTo.bindTo)(_itemStore.showItemsContainer, chartContainerType, browserType)
    }) : void 0 //for Type2
    ,
    getProxy: _settingStore.getProxy // for BrowserSlider
  }, browserType);
};
const _isStatAllBrowserType = (0, _arrFn.isInArrStr)([_BrowserType.BT_SWEDEN_STAT_ALL, _BrowserType.BT_NORWAY_STAT_ALL, _BrowserType.BT_FINLAND_STAT_ALL, _BrowserType.BT_DENMARK_STAT_ALL, _BrowserType.BT_IRELAND_STAT_ALL]);
const crAsyncBrowser = option => {
  const bT = option.browserType;
  return bT === _BrowserType.BT_WATCH_LIST ? (0, _RouterBrowser.getBrowserComp)(_BrowserType.BT_WATCH_LIST).then(_crBrowserWatchList) : _isStatAllBrowserType(bT) ? (0, _RouterBrowser.getBrowserComp)("STAT_ALL").then(Comp => _crBrowserDynamic(Comp, option)) : Promise.resolve(_crBrowserDynamic((0, _RouterBrowser.getBrowserComp)(bT), option));
};
exports.crAsyncBrowser = crAsyncBrowser;
//# sourceMappingURL=fBrowser.js.map