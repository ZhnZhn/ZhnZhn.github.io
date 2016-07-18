'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ZhDateField = require('../ZhDateField');

var _ZhDateField2 = _interopRequireDefault(_ZhDateField);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = _DialogStyles2.default;

var RowDate = _react2.default.createClass({
  displayName: 'RowDate',
  render: function render() {
    var _this = this;

    var _props = this.props;
    var labelTitle = _props.labelTitle;
    var initValue = _props.initValue;
    var errorMsg = _props.errorMsg;
    var onTestDate = _props.onTestDate;

    return _react2.default.createElement(
      'div',
      { style: Styles.rowDiv },
      _react2.default.createElement(
        'span',
        { style: Styles.labelSpan },
        labelTitle
      ),
      _react2.default.createElement(_ZhDateField2.default, {
        ref: function ref(c) {
          return _this.inputDate = c;
        },
        initValue: initValue,
        errorMsg: errorMsg,
        onTest: onTestDate
      })
    );
  },
  getValue: function getValue() {
    return this.inputDate.getValue();
  },
  isValid: function isValid() {
    return this.inputDate.isValid();
  }
});

exports.default = RowDate;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\RowDate.js.map