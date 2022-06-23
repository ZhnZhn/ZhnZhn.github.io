"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactDom = require("react-dom");

var _polyfill = _interopRequireDefault(require("./polyfill"));

var _ravenJs = _interopRequireDefault(require("raven-js"));

var _AppErc = _interopRequireDefault(require("./components/AppErc"));

var _initChartTheme = _interopRequireDefault(require("./charts/initChartTheme"));

var _jsxRuntime = require("react/jsx-runtime");

const _isHighchartsWarning = str => typeof str === 'string' && str.indexOf('Highcharts warning') !== -1;

let consoleWarn = (console || {}).warn;

const _clearHighchartsWarning = () => {
  if (consoleWarn) {
    console.warn = function () {
      if (_isHighchartsWarning(arguments.length <= 0 ? undefined : arguments[0])) {
        return;
      }

      consoleWarn(...arguments);
    };
  }
};

const _initRaven = function () {
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

const _renderApp = () => {
  const preloaderEl = document.getElementById('preloader');

  if (preloaderEl) {
    document.body.removeChild(document.getElementById('preloader'));
  }

  (0, _reactDom.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_AppErc.default, {}), document.getElementById('app'));
};

const _runLoadingApp = () => {
  const preloader = window.preloader;

  if (preloader && typeof preloader.hiding === 'function') {
    preloader.hiding();
    setTimeout(_renderApp, 100);
  } else {
    _renderApp();
  }
};

(0, _polyfill.default)();

_initRaven();

(0, _initChartTheme.default)();

_runLoadingApp();
//# sourceMappingURL=index.js.map