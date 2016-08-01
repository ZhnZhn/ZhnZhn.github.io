
import React from 'react';
import {render} from 'react-dom';

import AppErc from './components/AppErc';
import ChartConfig from './charts/ChartConfig';

ChartConfig.init();

const _fnRemoveSpinner = function(){
  document.body.removeChild(document.getElementById('spinner'));
}

render(<AppErc />, document.getElementById('app'), _fnRemoveSpinner);
