

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
  _loadOptions({toStateProp, uri, fnOnCompleted, fnOnFailed, retryServer=3, retryNetwork=1}){
    fetch(uri)
      .then((response) => {
         const {status, statusText} = response;
         if (status>=200 && status<400){
            return response.json();
         } else if (status>=400 && status<500){
            _fnShowAlertDialog('Client Error:', status + ' ' + statusText);
            fnOnFailed();
            return null;
         } else if (status>=500 && status<600) {
           if (retryServer === 0) {
             retryServer -= 1;
             this._loadOptionsID = setTimeout( this._loadOptions({
                toStateProp, uri, fnOnCompleted, fnOnFailed,
                retryServer, retryNetwork
             }), 3E3);
           } else {
              _fnShowAlertDialog('Server Error:', status + ' ' + statusText);
              fnOnFailed();
           }
           return null;
         }
      })
      .then((json) => {
        if (json) {
          fnOnCompleted({toStateProp, json});
        }
      })
      .catch((error) => {
        if (retryNetwork === 0){
           fnOnFailed(error);
        } else {
          retryNetwork -= 1;
          this._loadOptionsID = setTimeout( this._loadOptions({
            toStateProp, uri, fnOnCompleted, fnOnFailed,
            retryServer, retryNetwork
          }), 2E3);
        }
      })
  },

  _onLoadOptionsCompleted({toStateProp, json}){
    const {optionsJsonProp} = this.props;
    if (toStateProp && optionsJsonProp) {
       this.setState({
         isLoading: false,
         [toStateProp] : json[optionsJsonProp]
       });
    }
  },
  _onLoadOptionsFailed(error){
    this.setState({
       isLoading : false,
       isLoadingFailed : true
    })
    if (error instanceof TypeError){
      _fnShowAlertDialog(
         Msg.Alert.NETWORK_ERROR.caption,
         Msg.Alert.NETWORK_ERROR.descr
       );
    }
  },

  _handlerWithLoadOptions(toStateProp){
    const {optionURI} = this.props;
    if (optionURI) {
      this.setState(
           {isLoading:true, isLoadingFailed: false},
           this._loadOptions({
             toStateProp,
             uri : optionURI,
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
  },
};

export default WithLoadOptions
