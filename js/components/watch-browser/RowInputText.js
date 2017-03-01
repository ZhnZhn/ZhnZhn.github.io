'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;
var Styles = {
  ROOT: {
    lineHeight: 2
  },
  CAPTION: {
    width: '120px'
  },
  INPUT_TEXT: {
    width: '250px',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: '10px',
    height: '30px'
  }
};

var RowInputText = _react2.default.createClass({
  displayName: 'RowInputText',
  propTypes: {
    caption: _react2.default.PropTypes.string
  },
  render: function render() {
    var _this = this;

    var caption = this.props.caption;

    return _react2.default.createElement(
      'div',
      { style: Object.assign({}, styles.rowDiv, Styles.ROOT) },
      _react2.default.createElement(
        'span',
        { style: Object.assign({}, styles.labelSpan, Styles.CAPTION) },
        caption
      ),
      _react2.default.createElement(_InputText2.default, {
        ref: function ref(c) {
          return _this.inputText = c;
        },
        style: Styles.INPUT_TEXT
      })
    );
  },
  getValue: function getValue() {
    return this.inputText.getValue().trim();
  },
  setValue: function setValue(value) {
    this.inputText.setValue(value);
  }
});

exports.default = RowInputText;
//# sourceMappingURL=RowInputText.js.map