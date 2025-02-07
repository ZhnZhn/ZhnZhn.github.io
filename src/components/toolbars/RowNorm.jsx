import {
  useRef,
  isInputValid,
  getInputValidValue
} from '../uiApi';

import { S_INLINE, } from '../styleFn';

import {
  SvgMinus,
  SvgPlus
} from '../zhn/BtSvgCircle';
import InputDmy from '../zhn/InputDmy';

import fRowFn from './fRowFn';
import { RowOpenClose } from './RowOpenClose'

const S_PL_12 = {
  paddingLeft: 12
};

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
    <RowOpenClose
      caption={caption}
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
    </RowOpenClose>
  );
}

export default fRowFn(RowNorm)
