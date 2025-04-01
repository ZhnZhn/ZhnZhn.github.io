import { filterBoolean } from '../../utils/arrFn';

import { isFn, useCallback } from '../uiApi';
import forEachInstance from './forEachInstance';

/*eslint-disable react-hooks/exhaustive-deps */
const useCompareTo = (
  hmInstances,
  updateMovingValues
) => useCallback(dateTo => {
  const _valueMoves = []
  , itemsLength = forEachInstance(hmInstances, refInst => {
    if (isFn(refInst.compareTo)){
      _valueMoves.push(refInst.compareTo(dateTo))
    }
  })
  , _numberOfNotUpdatedValueMoves = itemsLength - filterBoolean(_valueMoves).length;
  if (itemsLength > 0 && _numberOfNotUpdatedValueMoves === 0) {
    updateMovingValues(_valueMoves)
  }
  return _numberOfNotUpdatedValueMoves;
}, [])
// refHm, updateMovingValues
/*eslint-enable react-hooks/exhaustive-deps */

export default useCompareTo
