
import React from 'react';
import {render} from 'react-dom';

import AppErc from './components/AppErc';
import ChartConfig from './charts/ChartConfig';

const _fnRenderApp = function(){
  document.body.removeChild(document.getElementById('preloader'));
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
