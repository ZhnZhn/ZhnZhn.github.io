import React from 'react'

import CaptionInput from './CaptionInput'

const CL = {
  BT: 'bt-flat',
  BT_DIV: 'bt-flat__div',
  BT_SPAN: 'bt-flat__span'
};

const S = {
  PRIMARY: {
    color: '#607D8B'
  }
}

const FlatButton = ({
  className, rootStyle, clDiv=CL.BT_DIV, isPrimary,
  title='', caption, accessKey,
  children, onClick
}) => {
  const _style = isPrimary
           ? {...rootStyle, ...S.PRIMARY }
           : rootStyle
      , _className = className
           ? CL.BT + ' ' + className
           : CL.BT;

  return (
    <button
      className={_className}
      style={_style}
      type="button"
      tabIndex={0}
      title={title}
      accessKey={accessKey}
      onClick={onClick}
    >
      <div className={clDiv}>
        <CaptionInput
          className={CL.BT_SPAN}
          caption={caption}
          accessKey={accessKey}
        />
        {children}
      </div>
    </button>
  );
}


export default FlatButton
