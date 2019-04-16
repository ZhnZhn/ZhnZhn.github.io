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

var _DateField = require('../../zhn/DateField');

var _DateField2 = _interopRequireDefault(_DateField);

var _useRowStyle2 = require('./useRowStyle');

var _useRowStyle3 = _interopRequireDefault(_useRowStyle2);

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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DatesFragment.__proto__ || Object.getPrototypeOf(DatesFragment)).call.apply(_ref, [this].concat(args))), _this), _this._refFromDate = function (c) {
      return _this.fromDate = c;
    }, _this._refToDate = function (c) {
      return _this.toDate = c;
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
      var _props = this.props,
          isShowLabels = _props.isShowLabels,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          nForecastDate = _props.nForecastDate,
          onTestDate = _props.onTestDate,
          _useRowStyle = (0, _useRowStyle3.default)({ isShowLabels: isShowLabels }),
          rowStyle = _useRowStyle.rowStyle,
          labelStyle = _useRowStyle.labelStyle;

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
            ref: this._refFromDate,
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
            ref: this._refToDate,
            initValue: initToDate,
            nForecastDate: nForecastDate,
            errorMsg: FORMAT_ERR_MSG,
            onTest: onTestDate
          })
        )
      );
    }
  }, {
    key: 'getValues',
    value: function getValues() {
      return {
        fromDate: this.fromDate.getValue(),
        toDate: this.toDate.getValue()
      };
    }
  }, {
    key: 'getValidation',
    value: function getValidation() {
      var msgOnNotValidFormat = this.props.msgOnNotValidFormat,
          datesMsg = [];

      if (!this.fromDate.isValid()) {
        datesMsg.push(msgOnNotValidFormat('From Date'));
      }
      if (!this.toDate.isValid()) {
        datesMsg.push(msgOnNotValidFormat('To Date'));
      }

      if (this.fromDate.getValue().trim() > this.toDate.getValue().trim()) {
        datesMsg.push(NEAR_ERR_MSG);
      }

      if (datesMsg.length > 0) {
        return { isValid: false, datesMsg: datesMsg };
      }
      return { isValid: true };
    }
  }, {
    key: 'focusInput',
    value: function focusInput() {
      this.fromDate.focusInput();
    }
  }, {
    key: 'focusNotValidInput',
    value: function focusNotValidInput() {
      if (!this.fromDate.isValid()) {
        this.fromDate.focusInput();
        return true;
      }
      if (!this.toDate.isValid()) {
        this.toDate.focusInput();
        return true;
      }
      return false;
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
//# sourceMappingURL=DatesFragment.js.map