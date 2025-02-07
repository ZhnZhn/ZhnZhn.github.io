import {
  useRef,
  isInputValid,
  getInputValidValue
} from '../uiApi';
import { S_INLINE } from '../styleFn';

import useRefInit from '../hooks/useRefInit';

import { getByPropsFrom } from '../../utils/getByPropsFrom';
import { mlsToDmy } from '../../utils/dateFn';

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
  getChart,
  onPlus,
  onMinus
}) => {
  const refEl = useRef()
  , _inputDmyInitialValue = useRefInit(() => mlsToDmy(
    getByPropsFrom(getChart(), "series", 0, "data", 0, "x")
  ))
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
           initialValue={_inputDmyInitialValue}
           onEnter={_onEnter}
        />
      </div>
    </RowOpenClose>
  );
}

export default fRowFn(RowNorm)
