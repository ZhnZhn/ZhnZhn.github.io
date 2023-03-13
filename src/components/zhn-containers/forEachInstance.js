const _getObjectKeys = Object.keys;

const forEachInstance = (
  refHm,
  onInstance
) => {
  const _hmInstances = refHm.current;
  return _getObjectKeys(_hmInstances)
   .reduce((numberOfInstance, propName) => {
      const _refInstance = _hmInstances[propName];
      return _refInstance
        ? (onInstance(_refInstance), ++numberOfInstance)
        : numberOfInstance;
   }, 0);
};

export default forEachInstance
