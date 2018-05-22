'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../actions/Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _ChartActions = require('../actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _ChartSlice = require('./ChartSlice');

var _ChartSlice2 = _interopRequireDefault(_ChartSlice);

var _BrowserSlice = require('./BrowserSlice');

var _BrowserSlice2 = _interopRequireDefault(_BrowserSlice);

var _ComponentSlice = require('./ComponentSlice');

var _ComponentSlice2 = _interopRequireDefault(_ComponentSlice);

var _SettingSlice = require('./SettingSlice');

var _SettingSlice2 = _interopRequireDefault(_SettingSlice);

var _WatchListSlice = require('../watch-list/WatchListSlice');

var _WatchListSlice2 = _interopRequireDefault(_WatchListSlice);

var _WithLimitRemaining = require('./WithLimitRemaining');

var _WithLimitRemaining2 = _interopRequireDefault(_WithLimitRemaining);

var _WithLoadingProgress = require('./WithLoadingProgress');

var _WithLoadingProgress2 = _interopRequireDefault(_WithLoadingProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChartStore = _reflux2.default.createStore((0, _extends3.default)({
  listenables: [].concat((0, _toConsumableArray3.default)(_Actions2.default)),

  init: function init() {
    this.initWatchList();
    this.listenLoadingProgress(_ChartActions2.default.fnOnChangeStore);
  }
}, _ChartSlice2.default, _BrowserSlice2.default, _ComponentSlice2.default, _SettingSlice2.default, _WatchListSlice2.default, _WithLimitRemaining2.default, _WithLoadingProgress2.default));

exports.default = ChartStore;
//# sourceMappingURL=ChartStore.js.map