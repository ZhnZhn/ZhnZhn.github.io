const styleConfig = {
  createStyle: (CSS_RULE) => {
    return {
      ROOT: {
        ...CSS_RULE.BG
      },
    };
  }
};

export default styleConfig
