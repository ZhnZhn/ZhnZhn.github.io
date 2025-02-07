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
  return indicatorConfigs.map(([RowComp, key, props]) => (
    <RowComp
      key={key}
      {...props}
      getChart={getChart}
    />
  ));
}
