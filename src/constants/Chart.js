
import {merge} from 'lodash';
import Highcharts from 'highcharts';

const _fnCreateMonoColors = function({
        base1='#7cb5ec',base2='#90ed7d'
}){
  var colors = []
   , i;

  for (i = 0; i < 4; i += 1) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
   colors.push(Highcharts.Color(base1).brighten((i - 3) / 7).setOpacity(0.75).get());
   //console.log(Highcharts.Color(base1));
  }
  for (i = 0; i < 4; i += 1) {
     colors.push(Highcharts.Color(base2).brighten((i - 3) / 7).setOpacity(0.75).get());
  }
  return colors;
}


const Chart = {
  HEIGHT : 300,
  STACKED_HEIGHT : 500,
  LEGEND_ROW_HEIGHT : 32,

  SPACING_TOP : 20,
  SPACING_BOTTOM : 24,

  _monoColors : _fnCreateMonoColors({}),

  fnGetMonoColor(index){
     const colorIndex = index % 8;
     return  this._monoColors[colorIndex];
  },

  fTitle(option={}){
    return merge({
       text: '',
       floating: true,
       align: 'left',
       x: 25,
       y: 25,
       style: {
         color: '#a487d4',
         fontSize: '16px',
         fontWeight: 'bold'
       }
    }, option)
  },
  fSubtitle(option={}){
    return merge({
      text: '',
      floating: true,
      align: 'left',
      x: 25,
      y: 45,
      style: {
        color: 'black',
        fontSize: '16px',
        fontWeight: 'normal'
      }
    }, option)
  },

  fXAxisOpposite(option={}){
    return merge({
      opposite : true,
      tickLength : 0,
      tickPosition : 'inside',
      labels : {
        y : -5
      }
    }, option)
  }

};

export default Chart
