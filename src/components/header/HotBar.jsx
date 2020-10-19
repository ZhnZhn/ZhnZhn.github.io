import { useRef, useState, useCallback } from 'react'

import useListen from '../hooks/useListen'

import has from '../has'
import FlatButton from '../zhn-m/FlatButton'

const S = {
  ROOT: {
    display: 'inline-block'
  },
  BT_CL: {
    color: '#f44336'
  }
};

const _isIn = (arr, type) => {
  for(let i=0; i<arr.length; i++){
    if (arr[i].type === type){
      return true;
    }
  }
  return false;
}

const _calcMaxButtons = (maxButtons) => {
  switch(has.strWidth){
    case '"W600"': return 3;
    case '"W500"': return 2;
    case '"W360"': return 1;
    default: return maxButtons;
  }
};

const CleanButton = ({ is, onClick }) => is
 ? <FlatButton
      key="BT_CLEAN"
      timeout={0}
      style={S.BT_CL}
      caption="CL"
      title="Clean Hot Bar"
      onClick={onClick}
   />
 : null;

 const _crBtProps = (index, caption='') => {
   const _accessKey = has.touch
     ? ''
     : String(index+1);
   return {
     accessKey: _accessKey || void 0,
     caption: _accessKey + caption.substring(0, 3),
     title: caption
   };
 };

 const _renderHotButtons = (style, hotButtons, onShowDialog) => {
   return hotButtons.map((conf, index) => {
     const { type, caption } = conf;
     return (
       <FlatButton
         {..._crBtProps(index, caption)}
         key={type}
         timeout={0}
         style={style}
         onClick={onShowDialog.bind(null, type)}
       />
     );
   })
 }

const HotBar = ({
  maxButtons=5,
  btStyle,
  store,
  closeDialogAction,
  onShowDialog
}) => {
  const _refMaxBt = useRef(_calcMaxButtons(maxButtons))
  , [hotButtons, setHotButtons] = useState([])
  , _hClean = useCallback(() => setHotButtons([]), []);

  useListen(store, (actionType, conf) => {
    if (actionType === closeDialogAction ) {
      setHotButtons(arr => {
        if (!_isIn(arr, conf.type)) {
          const _index = arr.length % _refMaxBt.current
          arr[_index] = conf
          return [...arr];
        }
        return arr;
      })
  }})

  return (
    <div style={S.ROOT}>
      {_renderHotButtons(btStyle, hotButtons, onShowDialog)}
      <CleanButton
         is={hotButtons.length !== 0}
         onClick={_hClean}
      />
    </div>
  );
}

export default HotBar
