'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.THEME_NAME = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _THEME_CONFIG;

var _RouterConfig = require('./RouterConfig');

var _RouterConfig2 = _interopRequireDefault(_RouterConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var P_GREY = {
  BG_BODY: '#5f5f5f',
  BG: '#4d4d4d',

  EL_BG: '#1b2836',
  EL_C: 'silver',

  BG_HEADER: '#3a6799',
  C_HEADER: '#8a8a8a'
};
var P_WHITE = {
  //BG_BODY: '#d0d0d0',
  BG_BODY: '#e1e1e1',
  BG: '#ebf1f5',

  EL_BG: '#bcd8f5',
  EL_C: '#212020',

  BG_HEADER: 'rgb(0, 150, 200)',
  C_HEADER: '#4d4d4d'
};
var P_SAND = {
  //BG_BODY: '#ddd',
  BG_BODY: '#9e9e9e',
  BG: '#e8e0cb',

  //EL_BG: '#795548',
  EL_BG: '#64473d',
  EL_C: 'silver',

  BG_HEADER: 'rgb(0, 150, 200)',
  C_HEADER: '#4d4d4d'
};

var CSS_RULE = {
  BG: {},

  EL: {},
  EL_BORDER: {},
  EL_BG: {},

  BG_HEADER: {},
  R_DIALOG: {}
};

var _assign = Object.assign;
var _setBodyBg = function _setBodyBg(conf, P) {
  document.body.style.backgroundColor = P.BG_BODY;
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
    border: '2px solid ' + P.EL_BG
  });
  _assign(conf.EL_BG, {
    backgroundColor: P.EL_BG
  });
};

var _FN_STYLES = [_setBodyBg, _crBg, _crEl];
var _setStyleTo = function _setStyleTo(conf, pallete) {
  _FN_STYLES.forEach(function (fn) {
    return fn(conf, pallete);
  });
};

var THEME_NAME = exports.THEME_NAME = {
  DEFAULT: 'GREY',
  GREY: 'GREY',
  WHITE: 'WHITE',
  SAND: 'SAND'
};

var THEME_CONFIG = (_THEME_CONFIG = {}, (0, _defineProperty3.default)(_THEME_CONFIG, THEME_NAME.GREY, {
  pallete: P_GREY,
  clSuffix: '--grey'
}), (0, _defineProperty3.default)(_THEME_CONFIG, THEME_NAME.WHITE, {
  pallete: P_WHITE,
  clSuffix: '--white'
}), (0, _defineProperty3.default)(_THEME_CONFIG, THEME_NAME.SAND, {
  pallete: P_SAND,
  clSuffix: '--sand'
}), _THEME_CONFIG);

var CL_PROPS = {
  CL_SCROLL: 'with-scroll'
};

var _setClassNameTo = function _setClassNameTo() {
  var suffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  Object.keys(CL_PROPS).forEach(function (key) {
    CSS_RULE[key] = CL_PROPS[key] + suffix;
  });
};

var _setTheme = function _setTheme(themeName) {
  var config = THEME_CONFIG[themeName];
  var clSuffix = config.clSuffix,
      pallete = config.pallete;

  _setClassNameTo(clSuffix);
  _setStyleTo(CSS_RULE, pallete);
};

var theme = {
  themeName: THEME_NAME.DEFAULT,
  _init: function _init() {
    this.setThemeName(THEME_NAME.DEFAULT);
  },
  getThemeName: function getThemeName() {
    return this.themeName;
  },
  setThemeName: function setThemeName(themeName) {
    this.themeName = THEME_NAME[themeName] || THEME_NAME.DEFAULT;
    _setTheme(this.themeName);
  },
  getStyle: function getStyle(id) {
    var config = _RouterConfig2.default[id] || _RouterConfig2.default.DF;
    if (this.themeName !== config.themeName) {
      config.style = config.createStyle(CSS_RULE, this.themeName);
      config.themeName = this.themeName;
    }
    return config.style;
  }
};

theme._init();

exports.default = theme;
//# sourceMappingURL=theme.js.map