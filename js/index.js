'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _ravenJs = require('raven-js');

var _ravenJs2 = _interopRequireDefault(_ravenJs);

var _AppErc = require('./components/AppErc');

var _AppErc2 = _interopRequireDefault(_AppErc);

var _ChartConfig = require('./charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _fnInitRaven = function _fnInitRaven() {
  /* eslint-disable no-undef */
  if (process.env.NODE_ENV === 'production') {
    /* eslint-enable no-undef */
    if (window && window.location && window.location.href.indexOf("https://zhnzhn.github.io") > -1) {
      _ravenJs2.default.config('https://f3e7d09d8d0748af80791d51e5bc83e3@sentry.io/138634', {
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
  (0, _reactDom.render)(_react2.default.createElement(_AppErc2.default, null), document.getElementById('app'));
};

var _fnLoading = function _fnLoading() {
  var preloader = window.preloader;
  if (preloader) {
    if (!preloader.isErrCss && !preloader.isErrScript) {
      preloader.hiding();
      setTimeout(_fnRenderApp(), 100);
    } else {
      preloader.stop();
    }
  } else {
    _fnRenderApp();
  }
};

_fnInitRaven();
_ChartConfig2.default.init();
_fnLoading();
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\index.js.map