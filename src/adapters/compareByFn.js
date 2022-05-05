import fCompareBy from '../utils/fCompareBy';
import fCompareByTwoProps from '../utils/fCompareByTwoProps';

export const compareByDate = fCompareBy(0)
export const compareByY = fCompareBy('y')
export const compareByValue = fCompareBy('value')
export const compareByValueId = fCompareByTwoProps('value', 'id')
