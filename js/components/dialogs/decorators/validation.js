"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handlerWithValidationLoad = function _handlerWithValidationLoad(validationMessages, fnCreateOption) {
  var onLoad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.onLoad;

  if (validationMessages.isValid) {
    onLoad(fnCreateOption());
  }
  this._updateValidationMessages(validationMessages);
};

var _handlerWithValidationClose = function _handlerWithValidationClose(fnCreateMessages) {
  if (this.state.validationMessages.length > 0) {
    this.setState({ validationMessages: fnCreateMessages() });
  }
};

var _updateValidationMessages = function _updateValidationMessages(validationMessages) {
  if (validationMessages.isValid) {
    if (this.state.validationMessages.length > 0) {
      this.setState({ validationMessages: validationMessages });
    }
  } else {
    this.setState({ validationMessages: validationMessages });
  }
};

var _handlerClose = function _handlerClose() {
  if (this.state.validationMessages.length > 0) {
    this.setState({ validationMessages: this._getValidationMessages() });
  }
  this.props.onClose();
};

var withValidationLoad = function withValidationLoad(target) {
  target.proptotype._handlerWithValidationLoad = _handlerWithValidationLoad;
  target.proptotype._handlerWithValidationClose = _handlerWithValidationClose;
  target.proptotype._updateValidationMessages = _updateValidationMessages;
  target.proptotype._handlerClose = _handlerClose;
};

exports.default = withValidationLoad;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\decorators\validation.js.map