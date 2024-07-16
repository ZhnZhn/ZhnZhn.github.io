import fCompareBy from '../utils/fCompareBy';
import fCompareByTwoProps from '../utils/fCompareByTwoProps';

const _compareByPnValue = fCompareBy('value')
, _compareByPnYAndName = fCompareByTwoProps('y', 'name')
, _fSortDescBy = compareBy => data => data
   .sort(compareBy)
   .reverse();

export const compareByDate = fCompareBy(0)
, compareByValueId = fCompareByTwoProps('value', 'id')
, sortDescCategory = _fSortDescBy(_compareByPnYAndName)
, sortDescByPnValue = _fSortDescBy(_compareByPnValue)
