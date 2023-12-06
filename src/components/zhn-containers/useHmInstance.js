import { useCallback } from '../uiApi';

import useRefInit from '../hooks/useRefInit';

const _crItemRefPropName = index => 'chart' + index
, _crInitialValue = () => Object.create(null);

const useHmInstance = () => {
  const _hmInstances = useRefInit(_crInitialValue)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _addToHmInstances = useCallback((
      index,
      compInstance
    ) => _hmInstances[_crItemRefPropName(index)] = compInstance
  , []);
  // _hmInstances
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    _hmInstances,
    _addToHmInstances
  ];
};

export default useHmInstance
