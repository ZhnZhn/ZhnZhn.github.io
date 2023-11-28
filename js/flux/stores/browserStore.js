"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useMsInitBrowser = exports.useMsBrowserShow = exports.useMsBrowserLoad = exports.showBrowser = exports.setMsBrowserLoaded = exports.setMsBrowserFailed = exports.loadBrowser = void 0;
var _fnFetch = require("../../utils/fnFetch");
var _onCatch = _interopRequireDefault(require("../logic/onCatch"));
var _storeApi = require("../storeApi");
var _compStore = require("./compStore");
var _isWithItemCounter = _interopRequireDefault(require("./browser/isWithItemCounter"));
var _initBrowserMenu = _interopRequireDefault(require("./browser/initBrowserMenu"));
var _browserLogic = require("./browserLogic");
var _Factory = require("../logic/Factory");
var _BrowserConfig = _interopRequireDefault(require("../../constants/BrowserConfig"));
var _RouterModalDialog = require("../../components/dialogs/RouterModalDialog");
var _RouterDialog = require("../logic/RouterDialog");
const [_crMsBrowserLoad, _selectMsBrowserLoad] = (0, _storeApi.fCrStoreSlice)("msBrowserLoad"),
  [_crMsBrowserShow, _selectMsBrowserShow] = (0, _storeApi.fCrStoreSlice)("msBrowserShow"),
  [_crMsInitBrowser, _selectMsInitBrowser] = (0, _storeApi.fCrStoreSlice)("msInitBrowser");
const _crStore = () => ({
    ..._crMsBrowserLoad(),
    ..._crMsBrowserShow(),
    ..._crMsInitBrowser()
  }),
  _browserStore = (0, _storeApi.createStoreWithSelector)(_crStore),
  [_set] = (0, _storeApi.getStoreApi)(_browserStore);
const useMsBrowserLoad = exports.useMsBrowserLoad = (0, _storeApi.fCrUse)(_browserStore, _selectMsBrowserLoad);
const setMsBrowserLoaded = (browserType, menuItems) => _set(_crMsBrowserLoad({
  browserType,
  menuItems
}));
exports.setMsBrowserLoaded = setMsBrowserLoaded;
const setMsBrowserFailed = browserType => _set(_crMsBrowserLoad({
  browserType
}));
exports.setMsBrowserFailed = setMsBrowserFailed;
const _fetchSourceMenu = _ref => {
    let {
      json,
      option,
      onCompleted
    } = _ref;
    const {
      browserType
    } = option;
    onCompleted({
      json,
      browserType
    });
  },
  _loadBrowserCompleted = option => {
    const {
        json,
        browserType
      } = option,
      menuItems = (0, _isWithItemCounter.default)(browserType) ? (0, _initBrowserMenu.default)(_browserLogic.setBrowserMenu, _browserLogic.setRouterDialog, option) : json;
    setMsBrowserLoaded(browserType, menuItems);
  },
  _loadBrowserFailed = option => {
    const {
      alertItemId,
      caption,
      browserType
    } = option;
    option.alertItemId = alertItemId || caption;
    (0, _compStore.showAlertDialog)(option);
    setMsBrowserFailed(browserType);
  };
const loadBrowser = option => {
  (0, _fnFetch.fetchJson)({
    option,
    uri: option.sourceMenuUrl,
    onFetch: _fetchSourceMenu,
    onCompleted: _loadBrowserCompleted,
    onFailed: _loadBrowserFailed,
    onCatch: _onCatch.default
  });
};
exports.loadBrowser = loadBrowser;
const useMsBrowserShow = exports.useMsBrowserShow = (0, _storeApi.fCrUse)(_browserStore, _selectMsBrowserShow);
const useMsInitBrowser = exports.useMsInitBrowser = (0, _storeApi.fCrUse)(_browserStore, _selectMsInitBrowser);
const ERR_LOAD = "Failed to load browser.",
  ERR_FOUND = "Browser hasn't found.",
  ERR_ITEM = "Browser",
  _crErr = (alertDescr, alertItemId) => ({
    alertDescr,
    alertItemId
  });
const _showBrowserFailed = option => {
    (0, _compStore.showAlertDialog)(option);
  },
  _initBrowser = (elBrowser, config) => {
    const {
      browserType
    } = config;
    if (!(0, _browserLogic.getBrowserMenu)(browserType)) {
      (0, _browserLogic.setBrowserMenu)(browserType, []);
      _set(_crMsInitBrowser({
        elBrowser
      }));
    }
  };
const showBrowser = function (option) {
  if (option === void 0) {
    option = {};
  }
  const _option = typeof option === 'string' ? {
      browserType: option
    } : option,
    {
      browserType: bT
    } = _option,
    config = _BrowserConfig.default[bT];
  if (bT && config) {
    if ((0, _browserLogic.getBrowserMenu)(bT)) {
      _set(_crMsBrowserShow({
        browserType: _option.browserType
      }));
    } else {
      Promise.all([(0, _RouterModalDialog.loadModalDialogs)(bT), (0, _RouterDialog.loadDialogs)(bT)]).then(() => (0, _Factory.crAsyncBrowser)(config)).then(elBrowser => {
        _initBrowser(elBrowser, config);
      }).catch(() => {
        _showBrowserFailed({
          ..._option,
          ..._crErr(ERR_LOAD, config.caption)
        });
      });
    }
  } else {
    _showBrowserFailed({
      ..._option,
      ..._crErr(ERR_FOUND, ERR_ITEM)
    });
  }
};
exports.showBrowser = showBrowser;
//# sourceMappingURL=browserStore.js.map