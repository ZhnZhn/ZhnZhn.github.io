'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ZhDateField = require('./ZhDateField');

var _ZhDateField2 = _interopRequireDefault(_ZhDateField);

var _DialogStyles = require('./styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var DatesFragment = _react2.default.createClass({
  displayName: 'DatesFragment',
  getDefaultProps: function getDefaultProps() {
    return {
      msgOnNotValidFormat: function msgOnNotValidFormat(item) {
        return '${item} is not in valid format';
      }
    };
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var initFromDate = _props.initFromDate;
    var initToDate = _props.initToDate;
    var onTestDate = _props.onTestDate;

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
          ref: function ref(c) {
            return _this.fromDate = c;
          },
          initValue: initFromDate,
          errorMsg: 'YYYY-MM-DD format must be',
          onTest: onTestDate
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
          ref: function ref(c) {
            return _this.toDate = c;
          },
          initValue: initToDate,
          errorMsg: 'YYYY-MM-DD format must be',
          onTest: onTestDate
        })
      )
    );
  },
  getValues: function getValues() {
    return {
      fromDate: this.fromDate.getValue(),
      toDate: this.toDate.getValue()
    };
  },


  /*
  isValid(){
    if (!this.fromDate.isValid()) {
      return false;
    }
    if (!this.toDate.isValid()) {
      return false;
    }
    return true;
  },
  */

  getValidation: function getValidation() {
    var msgOnNotValidFormat = this.props.msgOnNotValidFormat;
    var datesMsg = [];
    if (!this.fromDate.isValid()) {
      datesMsg.push(msgOnNotValidFormat('From Date'));
    }
    if (!this.toDate.isValid()) {
      datesMsg.push(msgOnNotValidFormat('To Date'));
    }
    if (datesMsg.length > 0) {
      return { isValid: false, datesMsg: datesMsg };
    }
    return { isValid: true };
  },
  focusInput: function focusInput() {
    this.fromDate.focusInput();
  },
  focusNotValidInput: function focusNotValidInput() {
    if (!this.fromDate.isValid()) {
      this.fromDate.focusInput();
      return true;
    }
    if (!this.toDate.isValid()) {
      this.toDate.focusInput();
      return true;
    }
    return false;
  }
});

exports.default = DatesFragment;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\DatesFragment.js.map