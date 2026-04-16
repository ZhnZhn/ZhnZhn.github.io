import {
  isNotEmptyArr
} from '../../utils/isTypeFn';

import {
  bindTo,
  useCallback
} from '../uiApi';

import {
  HAS_TOUCH_EVENTS,
  getWindowInnerWidth
} from '../has';
import {
  HK_CLEAR_QUICK_MENU
} from '../hotkeys/hotkeys';

import {
  crBtAriaLabelProps
} from '../a11yFn';

import useStoreState from '../hooks/useStoreState';

import ItemStack from '../zhn/ItemStack';
import FlatButton from '../zhn-m/FlatButton';
import { FlatButtonDelete } from '../zhn-m/FlatButtonSvg';

const CL_BT_HOT = "bt-hot"
, S_QUICK_MENU = {
  display: 'flex',
  gap: 3
};

const _isIn = (arr, type) => {
  for(let i=0; i<arr.length; i++){
    if (arr[i].type === type){
      return true;
    }
  }
  return false;
}

const _crBtProps = (
  index,
  caption=''
) => {
   const _hotKey = HAS_TOUCH_EVENTS
     ? ''
     : String(index+1);
   return {
     hotKey: _hotKey || void 0,
     caption: _hotKey + caption.slice(0, 3),
     ...crBtAriaLabelProps(`Open ${caption} dialog`)
   };
};

const _crHotBtItem = (
   conf,
   index, {
   onShowDialog
}) => (
   <FlatButton
     {..._crBtProps(index, conf.caption)}
     key={conf.type}
     timeout={0}
     className={CL_BT_HOT}
     onClick={bindTo(onShowDialog, conf.type)}
   />
);

const _calcMaxButtons = (
  maxButtons
) => {
  const _innerWidth = getWindowInnerWidth() || 601;
  return _innerWidth>600 ? maxButtons
    : _innerWidth>500 ? 3
    : _innerWidth>360 ? 2
    : 1;
};

const NUMBER_OF_MAX_BUTTONS = _calcMaxButtons(5);

const updateHotButtons = (
  msCloseDialog,
  setHotButtons
) => {
  if (msCloseDialog) {
    setHotButtons(arr => {
      if (!_isIn(arr, msCloseDialog.type)) {
        const _index = arr.length % NUMBER_OF_MAX_BUTTONS
        arr[_index] = msCloseDialog
        return [...arr];
      }
      return arr;
    })
}}

const QuickMenu = ({
  useMsCloseDialog,
  onShowDialog
}) => {
  const [
    hotButtons,
    setHotButtons
  ] = useStoreState(
    [], useMsCloseDialog, updateHotButtons
  )
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClean = useCallback(() => setHotButtons([]), []);
  // setHotButtons
  /*eslint-enable react-hooks/exhaustive-deps */
  return isNotEmptyArr(hotButtons) ? (
    <div style={S_QUICK_MENU}>
      <ItemStack
        items={hotButtons}
        crItem={_crHotBtItem}
        onShowDialog={onShowDialog}
      />
      <FlatButtonDelete
        key="BT_CLEAR"
        hotKey={HK_CLEAR_QUICK_MENU}
        className={CL_BT_HOT}
        onClick={_hClean}
        {...crBtAriaLabelProps('Clear quick menu')}
      />
    </div>
  ) : null;
};

export default QuickMenu
