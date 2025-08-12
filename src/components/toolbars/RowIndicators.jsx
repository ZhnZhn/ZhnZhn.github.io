import { safeMap } from '../uiApi';
import useModalMenuIndicators from './useModalMenuIndicators';

export const RowIndicators = ({
  config,
  getChart,
  onAddMfi,
  onRemoveMfi
}) => {
  const indicatorConfigs = useModalMenuIndicators(
    config,
    onAddMfi,
    onRemoveMfi
  );
  return safeMap(
    indicatorConfigs,
    ([RowComp, key, props], index) => (
      <RowComp
        key={key}
        {...props}
        getChart={getChart}
      />
  ));
}
