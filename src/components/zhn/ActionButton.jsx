import React from 'react'

const ActionButton = (props) => {
  const {
          type, style, title, caption,
          children, onClick
        } = props;
  let _className;
  switch (type) {
    case 'TypeA': _className = 'button-type-a'; break;
    case 'TypeC': _className = 'button-type-c'; break;
    default     : _className = 'button-type-b';
  }
  return (
    <button
         className={_className}
         style={style}
         title={title}
         onClick={onClick}
     >
       {caption}
       {children}
    </button>
  );
}

export default ActionButton
