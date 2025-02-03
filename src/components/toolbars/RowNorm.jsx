import {
  useRef,
  isInputValid,
  getInputValidValue
} from '../uiApi';
import {
  CL_OPEN_CLOSE_BLACK,
  S_INLINE,
} from '../styleFn';

import OpenClose from '../zhn/OpenClose';
import {
  SvgMinus,
  SvgPlus
} from '../zhn/BtSvgCircle';
import {
  S_OPEN_CLOSE,
  S_OC_STYLE
} from './Row.Style'

import InputDmy from '../zhn/InputDmy';

import fRowFn from './fRowFn';

const S_PL_12 = {
  paddingLeft: 12
}

const RowNorm = ({
  is,
  caption,
  onPlus,
  onMinus
}) => {
  const refEl = useRef()
  , _onPlus = () => {
    onPlus({}, getInputValidValue(refEl))
  }
  , _onEnter = () => {
    if (isInputValid(refEl)) {
       if (is) {
        onMinus()
      } else {
        _onPlus()
      }
    }
  };
  return (
    <OpenClose
      caption={caption}
      className={CL_OPEN_CLOSE_BLACK}
      style={S_OPEN_CLOSE}
      ocStyle={S_OC_STYLE}
      CompAfter={
        is ? <SvgMinus
               style={S_INLINE}
               onClick={onMinus}
             />
           : <SvgPlus
               style={S_INLINE}
               onClick={_onPlus}
             />
      }
    >
      <div style={S_PL_12}>
        <InputDmy
           refEl={refEl}
           caption="CompareTo:"
           onEnter={_onEnter}
        />
      </div>
    </OpenClose>
  );
}

export default fRowFn(RowNorm)
