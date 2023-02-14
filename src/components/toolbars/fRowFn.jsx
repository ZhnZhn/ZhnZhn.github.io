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
      onPlus={addSeria}
      onMinus={removeSeria}
    />
  );
}

export default fRowFn
