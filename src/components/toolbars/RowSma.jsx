import fRowTaType1 from './fRowTaType1';

import { addSmaTo } from '../../charts/IndicatorBuilder';
import { crInitialPeriod } from './helperFn';

const SMA_MONTH = '12'
, SMA_YEAR = '50';

const _crInitialSmaPeriod = (
  config
) => crInitialPeriod(
  config,
  SMA_MONTH,
  SMA_YEAR
);

const RowSma = fRowTaType1(
  "SMA",
  _crInitialSmaPeriod,
  addSmaTo
)

export default RowSma
