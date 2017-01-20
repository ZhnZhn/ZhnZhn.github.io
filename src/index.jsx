
import React from 'react';
import {render} from 'react-dom';

import AppErc from './components/AppErc';
import ChartConfig from './charts/ChartConfig';

const _fnRenderApp = function(){
  document.body.removeChild(document.getElementById('preloader'));
  render(<AppErc />, document.getElementById('app'));
}

const _fnLoading = function(){
  /*eslint-disable no-undef*/
  if (preloader) {
    if (!preloader.isErrCss && !preloader.isErrScript){
      preloader.hiding();
      setTimeout( function(){
        preloader = undefined;
        _fnRenderApp();
      }, 100)
    } else {
      preloader.stop();
    }
  /*eslint-enable no-undef*/
  } else {
    _fnRenderApp()
  }
}

ChartConfig.init();
_fnLoading();
