'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
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

var RowInputText = function (_Component) {
  (0, _inherits3.default)(RowInputText, _Component);

  function RowInputText() {
    (0, _classCallCheck3.default)(this, RowInputText);
    return (0, _possibleConstructorReturn3.default)(this, (RowInputText.__proto__ || Object.getPrototypeOf(RowInputText)).apply(this, arguments));
  }

  (0, _createClass3.default)(RowInputText, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var caption = this.props.caption;

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, _DialogStyles2.default.rowDiv, S.ROOT) },
        _react2.default.createElement(
          'span',
          { style: (0, _extends3.default)({}, _DialogStyles2.default.labelSpan, S.CAPTION) },
          caption
        ),
        _react2.default.createElement(_InputText2.default, {
          ref: function ref(c) {
            return _this2.inputText = c;
          },
          style: S.INPUT_TEXT
        })
      );
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.inputText.getValue().trim();
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.inputText.setValue(value);
    }
  }]);
  return RowInputText;
}(_react.Component);

process.env.NODE_ENV !== "production" ? RowInputText.propTypes = {
  caption: _react.PropTypes.string
} : void 0;
exports.default = RowInputText;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\RowInputText.js.map