import React from 'react'

const S = {
  ROOT: {
    display: 'inline-block',
    backgroundColor: '#949ab4',
    width: '32px',
    lineHeight: '2.0',
    borderRadius: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    cursor: 'pointer'
  }
};

const ButtonCircle2 = ({ style, caption='', onClick, ...rest }) =>
  <button    
     style={{ ...S.ROOT, ...style }}
     onClick={onClick}
     {...rest}
  >
     {caption}
  </button>

export default ButtonCircle2
