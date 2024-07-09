import { createRoot } from 'react-dom/client';

import Raven from 'raven-js';

import AppErc from './components/AppErc';
import { initChartTheme } from './charts/initChartTheme';

const _isHighchartsWarning = str => typeof str === 'string'
 && str.indexOf('Highcharts warning') !== -1;

let consoleWarn = (console || {}).warn;

const _clearHighchartsWarning = () => {
  if (consoleWarn) {
   console.warn = (...args) => {
     if (_isHighchartsWarning(args[0])) {
       return;
     }
     consoleWarn(...args)
   }
  }
};

const _initRaven = function(){
  /* eslint-disable no-undef */
  if (process.env.NODE_ENV === 'production'){
  /* eslint-enable no-undef */
    if (
         window && window.location &&
         window.location.href.indexOf("https://zhnzhn.github.io") > -1
    ){
      Raven.config('https://f3e7d09d8d0748af80791d51e5bc83e3@sentry.io/138634', {
        whitelistUrls: [
          'zhnzhn.github.io'
        ]
      }).install()
      _clearHighchartsWarning()
    }
  }
}

const _renderApp = () => {
  const preloaderEl = document.getElementById('preloader')
  if (preloaderEl) {
     document.body.removeChild(document.getElementById('preloader'));
  }
  createRoot(document.getElementById('app'))
    .render(<AppErc />)
}

const _runLoadingApp = () => {
  const preloader = window.preloader;
  if (preloader && typeof preloader.hiding === 'function') {
      preloader.hiding();
      setTimeout(_renderApp, 100);
  } else {
    _renderApp()
  }
}

_initRaven();
initChartTheme();
_runLoadingApp();
