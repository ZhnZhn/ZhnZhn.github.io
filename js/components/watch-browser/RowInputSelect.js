'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputSelect = require('../zhn/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;
var Styles = {
  CAPTION: {
    width: '120px'
  }
};

var RowInputSelect = _react2.default.createClass({
  displayName: 'RowInputSelect',
  propTypes: {
    caption: _react2.default.PropTypes.string,
    options: _react2.default.PropTypes.array,
    isUpdateOptions: _react2.default.PropTypes.bool,
    onSelect: _react2.default.PropTypes.func
  },
  render: function render() {
    var _props = this.props,
        caption = _props.caption,
        options = _props.options,
        isUpdateOptions = _props.isUpdateOptions,
        onSelect = _props.onSelect;

    return _react2.default.createElement(
      'div',
      { style: Object.assign({}, styles.rowDiv) },
      _react2.default.createElement(
        'span',
        { style: Object.assign({}, styles.labelSpan, Styles.CAPTION) },
        caption
      ),
      _react2.default.createElement(_InputSelect2.default, {
        width: '250',
        options: options,
        isUpdateOptions: isUpdateOptions,
        onSelect: onSelect

      })
    );
  }
});

exports.default = RowInputSelect;
//# sourceMappingURL=RowInputSelect.js.map