const styleConfig = {
  themeName: undefined,
  style: undefined,

  createStyle: (CSS_RULE) => {
    return {
      CL_SCROLL: CSS_RULE.CL_SCROLL,
      ROOT: {
        ...CSS_RULE.BG
      },
      EL: {
        ...CSS_RULE.EL
      },
      EL_BORDER: {
        ...CSS_RULE.EL_BORDER
      }
    };
  }
};

export default styleConfig
