import { useCallback } from '../uiApi';
import forEachInstance from './forEachInstance';

const _isFn = v => typeof v === 'function';

/*eslint-disable react-hooks/exhaustive-deps */
const useCompareTo = (
  refHm,
  updateMovingValues
) => useCallback(dateTo => {
  const _valueMoves = []
  , itemsLength = forEachInstance(refHm, refInst => {
    if (_isFn(refInst.compareTo)){
      _valueMoves.push(refInst.compareTo(dateTo))
    }
  })
  , _numberOfNotUpdatedValueMoves = itemsLength - _valueMoves.filter(Boolean).length;
  if (itemsLength > 0 && _numberOfNotUpdatedValueMoves === 0) {
    updateMovingValues(_valueMoves)
  }
  return _numberOfNotUpdatedValueMoves;
}, [])
// refHm, updateMovingValues
/*eslint-enable react-hooks/exhaustive-deps */

export default useCompareTo
