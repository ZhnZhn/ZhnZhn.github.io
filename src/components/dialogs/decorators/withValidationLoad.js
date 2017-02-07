
const _handleWithValidationLoad = function(
    validationMessages, fnCreateOption, onLoad = this.props.onLoad
){
  if (validationMessages.isValid){
    onLoad(fnCreateOption());
  }
  this._updateValidationMessages(validationMessages);
};

const _handleWithValidationClose = function(fnCreateMessages){
    if (this.state.validationMessages.length > 0){
      this.setState({ validationMessages : fnCreateMessages() });
    }
};

const _updateValidationMessages = function(validationMessages){
  if (validationMessages.isValid){
    if (this.state.validationMessages.length > 0){
      this.setState({validationMessages});
    }
  } else {
    this.setState({validationMessages});
  }
};

const withValidationLoad = (target) => {
  target.prototype._handleWithValidationLoad = _handleWithValidationLoad;
  target.prototype._handleWithValidationClose = _handleWithValidationClose;
  target.prototype._updateValidationMessages = _updateValidationMessages;
}

export default withValidationLoad
