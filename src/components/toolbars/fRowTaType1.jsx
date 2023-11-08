import RowTaType1 from './RowTaType1';

import { crInitialPeriod } from './helperFn';
import { addRsiTo } from '../../charts/IndicatorBuilder';
import { addSmaTo } from '../../charts/IndicatorBuilder';

const _fRowTaType1 = (
  caption,
  crInitialPeriod,
  addTaTo
) => ({
  config,
  getChart
}) => (
  <RowTaType1
    caption={caption}
    config={config}
    getChart={getChart}
    crInitialPeriod={crInitialPeriod}
    addTaTo={addTaTo}
  />
);

const _fCrInitialPeriod = (
  month,
  year
) => (config) => crInitialPeriod(
  config,
  month,
  year
);

export const RowRsi = _fRowTaType1(
  "RSI",
  _fCrInitialPeriod("14", "30"),
  addRsiTo
)
export const RowSma = _fRowTaType1(
  "SMA",
  _fCrInitialPeriod("12", "50"),
  addSmaTo
)
