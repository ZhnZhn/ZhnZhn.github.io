import fCompareBy from '../utils/fCompareBy';
import fCompareByTwoProps from '../utils/fCompareByTwoProps';

const _compareByPnValue = fCompareBy('value');

export const compareByDate = fCompareBy(0)
, compareByPnY = fCompareBy('y')
, compareByValueId = fCompareByTwoProps('value', 'id')

, sortDescBy = (
  compareBy,
  data
) => data.sort(compareBy).reverse()
, sortDescByPnY = data => sortDescBy(
  compareByPnY,
  data
)
, sortDescByPnValue = data => sortDescBy(
  _compareByPnValue,
  data
)
