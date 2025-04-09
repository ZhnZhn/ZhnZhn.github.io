const COLOR_SILVER = "silver"
, COLOR_DARK_BLUE = "#1b2836"
, COLOR_DARK_CYAN = "#009688"
, COLOR_GREY = "grey"
, COLOR_DARK_GREY = "#5b5b5b"
, COLOR_BLACK = "black";

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

const PROPERTY_B_BG = "b-bg"

, PROPERTY_S_C1 = "s-c1"
, PROPERTY_S_C2 = "s-c2"

, PROPERTY_C_BG = "c-bg"
, PROPERTY_BH_C = "bh-c"
, PROPERTY_LB_BC = "lb-bc"

, PROPERTY_EL_BG = "el-bg"
, PROPERTY_EL_C = "el-c"

, PROPERTY_BTF_C = "btf-c"
, PROPERTY_COLOR_BLACK = "c-bl";

const PALETTE_KEYS = [
  PROPERTY_B_BG,

  PROPERTY_S_C1,
  PROPERTY_S_C2,

  PROPERTY_C_BG,
  PROPERTY_BH_C,
  PROPERTY_LB_BC,

  PROPERTY_EL_BG,
  PROPERTY_EL_C,

  PROPERTY_BTF_C,
  PROPERTY_COLOR_BLACK
]

const P_GREY_VALUES = [
  DF_B_BG,

  DF_S_C1,
  DF_S_C2,

  DF_C_BG,
  DF_BH_C,
  DF_LB_BC,

  DF_EL_BG,
  DF_EL_C,

  DF_BTF_C,
  DF_C_BLACK
];

const EL_BG_WHITE = "#dce1e5"
, LB_BC_LIGHT = COLOR_GREY;
const P_WHITE_VALUES = [
  "#e1e1e1",

  DF_S_C1,
  EL_BG_WHITE,

  "#f1f2f3",
  DF_BH_C,
  LB_BC_LIGHT,

  EL_BG_WHITE,
  "#212020",

  "#5d869a",
  DF_C_BLACK
];

const BTF_C_SAND = "#785133"
, EL_BG_SAND_L = "#64473d";
const P_SAND_L_VALUES = [
  "#9e9e9e",

  DF_S_C1,
  EL_BG_SAND_L,

  "#e8e0cb",
  COLOR_DARK_GREY,
  LB_BC_LIGHT,

  "#795548",
  COLOR_SILVER,

  BTF_C_SAND,
  DF_C_BLACK
];

const _crLightThemeId = id => "Light " + id
, _crDarkThemeId = id => " Dark " + id
, _GREY_THEME_ID = "Grey"
, _GREY_L_THEME_ID = _crLightThemeId(_GREY_THEME_ID)
, _GREY_D_THEME_ID = _crDarkThemeId(_GREY_THEME_ID)

, _SAND_THEME_ID = "Sand"
, _SAND_L_THEME_ID = _crLightThemeId(_SAND_THEME_ID)

, _WHITE_THEME_ID = "White"
, _BLACK_THEME_ID = "Black";

export const UI_THEME_OPTIONS = [
  _GREY_THEME_ID,
  _WHITE_THEME_ID,
  _GREY_L_THEME_ID,
  _SAND_L_THEME_ID,
  _SAND_THEME_ID,
  _GREY_D_THEME_ID,
  _BLACK_THEME_ID
].map(id => ({ c: id, v: id }))

export const DF_THEME_ID = _GREY_THEME_ID;
const PALETTE_VALUES = {
  [_GREY_THEME_ID]: P_GREY_VALUES,
  [_GREY_D_THEME_ID]: P_GREY_VALUES,
  [_BLACK_THEME_ID]: P_GREY_VALUES,

  [_GREY_L_THEME_ID]: P_WHITE_VALUES,
  [_WHITE_THEME_ID]: P_WHITE_VALUES,

  [_SAND_THEME_ID]: P_SAND_L_VALUES,
  [_SAND_L_THEME_ID]: P_SAND_L_VALUES
};

const EL_BG_GREY_L = "#c0c4c6";
const DARK_THEME_PROPS = {
  [PROPERTY_B_BG]: "#202328",
  [PROPERTY_EL_BG]: "#004d4d",

  [PROPERTY_BTF_C]: COLOR_DARK_CYAN,
  [PROPERTY_COLOR_BLACK]: COLOR_GREY
};
const PALETTE_CHANGES = {
  [_GREY_L_THEME_ID]: {
    [PROPERTY_C_BG]: "#d3d3d3",

    [PROPERTY_S_C2]: EL_BG_GREY_L,
    [PROPERTY_EL_BG]: EL_BG_GREY_L,

    [PROPERTY_BH_C]: COLOR_DARK_GREY
  },
  [_GREY_D_THEME_ID]: {
    ...DARK_THEME_PROPS,
    [PROPERTY_C_BG]: "#202124"
  },
  [_BLACK_THEME_ID]: {
    ...DARK_THEME_PROPS,
    [PROPERTY_C_BG]: COLOR_BLACK
  },
  [_SAND_THEME_ID]: {
    [PROPERTY_C_BG]: "#e6d5a9"
  }
};

const _crPalette = (
  values
) => PALETTE_KEYS.reduce((p, key, index) => {
  p[key] = values[index]
  return p;
}, {});

const _PALETTES_HM = Object.create(null);
_PALETTES_HM[DF_THEME_ID] = _crPalette(PALETTE_VALUES[DF_THEME_ID])

let _colorBlack = _PALETTES_HM[DF_THEME_ID][PROPERTY_COLOR_BLACK];
export const getColorBlack = () => _colorBlack

export const crUiThemeId = (
  uiThemeId
) => PALETTE_VALUES[uiThemeId]
  ? uiThemeId
  : DF_THEME_ID;

const _getPalette = (
  uiThemeId
) => {
  if (!_PALETTES_HM[uiThemeId]) {
    const _paletteValues = PALETTE_VALUES[uiThemeId];
    if (!_paletteValues) {
      return _PALETTES_HM[DF_THEME_ID];
    }
    _PALETTES_HM[uiThemeId] = {
      ..._crPalette(_paletteValues),
      ...(PALETTE_CHANGES[uiThemeId] || void 0)
    }
  }
  return _PALETTES_HM[uiThemeId];
}

export const setUiPalette = (
  uiThemeId
) => {
  const _palette = _getPalette(uiThemeId)
  , _style = document.body.style
  , _dfPaletteValues = PALETTE_VALUES[DF_THEME_ID];

  PALETTE_KEYS.forEach((propName, index) => {
    _style.setProperty(
       `--${propName}`,
       _palette[propName] || _dfPaletteValues[index]
    )
  })

  _colorBlack = _palette[PROPERTY_COLOR_BLACK]
};
