'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationMessages = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(ValidationMessages, _Component);

  function ValidationMessages() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ValidationMessages);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ValidationMessages.__proto__ || Object.getPrototypeOf(ValidationMessages)).call.apply(_ref, [this].concat(args))), _this), _this._renderValidationMessages = function (validationMessages) {
      return validationMessages.map(function (msg, index) {
        return _react2.default.createElement(
          'div',
          { key: msg },
          _react2.default.createElement(
            'div',
            { style: _DialogStyles2.default.VM_MSG_NUMBER },
            index + 1
          ),
          _react2.default.createElement(
            'span',
            { style: _DialogStyles2.default.VM_MSG },
            msg
          )
        );
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /*
   static propTypes = {
     validationMessages : PropTypes.array
   }
  */


  (0, _createClass3.default)(ValidationMessages, [{
    key: 'render',
    value: function render() {
      var validationMessages = this.props.validationMessages;

      return _react2.default.createElement(
        'div',
        { style: _DialogStyles2.default.VM_CONT },
        this._renderValidationMessages(validationMessages)
      );
    }
  }]);
  return ValidationMessages;
}(_react.Component), _class.defaultProps = {
  validationMessages: []
}, _temp2);
exports.default = ValidationMessages;
//# sourceMappingURL=ValidationMessages.js.map