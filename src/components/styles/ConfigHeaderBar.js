
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

  createStyle: (CSS_RULE) => {
    return {
      ...S,
      ROOT: {
        ...CSS_RULE.BG
      }
    };
  }
};

export default styleConfig
