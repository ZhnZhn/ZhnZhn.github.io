import { useCallback } from '../uiApi';

import useRefInit from '../hooks/useRefInit';

const _crItemRefPropName = id => 'chart' + id
, _crInitialValue = () => Object.create(null);

const useHmInstance = () => {
  const _hmInstances = useRefInit(_crInitialValue)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _addToHmInstances = useCallback((
      id,
      compInstance
    ) => {
      _hmInstances[_crItemRefPropName(id)] = compInstance || null
    }
  , []);
  // _hmInstances
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    _hmInstances,
    _addToHmInstances
  ];
};

export default useHmInstance
