import useAddSeriaBy from './useAddSeriaBy';

const fRowFn = Row => ({
  refEl,
  caption,
  configArr,
  getChart,
  isPercent
}) => {
  const [
    isSeria,
    addSeria,
    removeSeria
  ] = useAddSeriaBy(
    configArr,
    getChart,
    isPercent
  );
  return (
    <Row
      refEl={refEl}
      is={isSeria}
      caption={caption}
      getChart={getChart}
      onPlus={addSeria}
      onMinus={removeSeria}
    />
  );
}

export default fRowFn
