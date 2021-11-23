import { forwardRef, useState, useCallback, useImperativeHandle } from 'react';

import InputSlider from '../zhn/InputSlider'

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
, S_SUM_OK = { color: '#4caf50' }
, S_SUM_NOT_OK = { color: '#f44336' };

const _crRandomNumber = (m=0, n=10) =>
   m + (Math.floor((n-m+1)*Math.random()));

const _useRandomNumber = () =>
   useState(() => _crRandomNumber(0, 10))[0];

const MathCaptcha = forwardRef(({ style }, ref) => {
  const n1 = _useRandomNumber()
  , n2  = _useRandomNumber()
  , [{isOk, resultSum}, setState] = useState({isOk: false, resultSum: ''})
  /* eslint-disable react-hooks/exhaustive-deps */
  , _hChangeSlider = useCallback((evt, value) => setState({
        isOk: n1+n2 === value,
        resultSum: value
    }), []);
  /* eslint-enable react-hooks/exhaustive-deps */

  useImperativeHandle(ref, () => ({
    isOk: () => isOk
  }), [isOk])

  const _sumStyle = isOk
    ? S_SUM_OK
    : S_SUM_NOT_OK;
  return (
    <div style={style} >
      <p style={S_MSG}>
        {MSG}
      </p>
      <p style={S_P_SUM}>
        <span>
          {`${n1} + ${n2} = `}
        </span>
        <span style={_sumStyle}>
          {resultSum}
        </span>
      </p>
      <InputSlider onChange={_hChangeSlider} />
    </div>
  );
});

export default MathCaptcha
