'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateField = require('../zhn/DateField');

var _DateField2 = _interopRequireDefault(_DateField);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Styles = _DialogStyles2.default;

var RowDate = (_temp2 = _class = function (_Component) {
  _inherits(RowDate, _Component);

  function RowDate() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RowDate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RowDate.__proto__ || Object.getPrototypeOf(RowDate)).call.apply(_ref, [this].concat(args))), _this), _this.getValue = function () {
      return _this.inputDate.getValue();
    }, _this.isValid = function () {
      return _this.inputDate.isValid();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RowDate, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$labelTitle = _props.labelTitle,
          labelTitle = _props$labelTitle === undefined ? '' : _props$labelTitle,
          initValue = _props.initValue,
          errorMsg = _props.errorMsg,
          onTestDate = _props.onTestDate;

      return _react2.default.createElement(
        'div',
        { style: Styles.rowDiv },
        _react2.default.createElement(
          'span',
          { style: Styles.labelSpan },
          labelTitle
        ),
        _react2.default.createElement(_DateField2.default, {
          ref: function ref(c) {
            return _this2.inputDate = c;
          },
          initValue: initValue,
          errorMsg: errorMsg,
          onTest: onTestDate
        })
      );
    }
  }]);

  return RowDate;
}(_react.Component), _class.propTypes = {
  labelTitle: _react.PropTypes.string,
  initValue: _react.PropTypes.string,
  errorMsg: _react.PropTypes.string,
  onTestDate: _react.PropTypes.func
}, _temp2);
exports.default = RowDate;
//# sourceMappingURL=RowDate.js.map