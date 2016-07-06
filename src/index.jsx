
import React from 'react';
import {render} from 'react-dom';

import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/lib/highcharts-more';
import HighchartsTreemap from 'highcharts/lib/modules/treemap';

import AppErc from './components/AppErc';
import ChartConfig from './constants/ChartConfig';

HighchartsMore(Highcharts);
HighchartsTreemap(Highcharts);
Highcharts.setOptions(ChartConfig.theme);

Highcharts.wrap(Highcharts.Chart.prototype, 'showCredits', function (next, credits) {
   next.call(this, credits);

   if (credits.enabled) {
     this.credits.element.onclick = function(){
       var link = document.createElement('a');
       link.rel = "noopener noreferrer";
       link.target = credits.targer;
       link.href = credits.href;
       link.click();
     }
   }

});


const _fnRemoveSpinner = function(){
  document.body.removeChild(document.getElementById('spinner'));
}

render(<AppErc />, document.getElementById('app'), _fnRemoveSpinner);
