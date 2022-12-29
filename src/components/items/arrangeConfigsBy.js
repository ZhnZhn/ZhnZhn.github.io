const arrangeConfigsBy = (
  configs,
  configIds,
  idPropName
) => {
  const _hmConfigs = (configs || [])
    .reduce((hm, config) => {
      hm[config[idPropName]] = config
      return hm;
    }, {});
  return configIds
    .reduce((arrangedConfigs, id) => {
      arrangedConfigs.push(_hmConfigs[id])
      return arrangedConfigs;
  }, []);
};

export default arrangeConfigsBy
