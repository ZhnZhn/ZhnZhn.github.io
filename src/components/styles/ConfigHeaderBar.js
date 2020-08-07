
const S = {
  BT: {
    color: '#1b2836'
  }
};

//for light
//0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.3)

const styleConfig = {
  themeName: void 0,
  style: void 0,

  createStyle: (CSS_RULE, themeName) => {
    return {
      ...S,
      ROOT: {
        ...CSS_RULE.BG
      },
      BT_HOT: {
        ...CSS_RULE.BT_HOT
      }
    };
  }
};

export default styleConfig
