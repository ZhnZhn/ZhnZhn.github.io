const styleConfig = {  
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
