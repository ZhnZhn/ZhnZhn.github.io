import RouterConfig from './RouterConfig';

const _crConfig = (json, option) => {
  const { seriaType } = option
  , crConfig = RouterConfig.getCrConfig(seriaType);
  return crConfig(json, option);
};

const StatNorwayAdapter = {
  toConfig(json, option) {
     return { config: _crConfig(json, option) };
  },

  toSeries(json, option) {
     const config = _crConfig(json, option);
     return config.series[0];
  }
};

export default StatNorwayAdapter
