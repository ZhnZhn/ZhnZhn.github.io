const styleConfig = {
  themeName: undefined,
  style: undefined,

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
