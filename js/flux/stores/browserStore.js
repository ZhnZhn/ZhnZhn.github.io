"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useMsBrowserLoad = exports.loadBrowser = void 0;
var _fnFetch = require("../../utils/fnFetch");
var _onCatch = _interopRequireDefault(require("../logic/onCatch"));
var _storeApi = require("../storeApi");
var _compStore = require("./compStore");
var _isWithItemCounter = _interopRequireDefault(require("./browser/isWithItemCounter"));
var _initBrowserMenu = _interopRequireDefault(require("./browser/initBrowserMenu"));
var _browserLogic = require("./browserLogic");
const [_crMsBrowserLoad, _selectMsBrowserLoad] = (0, _storeApi.fCrStoreSlice)();
const _crStore = () => ({
    ..._crMsBrowserLoad()
  }),
  _browserStore = (0, _storeApi.createStoreWithSelector)(_crStore),
  [_set] = (0, _storeApi.getStoreApi)(_browserStore);
const useMsBrowserLoad = exports.useMsBrowserLoad = (0, _storeApi.fCrUse)(_browserStore, _selectMsBrowserLoad);
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
    _set(_crMsBrowserLoad({
      browserType,
      menuItems
    }));
  },
  _loadBrowserFailed = option => {
    const {
      alertItemId,
      caption,
      browserType
    } = option;
    option.alertItemId = alertItemId || caption;
    (0, _compStore.showAlertDialog)(option);
    _set(_crMsBrowserLoad({
      browserType
    }));
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
//# sourceMappingURL=browserStore.js.map