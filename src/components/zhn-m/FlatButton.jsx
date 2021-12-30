import useThrottleClick from '../hooks/useThrottleClick';
import useHotKey from '../hotkeys/useHotKey'

import crCn from '../zhn-utils/crCn';
import BtCaption from './BtCaption';

const CL_ARROW = "arrow-down"
, CL_BT_FLAT = 'bt-flat'
, CL_BT_FLAT_CAPTION = 'bt-flat__caption'
, S_PRIMARY = { color: '#607d8b' };

const _crTitle = (title, hotKey) => hotKey
  ? `${title} [${hotKey}]`
  : title;

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
  , [_hotKey, _refBt] = useHotKey(accessKey, _hClick, refBt)
  , _title = _crTitle(title, _hotKey);
  return (
    <button
      ref={_refBt}
      className={_className}
      style={_style}
      title={_title}
      onClick={_hClick}
    >
      <BtCaption
        className={CL_BT_FLAT_CAPTION}
        caption={caption}
        hotKey={_hotKey}
      >
        {isArrow && <span className={CL_ARROW} />}
      </BtCaption>
      {children}
    </button>
  );
};

export default FlatButton
