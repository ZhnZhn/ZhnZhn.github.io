"use strict";

exports.__esModule = true;
exports.setUiTheme = void 0;
var _ChartUiTheme = require("../../charts/ChartUiTheme");
const EL_BG_GREY = '#1b2836';
const DF_T_C = EL_BG_GREY;
const DF_S_C1 = '#8bc34a';
const DF_S_C2 = DF_T_C;
const DF_C_BG = '#4d4d4d';
const DF_BH_C = '#c0c0c0';
const DF_LB_BC = '#1b2836';
const DF_EL_BG = EL_BG_GREY;
const DF_EL_C = 'silver';
const P_GREY = {
  BG_BODY: '#5f5f5f',
  't-c': EL_BG_GREY,
  's-c1': DF_S_C1,
  's-c2': DF_S_C2,
  'c-bg': DF_C_BG,
  'bh-c': DF_BH_C,
  'lb-bc': DF_LB_BC,
  'el-bg': DF_EL_BG,
  'el-c': DF_EL_C
};
const EL_BG_WHITE = '#bcd8f5';
const LB_BC_LIGHT = 'grey';
const P_WHITE = {
  BG_BODY: '#e1e1e1',
  't-c': '#1b75bb',
  's-c1': DF_S_C1,
  's-c2': EL_BG_WHITE,
  'c-bg': '#ebf1f5',
  'bh-c': DF_BH_C,
  'lb-bc': LB_BC_LIGHT,
  'el-bg': EL_BG_WHITE,
  'el-c': '#212020'
};
const EL_BG_SAND_L = '#64473d';
const SAND_L_P = {
  BG_BODY: '#9e9e9e',
  't-c': '#785133',
  's-c1': DF_S_C1,
  's-c2': EL_BG_SAND_L,
  'c-bg': '#e8e0cb',
  'bh-c': '#5b5b5b',
  'lb-bc': LB_BC_LIGHT,
  'el-bg': EL_BG_SAND_L,
  'el-c': 'silver'
};
const P_SAND_L = {
  ...SAND_L_P
};
const EL_BG_SAND = '#463222';
const P_SAND = {
  ...SAND_L_P,
  BG: '#e6d5a9',
  'c-bg': '#e6d5a9',
  's-c2': EL_BG_SAND,
  'el-bg': EL_BG_SAND
};
const CUSTOM_CSS_PROPERTY_CONFIGS = [["t-c", DF_T_C], ["s-c1", DF_S_C1], ["s-c2", DF_S_C2], ["c-bg", DF_C_BG], ["bh-c", DF_BH_C], ["lb-bc", DF_LB_BC], ["el-bg", DF_EL_BG], ["el-c", DF_EL_C]];
const _setCssPropertiesFrom = P => {
  const _style = document.body.style;
  _style.backgroundColor = P.BG_BODY;
  CUSTOM_CSS_PROPERTY_CONFIGS.forEach(_ref => {
    let [propName, dfValue] = _ref;
    _style.setProperty('--' + propName, P[propName] || dfValue);
  });
};
const HP_THEME = {
  GREY: P_GREY,
  WHITE: P_WHITE,
  SAND: P_SAND,
  SAND_L: P_SAND_L
};
const DF_THEME_ID = 'GREY';
const _crThemeConfig = themeName => HP_THEME[themeName] || HP_THEME[DF_THEME_ID];
const _setTheme = themeName => {
  _setCssPropertiesFrom(_crThemeConfig(themeName));
};
const uiTheme = {
  themeName: DF_THEME_ID,
  _init() {
    this.setThemeName(DF_THEME_ID);
  },
  getThemeName() {
    return this.themeName;
  },
  setThemeName(themeId) {
    this.themeName = HP_THEME[themeId] ? themeId : DF_THEME_ID;
    _setTheme(this.themeName);
    (0, _ChartUiTheme.setChartTheme)(themeId !== DF_THEME_ID);
  }
};
uiTheme._init();
const setUiTheme = item => {
  const _themeName = (item || {}).value;
  if (uiTheme.getThemeName() !== _themeName) {
    uiTheme.setThemeName(_themeName);
  }
};
exports.setUiTheme = setUiTheme;
//# sourceMappingURL=uiTheme.js.map