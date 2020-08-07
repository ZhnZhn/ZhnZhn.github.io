import routerConfig from './RouterConfig'

const P_GREY = {
  BG_BODY: '#5f5f5f',
  BG: '#4d4d4d',

  BT_HOT_C: '#c0c0c0',

  EL_BG: '#1b2836',
  EL_C: 'silver',

  BG_HEADER: '#3a6799',
  C_HEADER: '#8a8a8a'
};
const P_WHITE = {
  BG_BODY: '#e1e1e1',
  BG: '#ebf1f5',

  BT_HOT_C: '#c0c0c0',

  EL_BG: '#bcd8f5',
  EL_C: '#212020',

  BG_HEADER: '#0096c8',
  C_HEADER: '#4d4d4d'
};
const P_SAND = {
  BG_BODY: '#9e9e9e',  
  BG: '#e6d5a9',

  BT_HOT_C: '#5b5b5b',

  EL_BG: '#463222',
  EL_C: 'silver',

  BG_HEADER: '#0096c8',
  C_HEADER: '#4d4d4d'
};

const CSS_RULE = {
  BG: {},

  BT_HOT: {},

  EL: {},
  EL_BORDER: {},
  EL_BG: {},

  BG_HEADER: {},
  R_DIALOG: {}
};

const _assign = Object.assign;
const _setBodyBg = (conf, P) => {
  document.body.style.backgroundColor = P.BG_BODY
};
const _crBg = (conf, P) => {
  _assign(conf.BG, {
    backgroundColor: P.BG
  })
}
const _crEl = (conf, P) => {
  _assign(conf.EL, {
    backgroundColor: P.EL_BG,
    color: P.EL_C,
    fill: P.EL_C,
    stroke: P.EL_C
  })
  _assign(conf.EL_BORDER, {
    border: `2px solid ${P.EL_BG}`
  })
  _assign(conf.EL_BG, {
    backgroundColor: P.EL_BG,
  })
}
const _crHotBt = (conf, P) => {
  _assign(conf.BT_HOT, {
     color: P.BT_HOT_C
  })
}


const _FN_STYLES = [
  _setBodyBg,
  _crBg,
  _crEl,
  _crHotBt
];
const _setStyleTo = (conf, pallete) => {
  _FN_STYLES.forEach(fn => fn(conf, pallete))
};

export const THEME_NAME = {
  DEFAULT: 'GREY',
  GREY: 'GREY',
  WHITE: 'WHITE',
  SAND: 'SAND'
};

const THEME_CONFIG = {
  [THEME_NAME.GREY]: {
    pallete: P_GREY,
    clSuffix: '--grey'
  },
  [THEME_NAME.WHITE]: {
    pallete: P_WHITE,
    clSuffix: '--white'
  },
  [THEME_NAME.SAND]: {
    pallete: P_SAND,
    clSuffix: '--sand'
  }
};

const CL_PROPS = {
  CL_SCROLL: 'with-scroll',
};

const _setClassNameTo = (suffix='') => {
  Object.keys(CL_PROPS).forEach(key => {
    CSS_RULE[key] = CL_PROPS[key] + suffix
  })
}

const _setTheme = (themeName) => {
  const config = THEME_CONFIG[themeName];
  const { clSuffix, pallete } = config;
  _setClassNameTo(clSuffix)
  _setStyleTo(CSS_RULE, pallete)
}

const theme = {
  themeName: THEME_NAME.DEFAULT,
  _init(){
    this.setThemeName(THEME_NAME.DEFAULT)
  },
  getThemeName(){
    return this.themeName;
  },
  setThemeName(themeName){
    this.themeName = THEME_NAME[themeName] || THEME_NAME.DEFAULT;
    _setTheme(this.themeName)
  },
  getStyle(id){
    const config = routerConfig[id] || routerConfig.DF;
    if (this.themeName !== config.themeName){
      config.style = config.createStyle(CSS_RULE, this.themeName)
      config.themeName = this.themeName
    }
    return config.style;
  }
};

theme._init()

export default theme
