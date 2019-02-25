import Big from 'big.js'

const MIN_STR = String(Number.MIN_SAFE_INTEGER);

const fCompareBy = (propName) => (aC, bC) => {
  const aVm = aC.valueMoving || {}
      , a = Big(aVm[propName] || MIN_STR)
      , bVm = bC.valueMoving || {}
      , b = Big(bVm[propName] || MIN_STR);
  if (a.gt(b)) return 1;
  if (b.gt(a)) return -1;
  return 0;
}

export default fCompareBy
