"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _refluxCore = _interopRequireDefault(require("reflux-core"));

var _Actions = _interopRequireDefault(require("../actions/Actions"));

var _ChartActions = require("../actions/ChartActions");

var _ChartSlice = _interopRequireDefault(require("./ChartSlice"));

var _BrowserSlice = _interopRequireDefault(require("./BrowserSlice"));

var _ComponentSlice = _interopRequireDefault(require("./ComponentSlice"));

var _DialogSlice = _interopRequireDefault(require("./DialogSlice"));

var _SettingSlice = _interopRequireDefault(require("./SettingSlice"));

var _WatchListSlice = _interopRequireDefault(require("../watch-list/WatchListSlice"));

var _WithLimitRemaining = _interopRequireDefault(require("./WithLimitRemaining"));

var _WithLoadingProgress = _interopRequireDefault(require("./WithLoadingProgress"));

const ChartStore = _refluxCore.default.createStore({
  listenables: [..._Actions.default],

  init() {
    this.initWatchList();
    this.listenLoadingProgress(_ChartActions.ChartActions.onChangeStore);
  },

  ..._ChartSlice.default,
  ..._BrowserSlice.default,
  ..._ComponentSlice.default,
  ..._DialogSlice.default,
  ..._SettingSlice.default,
  ..._WatchListSlice.default,
  ..._WithLimitRemaining.default,
  ..._WithLoadingProgress.default
});

var _default = ChartStore;
exports.default = _default;
//# sourceMappingURL=ChartStore.js.map