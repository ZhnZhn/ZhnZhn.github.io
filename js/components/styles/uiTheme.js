"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _RouterConfig = _interopRequireDefault(require("./RouterConfig"));

var DF_T_C = '#1b2836';
var P_GREY = {
  BG_BODY: '#5f5f5f',
  BG: '#4d4d4d',
  BT_HOT_C: '#c0c0c0',
  EL_BG: '#1b2836',
  EL_C: 'silver',
  T_C: DF_T_C
};
var P_WHITE = {
  BG_BODY: '#e1e1e1',
  BG: '#ebf1f5',
  BT_HOT_C: '#c0c0c0',
  EL_BG: '#bcd8f5',
  EL_C: '#212020',
  T_C: '#1b75bb'
};
var SAND_P = {
  BG_BODY: '#9e9e9e',
  BG: '#e8e0cb',
  BT_HOT_C: '#5b5b5b',
  EL_BG: '#64473d',
  EL_C: 'silver'
};
var P_SAND = (0, _extends2["default"])({}, SAND_P, {
  BG: '#e6d5a9',
  EL_BG: '#463222',
  T_C: '#785133'
});
var P_SAND_L = (0, _extends2["default"])({}, SAND_P, {
  T_C: '#785133'
});
var CSS_RULE = {
  BG: {},
  BT_HOT: {},
  EL: {},
  EL_BORDER: {},
  EL_BG: {}
};
var _assign = Object.assign;

var _setStyle = function _setStyle(conf, P) {
  var _style = document.body.style;
  _style.backgroundColor = P.BG_BODY;

  _style.setProperty("--t-c", P.T_C || DF_T_C);
};

var _crBg = function _crBg(conf, P) {
  _assign(conf.BG, {
    backgroundColor: P.BG
  });
};

var _crEl = function _crEl(conf, P) {
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

var _crHotBt = function _crHotBt(conf, P) {
  _assign(conf.BT_HOT, {
    color: P.BT_HOT_C
  });
};

var _FN_STYLES = [_crBg, _crEl, _crHotBt, _setStyle];

var _setStyleTo = function _setStyleTo(conf, pallete) {
  _FN_STYLES.forEach(function (fn) {
    return fn(conf, pallete);
  });
};

var HP_THEME = {
  GREY: [P_GREY, '--grey'],
  WHITE: [P_WHITE, '--white'],
  SAND: [P_SAND, '--sand'],
  SAND_L: [P_SAND_L, '--sand-l']
};
var DF_THEME_ID = 'GREY';

var _crThemeConfig = function _crThemeConfig(themeName) {
  var _arr = HP_THEME[themeName] || HP_THEME[DF_THEME_ID];

  return {
    pallete: _arr[0],
    clSuffix: _arr[1]
  };
};

var CL_PROPS = {
  CL_SCROLL: 'scroll'
};

var _setClassNameTo = function _setClassNameTo(suffix) {
  if (suffix === void 0) {
    suffix = '';
  }

  Object.keys(CL_PROPS).forEach(function (key) {
    CSS_RULE[key] = CL_PROPS[key] + suffix;
  });
};

var _setTheme = function _setTheme(themeName) {
  var _crThemeConfig2 = _crThemeConfig(themeName),
      clSuffix = _crThemeConfig2.clSuffix,
      pallete = _crThemeConfig2.pallete;

  _setClassNameTo(clSuffix);

  _setStyleTo(CSS_RULE, pallete);
};

var uiTheme = {
  themeName: DF_THEME_ID,
  _init: function _init() {
    this.setThemeName(DF_THEME_ID);
  },
  getThemeName: function getThemeName() {
    return this.themeName;
  },
  setThemeName: function setThemeName(themeId) {
    this.themeName = HP_THEME[themeId] ? themeId : DF_THEME_ID;

    _setTheme(this.themeName);
  },
  getStyle: function getStyle(id) {
    var config = _RouterConfig["default"][id] || _RouterConfig["default"].DF;

    if (this.themeName !== config.themeName) {
      config.style = config.createStyle(CSS_RULE, this.themeName);
      config.themeName = this.themeName;
    }

    return config.style;
  }
};

uiTheme._init();

var _default = uiTheme;
exports["default"] = _default;
//# sourceMappingURL=uiTheme.js.map