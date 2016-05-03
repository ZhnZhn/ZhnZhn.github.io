
import React from 'react';
import {render} from 'react-dom';

import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/lib/highcharts-more';

import AppErc from './components/AppErc';
import ChartConfigs from './constants/ChartConfigs';

HighchartsMore(Highcharts);
Highcharts.setOptions(ChartConfigs.theme);

render(<AppErc />, document.getElementById('app'));
