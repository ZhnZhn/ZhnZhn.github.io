'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputPattern = require('../zhn/InputPattern');

var _InputPattern2 = _interopRequireDefault(_InputPattern);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RowPattern = function (_Component) {
  (0, _inherits3.default)(RowPattern, _Component);

  function RowPattern() {
    (0, _classCallCheck3.default)(this, RowPattern);
    return (0, _possibleConstructorReturn3.default)(this, (RowPattern.__proto__ || Object.getPrototypeOf(RowPattern)).apply(this, arguments));
  }

  (0, _createClass3.default)(RowPattern, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isShowLabels = _props.isShowLabels,
          _props$title = _props.title,
          title = _props$title === undefined ? '' : _props$title,
          titleStyle = _props.titleStyle,
          rest = (0, _objectWithoutProperties3.default)(_props, ['isShowLabels', 'title', 'titleStyle']),
          _STYLE$crRowLabelStyl = _DialogStyles2.default.crRowLabelStyle(isShowLabels),
          rowStyle = _STYLE$crRowLabelStyl.rowStyle,
          labelStyle = _STYLE$crRowLabelStyl.labelStyle;

      return _react2.default.createElement(
        'div',
        { style: rowStyle },
        _react2.default.createElement(
          'span',
          { style: (0, _extends3.default)({}, labelStyle, titleStyle) },
          title
        ),
        _react2.default.createElement(_InputPattern2.default, (0, _extends3.default)({
          ref: function ref(c) {
            return _this2.inputPattern = c;
          }
        }, rest))
      );
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.inputPattern.getValue();
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      return this.inputPattern.isValid();
    }
  }]);
  return RowPattern;
}(_react.Component);

RowPattern.propTypes = process.env.NODE_ENV !== "production" ? {
  title: _propTypes2.default.string
} : {};
exports.default = RowPattern;
//# sourceMappingURL=RowPattern.js.map