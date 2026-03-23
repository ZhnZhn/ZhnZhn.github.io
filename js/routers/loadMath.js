"use strict";

exports.__esModule = true;
exports.loadMath = exports.loadKmeans = exports.loadJenks = void 0;
var _crRouter = require("../utils/crRouter");
var _asyncFn = require("./asyncFn");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const K_MEANS = "kmeans";
const JENKS = "jenks";
const loadMath = exports.loadMath = (0, _crRouter.crGetRoute)({
  get [K_MEANS]() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/math/k-means.js"))).then(module => module.default);
    }
    /*eslint-enable no-undef */
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "math-kmeans" */
    /* webpackMode: "lazy" */
    "../math/k-means"))).then(module => module.default).catch(_asyncFn.throwErrOffline);
  },
  get [JENKS]() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/math/jenksModule.js"))).then(module => module.default);
    }
    /*eslint-enable no-undef */
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "math-jenks" */
    /* webpackMode: "lazy" */
    "../math/jenksModule"))).then(module => module.default).catch(_asyncFn.throwErrOffline);
  }
});
const loadKmeans = () => loadMath(K_MEANS);
exports.loadKmeans = loadKmeans;
const loadJenks = () => loadMath(JENKS);
exports.loadJenks = loadJenks;
//# sourceMappingURL=loadMath.js.map