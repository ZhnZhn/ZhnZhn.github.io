
const toInfoConfig = {
  toConfig: (json, option) => {
    const { value } = option
        , { General={} } = json.Data
        , { Symbol:id=value } = General
        , config = {
            id, General,
            zhCompType: 'COIN_INFO',
            zhConfig: {
              //id: value, key: value
              id, key: id
            }
          };
    return { config };
  },

  toSeries: () => {
    throw new Error('ZH_1000');
  }
};

export default toInfoConfig
