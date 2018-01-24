
const toInfoConfig = {
  toConfig: (json, option) => {
    const { value } = option
        , { General={} } = json.Data
        , config = {
            General,
            zhCompType: 'COIN_INFO',
            zhConfig: {
              id: value, key: value
            }
          };
    return { config };
  },

  toSeries: () => {
    throw new Error('ZH_1000');
  }
};

export default toInfoConfig
