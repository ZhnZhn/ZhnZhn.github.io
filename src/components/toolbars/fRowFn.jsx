import useAddSeriaBy from './useAddSeriaBy';

const fRowFn = Row => ({
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
      is={isSeria}
      caption={caption}
      getChart={getChart}
      onPlus={addSeria}
      onMinus={removeSeria}
    />
  );
}

export default fRowFn
