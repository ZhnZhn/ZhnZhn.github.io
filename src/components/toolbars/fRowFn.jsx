import useAddSeriaBy from './useAddSeriaBy';

const fRowFn = Row => ({
  refEl,
  caption,
  configArr,
  getChart
}) => {
  const [
    isSeria,
    addSeria,
    removeSeria
  ] = useAddSeriaBy(configArr, getChart);
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
