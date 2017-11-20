
const _handleWithValidationLoad = function(
    validationMessages, fnCreateOption, onLoad = this.props.onLoad
){
  if (validationMessages.isValid){
    onLoad(fnCreateOption())
  }
  this._updateValidationMessages(validationMessages)
};

const _handleWithValidationClose = function(
   onClose=this.props.onClose
 ){
    if (typeof onClose === 'function') {
       onClose()
    }
    this.setState(prevState => {
      prevState.validationMessages = []
      return prevState;
    })
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
