import React from 'react';

const NOT_SELECTED = 'not-selected';
const S = {
  ROOT : {
    display : 'inline-block',
    color: '#80c040',
    border : '2px solid #80c040',
    borderRadius : '50%',
    lineHeight: '24px',
    width : '26px',
    height : '26px',
    textAlign: 'center',
    cursor: 'pointer'
  }
};

const ButtonCircle = (props) => {
    const {
           className, style,
           caption='', title,
           isWithoutDefault, onClick
         } = props
        , _className = (className)
             ? `${className} ${NOT_SELECTED}`
             : NOT_SELECTED
        , _style = (isWithoutDefault)
             ? style
             : Object.assign({}, S.ROOT, style);
    return (
      <span
         className={_className}
         style={_style}
         title={title}
         onClick={onClick}
      >
         {caption}
      </span>
    );
}

export default ButtonCircle
