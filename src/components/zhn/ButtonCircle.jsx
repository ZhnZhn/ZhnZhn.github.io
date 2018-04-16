import React from 'react';

const CL = {
  ROOT: 'zhn-bt-circle',
  NOT: 'not-selected'
};

const ButtonCircle = (props) => {
    const {
           className='', style,
           caption='', title,
           isWithoutDefault,
           onClick
         } = props
        , _className = (isWithoutDefault)
            ? `${className} ${CL.NOT}`
            : `${CL.ROOT} ${className} ${CL.NOT}`;
    return (
      <button
         className={_className}
         style={style}
         title={title}
         onClick={onClick}
      >
        <div>
          {caption}
        </div>
      </button>
    );
}

export default ButtonCircle
