import { crRandomInteger } from '../../math/mathFn';
import {
  useState,
  useCallback,
  useImperativeHandle
} from '../uiApi';
import { crColorStyle } from '../styleFn';
import InputSlider from '../zhn/InputSlider';

const MSG = 'Before loading, please, enter sum using slider'

, S_MSG = {
  color: 'grey',
  fontWeight: 'bold'
}
, S_P_SUM = {
  paddingTop: 4,
  textAlign: 'center',
  fontSize: '22px',
}
, S_SUM_OK = crColorStyle('#4caf50')
, S_SUM_NOT_OK = crColorStyle('#f44336');

const useRandomNumber = () => useState(
  () => crRandomInteger(0, 10)
)[0];

const MathCaptcha = (props) => {
  const n1 = useRandomNumber()
  , n2  = useRandomNumber()
  , [
    state,
    setState
  ] = useState([!1, ''])
  , [isOk, resultSum] = state
  , _hChangeSlider = useCallback(value => setState([
      n1+n2 === value, value
  ]), [n1, n2]);

  useImperativeHandle(props.refEl, () => ({
    isOk: () => isOk
  }), [isOk])

  return (
    <div style={props.style} >
      <p style={S_MSG}>
        {MSG}
      </p>
      <p style={S_P_SUM}>
        <span>
          {`${n1} + ${n2} = `}
        </span>
        <span style={isOk ? S_SUM_OK : S_SUM_NOT_OK}>
          {resultSum}
        </span>
      </p>
      <InputSlider onChange={_hChangeSlider} />
    </div>
  );
};

export default MathCaptcha
