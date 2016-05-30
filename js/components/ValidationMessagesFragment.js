'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogStyles = require('./styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;
var Styles = {
  MSG_SPAN: {
    whiteSpace: 'pre'
  }
};

var ValidationMessagesFragment = _react2.default.createClass({
  displayName: 'ValidationMessagesFragment',
  propTypes: {
    validationMessages: _react2.default.PropTypes.array
  },
  getDefaultProps: function getDefaultProps() {
    return {
      validationMessages: []
    };
  },
  _renderValidationMessages: function _renderValidationMessages(validationMessages) {
    return validationMessages.map(function (msg, index) {
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
          { style: Styles.MSG_SPAN },
          msg
        )
      );
    });
  },
  render: function render() {
    var validationMessages = this.props.validationMessages;

    return _react2.default.createElement(
      'div',
      { style: styles.validationContainer },
      this._renderValidationMessages(validationMessages)
    );
  }
});

exports.default = ValidationMessagesFragment;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ValidationMessagesFragment.js.map