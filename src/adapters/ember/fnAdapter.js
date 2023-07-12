export {
  isArr,
  crError,
  getCaption,
  getValue,
  ymdToUTC
} from '../AdapterFn';

const SOURCE_TOTAL = 'Total';
export const isTotalData = (
  source
) => source === SOURCE_TOTAL
