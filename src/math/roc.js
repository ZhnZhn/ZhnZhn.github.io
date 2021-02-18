import Big from 'big.js'

const _isNumber = n => typeof n === "number"
  && (n-n === 0);

const roc = (yPrev, yNext) => {

  if (!_isNumber(yPrev) || !_isNumber(yNext)) {
    return null;
  }

  if (yNext === 0) {
    return yPrev === 0
      ? 0
      : yPrev > 0 ? -100 : 100;
  }

  if (yPrev === 0) {
    return null;
  }

  return parseFloat(
    Big(yNext).minus(yPrev)
      .div(Math.abs(yPrev))
      .times(100)
      .toFixed(2)
    );
};

export default roc
