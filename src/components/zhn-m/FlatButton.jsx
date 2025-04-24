import {
  crCn,
  crBold16Cn
} from '../styleFn';

import useThrottleClick from '../hooks/useThrottleClick';
import useHotKey from '../hotkeys/useHotKey';

import BtCaption from './BtCaption';

const CL_ARROW = "arrow-down"
, TOKEN_BT_FLAT = 'bt-flat'
, CL_BT_FLAT = crBold16Cn(TOKEN_BT_FLAT)
, CL_BT_FLAT_CAPTION = `${TOKEN_BT_FLAT}__caption`;

const _crTitle = (
  title,
  hotKey
) => hotKey
  ? `${title || ''} [${hotKey.toLowerCase()}]`
  : title;

const FlatButton = ({
  refBt,
  isArrow,
  timeout=3000,
  className,
  style,
  title,
  caption,
  hotKey,
  children,
  onClick
}) => {
  const _hClick = useThrottleClick(timeout, onClick)
  , [
    _hotKey,
    _refBt
  ] = useHotKey(hotKey, _hClick, refBt);

  return (
    <button
      type="button"
      ref={_refBt}
      className={crCn(CL_BT_FLAT, className)}
      style={style}
      title={_crTitle(title, _hotKey)}
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
