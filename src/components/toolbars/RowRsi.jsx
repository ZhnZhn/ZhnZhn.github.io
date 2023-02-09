import { addRsiTo } from '../../charts/IndicatorBuilder';
import RowTaType1 from './RowTaType1';
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

const RowRsi = ({
  config,
  getChart
}) => (
  <RowTaType1
    caption="RSI"
    config={config}
    getChart={getChart}
    crInitialPeriod={_crInitialRsiPeriod}
    addTaTo={addRsiTo}
  />
)

export default RowRsi
