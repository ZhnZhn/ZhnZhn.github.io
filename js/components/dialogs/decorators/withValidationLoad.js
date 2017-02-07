"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleWithValidationLoad = function _handleWithValidationLoad(validationMessages, fnCreateOption) {
  var onLoad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.onLoad;

  if (validationMessages.isValid) {
    onLoad(fnCreateOption());
  }
  this._updateValidationMessages(validationMessages);
};

var _handleWithValidationClose = function _handleWithValidationClose(fnCreateMessages) {
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

var withValidationLoad = function withValidationLoad(target) {
  target.prototype._handleWithValidationLoad = _handleWithValidationLoad;
  target.prototype._handleWithValidationClose = _handleWithValidationClose;
  target.prototype._updateValidationMessages = _updateValidationMessages;
};

exports.default = withValidationLoad;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\decorators\withValidationLoad.js.map