import { fetchJson } from '../../utils/fnFetch';

import {
  useState,
  useEffect
} from '../uiApi';

import useHasNotEqual from '../hooks/useHasNotEqual';

const _crState = (
  isLoading,
  isLoadFailed,
  errMsg,
  json
) => ({
  isLoading,
  isLoadFailed,
  errMsg,
  json
});

export const useLoadJson = (
  initialJson,
  isLoadJson,
  jsonUrl
) => {
  const [{
      isLoading,
      isLoadFailed,
      errMsg,
      json
    },
    setState
  ] = useState(() => _crState(
    !1,
    !1,
    '',
    initialJson
  ))
  , isCurrentJsonUrl = useHasNotEqual(jsonUrl)[1];

  useEffect(() => {
     if (isLoadJson && jsonUrl) {
        setState(prevState => ({
          ...prevState,
          isLoading: !0
        }))

        fetchJson({
          uri: jsonUrl,
          onFetch: ({ json }={}) => isCurrentJsonUrl(jsonUrl) && setState(
            _crState(!1, !1, '', json)
          ),
          onCatch: ({ error }={}) => isCurrentJsonUrl(jsonUrl) && setState(
            _crState(!1, !0, error.message)
          )
        })
      }

  }, [isLoadJson, jsonUrl, isCurrentJsonUrl])

  return [
    isLoading,
    isLoadFailed,
    errMsg,
    json
  ];
}
