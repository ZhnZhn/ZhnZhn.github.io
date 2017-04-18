import Big from 'big.js'

const fnEcho = (value) => { return value;}

const mathFn = {

  calcPercent: ({ bValue=Big('0.0'), bTotal=Big('0.0') }) => {
    return (!bTotal.eq(Big(0.0)) )
              ? bValue.times(100).div(bTotal).abs().toFixed(2)
              : Big(0.0).toFixed(2);
  },

  crValueMoving: ({
    nowValue='0.0', prevValue='0.0', Direction, fnFormat=fnEcho
  }) => {
    const bNowValue = Big(nowValue.toString().replace(' ',''))
        , bPrevValue = Big(prevValue.toString().replace(' ', ''));

    let _bDelta = bPrevValue.minus(bNowValue)
      , _direction;
    if (_bDelta.gt(0.0)){
      _direction = Direction.DOWN;
    } else if (!_bDelta.gte(0.0)){
      _direction = Direction.UP;
    } else {
      _direction = Direction.EQUAL;
    }

    _bDelta = _bDelta.abs().round(4);

    const _bPercent = mathFn.calcPercent({ bValue:_bDelta, bTotal: bPrevValue });

    let _bNowValue = Big(bNowValue).round(4);
    if ( _bNowValue.gt('1000000') ){
      _bNowValue = bNowValue.toFixed(0);
      _bDelta = _bDelta.toFixed(0);
    }

    return {
      value : fnFormat(_bNowValue).toString(),
      delta : fnFormat(_bDelta).toString(),
      percent : _bPercent.toString() + '%',
      direction : _direction
    };
  },

  toFixed : (value) => {
    const bValue = Big(value);
    if (bValue.gt('10')) {
      return parseInt(bValue.toFixed(0), 10);
    } else {
      return parseFloat(bValue.toFixed(2));
    }
  }
}

export default mathFn
