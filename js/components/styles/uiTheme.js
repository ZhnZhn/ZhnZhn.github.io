"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartUiTheme = require("../../charts/ChartUiTheme");

var _RouterConfig = _interopRequireDefault(require("./RouterConfig"));

const DF_T_C = '#1b2836';
const P_GREY = {
  BG_BODY: '#5f5f5f',
  BG: '#4d4d4d',
  BT_HOT_C: '#c0c0c0',
  EL_BG: '#1b2836',
  EL_C: 'silver',
  T_C: DF_T_C
};
const P_WHITE = {
  BG_BODY: '#e1e1e1',
  BG: '#ebf1f5',
  BT_HOT_C: '#c0c0c0',
  EL_BG: '#bcd8f5',
  EL_C: '#212020',
  T_C: '#1b75bb'
};
const SAND_P = {
  BG_BODY: '#9e9e9e',
  BG: '#e8e0cb',
  BT_HOT_C: '#5b5b5b',
  EL_BG: '#64473d',
  EL_C: 'silver'
};
const P_SAND = { ...SAND_P,
  BG: '#e6d5a9',
  EL_BG: '#463222',
  T_C: '#785133'
};
const P_SAND_L = { ...SAND_P,
  T_C: '#785133'
};
const CSS_RULE = {
  BG: {},
  BT_HOT: {},
  EL: {},
  EL_BORDER: {},
  EL_BG: {}
};
const _assign = Object.assign;

const _setStyle = (conf, P) => {
  const _style = document.body.style;
  _style.backgroundColor = P.BG_BODY;

  _style.setProperty("--t-c", P.T_C || DF_T_C);
};

const _crBg = (conf, P) => {
  _assign(conf.BG, {
    backgroundColor: P.BG
  });
};

const _crEl = (conf, P) => {
  _assign(conf.EL, {
    backgroundColor: P.EL_BG,
    color: P.EL_C,
    fill: P.EL_C,
    stroke: P.EL_C
  });

  _assign(conf.EL_BORDER, {
    border: "2px solid " + P.EL_BG
  });

  _assign(conf.EL_BG, {
    backgroundColor: P.EL_BG
  });
};

const _crHotBt = (conf, P) => {
  _assign(conf.BT_HOT, {
    color: P.BT_HOT_C
  });
};

const _FN_STYLES = [_crBg, _crEl, _crHotBt, _setStyle];

const _setStyleTo = (conf, pallete) => {
  _FN_STYLES.forEach(fn => fn(conf, pallete));
};

const HP_THEME = {
  GREY: [P_GREY, '--grey'],
  WHITE: [P_WHITE, '--white'],
  SAND: [P_SAND, '--sand'],
  SAND_L: [P_SAND_L, '--sand-l']
};
const DF_THEME_ID = 'GREY';

const _crThemeConfig = themeName => {
  const _arr = HP_THEME[themeName] || HP_THEME[DF_THEME_ID];

  return {
    pallete: _arr[0],
    clSuffix: _arr[1]
  };
};

const CL_PROPS = {
  CL_SCROLL: 'scroll'
};

const _setClassNameTo = function (suffix) {
  if (suffix === void 0) {
    suffix = '';
  }

  Object.keys(CL_PROPS).forEach(key => {
    CSS_RULE[key] = CL_PROPS[key] + suffix;
  });
};

const _setTheme = themeName => {
  const {
    clSuffix,
    pallete
  } = _crThemeConfig(themeName);

  _setClassNameTo(clSuffix);

  _setStyleTo(CSS_RULE, pallete);
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
  },

  getStyle(id) {
    const config = _RouterConfig.default[id] || _RouterConfig.default.DF;

    if (this.themeName !== config.themeName) {
      config.style = config.createStyle(CSS_RULE, this.themeName);
      config.themeName = this.themeName;
    }

    return config.style;
  }

};

uiTheme._init();

var _default = uiTheme;
exports.default = _default;
//# sourceMappingURL=uiTheme.js.map