
const S = {
  BT: {
    color: '#1b2836'
  },
  LIMIT: {
    float: 'right',
    paddingTop: '9px'
  }
};

//for light
//0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.3)

const styleConfig = {
  themeName: undefined,
  style: undefined,

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
