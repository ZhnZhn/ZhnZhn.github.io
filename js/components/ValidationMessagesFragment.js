'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogStyles = require('./styles/DialogStyles.js');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var ValidationMessagesFragment = _react2.default.createClass({
  displayName: 'ValidationMessagesFragment',


  _renderValidationMessages: function _renderValidationMessages() {
    var messages = this.props.validationMessages.map(function (msg, index) {
      return _react2.default.createElement(
        'div',
        { key: index },
        _react2.default.createElement(
          'div',
          { style: styles.validationMessageNumber },
          index + 1
        ),
        _react2.default.createElement(
          'span',
          null,
          msg
        )
      );
    });

    return messages;
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { style: styles.validationContainer },
      this._renderValidationMessages()
    );
  }
});

exports.default = ValidationMessagesFragment;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ValidationMessagesFragment.js.map