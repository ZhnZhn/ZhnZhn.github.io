import {
  showAlertDialogBy 
} from '../../../flux/stores/compStore';

import {
  useState,
  useCallback
} from '../../uiApi';

import crOptions from './crOptions';

const _crInitialState = () => ({
  isLoading: false,
  isLoadingFailed: false
});

const useLoadOptionsState = jsonProp => {
  const [
    state,
    setState
  ] = useState(_crInitialState)
  , setLoading = useCallback(() => {
    setState({
      isLoading: true,
      isLoadingFailed: false
    })
  }, [])
  , setLoadingFailed = useCallback((errCaption, errDescription) => {
      if (errCaption || errDescription) {
        showAlertDialogBy(
          errCaption,
          errDescription
        )
      }
      setState({
        isLoading: false,
        isLoadingFailed: true
      })
  }, [])
  /*eslint-disable react-hooks/exhaustive-deps */
  , onLoadOptions = useCallback(json => {
      const [
        options,
        propCaption
      ] = crOptions(json || {}, jsonProp);
      setState({
        ..._crInitialState(),
        propCaption,
        options
      });
  }, []);
  // jsonProp
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    state,
    setLoading,
    setLoadingFailed,
    onLoadOptions
  ];
};

export default useLoadOptionsState
