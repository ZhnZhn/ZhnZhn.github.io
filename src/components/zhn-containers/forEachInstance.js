const _getObjectKeys = Object.keys;

const forEachInstance = (
  hmInstances,
  onInstance
) => _getObjectKeys(hmInstances)
  .reduce((numberOfInstance, propName) => {
     const _refInstance = hmInstances[propName];
     return _refInstance
       ? (onInstance(_refInstance), ++numberOfInstance)
       : numberOfInstance;
  }, 0);


export default forEachInstance
