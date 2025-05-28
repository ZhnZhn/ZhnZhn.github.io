import {
  useMemo,
  useEffect
} from '../uiApi';

import { useToggleState } from '../hooks/useToggle';

import {
  PN_IS_SHOW_CHART,
  crIsId
} from './crIsId';

const useRowToggle = configs => {
  const [
    isRow,
    _toggleIsRow
  ] = useToggleState({
    [PN_IS_SHOW_CHART]: !0
  })
  , [
    toggleIsRow,
    toggleIsChart
  ] = useMemo(() => [
    id => _toggleIsRow(crIsId(id)),
    () => _toggleIsRow(PN_IS_SHOW_CHART)
  ], [_toggleIsRow]);

  useEffect(() => {
    _toggleIsRow(configs
      .reduce((_r, config) => {
         if (config.dfItem) {
           _r[crIsId(config.id)] = !0
         }
         return _r;
       }, {})
    );
  }, [configs, _toggleIsRow])

  return [
    isRow,
    toggleIsRow,
    toggleIsChart
  ];
};

export default useRowToggle
