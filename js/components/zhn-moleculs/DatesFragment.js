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

var _DateField = require('../zhn/DateField');

var _DateField2 = _interopRequireDefault(_DateField);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FORMAT_ERR_MSG = "YYYY-MM-DD format must be";
var NEAR_ERR_MSG = "From Date is near that To Date";

var DatesFragment = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(DatesFragment, _Component);

  function DatesFragment() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DatesFragment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DatesFragment.__proto__ || Object.getPrototypeOf(DatesFragment)).call.apply(_ref, [this].concat(args))), _this), _this.getValues = function () {
      return {
        fromDate: _this.fromDate.getValue(),
        toDate: _this.toDate.getValue()
      };
    }, _this.getValidation = function () {
      var msgOnNotValidFormat = _this.props.msgOnNotValidFormat,
          datesMsg = [];

      if (!_this.fromDate.isValid()) {
        datesMsg.push(msgOnNotValidFormat('From Date'));
      }
      if (!_this.toDate.isValid()) {
        datesMsg.push(msgOnNotValidFormat('To Date'));
      }

      if (_this.fromDate.getValue().trim() > _this.toDate.getValue().trim()) {
        datesMsg.push(NEAR_ERR_MSG);
      }

      if (datesMsg.length > 0) {
        return { isValid: false, datesMsg: datesMsg };
      }
      return { isValid: true };
    }, _this.focusInput = function () {
      _this.fromDate.focusInput();
    }, _this.focusNotValidInput = function () {
      if (!_this.fromDate.isValid()) {
        _this.fromDate.focusInput();
        return true;
      }
      if (!_this.toDate.isValid()) {
        _this.toDate.focusInput();
        return true;
      }
      return false;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /*
  static propTypes = {
    isShowLabels: PropTypes.bool,
    initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    nForecastDate: PropTypes.number,
    onTestDate: PropTypes.func,
    msgOnNotValidFormat: PropTypes.func
  }
  */

  (0, _createClass3.default)(DatesFragment, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isShowLabels = _props.isShowLabels,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          nForecastDate = _props.nForecastDate,
          onTestDate = _props.onTestDate,
          _STYLE$crRowLabelStyl = _DialogStyles2.default.crRowLabelStyle(isShowLabels),
          rowStyle = _STYLE$crRowLabelStyl.rowStyle,
          labelStyle = _STYLE$crRowLabelStyl.labelStyle;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: rowStyle },
          _react2.default.createElement(
            'span',
            { style: labelStyle },
            'From Date:'
          ),
          _react2.default.createElement(_DateField2.default, {
            ref: function ref(c) {
              return _this2.fromDate = c;
            },
            initValue: initFromDate,
            errorMsg: FORMAT_ERR_MSG,
            onTest: onTestDate
          })
        ),
        _react2.default.createElement(
          'div',
          { style: rowStyle },
          _react2.default.createElement(
            'span',
            { style: labelStyle },
            'To Date:'
          ),
          _react2.default.createElement(_DateField2.default, {
            ref: function ref(c) {
              return _this2.toDate = c;
            },
            initValue: initToDate,
            nForecastDate: nForecastDate,
            errorMsg: FORMAT_ERR_MSG,
            onTest: onTestDate
          })
        )
      );
    }
  }]);
  return DatesFragment;
}(_react.Component), _class.defaultProps = {
  isShowLabels: true,
  msgOnNotValidFormat: function msgOnNotValidFormat() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Date';
    return item + ' is not in valid format';
  }
}, _temp2);
exports.default = DatesFragment;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-moleculs\DatesFragment.js.map