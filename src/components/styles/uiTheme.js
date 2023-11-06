export { getColorBlack } from './paletteFn';

import { setChartTheme } from '../../charts/ChartUiTheme';
import {
  DF_THEME_ID,
  crUiThemeId,
  setUiPalette
} from './paletteFn';

const uiTheme = {
  uiThemeId: DF_THEME_ID,
  _init(){
    this.setUiThemeId(DF_THEME_ID)
  },
  getUiThemeId(){
    return this.uiThemeId;
  },
  setUiThemeId(uiThemeId){
    this.uiThemeId = crUiThemeId(uiThemeId)
    setUiPalette(this.uiThemeId)
    setChartTheme(uiThemeId !== DF_THEME_ID)
  }
};

uiTheme._init()

export const setUiTheme = (
  item
) => {
  const _uiThemeId = (item || {}).value;
  if (uiTheme.getUiThemeId() !== _uiThemeId) {
    uiTheme.setUiThemeId(_uiThemeId)
  }
}
