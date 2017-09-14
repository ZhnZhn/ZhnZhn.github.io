
import Msg from '../../../constants/Msg';
import ComponentActions from '../../../flux/actions/ComponentActions';
import {ModalDialog} from '../../../constants/Type';

const _fnShowAlertDialog = function(alertCaption, alertDescr){
  const modalDialogType = ModalDialog.ALERT;
  ComponentActions.showModalDialog(
    ModalDialog.ALERT, { alertCaption, alertDescr, modalDialogType }
  )
};

const _loadOptions = function(option){
  const {
          target,
          toStateProp, isLoadingProp, isLoadingFailedProp,
          uri, optionJsonProp,
          fnOnCompleted, fnOnFailed, retryServer=3, retryNetwork=1
        } = option;
  fetch(uri)
    .then((response) => {
       const {status, statusText} = response;
       if (status>=200 && status<400){
          return response.json();
       } else if (status>=400 && status<500){
          _fnShowAlertDialog('Client Error:', status + ' ' + statusText)
          fnOnFailed(target, {isLoadingProp, isLoadingFailedProp})
          return null;
       } else if (status>=500 && status<600) {
         if (retryServer !== 0) {
           option.retryServer = retryServer - 1
           target._loadOptionsID = setTimeout( _loadOptions(option), 3E3)
         } else {
            _fnShowAlertDialog('Server Error:', status + ' ' + statusText)
            fnOnFailed(target, { isLoadingProp, isLoadingFailedProp })
         }
         return null;
       }
    })
    .then((json) => {
      if (json) {
        fnOnCompleted(target, { toStateProp, isLoadingProp, json, optionJsonProp })
      }
    })
    .catch((error) => {
      if (retryNetwork === 0){
         fnOnFailed(target, {error, isLoadingProp, isLoadingFailedProp});
      } else {
        option.retryNetwork = retryNetwork - 1;
        target._loadOptionsID = setTimeout( _loadOptions(option), 2E3);
      }
    })
}

const _onLoadOptionsCompleted = function(
   target, {toStateProp, isLoadingProp, json, optionJsonProp}
 ){
  if (toStateProp && optionJsonProp) {
     target.setState({
       [isLoadingProp] : false,
       [toStateProp] : json[optionJsonProp]
     });
  }
}

const _onLoadOptionsFailed = function(
  target, { error, isLoadingProp, isLoadingFailedProp }
){
  target.setState({
     [isLoadingProp] : false,
     [isLoadingFailedProp] : true
  })
  if (error instanceof TypeError){
    _fnShowAlertDialog(
       Msg.Alert.NETWORK_ERROR.caption,
       Msg.Alert.NETWORK_ERROR.descr
     );
  }
}

const _handlerWithLoadOptions = function(
  toStateProp, isLoadingProp='isLoading', isLoadingFailedProp='isLoadingFailed',
  optionURI, optionJsonProp
){
  if (this.props.optionURI || optionURI) {
    const _uri = (optionURI)
             ? optionURI
             : this.props.optionURI
        , _jsonProp = (optionJsonProp)
             ? optionJsonProp
             : this.props.optionsJsonProp;
    this.setState(
         {[isLoadingProp]:true, [isLoadingFailedProp]: false},
         _loadOptions({
            target : this,
            toStateProp, isLoadingProp, isLoadingFailedProp,
            uri : _uri,
            optionJsonProp : _jsonProp,
            fnOnCompleted : _onLoadOptionsCompleted,
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
