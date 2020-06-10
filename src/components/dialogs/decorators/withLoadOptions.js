
import Msg from '../../../constants/Msg';
import CA from '../../../flux/actions/ComponentActions';

import crOptions from './crOptions'

const NETWORK_ERROR = Msg.Alert.NETWORK_ERROR;

const _showMsgErr = function(alertCaption, alertDescr){
  CA.showAlert({ alertCaption, alertDescr })
};

const _loadOptions = function(option){
  const {
    target,
    toStateProp,
    uri, optionJsonProp,
    fnOnCompleted, fnOnFailed,
    retryServer=3, retryNetwork=1
  } = option;
  fetch(uri)
    .then(response => {
       const {status, statusText} = response;
       if (status>=200 && status<400){
          return response.json();
       } else if (status>=400 && status<500){
          _showMsgErr('Client Error:', status + ' ' + statusText)
          fnOnFailed(target)
          return null;
       } else if (status>=500 && status<600) {
         if (retryServer !== 0) {
           option.retryServer = retryServer - 1
           target._loadOptionsID = setTimeout( _loadOptions(option), 3E3)
         } else {
            _showMsgErr('Server Error:', status + ' ' + statusText)
            fnOnFailed(target)
         }
         return null;
       }
    })
    .then((json) => {
      if (json) {
        fnOnCompleted(target, { toStateProp, json, optionJsonProp })
      }
    })
    .catch((error) => {
      if (retryNetwork === 0){
         fnOnFailed(target, error);
      } else {
        option.retryNetwork = retryNetwork - 1;
        target._loadOptionsID = setTimeout( _loadOptions(option), 2E3);
      }
    })
}

const _onLoadOptionsCompleted = function(
   target, { toStateProp, json, optionJsonProp }
 ){
  if (toStateProp && optionJsonProp) {
     if (!json.dfColumns) {
       const {
         items,
         propCaption
       } = crOptions(json, optionJsonProp);
       target.setState({
         isLoading: false, propCaption,
         [toStateProp]: items
       });
     } else {
       target._isDfColumns = true
       target.setState({
         isLoading: false,
         [toStateProp]: json[optionJsonProp],
         twoOptions: json.dfColumns
       });
     }
  }
}

const _onLoadOptionsFailed = function(target, error ){
  target.setState({
     isLoading: false,
     isLoadingFailed: true
  })
  if (error instanceof TypeError){
    _showMsgErr(
       NETWORK_ERROR.caption,
       NETWORK_ERROR.descr
     );
  }
};

const _handlerWithLoadOptions = function(
  toStateProp,
  optionURI, optionJsonProp
){
  const _uri = optionURI || this.props.optionURI;
  if (_uri) {
    const _jsonProp = optionJsonProp
      || this.props.optionsJsonProp;
    this.setState({
      isLoading: true,
      isLoadingFailed: false
    }, _loadOptions({
        target: this,
        toStateProp,
        uri: _uri,
        optionJsonProp: _jsonProp,
        fnOnCompleted: _onLoadOptionsCompleted,
        fnOnFailed: _onLoadOptionsFailed
      })
    );
  }
}
const _unmountWithLoadOptions = function(){
  if (this._loadOptionsID){
    clearTimeout(this._loadOptionsID)
  }
}

const withLoadOptions = (target) => {
  Object.assign(target.prototype, {
    _handlerWithLoadOptions,
    _unmountWithLoadOptions
  })
}

export default withLoadOptions
