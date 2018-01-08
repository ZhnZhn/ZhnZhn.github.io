'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowserActionTypes = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Reflux$createActions;

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _BrowserConfig = require('../../constants/BrowserConfig');

var _BrowserConfig2 = _interopRequireDefault(_BrowserConfig);

var _RouterModalDialog = require('../../components/dialogs/RouterModalDialog');

var _RouterModalDialog2 = _interopRequireDefault(_RouterModalDialog);

var _RouterDialog = require('../logic/RouterDialog');

var _RouterDialog2 = _interopRequireDefault(_RouterDialog);

var _fnFetch = require('../../utils/fnFetch');

var _fnCatch = require('../logic/fnCatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserActionTypes = exports.BrowserActionTypes = {
  SHOW_BROWSER: 'showBrowser',
  UPDATE_BROWSER_MENU: 'updateBrowserMenu',

  SHOW_BROWSER_DYNAMIC: 'showBrowserDynamic',

  INIT_BROWSER_DYNAMIC: 'initBrowserDynamic',
  LOAD_BROWSER_DYNAMIC: 'loadBrowserDynamic',
  LOAD_BROWSER_DYNAMIC_COMPLETED: 'loadBrowserDynamicCompleted',

  UPDATE_WATCH_BROWSER: 'updateWatchBrowser'
};
var A = BrowserActionTypes;

var BrowserActions = _reflux2.default.createActions((_Reflux$createActions = {}, (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_BROWSER, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.UPDATE_BROWSER_MENU, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_BROWSER_DYNAMIC, {
  children: ['completed', 'failed']
}), (0, _defineProperty3.default)(_Reflux$createActions, A.INIT_BROWSER_DYNAMIC, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.LOAD_BROWSER_DYNAMIC, {
  children: ['completed', 'failed']
}), (0, _defineProperty3.default)(_Reflux$createActions, A.UPDATE_WATCH_BROWSER, {}), _Reflux$createActions));

var _fnFetchSourceMenu = function _fnFetchSourceMenu(_ref) {
  var json = _ref.json,
      option = _ref.option,
      onCompleted = _ref.onCompleted;
  var browserType = option.browserType;

  onCompleted({ json: json, browserType: browserType });
};

BrowserActions[A.SHOW_BROWSER_DYNAMIC].listen(function () {
  var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _option = typeof option === 'string' ? { browserType: option } : option,
      bT = _option.browserType,
      config = _BrowserConfig2.default[bT];

  if (bT && config) {
    _RouterModalDialog2.default.loadDialogs(bT);
    _RouterDialog2.default.loadDialogs(bT);
    this.completed(config);
  } else {
    this.failed(Object.assign(_option, {
      alertDescr: "Browser hasn't found.",
      alertItemId: "Browser"
    }));
  }
});

BrowserActions[A.LOAD_BROWSER_DYNAMIC].listen(function (option) {
  var sourceMenuUrl = option.sourceMenuUrl;
  //RouterDialog.loadDialogs(dialogsId)

  (0, _fnFetch.fetchJson)({
    uri: sourceMenuUrl,
    option: option,
    onFetch: _fnFetchSourceMenu,
    onCompleted: this.completed,
    onCatch: _fnCatch.fnCatch,
    onFailed: this.failed
  });
});

exports.default = BrowserActions;
//# sourceMappingURL=BrowserActions.js.map