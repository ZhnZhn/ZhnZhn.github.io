const styleConfig = {
  //themeName: void 0,
  //style: void 0,

  createStyle: (CSS_RULE) => {
    return {      
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
