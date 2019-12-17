"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _reflux = _interopRequireDefault(require("reflux"));

var _Actions = _interopRequireDefault(require("../actions/Actions"));

var _ChartActions = _interopRequireDefault(require("../actions/ChartActions"));

var _ChartSlice = _interopRequireDefault(require("./ChartSlice"));

var _BrowserSlice = _interopRequireDefault(require("./BrowserSlice"));

var _ComponentSlice = _interopRequireDefault(require("./ComponentSlice"));

var _SettingSlice = _interopRequireDefault(require("./SettingSlice"));

var _WatchListSlice = _interopRequireDefault(require("../watch-list/WatchListSlice"));

var _WithLimitRemaining = _interopRequireDefault(require("./WithLimitRemaining"));

var _WithLoadingProgress = _interopRequireDefault(require("./WithLoadingProgress"));

var ChartStore = _reflux["default"].createStore((0, _extends2["default"])({
  listenables: [].concat(_Actions["default"]),
  init: function init() {
    this.initWatchList();
    this.listenLoadingProgress(_ChartActions["default"].fnOnChangeStore);
  }
}, _ChartSlice["default"], {}, _BrowserSlice["default"], {}, _ComponentSlice["default"], {}, _SettingSlice["default"], {}, _WatchListSlice["default"], {}, _WithLimitRemaining["default"], {}, _WithLoadingProgress["default"]));

var _default = ChartStore;
exports["default"] = _default;
//# sourceMappingURL=ChartStore.js.map