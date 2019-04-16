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

var _InputPattern = require('../../zhn/InputPattern');

var _InputPattern2 = _interopRequireDefault(_InputPattern);

var _useRow2 = require('./useRow');

var _useRow3 = _interopRequireDefault(_useRow2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var RowPattern = function (_Component) {
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
     caption : PropTypes.string
     captionStyle: PropTypes.object
  }
  */

  (0, _createClass3.default)(RowPattern, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShowLabels = _props.isShowLabels,
          caption = _props.caption,
          captionStyle = _props.captionStyle,
          rest = (0, _objectWithoutProperties3.default)(_props, ['isShowLabels', 'caption', 'captionStyle']),
          _useRow = (0, _useRow3.default)({
        isShowLabels: isShowLabels, caption: caption, captionStyle: captionStyle
      }),
          rowStyle = _useRow.rowStyle,
          labelStyle = _useRow.labelStyle,
          _caption = _useRow.caption;

      return _react2.default.createElement(
        'div',
        { style: rowStyle },
        _react2.default.createElement(
          'span',
          { style: labelStyle },
          _caption
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
}(_react.Component);

exports.default = RowPattern;
//# sourceMappingURL=RowPattern.js.map