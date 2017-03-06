
import React from 'react';
import {render} from 'react-dom';

import Raven from 'raven-js';

import AppErc from './components/AppErc';
import ChartConfig from './charts/ChartConfig';

/* eslint-disable no-undef */
if (process.env.NODE_ENV === 'production'){
/* eslint-enable no-undef */
  if (
       window && window.location &&
       window.location.href.indexOf("https://zhnzhn.github.io") > -1
  ){
    Raven.config('https://f3e7d09d8d0748af80791d51e5bc83e3@sentry.io/138634').install()
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
  if (preloader) {
    if (!preloader.isErrCss && !preloader.isErrScript){
      preloader.hiding();
      setTimeout( _fnRenderApp(), 100);
    } else {
      preloader.stop();
    }
  } else {
    _fnRenderApp()
  }
}

ChartConfig.init();
_fnLoading();
