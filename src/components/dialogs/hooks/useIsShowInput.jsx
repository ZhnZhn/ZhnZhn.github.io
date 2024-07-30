import { useCallback } from '../../uiApi';
import useToggleState from '../../hooks/useToggleState';

import {
  crIsId,
  crIsToggleInit
} from '../dialogFn';

const useIsShowInput = (
  selectProps
) => {
  const [
    _isShowConfig,
    toggleInputById
  ] = useToggleState(
     () => crIsToggleInit(selectProps)
  )
  , isShowInputById = useCallback(
      id => _isShowConfig[crIsId(id)],
      [_isShowConfig]
  );
  return [
    toggleInputById,
    isShowInputById
  ];
};

export default useIsShowInput
