"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.loadTreeMap = exports.initChartTheme = void 0;
var _highcharts = _interopRequireDefault(require("highcharts"));
var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));
var _offlineExporting = _interopRequireDefault(require("highcharts/modules/offline-exporting"));
var _zhnHighcharts = _interopRequireDefault(require("./plugin/zhn-highcharts"));
var _Msg = require("../constants/Msg");
var _ChartTheme = require("./ChartTheme");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; } //import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';
const initChartTheme = () => {
  (0, _exporting.default)(_highcharts.default);
  (0, _offlineExporting.default)(_highcharts.default);
  (0, _zhnHighcharts.default)(_highcharts.default);
  _highcharts.default.setOptions(_ChartTheme.ChartTheme);
};
exports.initChartTheme = initChartTheme;
const loadTreeMap = () => {
  /*eslint-disable no-undef */
  if (process.env.NODE_ENV === '_development') {
    //
    return Promise.resolve().then(() => _interopRequireWildcard(require("highcharts/modules/treemap"))).then(module => module.default(_highcharts.default)).catch(err => console.log(_Msg.MSG_OFFLINE));
    /*eslint-enable no-undef */
  }
  return Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "treemap" */
  /* webpackMode: "lazy" */
  "highcharts/modules/treemap"))).then(module => module.default(_highcharts.default)).catch(err => console.log(_Msg.MSG_OFFLINE));
};
exports.loadTreeMap = loadTreeMap;
//# sourceMappingURL=initChartTheme.js.map