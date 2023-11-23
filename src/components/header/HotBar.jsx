import {
  bindTo,
  useState,
  useCallback
} from '../uiApi';

import useRefInit from '../hooks/useRefInit';

import {
  HAS_TOUCH_EVENTS,
  getWindowInnerWidth
} from '../has';
import ItemStack from '../zhn/ItemStack';
import FlatButton from '../zhn-m/FlatButton';

const CL_BT_HOT = "bt-hot"
, S_ROOT = { display: 'inline-block' }
, S_BT_CL = { color: '#f44336' };

const _isIn = (arr, type) => {
  for(let i=0; i<arr.length; i++){
    if (arr[i].type === type){
      return true;
    }
  }
  return false;
}

const _calcMaxButtons = (
  maxButtons
) => {
  const _innerWidth = getWindowInnerWidth() || 601;
  return _innerWidth>600 ? maxButtons
    : _innerWidth>500 ? 3
    : _innerWidth>360 ? 2
    : 1;
};

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
     title: caption
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

const HotBar = ({
  maxButtons=5,
  useMsCloseDialog,
  onShowDialog
}) => {
  const _maxNumberOfBts = useRefInit(
    () => _calcMaxButtons(maxButtons)
  )
  , [
    hotButtons,
    setHotButtons
  ] = useState([])
  , _hClean = useCallback(() => setHotButtons([]), []);

  useMsCloseDialog(msCloseDialog => {
    if (msCloseDialog) {
      setHotButtons(arr => {
        if (!_isIn(arr, msCloseDialog.type)) {
          const _index = arr.length % _maxNumberOfBts
          arr[_index] = msCloseDialog
          return [...arr];
        }
        return arr;
      })
  }})

  return (
    <div style={S_ROOT}>
      <ItemStack
         items={hotButtons}
         crItem={_crHotBtItem}
         onShowDialog={onShowDialog}
      />
      {hotButtons.length !== 0 && <FlatButton
         key="BT_CLEAN"
         timeout={0}
         style={S_BT_CL}
         caption="CL"
         title="Clean Hot Bar"
         onClick={_hClean}
      />}
    </div>
  );
};

export default HotBar
