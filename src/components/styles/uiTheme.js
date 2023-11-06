export { getColorBlack } from './paletteFn';

import { setChartTheme } from '../../charts/ChartUiTheme';
import {
  DF_THEME_ID,
  crUiThemeId,
  setUiPalette
} from './paletteFn';

let _uiThemeId;
const _setUiThemeImpl = (uiThemeId) => {
  _uiThemeId = crUiThemeId(uiThemeId)
  setUiPalette(_uiThemeId)
  setChartTheme(_uiThemeId !== DF_THEME_ID)
}
_setUiThemeImpl(DF_THEME_ID)

export const setUiTheme = (
  item
) => {
  const _nextUiThemeId = (item || {}).value;
  if (_uiThemeId !== _nextUiThemeId) {
    _setUiThemeImpl(_nextUiThemeId)
  }
}
