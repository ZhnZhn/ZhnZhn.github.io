
import Highcharts from 'highcharts';

import COLOR from '../constants/Color';

const _addMonoColorsTo = (colors=[], base) => {
  let i;
  // Start out with a darkened base color (negative brighten), and end
  // up with a much brighter color
  for (i=0; i<4; i++) {
    colors.push(
       Highcharts.Color(base)
       .brighten((i - 3) / 7)
       .get()
     );
  }
}


const C = {
  HEIGHT: 300,
  THEME_SPACING_TOP: 5,
  SPACING_BOTTOM: 20,
  MARGIN_RIGHT: 50,

  CREDITS_COLOR: '#909090',
  CREDITS_URL: 'https://highcharts.com',

  fMonoPieColors: ({ base1=COLOR.MONO_BASE1, base2=COLOR.MONO_BASE2 }={}) => {
    const colors = [];
    _addMonoColorsTo(colors, base1)
    _addMonoColorsTo(colors, base2)
    return colors;
  }
}

export default C
