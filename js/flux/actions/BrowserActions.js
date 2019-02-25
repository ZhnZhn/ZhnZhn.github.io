'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowserActionTypes = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Reflux$createActions;

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _Factory = require('../logic/Factory');

var _Factory2 = _interopRequireDefault(_Factory);

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
  SHOW_BROWSER_DYNAMIC: 'showBrowserDynamic',

  INIT_BROWSER_DYNAMIC: 'initBrowserDynamic',
  LOAD_BROWSER_DYNAMIC: 'loadBrowserDynamic',
  LOAD_BROWSER_DYNAMIC_COMPLETED: 'loadBrowserDynamicCompleted',

  UPDATE_WATCH_BROWSER: 'updateWatchBrowser'
};
var A = BrowserActionTypes;

var BrowserActions = _reflux2.default.createActions((_Reflux$createActions = {}, (0, _defineProperty3.default)(_Reflux$createActions, A.SHOW_BROWSER_DYNAMIC, {
  children: ['done', 'init', 'failed']
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
var ERR = {
  LOAD: "Failed to load browser.",
  FOUND: "Browser hasn't found.",
  ITEM: "Browser"
};
var _crErr = function _crErr(alertDescr, alertItemId) {
  return {
    alertDescr: alertDescr, alertItemId: alertItemId
  };
};

BrowserActions[A.SHOW_BROWSER_DYNAMIC].listen(function () {
  var _this = this;

  var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _option = typeof option === 'string' ? { browserType: option } : option,
      bT = _option.browserType,
      config = _BrowserConfig2.default[bT];

  if (bT && config) {
    if (_ChartStore2.default.getBrowserMenu(bT)) {
      this.done(_option);
    } else {
      Promise.all([_RouterModalDialog2.default.loadDialogs(bT), _RouterDialog2.default.loadDialogs(bT)]).then(function () {
        return _Factory2.default.crAsyncBrowser(config);
      }).then(function (elBrowser) {
        _this.init(elBrowser, config);
      }).catch(function () {
        _this.failed((0, _extends3.default)({}, _option, _crErr(ERR.LOAD, config.caption)));
      });
    }
  } else {
    this.failed((0, _extends3.default)({}, _option, _crErr(ERR.FOUND, ERR.ITEM)));
  }
});

BrowserActions[A.LOAD_BROWSER_DYNAMIC].listen(function (option) {
  (0, _fnFetch.fetchJson)({
    uri: option.sourceMenuUrl,
    option: option,
    onFetch: _fnFetchSourceMenu,
    onCompleted: this.completed,
    onCatch: _fnCatch.fnCatch,
    onFailed: this.failed
  });
});

exports.default = BrowserActions;
//# sourceMappingURL=BrowserActions.js.map