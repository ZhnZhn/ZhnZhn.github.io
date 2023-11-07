"use strict";

exports.__esModule = true;
exports.setUiPalette = exports.getColorBlack = exports.crUiThemeId = exports.DF_THEME_ID = void 0;
const COLOR_SILVER = "silver",
  COLOR_DARK_BLUE = "#1b2836",
  COLOR_DARK_CYAN = "#009688",
  COLOR_GREY = "grey",
  COLOR_BLACK = "black";
const DF_B_BG = "#5f5f5f";
const DF_S_C1 = "#8bc34a";
const DF_S_C2 = COLOR_DARK_BLUE;
const DF_C_BG = "#4d4d4d";
const DF_BH_C = "#c0c0c0";
const DF_LB_BC = COLOR_DARK_BLUE;
const DF_EL_BG = COLOR_DARK_BLUE;
const DF_EL_C = COLOR_SILVER;
const DF_BTF_C = COLOR_DARK_BLUE;
const DF_C_BLACK = COLOR_BLACK;
const DF_MENU_ITEM_COLOR = COLOR_DARK_BLUE;
const PROPERTY_B_BG = "b-bg",
  PROPERTY_S_C1 = "s-c1",
  PROPERTY_S_C2 = "s-c2",
  PROPERTY_C_BG = "c-bg",
  PROPERTY_BH_C = "bh-c",
  PROPERTY_LB_BC = "lb-bc",
  PROPERTY_EL_BG = "el-bg",
  PROPERTY_EL_C = "el-c",
  PROPERTY_BTF_C = "btf-c",
  PROPERTY_COLOR_BLACK = "c-bl",
  PROPERTY_MENU_ITEM_COLOR = "mi-c";
const PALETTE_KEYS = [PROPERTY_B_BG, PROPERTY_S_C1, PROPERTY_S_C2, PROPERTY_C_BG, PROPERTY_BH_C, PROPERTY_LB_BC, PROPERTY_EL_BG, PROPERTY_EL_C, PROPERTY_BTF_C, PROPERTY_COLOR_BLACK, PROPERTY_MENU_ITEM_COLOR];
const P_GREY_VALUES = [DF_B_BG, DF_S_C1, DF_S_C2, DF_C_BG, DF_BH_C, DF_LB_BC, DF_EL_BG, DF_EL_C, DF_BTF_C, DF_C_BLACK, DF_MENU_ITEM_COLOR];
const BTF_C_WHITE = COLOR_DARK_CYAN,
  EL_BG_WHITE = "#bcd8f5",
  LB_BC_LIGHT = COLOR_GREY;
const P_WHITE_VALUES = ["#e1e1e1", DF_S_C1, EL_BG_WHITE, "#ebf1f5", DF_BH_C, LB_BC_LIGHT, EL_BG_WHITE, "#212020", BTF_C_WHITE, DF_C_BLACK, DF_MENU_ITEM_COLOR];
const BTF_C_SAND = "#785133",
  EL_BG_SAND_L = "#64473d";
const P_SAND_L_VALUES = ["#9e9e9e", DF_S_C1, EL_BG_SAND_L, "#e8e0cb", "#5b5b5b", LB_BC_LIGHT, EL_BG_SAND_L, COLOR_SILVER, BTF_C_SAND, DF_C_BLACK, DF_MENU_ITEM_COLOR];
const DF_THEME_ID = exports.DF_THEME_ID = "GREY";
const PALETTE_VALUES = {
  GREY: P_GREY_VALUES,
  BLACK: P_GREY_VALUES,
  WHITE: P_WHITE_VALUES,
  SAND: P_SAND_L_VALUES,
  SAND_L: P_SAND_L_VALUES
};
const EL_BG_SAND = "#463222";
const BTF_C_BLACK = COLOR_DARK_CYAN;
const PALETTE_CHANGES = {
  BLACK: {
    [PROPERTY_B_BG]: "#202328",
    [PROPERTY_C_BG]: COLOR_BLACK,
    [PROPERTY_EL_BG]: "#292e37",
    [PROPERTY_BTF_C]: BTF_C_BLACK,
    [PROPERTY_COLOR_BLACK]: COLOR_GREY,
    [PROPERTY_MENU_ITEM_COLOR]: BTF_C_BLACK
  },
  SAND: {
    [PROPERTY_S_C2]: EL_BG_SAND,
    [PROPERTY_C_BG]: "#e6d5a9",
    [PROPERTY_EL_BG]: EL_BG_SAND
  }
};
const _crPalette = values => PALETTE_KEYS.reduce((p, key, index) => {
  p[key] = values[index];
  return p;
}, {});
const _PALETTES_HM = Object.create(null);
_PALETTES_HM[DF_THEME_ID] = _crPalette(PALETTE_VALUES[DF_THEME_ID]);
let _colorBlack = _PALETTES_HM[DF_THEME_ID][PROPERTY_COLOR_BLACK];
const getColorBlack = () => _colorBlack;
exports.getColorBlack = getColorBlack;
const crUiThemeId = uiThemeId => PALETTE_VALUES[uiThemeId] ? uiThemeId : DF_THEME_ID;
exports.crUiThemeId = crUiThemeId;
const _getPalette = uiThemeId => {
  if (!_PALETTES_HM[uiThemeId]) {
    const _paletteValues = PALETTE_VALUES[uiThemeId];
    if (!_paletteValues) {
      return _PALETTES_HM[DF_THEME_ID];
    }
    _PALETTES_HM[uiThemeId] = {
      ..._crPalette(_paletteValues),
      ...(PALETTE_CHANGES[uiThemeId] || void 0)
    };
  }
  return _PALETTES_HM[uiThemeId];
};
const setUiPalette = uiThemeId => {
  const _palette = _getPalette(uiThemeId),
    _style = document.body.style,
    _dfPaletteValues = PALETTE_VALUES[DF_THEME_ID];
  PALETTE_KEYS.forEach((propName, index) => {
    _style.setProperty(`--${propName}`, _palette[propName] || _dfPaletteValues[index]);
  });
  _colorBlack = _palette[PROPERTY_COLOR_BLACK];
};
exports.setUiPalette = setUiPalette;
//# sourceMappingURL=paletteFn.js.map