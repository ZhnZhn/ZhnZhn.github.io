'use strict';

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

var _handleWithValidationClose = function _handleWithValidationClose() {
  var onClose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.onClose;

  if (typeof onClose === 'function') {
    onClose();
  }
  this.setState(function (prevState) {
    prevState.validationMessages = [];
    return prevState;
  });
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
  Object.assign(target.prototype, {
    _handleWithValidationLoad: _handleWithValidationLoad,
    _handleWithValidationClose: _handleWithValidationClose,
    _updateValidationMessages: _updateValidationMessages
  });
};

exports.default = withValidationLoad;
//# sourceMappingURL=withValidationLoad.js.map