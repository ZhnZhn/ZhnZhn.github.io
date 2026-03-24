"use strict";

exports.__esModule = true;
exports.loadSparklines = exports.loadLeaflet = exports.loadCss = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _asyncFn = require("./asyncFn");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const _assign = Object.assign,
  _crElement = tag => document.createElement(tag);
const isCss = Object.create(null);
const loadCss = href => isCss[href] || !(0, _isTypeFn.isStr)(href) ? (0, _asyncFn.resolvePromise)() : new Promise((resolve, reject) => {
  const _elLink = _assign(_crElement("link"), {
    rel: "stylesheet",
    href,
    onload: () => {
      isCss[href] = true;
      resolve();
    },
    onerror: () => {
      _elLink.remove();
      reject();
    }
  });
  // Insert it at the end of the head in a legacy-friendly manner
  const {
      head
    } = document,
    {
      childNodes
    } = head;
  head.insertBefore(_elLink, childNodes[childNodes.length - 1].nextSibling);
});
exports.loadCss = loadCss;
const loadLeaflet = () => Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "leaflet" */
/* webpackMode: "lazy" */
'leaflet'))).catch(_asyncFn.throwErrOffline);
exports.loadLeaflet = loadLeaflet;
const loadSparklines = () => Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "sparklines" */
/* webpackMode: "lazy" */
'../components/zhn-sparklines/Sparklines'))).then(_asyncFn.getModuleDefault);
exports.loadSparklines = loadSparklines;
//# sourceMappingURL=loadAsset.js.map