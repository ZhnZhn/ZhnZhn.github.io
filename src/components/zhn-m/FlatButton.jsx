import { crCn } from '../styleFn';

import useThrottleClick from '../hooks/useThrottleClick';
import useHotKey from '../hotkeys/useHotKey';

import BtCaption from './BtCaption';

const CL_ARROW = "arrow-down"
, CL_BT_FLAT = 'bt-flat'
, CL_BT_FLAT_CAPTION = `${CL_BT_FLAT}__caption`
, S_PRIMARY_COLOR = { color: '#607d8b' };

const _crTitle = (
  title,
  hotKey
) => hotKey
  ? `${title} [${hotKey.toLowerCase()}]`
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
  hotKey,
  children,
  onClick
}) => {
  const _hClick = useThrottleClick(timeout, onClick)
  , _className = crCn(CL_BT_FLAT, className)
  , _style = isPrimary
      ? {...style, ...S_PRIMARY_COLOR}
      : style
  , [
    _hotKey,
    _refBt
  ] = useHotKey(hotKey, _hClick, refBt)
  , _title = _crTitle(title, _hotKey);
  return (
    <button
      type="button"
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
