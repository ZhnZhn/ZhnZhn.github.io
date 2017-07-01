import fetchJsonp from 'fetch-jsonp'

export const fnFetch = function({
   uri, option, onCheckResponse, onFetch, onCompleted, onFailed, onCatch
 }){
  fetchJsonp(uri, {
      jsonpCallbackFunction: 'BarchartAPIcallback'
    })
    .then((response) => {
      return response.json();
    })
    .then(json => {
       if ( onCheckResponse(json, option) ) {
         onFetch({ json, option, onCompleted });
       }
    })
    .catch((error) => {
       onCatch({ error, option, onFailed })
    })
}
