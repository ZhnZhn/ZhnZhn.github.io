const styleConfig = {
  //themeName: void 0,
  //style: void 0,

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
