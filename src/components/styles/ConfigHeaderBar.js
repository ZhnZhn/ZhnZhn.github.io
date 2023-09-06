const S = {
  BT: {
    color: '#1b2836'
  }
};

const styleConfig = {
  createStyle: (CSS_RULE, themeName) => {
    return {
      ...S,
      ROOT: {
        ...CSS_RULE.BG
      },
    };
  }
};

export default styleConfig
