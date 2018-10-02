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

var _class, _temp2;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputPattern = require('../zhn/InputPattern');

var _InputPattern2 = _interopRequireDefault(_InputPattern);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RowPattern = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(RowPattern, _Component);

  function RowPattern() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RowPattern);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RowPattern.__proto__ || Object.getPrototypeOf(RowPattern)).call.apply(_ref, [this].concat(args))), _this), _this._refInput = function (c) {
      return _this.inputPattern = c;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /*
  static propTypes = {
     isShowLabels: PropTypes.bool,
     title : PropTypes.string
     titleStyle: PropTypes.object
  }
  */

  (0, _createClass3.default)(RowPattern, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShowLabels = _props.isShowLabels,
          title = _props.title,
          titleStyle = _props.titleStyle,
          rest = (0, _objectWithoutProperties3.default)(_props, ['isShowLabels', 'title', 'titleStyle']),
          _title = title.indexOf(':') === -1 ? title + ':' : title,
          _STYLE$crRowLabelStyl = _DialogStyles2.default.crRowLabelStyle(isShowLabels),
          rowStyle = _STYLE$crRowLabelStyl.rowStyle,
          labelStyle = _STYLE$crRowLabelStyl.labelStyle;

      return _react2.default.createElement(
        'div',
        { style: rowStyle },
        _react2.default.createElement(
          'span',
          { style: (0, _extends3.default)({}, labelStyle, titleStyle) },
          _title
        ),
        _react2.default.createElement(_InputPattern2.default, (0, _extends3.default)({
          ref: this._refInput
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
}(_react.Component), _class.defaultProps = {
  title: ''
}, _temp2);
exports.default = RowPattern;
//# sourceMappingURL=RowPattern.js.map