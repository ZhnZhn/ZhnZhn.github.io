import { useRef, useCallback } from 'react';

import crCn from '../zhn-utils/crCn';
import CaptionInput from './CaptionInput';

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

const FlatButton = ({
  timeout=3000,
  className, style, clDiv=CL.BT_DIV, isPrimary,
  title='', caption, accessKey,
  children,
  onClick
}) => {
  const _refTimeStamp = useRef(null)
  , _hClick = useCallback((event) => {
    if (timeout === 0) {
      onClick(event)
      return;
    }
    const _timeStampPrev = _refTimeStamp.current
    , { timeStamp } = event;
    if (_timeStampPrev == null
        || timeStamp - _timeStampPrev > timeout) {
      onClick(event)
      _refTimeStamp.current = timeStamp
    }
  }, [timeout, onClick])
  , _className = crCn(CL.BT, className)
  , _style = isPrimary
       ? {...style, ...S.PRIMARY}
       : style  
  , _title = accessKey
       ? `${title} [${accessKey}]`
       : title;
  return (
    <button
      className={_className}
      style={_style}
      accessKey={accessKey}
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
