
const WithValidation = {

  _handlerWithValidationLoad(
      validationMessages, fnCreateOption, onLoad = this.props.onLoad
  ){
    if (validationMessages.isValid){      
      onLoad(fnCreateOption());
    }
    this._updateValidationMessages(validationMessages);
  },

  _handlerWithValidationClose(fnCreateMessages){
      if (this.state.validationMessages.length > 0){
        this.setState({validationMessages : fnCreateMessages()});
      }
  },

  _updateValidationMessages(validationMessages){
    if (validationMessages.isValid){
      if (this.state.validationMessages.length > 0){
        this.setState({validationMessages});
      }
    } else {
      this.setState({validationMessages});
    }
  },

  _handlerClose(){
    if (this.state.validationMessages.length > 0){
      this.setState({validationMessages : this._getValidationMessages()});
    }
    this.props.onClose();
  }
};

export default WithValidation
