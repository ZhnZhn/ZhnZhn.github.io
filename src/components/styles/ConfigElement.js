const styleConfig = {
  themeName: void 0,
  style: void 0,

  createStyle: (CSS_RULE) => {
    return {
      ROOT: {
        ...CSS_RULE.EL
      },
      BORDER: {
        ...CSS_RULE.EL_BORDER
      },
      BG: {
        ...CSS_RULE.EL_BG
      }
    };
  }
};

export default styleConfig
