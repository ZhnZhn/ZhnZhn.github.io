'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowserActionTypes = undefined;

var _Reflux$createActions;

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _fn = require('../../utils/fn');

var _fnCatch = require('../logic/fnCatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BrowserActionTypes = exports.BrowserActionTypes = {
  SHOW_BROWSER: 'showBrowser',
  UPDATE_BROWSER_MENU: 'updateBrowserMenu',

  SHOW_BROWSER_DYNAMIC: 'showBrowserDynamic',
  INIT_BROWSER_DYNAMIC: 'initBrowserDynamic',
  LOAD_BROWSER_DYNAMIC: 'loadBrowserDynamic',
  LOAD_BROWSER_DYNAMIC_COMPLETED: 'loadBrowserDynamicCompleted',

  UPDATE_WATCH_BROWSER: 'updateWatchBrowser'
};

var BrowserActions = _reflux2.default.createActions((_Reflux$createActions = {}, _defineProperty(_Reflux$createActions, BrowserActionTypes.SHOW_BROWSER, {}), _defineProperty(_Reflux$createActions, BrowserActionTypes.UPDATE_BROWSER_MENU, {}), _defineProperty(_Reflux$createActions, BrowserActionTypes.SHOW_BROWSER_DYNAMIC, {}), _defineProperty(_Reflux$createActions, BrowserActionTypes.INIT_BROWSER_DYNAMIC, {}), _defineProperty(_Reflux$createActions, BrowserActionTypes.LOAD_BROWSER_DYNAMIC, { children: ['completed', 'failed'] }), _defineProperty(_Reflux$createActions, BrowserActionTypes.UPDATE_WATCH_BROWSER, {}), _Reflux$createActions));

var _fnFetchSourceMenu = function _fnFetchSourceMenu(_ref) {
  var json = _ref.json;
  var option = _ref.option;
  var onCompleted = _ref.onCompleted;

  /*
  const { menu, items } = json
      , { browserType } = option;
  onCompleted({ menu, items, browserType });
  */
  var browserType = option.browserType;

  onCompleted({ json: json, browserType: browserType });
};

BrowserActions[BrowserActionTypes.LOAD_BROWSER_DYNAMIC].listen(function (option) {
  (0, _fn.fnFetch)({
    uri: option.sourceMenuUrl,
    option: option,
    onCheckResponse: function onCheckResponse(json) {
      return true;
    },
    onFetch: _fnFetchSourceMenu,
    onCompleted: this.completed,
    onCatch: _fnCatch.fnCatch,
    onFailed: this.failed
  });
});

exports.default = BrowserActions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\BrowserActions.js.map