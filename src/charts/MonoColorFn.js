import Highcharts from 'highcharts';

import {
  COLOR_MONO_BASE1,
  COLOR_MONO_BASE2,
  COLOR_MONO_BASE3
} from '../constants/Color';

const _crColor = (
  color,
  brighten,
  opacity
) => Highcharts
  .Color(color)
  .brighten(brighten)
  .setOpacity(opacity)
  .get();

const _addMonoColorsTo = (
  colors,
  base
) => {
  for (let i=0; i<4; i++) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
    colors.push(_crColor(base, (i-3)/7, 0.75))
  }
};

const _crMonoColors = function({
  base1=COLOR_MONO_BASE1,
  base2=COLOR_MONO_BASE2
}={}){
  const colors = [];

  _addMonoColorsTo(colors, base1);
  _addMonoColorsTo(colors, base2);

  return colors;
};

let _monoColors;
const _COLOR_LOW_LEVEL = -3/7;


export const COLOR_PERIOD = 4/7
export const COLOR_BASE1 = COLOR_MONO_BASE1
export const COLOR_BASE2 = COLOR_MONO_BASE2
export const COLOR_BASE3 = COLOR_MONO_BASE3

export const crMonoColor = (
  base=COLOR_MONO_BASE1,
  deltaColor=0,
  opacity=0.75
) => _crColor(
  base,
  _COLOR_LOW_LEVEL + deltaColor,
  opacity
);

export const getMonoColor = (
  index
) => {
  const colorIndex = index % 8
  , _colors = _monoColors
   || (_monoColors = _crMonoColors());
  return _colors[colorIndex];
}
