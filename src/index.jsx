
import React from 'react';
import {render} from 'react-dom';

import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/lib/highcharts-more';

import AppErc from './components/AppErc';
import ChartConfig from './constants/ChartConfig';

HighchartsMore(Highcharts);
Highcharts.setOptions(ChartConfig.theme);

const _fnRemoveSpinner = function(){
  document.body.removeChild(document.getElementById('spinner'));
}

render(<AppErc />, document.getElementById('app'), _fnRemoveSpinner);
