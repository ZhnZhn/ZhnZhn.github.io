import {
  useState,
  useCallback,
  useRef,
  useEffect
} from 'react'
import useHasNotEqual from '../../hooks/useHasNotEqual'

import { ERR_NETWORK } from '../../../constants/Msg';
import { ComponentActions } from '../../../flux/actions/ComponentActions';

import crOptions from './crOptions'

const _showMsgErr = (
  alertCaption,
  alertDescr
) => {
  ComponentActions.showAlert({
    alertCaption,
    alertDescr
  })
};

/*eslint-disable react-hooks/exhaustive-deps */
const _useLoadingFailed = (
  setState
) => useCallback((errCaption, errDescription) => {
   if (errCaption && errDescription) {
     _showMsgErr(errCaption, errDescription)
   }
   setState({
     isLoading: false,
     isLoadingFailed: true
   })
}, [])
//setState
/*eslint-enable react-hooks/exhaustive-deps */

const _useLoad = (
  refLoadId,
  setLoadingFailed,
  setState
) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const loadOptions = useCallback(option => {
    const {
      uri,
      jsonProp,
      retryServer=0,
      retryNetwork=1
    } = option;
    fetch(uri)
      .then(response => {
         const {
           status,
           statusText
         } = response;
         if (status>=200 && status<400){
            return response.json();
         } else if (status>=400 && status<500){
            setLoadingFailed('Client Error:', status + ' ' + statusText)
            return null;
         } else if (status>=500 && status<600) {
           if (retryServer !== 0) {
             option.retryServer = retryServer - 1
             //refLoadId.current = setTimeout(() => loadOptions(option), 3E3)
           } else {
             setLoadingFailed('Server Error:', status + ' ' + statusText)
           }
           return null;
         }
      })
      .then(json => {
        if (json) {
          const {
            items,
            propCaption
          } = crOptions(json, jsonProp);
          setState({
            isLoading: false,
            isLoadingFailed: false,
            propCaption,
            options: items
          });
        }
      })
      .catch((error) => {
        if (retryNetwork === 0){
          const [
            errCaption,
            errDescription
          ] = error instanceof TypeError
            ? [ERR_NETWORK.caption,  ERR_NETWORK.descr]
            : [];
          setLoadingFailed(errCaption, errDescription)
        } else {
          option.retryNetwork = retryNetwork - 1;
          refLoadId.current = setTimeout(() => loadOptions(option), 2E3);
        }
      })
  }, [])
  //refLoadId, setLoadingFailed, setState
  /*eslint-enable react-hooks/exhaustive-deps */
  return loadOptions;
};

const _useIsReload = (
  isShow,
  isLoadingFailed
) => {
  const _hasToggled = useHasNotEqual(isShow)
  return isShow && isLoadingFailed && _hasToggled;
};

const useLoadOptions = (
  isShow,
  uri,
  jsonProp
) => {
  const [
    state,
    setState
  ] = useState({
    options: [],
    isLoading: true,
    isLoadingFailed: false
  })
  , { isLoadingFailed } = state
  , refLoadId = useRef(null)
  , _isReloadFailedOption = _useIsReload(isShow, isLoadingFailed)
  , _setLoadingFailed = _useLoadingFailed(setState)
  , _load = _useLoad(refLoadId, _setLoadingFailed, setState)
  /*eslint-disable react-hooks/exhaustive-deps */
  , loadOptions = useCallback(() => _load({ uri, jsonProp }), []);
  //load, uri, jsonProp
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    loadOptions()
    return () => {
      const { current:id } = refLoadId;
      clearTimeout(id)
    };
  }, [])
  // loadOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    if (_isReloadFailedOption) {
      loadOptions()
    }
  }, [_isReloadFailedOption])
  // loadOptions
  /*eslint-enable react-hooks/exhaustive-deps */


  return [state, loadOptions];
}

export default useLoadOptions
