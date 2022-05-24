import Highcharts from 'highcharts';

import {
  COLOR_MONO_BASE1,
  COLOR_MONO_BASE2
} from '../constants/Color';

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

export const HEIGHT = 300
export const THEME_SPACING_TOP = 5
export const SPACING_BOTTOM = 20
export const MARGIN_RIGHT = 50

export const CREDITS_COLOR = '#909090'
export const CREDITS_URL = 'https://highcharts.com'

export const fMonoPieColors = ({
  base1=COLOR_MONO_BASE1,
  base2=COLOR_MONO_BASE2
}={}) => {
  const colors = [];
  _addMonoColorsTo(colors, base1)
  _addMonoColorsTo(colors, base2)
  return colors;
}
