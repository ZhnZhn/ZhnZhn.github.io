"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _polyfill = _interopRequireDefault(require("./polyfill"));

var _ravenJs = _interopRequireDefault(require("raven-js"));

var _AppErc = _interopRequireDefault(require("./components/AppErc"));

var _ChartConfig = _interopRequireDefault(require("./charts/ChartConfig"));

var _fnInitRaven = function _fnInitRaven() {
  /* eslint-disable no-undef */
  if (process.env.NODE_ENV === 'production') {
    /* eslint-enable no-undef */
    if (window && window.location && window.location.href.indexOf("https://zhnzhn.github.io") > -1) {
      _ravenJs["default"].config('https://f3e7d09d8d0748af80791d51e5bc83e3@sentry.io/138634', {
        whitelistUrls: ['zhnzhn.github.io']
      }).install();
    }
  }
};

var _fnRenderApp = function _fnRenderApp() {
  var preloaderEl = document.getElementById('preloader');

  if (preloaderEl) {
    document.body.removeChild(document.getElementById('preloader'));
  }

  (0, _reactDom.render)(_react["default"].createElement(_AppErc["default"], null), document.getElementById('app'));
};

var _fnLoading = function _fnLoading() {
  var preloader = window.preloader;

  if (preloader && typeof preloader.hiding === 'function') {
    preloader.hiding();
    setTimeout(_fnRenderApp, 100);
  } else {
    _fnRenderApp();
  }
};

(0, _polyfill["default"])();

_fnInitRaven();

_ChartConfig["default"].init();

_fnLoading();
//# sourceMappingURL=index.js.map