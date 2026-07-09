import { isObj } from '../../utils/isTypeFn';
import { fetchJson } from '../../utils/fnFetch';

import {
  useRef,
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

const _crJsonUrlHash = jsonUrl => jsonUrl
 .replaceAll(".", "")
 .replaceAll("/", "");

export const useLoadJson = (
  initialJson,
  isLoadJson,
  jsonUrl
) => {
  const refJsonCache = useRef({})
  , [{
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
        const _json = refJsonCache.current[_crJsonUrlHash(jsonUrl)];
        if (isObj(_json) && isCurrentJsonUrl(jsonUrl)) {
          setState(_crState(!1, !1, '', _json))
        } else {
          setState(prevState => ({
            ...prevState,
            isLoading: !0
          }))

          fetchJson({
            uri: jsonUrl,
            onFetch: ({ json }={}) => {
              refJsonCache.current[_crJsonUrlHash(jsonUrl)] = json
              if (isCurrentJsonUrl(jsonUrl)) {
                setState(_crState(!1, !1, '', json))
              }
            },
            onCatch: ({ error }={}) => isCurrentJsonUrl(jsonUrl) && setState(
              _crState(!1, !0, error.message)
            )
          })
        }
      }

  }, [isLoadJson, jsonUrl, isCurrentJsonUrl])

  return [
    isLoading,
    isLoadFailed,
    errMsg,
    json
  ];
}
