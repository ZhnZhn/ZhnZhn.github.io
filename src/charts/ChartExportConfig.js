import { merge } from '../utils/objFn';

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

const _crStyleBlackAxis = () => merge(false, {},
  BLACK_AXIS
)
, _crStyleBlackAxisTitle = () => merge(false, {},
  BLACK_AXIS,
  BLACK_TITLE
)
, _crStyleBlackAll = () => merge(false, {},
  BLACK_AXIS,
  BLACK_TITLE,
  BLACK_SERIES
);

const _crStyleItem = (
  caption,
  value
) => ({
  caption,
  value
})

export const crExportStyleOptions = () => [
  _crStyleItem('Default', {}),
  _crStyleItem('Default + Black Axis', _crStyleBlackAxis()),
  _crStyleItem('Default + Black Axis + Black Title', _crStyleBlackAxisTitle()),
  _crStyleItem('All Black', _crStyleBlackAll())
]
