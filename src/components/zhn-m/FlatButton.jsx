import { IfTrue } from '../uiApi';
import {
  crCn,
  crBold16Cn
} from '../styleFn';

import useThrottleClick from '../hooks/useThrottleClick';
import useHotKey from '../hotkeys/useHotKey';

import { BtCaption } from './BtCaption';

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

const FlatButton = (props) => {
  const _hClick = useThrottleClick(
    props.timeout ?? 3000,
    props.onClick
  )
  , [
    _hotKey,
    _refBt
  ] = useHotKey(
    props.hotKey,
    _hClick,
    props.refBt
  );

  return (
    <button
      ref={_refBt}
      type="button"
      aria-label={props.ariaLabel}
      title={_crTitle(props.title, _hotKey)}
      className={crCn(CL_BT_FLAT, props.className)}
      style={props.style}
      onClick={_hClick}
    >
      <IfTrue v={props.caption}>
        <BtCaption
          className={CL_BT_FLAT_CAPTION}
          caption={props.caption}
          hotKey={_hotKey}
        >
          <IfTrue v={props.isArrow}>
            <span className={CL_ARROW} />
          </IfTrue>
        </BtCaption>
      </IfTrue>
      {props.children}
    </button>
  );
};

export default FlatButton
