
export const fnFetch = function({
   uri, option, onCheckResponse, onFetch, onCompleted, onFailed, onCatch
 }){
  fetch(uri)
    .then((response) => {
      const {status, statusText} = response;
      if (status>=200 && status<400){
        return response.json();
      } else if (status>=400 && status<500){
         throw {zhCaption : 'Request Error', message : `${status} : ${statusText}` }
      } else if (status>=500 && status<600){
         throw {zhCaption : 'Response Error', message : `${status} : ${statusText}` }
      }
    })
    .then((json) => {
       if (onCheckResponse(json)){
         onFetch({json, option, onCompleted});
       }
    })
    .catch((error) => {
       onCatch({error, option, onFailed})
    })
}
