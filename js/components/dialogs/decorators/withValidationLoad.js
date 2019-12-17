"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _handleWithValidationLoad = function _handleWithValidationLoad(validationMessages, fnCreateOption, onLoad) {
  if (onLoad === void 0) {
    onLoad = this.props.onLoad;
  }

  if (validationMessages.isValid) {
    onLoad(fnCreateOption());
  }

  this._updateValidationMessages(validationMessages);
};

var _handleWithValidationClose = function _handleWithValidationClose(onClose) {
  if (onClose === void 0) {
    onClose = this.props.onClose;
  }

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
      this.setState({
        validationMessages: validationMessages
      });
    }
  } else {
    this.setState({
      validationMessages: validationMessages
    });
  }
};

var withValidationLoad = function withValidationLoad(target) {
  Object.assign(target.prototype, {
    _handleWithValidationLoad: _handleWithValidationLoad,
    _handleWithValidationClose: _handleWithValidationClose,
    _updateValidationMessages: _updateValidationMessages
  });
};

var _default = withValidationLoad;
exports["default"] = _default;
//# sourceMappingURL=withValidationLoad.js.map