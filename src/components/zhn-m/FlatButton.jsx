import { useRef, useCallback } from 'react';

import crCn from '../zhn-utils/crCn';
import BtCaption from './BtCaption';

const CL_ARROW = "arrow-down"
, CL_BT_FLAT = 'bt-flat'
, CL_BT_FLAT_CAPTION = 'bt-flat__caption'
, S_PRIMARY = { color: '#607d8b' };

const FlatButton = ({
  refBt,
  isArrow,
  timeout=3000,
  className, style, isPrimary,
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
  , _className = crCn(CL_BT_FLAT, className)
  , _style = isPrimary
       ? {...style, ...S_PRIMARY}
       : style
  , _title = accessKey
       ? `${title} [${accessKey}]`
       : title;
  return (
    <button
      ref={refBt}
      className={_className}
      style={_style}
      accessKey={accessKey}
      title={_title}
      onClick={_hClick}
    >
      <BtCaption
        className={CL_BT_FLAT_CAPTION}
        caption={caption}
        accessKey={accessKey}
      >
        {isArrow && <span className={CL_ARROW} />}
      </BtCaption>
      {children}
    </button>
  );
};

export default FlatButton
