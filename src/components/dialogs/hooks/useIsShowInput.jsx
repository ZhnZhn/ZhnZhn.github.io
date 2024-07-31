import { useCallback } from '../../uiApi';
import useToggleState from '../../hooks/useToggleState';

const crIsId = id => `is${id}Select`;
const crIsToggleInit = selectProps => selectProps
 .reduce((toggleConfig, item) => {
    toggleConfig[crIsId(item.id)] = true
    return toggleConfig;
 }, Object.create(null));

const useIsShowInput = (
  selectProps
) => {
  const [
    _isShowConfig,
    toggleInputById
  ] = useToggleState(
     () => crIsToggleInit(selectProps)
  )
  , _toggleInputById = useCallback(
     id => toggleInputById(crIsId(id)),
     [toggleInputById]
  )
  , isShowInputById = useCallback(
      id => _isShowConfig[crIsId(id)],
      [_isShowConfig]
  );
  return [
    _toggleInputById,
    isShowInputById
  ];
};

export default useIsShowInput
