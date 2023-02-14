import RowTaType1 from './RowTaType1';

const fRowTaType1 = (
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

export default fRowTaType1
