
const LIMIT_REMAINING = 'X-RateLimit-Remaining';

export const fnFetch = function({
   uri, option, onCheckResponse, onFetch, onCompleted, onFailed, onCatch
 }){
  fetch(uri)
    .then((response) => {
      const { status, statusText, headers } = response;
      if (status>=200 && status<=400){
        return Promise.all([
           Promise.resolve(headers.get(LIMIT_REMAINING)),
           response.json()
        ]);
      } else if (status>400 && status<500){
         throw { errCaption : 'Request Error', message : `${status} : ${statusText}` }
      } else if (status>=500 && status<600){
         throw { errCaption : 'Response Error', message : `${status} : ${statusText}` }
      }
    })
    .then(([limitRemaining, json ]) => {
       if (onCheckResponse(json, option)){
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
