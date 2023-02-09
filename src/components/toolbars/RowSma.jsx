import { addSmaTo } from '../../charts/IndicatorBuilder';
import RowTaType1 from './RowTaType1';
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

const RowSma = ({
  config,
  getChart
}) => (
  <RowTaType1
    caption="SMA"
    config={config}
    getChart={getChart}
    crInitialPeriod={_crInitialSmaPeriod}
    addTaTo={addSmaTo}
  />
)

export default RowSma
