'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ZhSelect = require('../ZhSelect');

var _ZhSelect2 = _interopRequireDefault(_ZhSelect);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var RowInputSelect = _react2.default.createClass({
  displayName: 'RowInputSelect',
  render: function render() {
    var _props = this.props;
    var caption = _props.caption;
    var isLoading = _props.isLoading;
    var isLoadingFailed = _props.isLoadingFailed;
    var options = _props.options;
    var optionNames = _props.optionNames;
    var onLoadOption = _props.onLoadOption;
    var onSelect = _props.onSelect;

    return _react2.default.createElement(
      'div',
      { style: styles.rowDiv },
      _react2.default.createElement(
        'span',
        { style: styles.labelSpan },
        caption
      ),
      _react2.default.createElement(_ZhSelect2.default, {
        width: '250',
        isLoading: isLoading,
        isLoadingFailed: isLoadingFailed,
        options: options,
        optionNames: optionNames,
        onLoadOption: onLoadOption,
        onSelect: onSelect
      })
    );
  }
});

exports.default = RowInputSelect;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\RowInputSelect.js.map