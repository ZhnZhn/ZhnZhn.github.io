"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var WithValidation = {
  _updateValidationMessages: function _updateValidationMessages(validationMessages) {
    if (validationMessages.isValid) {
      if (this.state.validationMessages.length > 0) {
        this.setState({ validationMessages: validationMessages });
      }
    } else {
      this.setState({ validationMessages: validationMessages });
    }
  },
  _handlerClose: function _handlerClose() {
    if (this.state.validationMessages.length > 0) {
      this.setState({ validationMessages: this._getValidationMessages() });
    }
    this.props.onClose();
  }
};

exports.default = WithValidation;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\WithValidation.js.map