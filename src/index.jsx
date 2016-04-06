
import React from 'react';
import {render} from 'react-dom';
import Highcharts from 'highcharts';
import AppErc from './components/AppErc';

import ChartConfigs from './constants/ChartConfigs';


Highcharts.setOptions(ChartConfigs.theme);


render(<AppErc />, document.getElementById('app'));          
