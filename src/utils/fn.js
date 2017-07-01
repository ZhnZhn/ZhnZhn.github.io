
const LIMIT_REMAINING = 'X-RateLimit-Remaining';

const _fnMsg400 = (option) => {
  if (option.loadId === "EU_STAT"){
    return '400 : Bad request.\nDataset contains no data. One or more filtering elements (query parameters) are probably invalid.\nMaybe try request with older date.';
  } else {
    return '400 : Bad request';
  }
}

const _fnMsg404 = () => {
  return '404: Resource is not existed';
}

export const fnFetch = function({
   uri, option, onCheckResponse, onFetch, onCompleted, onFailed, onCatch
 }){
  fetch(uri)
    .then((response) => {
      const { status, statusText, headers } = response;
      if (status>=200 && status<400) {
          return Promise.all([
             Promise.resolve(headers.get(LIMIT_REMAINING)),
             response.json()
          ]);
      } else if (status === 400) {
         throw {
           errCaption : 'Request Error',
           message : _fnMsg400(option)
         };
      } else if (status === 404) {
        throw {
          errCaption : 'Request Error',
          message : _fnMsg404(option)
        };
      } else if (status>400 && status<500){
         throw {
           errCaption : 'Request Error',
           message : `${status} : ${statusText}`
         };
      } else if (status>=500 && status<600){
         throw {
           errCaption : 'Response Error',
           message : `${status} : ${statusText}`
         };
      }
    })
    .then(([limitRemaining, json ]) => {
       if (onCheckResponse(json, option)) {
         option.limitRemaining = limitRemaining;
         onFetch({ json, option, onCompleted });
       }
    })
    .catch((error) => {
       onCatch({ error, option, onFailed })
    })
}

export const fnFetchText = function({
   uri, onFetch
 }){
  fetch(uri)
    .then((response) => {
      const {status, statusText} = response;
      if (status>=200 && status<400){
        return response.text();
      } else if (status>=400 && status<500){
         throw {errCaption : 'Request Error', message : `${status} : ${statusText}` }
      } else if (status>=500 && status<600){
         throw {errCaption : 'Response Error', message : `${status} : ${statusText}` }
      }
    })
    .then((text) => {
       onFetch({ text });
    })
    .catch((error) => {
       console.log(error);
    })
}
