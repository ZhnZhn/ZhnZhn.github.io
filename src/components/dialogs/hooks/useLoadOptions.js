import { useEffect, isArr } from '../../uiApi';
import useHasBeenOpen from '../../hooks/useHasBeenOpen';

import useLoadOptionsState from './useLoadOptionsState';
import useLoadItem from './useLoadItem';

const useLoadOptions = (
  isShow,
  uri,
  jsonProp
) => {
  const [
    state,
    _setLoading,
    _setLoadingFailed,
    _onLoadOptions
  ] = useLoadOptionsState(jsonProp)
  , _isRequireLoadOptions = useHasBeenOpen(isShow)
      && !state.isLoading
      && !isArr(state.options)
  , [
    loadOptions,
    refLoadId
  ] = useLoadItem(
    uri,
    _setLoading,
    _setLoadingFailed,
    _onLoadOptions
  );

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (_isRequireLoadOptions) {
      loadOptions()
    }
    return () => {
      clearTimeout(refLoadId.current)
    };
  }, [_isRequireLoadOptions])
  // loadOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  return [state, loadOptions];
};

export default useLoadOptions
