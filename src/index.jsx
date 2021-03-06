
import { render } from 'react-dom';

import polyfill from './polyfill'
import Raven from 'raven-js';

import AppErc from './components/AppErc';
import ChartConfig from './charts/ChartConfig';

const _fnInitRaven = function(){
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
    }
  }
}

const _fnRenderApp = function(){
  const preloaderEl = document.getElementById('preloader')
  if (preloaderEl) {
     document.body.removeChild(document.getElementById('preloader'));
  }
  render(<AppErc />, document.getElementById('app'));
}

const _fnLoading = function(){
  const preloader = window.preloader;
  if (preloader && typeof preloader.hiding === 'function') {
      preloader.hiding();
      setTimeout( _fnRenderApp, 100);
  } else {
    _fnRenderApp()
  }
}

polyfill();
_fnInitRaven();
ChartConfig.init();
_fnLoading();
