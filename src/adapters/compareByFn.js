import fCompareBy from '../utils/fCompareBy';
import fCompareByTwoProps from '../utils/fCompareByTwoProps';

export const compareByDate = fCompareBy(0)
, compareByPnY = fCompareBy('y')
, compareByValue = fCompareBy('value')
, compareByValueId = fCompareByTwoProps('value', 'id')

, sortDescBy = (
  compareBy,
  data
) => data.sort(compareBy).reverse()
, sortDescByPnY = data => sortDescBy(
  compareByPnY,
  data
)
