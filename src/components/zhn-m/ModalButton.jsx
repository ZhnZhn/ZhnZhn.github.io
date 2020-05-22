import React from 'react'

import CaptionInput from './CaptionInput'

const CL = {
  BT: 'bt-flat',
  BT_DIV: 'bt-flat__div',
  BT_SPAN: 'bt-flat__span'
};

const ModalButton = ({
  refBt,
  className='', rootStyle,
  clDiv=CL.BT_DIV,
  title='', caption,
  accessKey,
  children,
  onClick
}) => {
  const _className = (CL.BT + ' ' + className).trim()
  , _title = accessKey
      ? `${title} [${accessKey}]`
      : title;
  return (
    <button
      ref={refBt}
      type="button"
      className={_className}
      style={rootStyle}
      accessKey={accessKey}
      title={_title}
      tabIndex={0}
      onClick={onClick}
    >
      <div className={clDiv}>
        <CaptionInput
          className={CL.BT_SPAN}
          caption={caption}
          accessKey={accessKey}
        >
           {children}
        </CaptionInput>
      </div>
    </button>
  );
}

export default ModalButton
