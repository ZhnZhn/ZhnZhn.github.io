import fRowTaType1 from './fRowTaType1';

import { addRsiTo } from '../../charts/IndicatorBuilder';
import { crInitialPeriod } from './helperFn';

const RSI_MONTH = '14'
, RSI_YEAR = '30';

const _crInitialRsiPeriod = (
  config
) => crInitialPeriod(
  config,
  RSI_MONTH,
  RSI_YEAR
)

const RowRsi = fRowTaType1(
  "RSI",
  _crInitialRsiPeriod,
  addRsiTo
)

export default RowRsi
