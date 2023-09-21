import { setChartTheme } from '../../charts/ChartUiTheme';

const COLOR_SILVER = "silver";
const COLOR_DARK_BLUE = "#1b2836";

const DF_B_BG = "#5f5f5f";

const DF_T_C = COLOR_DARK_BLUE;
const DF_S_C1 = "#8bc34a";
const DF_S_C2 = DF_T_C;

const DF_C_BG = "#4d4d4d";
const DF_BH_C = "#c0c0c0";
const DF_LB_BC = COLOR_DARK_BLUE;

const DF_EL_BG = COLOR_DARK_BLUE;
const DF_EL_C = COLOR_SILVER;

const PROPERTY_B_BG = "b-bg"

, PROPERTY_T_C = "t-c"
, PROPERTY_S_C1 = "s-c1"
, PROPERTY_S_C2 = "s-c2"

, PROPERTY_C_BG = "c-bg"
, PROPERTY_BH_C = "bh-c"
, PROPERTY_LB_BC = "lb-bc"

, PROPERTY_EL_BG = "el-bg"
, PROPERTY_EL_C = "el-c";

const P_GREY = {
  [PROPERTY_B_BG]: DF_B_BG,

  [PROPERTY_T_C]: COLOR_DARK_BLUE,
  [PROPERTY_S_C1]: DF_S_C1,
  [PROPERTY_S_C2]: DF_S_C2,

  [PROPERTY_C_BG]: DF_C_BG,
  [PROPERTY_BH_C]: DF_BH_C,
  [PROPERTY_LB_BC]: DF_LB_BC,

  [PROPERTY_EL_BG]: DF_EL_BG,
  [PROPERTY_EL_C]: DF_EL_C
};

const EL_BG_WHITE = "#bcd8f5";
const LB_BC_LIGHT = "grey";
const P_WHITE = {
  [PROPERTY_B_BG]: "#e1e1e1",

  [PROPERTY_T_C]: "#1b75bb",
  [PROPERTY_S_C1]: DF_S_C1,
  [PROPERTY_S_C2]: EL_BG_WHITE,

  [PROPERTY_C_BG]: "#ebf1f5",
  [PROPERTY_BH_C]: DF_BH_C,
  [PROPERTY_LB_BC]: LB_BC_LIGHT,

  [PROPERTY_EL_BG]: EL_BG_WHITE,
  [PROPERTY_EL_C]: "#212020"
}

const EL_BG_SAND_L = "#64473d";
const SAND_L_P = {
  [PROPERTY_B_BG]: "#9e9e9e",

  [PROPERTY_T_C]: "#785133",
  [PROPERTY_S_C1]: DF_S_C1,
  [PROPERTY_S_C2]: EL_BG_SAND_L,

  [PROPERTY_C_BG]: "#e8e0cb",
  [PROPERTY_BH_C]: "#5b5b5b",
  [PROPERTY_LB_BC]: LB_BC_LIGHT,

  [PROPERTY_EL_BG]: EL_BG_SAND_L,
  [PROPERTY_EL_C]: COLOR_SILVER
}
const P_SAND_L = {
  ...SAND_L_P
};
const EL_BG_SAND = "#463222";
const P_SAND = {
  ...SAND_L_P,

  [PROPERTY_S_C2]: EL_BG_SAND,
  [PROPERTY_C_BG]: "#e6d5a9",

  [PROPERTY_EL_BG]: EL_BG_SAND
};

const CUSTOM_CSS_PROPERTY_CONFIGS = [
  [PROPERTY_B_BG, DF_B_BG],

  [PROPERTY_T_C, DF_T_C],
  [PROPERTY_S_C1, DF_S_C1],
  [PROPERTY_S_C2, DF_S_C2],

  [PROPERTY_C_BG, DF_C_BG],
  [PROPERTY_BH_C, DF_BH_C],
  [PROPERTY_LB_BC, DF_LB_BC],

  [PROPERTY_EL_BG, DF_EL_BG],
  [PROPERTY_EL_C, DF_EL_C]
]

const _setCssPropertiesFrom = (P) => {
  const _style = document.body.style;
  CUSTOM_CSS_PROPERTY_CONFIGS.forEach(([propName, dfValue]) => {
    _style.setProperty(
       '--' + propName,
       P[propName] || dfValue
    )
  })
};

const HP_THEME = {
  GREY: P_GREY,
  WHITE: P_WHITE,
  SAND: P_SAND,
  SAND_L: P_SAND_L
}
const DF_THEME_ID = "GREY";

const _crThemeConfig = (
  themeName
) => (HP_THEME[themeName] || HP_THEME[DF_THEME_ID]);

const _setTheme = (
  themeName
) => {
  _setCssPropertiesFrom(_crThemeConfig(themeName))
};

const uiTheme = {
  themeName: DF_THEME_ID,
  _init(){
    this.setThemeName(DF_THEME_ID)
  },
  getThemeName(){
    return this.themeName;
  },
  setThemeName(themeId){
    this.themeName = HP_THEME[themeId]
      ? themeId
      : DF_THEME_ID
    _setTheme(this.themeName)
    setChartTheme(themeId !== DF_THEME_ID)
  }
};

uiTheme._init()

export const setUiTheme = (
  item
) => {
  const _themeName = (item || {}).value;
  if (uiTheme.getThemeName() !== _themeName) {
    uiTheme.setThemeName(_themeName)
  }
}
