import useThrottleClick from '../hooks/useThrottleClick';

import crCn from '../zhn-utils/crCn';
import has from '../has'
import BtCaption from './BtCaption';

const HAS_TOUCH = has.touch
, CL_ARROW = "arrow-down"
, CL_BT_FLAT = 'bt-flat'
, CL_BT_FLAT_CAPTION = 'bt-flat__caption'
, S_PRIMARY = { color: '#607d8b' };

const FlatButton = ({
  refBt,
  isArrow,
  timeout=3000,
  className,
  style,
  isPrimary,
  title='',
  caption,
  accessKey,
  children,
  onClick
}) => {
  const _hClick = useThrottleClick(timeout, onClick)
  , _className = crCn(CL_BT_FLAT, className)
  , _style = isPrimary
       ? {...style, ...S_PRIMARY}
       : style
  , _accessKey = HAS_TOUCH ? '' : accessKey
  , _title = _accessKey
       ? `${title} [${_accessKey}]`
       : title;
  return (
    <button
      ref={refBt}
      className={_className}
      style={_style}
      accessKey={_accessKey}
      title={_title}
      onClick={_hClick}
    >
      <BtCaption
        className={CL_BT_FLAT_CAPTION}
        caption={caption}
        accessKey={_accessKey}
      >
        {isArrow && <span className={CL_ARROW} />}
      </BtCaption>
      {children}
    </button>
  );
};

export default FlatButton
