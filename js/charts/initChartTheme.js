"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.loadTreeMap = exports.initChartTheme = void 0;
var _highcharts = _interopRequireDefault(require("highcharts"));
var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));
var _offlineExporting = _interopRequireDefault(require("highcharts/modules/offline-exporting"));
var _zhnHighcharts = _interopRequireDefault(require("./plugin/zhn-highcharts"));
var _asyncFn = require("../routers/asyncFn");
var _loadAsset = require("../routers/loadAsset");
var _ChartTheme = require("./ChartTheme");
//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';

const _addFixesTo = TO_CHARTS => {
  //https://github.com/advisories/GHSA-5793-x2q3-c3q7
  //(5.0.0-13.0.2)
  (t => {
    if (t && t.Chart && !t.Chart.prototype.creditsHrefPatched) {
      let r = t.Chart.prototype,
        e = r.addCredits;
      r.addCredits = function (n) {
        let o = t.merge(!0, this.options.credits, n);
        return o && o.href && !c(o.href) && delete o.href, e.call(this, o);
      }, r.creditsHrefPatched = !0;
    }
    function c(r) {
      const e = ["https://"];
      return "string" == typeof r && e.some(function (t) {
        return 0 === r.indexOf(t);
      });
    }
  })(TO_CHARTS);

  //https://github.com/advisories/GHSA-rmqc-xvr3-v46c
  //(6.1.0-13.0.2)
  (H => {
    const X = H.isObject;
    H.Point.prototype.setNestedProperty = function setNestedProperty(t, e, i) {
      let s = i.split(".");
      return s.some(t => "__proto__" === t || "constructor" === t) || s.reduce(function (t, i, s, o) {
        let r = o.length - 1 === s;
        return t[i] = r ? e : X(t[i], !0) ? t[i] : {}, t[i];
      }, t), t;
    };
  })(TO_CHARTS);
};
const initChartTheme = () => {
  (0, _exporting.default)(_highcharts.default);
  (0, _offlineExporting.default)(_highcharts.default);
  (0, _zhnHighcharts.default)(_highcharts.default);
  _highcharts.default.setOptions(_ChartTheme.ChartTheme);
  _addFixesTo(_highcharts.default);
};
exports.initChartTheme = initChartTheme;
const loadTreeMap = () => (0, _loadAsset.loadHighchartsTreeMap)().then(moduleDefault => moduleDefault(_highcharts.default)).catch(_asyncFn.logErrMsg);
exports.loadTreeMap = loadTreeMap;
//# sourceMappingURL=initChartTheme.js.map