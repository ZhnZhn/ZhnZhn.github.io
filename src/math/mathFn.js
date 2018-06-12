import Big from 'big.js'

const fnEcho = value => value;

const MAX_TO_ROUND = '1000000';

const mathFn = {

  calcPercent: ({ bValue=Big('0.0'), bTotal=Big('0.0') }) => {
    return (!bTotal.eq(Big(0.0)) )
              ? bValue.times(100).div(bTotal).abs().toFixed(2)
              : Big(0.0).toFixed(2);
  },

  crValueMoving: (option) => {
    const {
            nowValue='0.0',
            prevValue='0.0',
            Direction,
            fnFormat=fnEcho
          } = option;

    const bNowValue = Big(nowValue.toString().replace(/\s/g,''))
        , bPrevValue = Big(prevValue.toString().replace(/\s/g, ''));

    let _bDelta = bPrevValue.minus(bNowValue)
      , _direction;
    if (_bDelta.gt(0.0)){
      _direction = Direction.DOWN;
    } else if (!_bDelta.gte(0.0)){
      _direction = Direction.UP;
    } else {
      _direction = Direction.EQUAL;
    }

    const _bPercent = mathFn.calcPercent({ bValue:_bDelta, bTotal: bPrevValue });

    let _bNowValue = Big(bNowValue).round(4);
    if ( _bNowValue.gt(MAX_TO_ROUND) ){
      _bNowValue = bNowValue.toFixed(0);
    }
    let _bDeltaAbs = _bDelta.abs().round(4);
    if (_bDeltaAbs.gt(MAX_TO_ROUND)) {
      _bDeltaAbs = _bDelta.abs().round(0)
    }

    return {
      value: fnFormat(_bNowValue).toString(),
      _value: _bNowValue.toString(),
      delta: fnFormat(_bDeltaAbs).toString(),
      _deltaAbs: _bDeltaAbs.toString(),
      percent: _bPercent.toString() + '%',
      _percentAbs: _bPercent.toString(),
      direction: _direction
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
