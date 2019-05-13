
const styleConfig = {
  createStyle: (CSS_RULE, themeName) => {
    const borderColor = themeName === 'GREY'
      ? '#1b2836'
      : 'grey';    
    return {
      ROOT: {
        borderWidth: 0,
        borderColor,
        fill: CSS_RULE.BG.backgroundColor
      }
    };
  }
};

export default styleConfig
