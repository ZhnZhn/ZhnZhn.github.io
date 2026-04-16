import {
  crCn,
  crBold16Cn
} from '../styleFn';

import useHotKey from '../hotkeys/useHotKey';
import { crButtonTitle } from './buttonFn';

const CL_BT_FLAT = crBold16Cn("bt-flat")
, S_ICON_BT = { width: 40 };

const IconButton = (props) => {
  const [
    _hotKey
  ] = useHotKey(
    props.hotKey,
    props.onClick
  );

  return (
    <button
      type="button"
      aria-label={props.ariaLabel}
      title={crButtonTitle(props.title, _hotKey)}
      className={crCn(CL_BT_FLAT, props.className)}
      style={{...S_ICON_BT, ...props.style}}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default IconButton
