"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = exports.BrowserActionTypes = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _refluxCore = _interopRequireDefault(require("reflux-core"));

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

var _Factory = _interopRequireDefault(require("../logic/Factory"));

var _BrowserConfig = _interopRequireDefault(require("../../constants/BrowserConfig"));

var _RouterModalDialog = _interopRequireDefault(require("../../components/dialogs/RouterModalDialog"));

var _RouterDialog = _interopRequireDefault(require("../logic/RouterDialog"));

var _fnFetch = require("../../utils/fnFetch");

var _fnCatch = require("../logic/fnCatch");

var _Reflux$createActions;

var BrowserActionTypes = {
  SHOW_BROWSER_DYNAMIC: 'showBrowserDynamic',
  INIT_BROWSER_DYNAMIC: 'initBrowserDynamic',
  LOAD_BROWSER_DYNAMIC: 'loadBrowserDynamic',
  LOAD_BROWSER_DYNAMIC_COMPLETED: 'loadBrowserDynamicCompleted',
  UPDATE_WATCH_BROWSER: 'updateWatchBrowser'
};
exports.BrowserActionTypes = BrowserActionTypes;
var A = BrowserActionTypes;

var BrowserActions = _refluxCore["default"].createActions((_Reflux$createActions = {}, _Reflux$createActions[A.SHOW_BROWSER_DYNAMIC] = {
  children: ['done', 'init', 'failed']
}, _Reflux$createActions[A.INIT_BROWSER_DYNAMIC] = {}, _Reflux$createActions[A.LOAD_BROWSER_DYNAMIC] = {
  children: ['completed', 'failed']
}, _Reflux$createActions[A.UPDATE_WATCH_BROWSER] = {}, _Reflux$createActions));

var _fnFetchSourceMenu = function _fnFetchSourceMenu(_ref) {
  var json = _ref.json,
      option = _ref.option,
      onCompleted = _ref.onCompleted;
  var browserType = option.browserType;
  onCompleted({
    json: json,
    browserType: browserType
  });
};

var ERR = {
  LOAD: "Failed to load browser.",
  FOUND: "Browser hasn't found.",
  ITEM: "Browser"
};

var _crErr = function _crErr(alertDescr, alertItemId) {
  return {
    alertDescr: alertDescr,
    alertItemId: alertItemId
  };
};

BrowserActions[A.SHOW_BROWSER_DYNAMIC].listen(function (option) {
  var _this = this;

  if (option === void 0) {
    option = {};
  }

  var _option = typeof option === 'string' ? {
    browserType: option
  } : option,
      bT = _option.browserType,
      config = _BrowserConfig["default"][bT];

  if (bT && config) {
    if (_ChartStore["default"].getBrowserMenu(bT)) {
      this.done(_option);
    } else {
      Promise.all([_RouterModalDialog["default"].loadDialogs(bT), _RouterDialog["default"].loadDialogs(bT)]).then(function () {
        return _Factory["default"].crAsyncBrowser(config);
      }).then(function (elBrowser) {
        _this.init(elBrowser, config);
      })["catch"](function () {
        _this.failed((0, _extends2["default"])({}, _option, {}, _crErr(ERR.LOAD, config.caption)));
      });
    }
  } else {
    this.failed((0, _extends2["default"])({}, _option, {}, _crErr(ERR.FOUND, ERR.ITEM)));
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
var _default = BrowserActions;
exports["default"] = _default;
//# sourceMappingURL=BrowserActions.js.map