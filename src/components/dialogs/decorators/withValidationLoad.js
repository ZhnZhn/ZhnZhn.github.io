
const _handleWithValidationLoad = function(
    validationMessages, fnCreateOption, onLoad = this.props.onLoad
){
  if (validationMessages.isValid){
    onLoad(fnCreateOption())
  }
  this._updateValidationMessages(validationMessages)
};

const _handleWithValidationClose = function(fnCreateMessages){
    if (this.state.validationMessages.length > 0){
      this.setState({ validationMessages : fnCreateMessages() })
    }
};

const _updateValidationMessages = function(validationMessages){
  if (validationMessages.isValid){
    if (this.state.validationMessages.length > 0){
      this.setState({ validationMessages })
    }
  } else {
    this.setState({ validationMessages })
  }
};

const withValidationLoad = (target) => {
  Object.assign(target.prototype, {
    _handleWithValidationLoad,
    _handleWithValidationClose,
    _updateValidationMessages
  })  
}

export default withValidationLoad
