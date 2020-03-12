import React from 'react';
//import PropTypes from "prop-types";

const CL = {
  ROOT: 'zhn-bt-circle',
  NOT: 'not-selected'
};

const ButtonCircle = ({
  className='', style,
  caption='', title,
  isWithoutDefault,
  onClick
}) => {
   const _className = isWithoutDefault
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

/*
ButtonCircle.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  caption: PropTypes.string,
  title: PropTypes.string,
  isWithoutDefault: PropTypes.bool,
  onClick: PropTypes.func
}
*/

export default ButtonCircle
