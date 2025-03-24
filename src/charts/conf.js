import Highcharts from 'highcharts';

import {
  COLOR_CATEGORY_LEVEL1,
  COLOR_CATEGORY_LEVEL2
} from '../constants/Color';

const _addMonoColorsTo = (
  colors=[],
  levelColor
) => {
  let i;
  // Start out with a darkened base color (negative brighten), and end
  // up with a much brighter color
  for (i=0; i<4; i++) {
    colors.push(
       Highcharts.Color(levelColor)
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

export const fMonoPieColors = (
  colorLevel1=COLOR_CATEGORY_LEVEL1,
  colorLevel2=COLOR_CATEGORY_LEVEL2
) => {
  const colors = [];
  _addMonoColorsTo(colors, colorLevel1)
  _addMonoColorsTo(colors, colorLevel2)
  return colors;
}
