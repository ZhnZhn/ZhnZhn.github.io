import { addSmaTo } from '../../charts/IndicatorBuilder';
import RowTaType1 from './RowTaType1';

const _isArray = Array.isArray
, SMA_MONTH = '12'
, SMA_YEAR = '50';

const _crInitialSmaPeriod = (
  config
) => {
  const _d = (((config || {}).series || [])[0] || {}).data;
  return !_isArray(_d)
    ? '0'
    : _d.length > 150
         ? SMA_YEAR
         : SMA_MONTH;
};

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
