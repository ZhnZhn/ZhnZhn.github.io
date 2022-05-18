import Highcharts from 'highcharts';

const _merge = Highcharts.merge;
const _STYLE_COLOR_BLACK = {
  style: {
    color: 'black'
  }
};
const BLACK_AXIS = {
   xAxis: {
     labels: _STYLE_COLOR_BLACK
   },
   yAxis: {
     tickColor: 'black',
     labels: _STYLE_COLOR_BLACK
   }
 };

 const BLACK_TITLE = {
   title: _STYLE_COLOR_BLACK
 };

 const BLACK_SERIES = {
   plotOptions: {
     area: {
       color: 'black'
     },
     spline: {
       color: 'black'
     },
     line: {
       color: 'black'
     }
   }
 };

const _crStyleBlackAxis = () => _merge(false, {},
  BLACK_AXIS
)
, _crStyleBlackAxisTitle = () => _merge(false, {},
  BLACK_AXIS,
  BLACK_TITLE
)
, _crStyleBlackAll = () => _merge(false, {},
  BLACK_AXIS,
  BLACK_TITLE,
  BLACK_SERIES
);

export const merge = _merge

export const crExportStyleOptions = () => [
  {
    caption: 'Default',
    value : {}
  },{
    caption: 'Default + Black Axis',
    value : _crStyleBlackAxis()
  },{
    caption: 'Default + Black Axis + Black Title',
    value : _crStyleBlackAxisTitle()
  },{
    caption: 'All Black',
    value: _crStyleBlackAll()
  }
]
