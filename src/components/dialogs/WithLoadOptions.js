

import Msg from '../../constants/Msg';
import ComponentActions from '../../flux/actions/ComponentActions';
import {ModalDialog} from '../../constants/Type';

const _fnShowAlertDialog = function(caption, descr){
  const modalDialogType = ModalDialog.ALERT;
  ComponentActions.showModalDialog(
    ModalDialog.ALERT, {caption, descr, modalDialogType}
  );
}

const WithLoadOptions =  {
  _loadOptions(option){
    const {
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
            _fnShowAlertDialog('Client Error:', status + ' ' + statusText);
            fnOnFailed(null, isLoadingProp, isLoadingFailedProp);
            return null;
         } else if (status>=500 && status<600) {
           if (retryServer !== 0) {
             option.retryServer = retryServer - 1;
             this._loadOptionsID = setTimeout( this._loadOptions(option), 3E3);
           } else {
              _fnShowAlertDialog('Server Error:', status + ' ' + statusText);
              fnOnFailed(null, isLoadingProp, isLoadingFailedProp);
           }
           return null;
         }
      })
      .then((json) => {
        if (json) {
          fnOnCompleted({ toStateProp, isLoadingProp, json, optionJsonProp });
        }
      })
      .catch((error) => {
        if (retryNetwork === 0){
           fnOnFailed(error, isLoadingProp, isLoadingFailedProp);
        } else {
          option.retryNetwork = retryNetwork - 1;
          this._loadOptionsID = setTimeout( this._loadOptions(option), 2E3);
        }
      })
  },

  _onLoadOptionsCompleted({ toStateProp, isLoadingProp, json, optionJsonProp }){
    if (toStateProp && optionJsonProp) {
       this.setState({
         [isLoadingProp] : false,
         [toStateProp] : json[optionJsonProp]
       });
    }
  },
  _onLoadOptionsFailed(error, isLoadingProp, isLoadingFailedProp){
    this.setState({
       [isLoadingProp] : false,
       [isLoadingFailedProp] : true
    })
    if (error instanceof TypeError){
      _fnShowAlertDialog(
         Msg.Alert.NETWORK_ERROR.caption,
         Msg.Alert.NETWORK_ERROR.descr
       );
    }
  },

  _handlerWithLoadOptions(
       toStateProp, isLoadingProp='isLoading', isLoadingFailedProp='isLoadingFailed',
       optionURI, optionJsonProp
   ){
    if (this.props.optionURI || optionURI) {
      const _uri = (optionURI) ? optionURI : this.props.optionURI
          , _jsonProp = (optionJsonProp) ? optionJsonProp : this.props.optionsJsonProp;
      this.setState(
           {[isLoadingProp]:true, [isLoadingFailedProp]: false},
           this._loadOptions({
             toStateProp, isLoadingProp, isLoadingFailedProp,
             uri : _uri,
             optionJsonProp : _jsonProp,
             fnOnCompleted : this._onLoadOptionsCompleted,
             fnOnFailed: this._onLoadOptionsFailed
           })
      );
    }
  },
  _unmountWithLoadOptions(){
    if (this._loadOptionsID){
      clearTimeout(this._loadOptionsID)
    }
  }
};

export default WithLoadOptions
