"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactDom = require("react-dom");

var _polyfill = _interopRequireDefault(require("./polyfill"));

var _ravenJs = _interopRequireDefault(require("raven-js"));

var _AppErc = _interopRequireDefault(require("./components/AppErc"));

var _ChartConfig = _interopRequireDefault(require("./charts/ChartConfig"));

var _jsxRuntime = require("react/jsx-runtime");

let consoleWarn = (console || {}).warn;

const _clearHighchartsWarning = () => {
  if (consoleWarn) {
    console.warn = (...args) => {
      if (typeof args[0] === 'string' && args[0].indexOf('Highcharts warning') !== -1) {
        return;
      }

      consoleWarn(...args);
    };
  }
};

const _fnInitRaven = function () {
  /* eslint-disable no-undef */
  if (process.env.NODE_ENV === 'production') {
    /* eslint-enable no-undef */
    if (window && window.location && window.location.href.indexOf("https://zhnzhn.github.io") > -1) {
      _ravenJs.default.config('https://f3e7d09d8d0748af80791d51e5bc83e3@sentry.io/138634', {
        whitelistUrls: ['zhnzhn.github.io']
      }).install();

      _clearHighchartsWarning();
    }
  }
};

const _fnRenderApp = function () {
  const preloaderEl = document.getElementById('preloader');

  if (preloaderEl) {
    document.body.removeChild(document.getElementById('preloader'));
  }

  (0, _reactDom.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_AppErc.default, {}), document.getElementById('app'));
};

const _fnLoading = function () {
  const preloader = window.preloader;

  if (preloader && typeof preloader.hiding === 'function') {
    preloader.hiding();
    setTimeout(_fnRenderApp, 100);
  } else {
    _fnRenderApp();
  }
};

(0, _polyfill.default)();

_fnInitRaven();

_ChartConfig.default.init();

_fnLoading();
//# sourceMappingURL=index.js.map