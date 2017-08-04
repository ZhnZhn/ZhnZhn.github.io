import fetchJsonpImpl from 'fetch-jsonp'

const C = {
  LIMIT_REMAINING: 'X-RateLimit-Remaining',
  REQ_ERR: 'Request Error',
  RESP_ERR: 'Response Error'
}

const _isFn = fn => typeof fn === 'function';

const _fnMsg400 = (option) => {
  if (option.loadId === "EU_STAT"){
    return '400 : Bad request.\nDataset contains no data. One or more filtering elements (query parameters) are probably invalid.\nMaybe try request with older date.';
  } else {
    return '400 : Bad request';
  }
};

const _fnMsg404 = () => {
  return '404: Resource is not existed';
};

const _crErr = (message, errCaption=C.REQ_ERR) => {
  return { errCaption, message };
};

const _fFetch = (propName, type) => function({
   uri, option={},
   optionFetch,
   onCheckResponse,
   onFetch, onCompleted,
   onFailed, onCatch
 }){
  const _fnFetch = (type !== 'jsonp')
          ? fetch
          : fetchJsonpImpl;
  _fnFetch(uri, optionFetch)
    .then(response => {
      const { status, statusText, headers={}, ok } = response;
      if ((status>=200 && status<400) || ok) {
          if (_isFn(headers.get)){
            return Promise.all([
               Promise.resolve(headers.get(C.LIMIT_REMAINING)),
               response[propName]()
            ]);
          } else {
            return Promise.all([
               Promise.resolve(undefined),
               response[propName]()
            ]);
          }
      } else if (status === 400) {
         throw _crErr(_fnMsg400(option));
      } else if (status === 404) {
         throw _crErr(_fnMsg404(option));
      } else if (status>400 && status<500){
         throw _crErr(`${status}: ${statusText}`);
      } else if (status>=500 && status<600){
         throw _crErr(`${status}: ${statusText}`, C.RESP_ERR);
      } else {
        return [undefined, {}];
      }
    })
    .then(([limitRemaining, json]) => {
       if (_isFn(onCheckResponse)){
         if (onCheckResponse(json, option)) {
           option.limitRemaining = limitRemaining;
           onFetch({ json, option, onCompleted });
         }
      } else {
        option.limitRemaining = limitRemaining;
        onFetch({ json, option, onCompleted });
      }
    })
    .catch(error => {
       if (_isFn(onCatch)) {
          onCatch({ error, option, onFailed })
       } else {
         console.log(error)
       }
    })
};

export const fetchJson = _fFetch('json');
export const fetchTxt = _fFetch('text');
export const fetchJsonp = _fFetch('json', 'jsonp');
