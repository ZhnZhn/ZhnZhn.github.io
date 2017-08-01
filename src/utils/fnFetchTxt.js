
/*
const _headers = new Headers()
        .append('Accept', 'application/vnd.sdmx.structurespecificdata+xml; version=2.1')
const _option = {
  method: 'GET',
  mode: 'cors',
  headers: _headers
}
*/

const fnFetchTxt = function({
   uri, option, onCheckResponse, onFetch, onCompleted, onFailed, onCatch
 }){
  fetch(uri)
    .then(response => {
      return response.text();
    })
    .then(str => {
       if ( onCheckResponse(str, option) ) {
         onFetch({ json:str, option, onCompleted });
       }
    })
    .catch((error) => {
       onCatch({ error, option, onFailed })
    })
}

export default fnFetchTxt
