import crAdapterType1 from '../crAdapterType1';

const crData = json => json.map(tuple => [
  tuple[0],
  parseFloat(tuple[1])
]);

const toExchangeVolume = crAdapterType1({
  crData
});

export default toExchangeVolume
