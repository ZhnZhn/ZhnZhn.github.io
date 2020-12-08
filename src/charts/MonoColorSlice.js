import Highcharts from 'highcharts';

import COLOR from '../constants/Color';

const {
  MONO_BASE1,
  MONO_BASE2
} = COLOR;

const _crColor = (color, brighten, opacity) => Highcharts
  .Color(color)
  .brighten(brighten)
  .setOpacity(opacity)
  .get();

const _addMonoColorsTo = (colors, base) => {
  let i;
  for (i=0; i<4; i++) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
    colors.push(_crColor(base, (i-3)/7, 0.75))
  }
};

const _crMonoColors = function({
  base1=MONO_BASE1,
  base2=MONO_BASE2
}={}){
  const colors = [];

  _addMonoColorsTo(colors, base1);
  _addMonoColorsTo(colors, base2);

  return colors;
};

let _monoColors;
const _COLOR_LOW_LEVEL = -3/7;

const MonoColorSlice = {
  COLOR_PERIOD : 4/7,
  COLOR_BASE1 : MONO_BASE1,
  COLOR_BASE2 : MONO_BASE2,

  crMonoColor(base=MONO_BASE1, deltaColor=0, opacity=0.75){
    return _crColor(
      base,
      _COLOR_LOW_LEVEL + deltaColor,
      opacity
    );
  },

  getMonoColor(index){
     const colorIndex = index % 8
     , _colors = _monoColors
       || (_monoColors = _crMonoColors());
     return _colors[colorIndex];
  }
};

export default MonoColorSlice
