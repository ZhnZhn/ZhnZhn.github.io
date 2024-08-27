import { useEffect } from '../../uiApi';
import useHasNotEqual from '../../hooks/useHasNotEqual';

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
  , _hasToggled = useHasNotEqual(isShow)[0]
  , _isRequireLoadOptions = isShow
     && state.isLoadingFailed
     && _hasToggled
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
    loadOptions()
    return () => {
      clearTimeout(refLoadId.current)
    };
  }, [])
  // loadOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    if (_isRequireLoadOptions) {
      loadOptions()
    }
  }, [_isRequireLoadOptions])
  // loadOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  return [state, loadOptions];
};

export default useLoadOptions
