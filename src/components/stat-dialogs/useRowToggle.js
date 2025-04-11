import { useEffect } from '../uiApi';

import { useToggleState } from '../hooks/useToggle';

import crIsId from './crIsId';

const useRowToggle = configs => {
  const [
    _isRow,
    _toggleIsRow
  ] = useToggleState({
    isShowChart: true
  });

  useEffect(() => {
    const _dfIs = configs
      .reduce((_r, config) => {
         if (config.dfItem) {
           _r[crIsId(config.id)] = true
         }
         return _r;
       }, {});
    _toggleIsRow(_dfIs)
  }, [configs, _toggleIsRow])

  return [
    _isRow,
    _toggleIsRow
  ];
};

export default useRowToggle
