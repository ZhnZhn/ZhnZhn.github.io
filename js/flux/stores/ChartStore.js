"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _refluxCore = _interopRequireDefault(require("reflux-core"));
var _Actions = _interopRequireDefault(require("../actions/Actions"));
var _ChartSlice = _interopRequireDefault(require("./ChartSlice"));
var _BrowserSlice = _interopRequireDefault(require("./BrowserSlice"));
var _SettingSlice = _interopRequireDefault(require("./SettingSlice"));
var _WatchListSlice = _interopRequireDefault(require("../watch-list/WatchListSlice"));
const ChartStore = _refluxCore.default.createStore({
  listenables: [..._Actions.default],
  init() {
    this.initWatchList();
  },
  ..._ChartSlice.default,
  ..._BrowserSlice.default,
  ..._SettingSlice.default,
  ..._WatchListSlice.default
});
var _default = exports.default = ChartStore;
//# sourceMappingURL=ChartStore.js.map