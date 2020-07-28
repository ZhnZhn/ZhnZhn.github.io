import React, { useRef, useCallback } from 'react'

import CaptionInput from './CaptionInput'

const CL = {
  BT: 'bt-flat',
  BT_DIV: 'bt-flat__div',
  BT_SPAN: 'bt-flat__span'
};
const S = {
  PRIMARY: {
    color: '#607d8b'
  }
};
const POINTER_EVENTS = 'pointer-events';

const _isNotZeroNumber = n => n
 && typeof n === 'number'
 && n-n === 0;

const  _setPointerEvents = (refBt, value='auto') => {
  const btNode = refBt && refBt.current;
  if (btNode && btNode.style) {
    btNode.style[POINTER_EVENTS] = value
  }
};


const FlatButton = ({
  timeout=3000,
  className, style, clDiv=CL.BT_DIV, isPrimary,
  title='', caption, accessKey,
  children,
  onClick
}) => {
  const refBt = useRef(null)
  , _hClick = useCallback((event) => {
    if (_isNotZeroNumber(timeout)) {
      _setPointerEvents(refBt, 'none')
      setTimeout(() => _setPointerEvents(refBt), timeout)
    }
    onClick(event)
  }, [timeout, onClick])
  , _style = isPrimary
       ? {...style, ...S.PRIMARY }
       : style
  , _className = className
       ? `${CL.BT} ${className}`
       : CL.BT
  , _title = accessKey
       ? `${title} [${accessKey}]`
       : title;
  return (
    <button
      type="button"
      ref = {refBt}
      className={_className}
      style={_style}
      accessKey={accessKey}
      tabIndex={0}
      title={_title}
      onClick={_hClick}
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
