'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ZhDateField = require('./ZhDateField.js');

var _ZhDateField2 = _interopRequireDefault(_ZhDateField);

var _DialogStyles = require('./styles/DialogStyles.js');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var DatesFragment = _react2.default.createClass({
  displayName: 'DatesFragment',


  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'From Date:'
        ),
        _react2.default.createElement(_ZhDateField2.default, {
          ref: 'fromDate',
          initValue: this.props.initFromDate,
          errorMsg: 'YYYY-MM-DD format must be',
          onTest: this.props.onTestDate
        })
      ),
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'To Date:'
        ),
        _react2.default.createElement(_ZhDateField2.default, {
          ref: 'toDate',
          initValue: this.props.initToDate,
          errorMsg: 'YYYY-MM-DD format must be',
          onTest: this.props.onTestDate
        })
      )
    );
  },

  getValues: function getValues() {
    return {
      fromDate: this.refs.fromDate.getValue(),
      toDate: this.refs.toDate.getValue()
    };
  },

  isValid: function isValid() {
    if (!this.refs.fromDate.isValid()) {
      return false;
    }
    if (!this.refs.toDate.isValid()) {
      return false;
    }
    return true;
  },

  focusInput: function focusInput() {
    this.refs.fromDate.focusInput();
  },

  focusNotValidInput: function focusNotValidInput() {
    if (!this.refs.fromDate.isValid()) {
      this.refs.fromDate.focusInput();
      return true;
    }
    if (!this.refs.toDate.isValid()) {
      this.refs.toDate.focusInput();
      return true;
    }
    return false;
  }

});

exports.default = DatesFragment;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\DatesFragment.js.map