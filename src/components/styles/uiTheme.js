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

const PALETTE_KEYS = [
  PROPERTY_B_BG,

  PROPERTY_T_C,
  PROPERTY_S_C1,
  PROPERTY_S_C2,

  PROPERTY_C_BG,
  PROPERTY_BH_C,
  PROPERTY_LB_BC,

  PROPERTY_EL_BG,
  PROPERTY_EL_C
]

const _crPalette = (
  values
) => PALETTE_KEYS.reduce((p, key, index) => {
  p[key] = values[index]
  return p;
}, {});

const P_GREY_VALUES = [
  DF_B_BG,

  DF_T_C,
  DF_S_C1,
  DF_S_C2,

  DF_C_BG,
  DF_BH_C,
  DF_LB_BC,

  DF_EL_BG,
  DF_EL_C
];

const EL_BG_WHITE = "#bcd8f5"
, LB_BC_LIGHT = "grey";
const P_WHITE_VALUES = [
  "#e1e1e1",

  "#1b75bb",
  DF_S_C1,
  EL_BG_WHITE,

  "#ebf1f5",
  DF_BH_C,
  LB_BC_LIGHT,

  EL_BG_WHITE,
  "#212020"
];

const EL_BG_SAND_L = "#64473d";
const P_SAND_L_VALUES = [
  "#9e9e9e",

  "#785133",
  DF_S_C1,
  EL_BG_SAND_L,

  "#e8e0cb",
  "#5b5b5b",
  LB_BC_LIGHT,

  EL_BG_SAND_L,
  COLOR_SILVER
];

const DF_THEME_ID = "GREY";
const PALETTE_VALUES = {
  GREY: P_GREY_VALUES,
  WHITE: P_WHITE_VALUES,
  SAND: P_SAND_L_VALUES,
  SAND_L: P_SAND_L_VALUES
}

const EL_BG_SAND = "#463222";
const PALETTE_CHANGES = {
  SAND: {
    [PROPERTY_S_C2]: EL_BG_SAND,
    [PROPERTY_C_BG]: "#e6d5a9",

    [PROPERTY_EL_BG]: EL_BG_SAND
  }
}

const PALETTE = {
  [DF_THEME_ID]: _crPalette(PALETTE_VALUES[DF_THEME_ID]),

  getPalette(uiThemeId) {
    if (!this[uiThemeId]) {
      const _paletteValues = PALETTE_VALUES[uiThemeId];
      if (!_paletteValues) {
        return this[DF_THEME_ID];
      }
      this[uiThemeId] = {
        ..._crPalette(PALETTE_VALUES[uiThemeId]),
        ...(PALETTE_CHANGES[uiThemeId] || void 0)
      }

    }
    return this[uiThemeId];
  }
}

const _setCssPropertiesFrom = (P) => {
  const _style = document.body.style
  , _dfPaletteValues = PALETTE_VALUES[DF_THEME_ID];
  PALETTE_KEYS.forEach((propName, index) => {
    _style.setProperty(
       '--' + propName,
       P[propName] || _dfPaletteValues[index]
    )
  })
};

const _crThemeName = (
  themeId
) => PALETTE_VALUES[themeId]
  ? themeId
  : DF_THEME_ID;

const uiTheme = {
  themeName: DF_THEME_ID,
  _init(){
    this.setThemeName(DF_THEME_ID)
  },
  getThemeName(){
    return this.themeName;
  },
  setThemeName(themeId){
    this.themeName = _crThemeName(themeId)
    _setCssPropertiesFrom(
       PALETTE.getPalette(this.themeName)
    )
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
