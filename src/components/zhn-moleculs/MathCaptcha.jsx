import { forwardRef, useState, useCallback, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";

import InputSlider from '../zhn/InputSlider'

const MSG = 'Before loading, please, enter sum using slider'

const S = {
  MSG: {
    color: 'grey',
    fontWeight: 'bold'
  },
  P_SUM: {
    paddingTop: 4,
    textAlign: 'center',
    fontSize: '22px',
  },
  SUM_OK: {
    color: '#4caf50'
  },
  SUM_NOT_OK: {
    color: '#f44336'
  }
};

const _crRandomNumber = (m=0, n=10) => {
  return m + (Math.floor((n-m+1)*Math.random()));
}

const _useRandomNumber = () => useState(() => _crRandomNumber(0, 10))[0];

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
    ? S.SUM_OK
    : S.SUM_NOT_OK;
  return (
    <div style={style} >
      <p style={S.MSG}>
        {MSG}
      </p>
      <p style={S.P_SUM}>
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
})

/*
MatchCaptcha.propTypes = {
  style: PropTypes.object
}
*/

export default MathCaptcha
