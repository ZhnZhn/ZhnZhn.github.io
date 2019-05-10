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
    placeholder: PropTypes.string,
    initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    fromCaption: PropTypes.string,
    toCaption: PropTypes.string,
    errMsg: PropTypes.string,
    nForecastDate: PropTypes.number,
    onTestDate: PropTypes.func,
    msgOnNotValidFormat: PropTypes.func,
    onEnter: PropTypes.func
  }
  */

  (0, _createClass3.default)(DatesFragment, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShowLabels = _props.isShowLabels,
          placeholder = _props.placeholder,
          fromCaption = _props.fromCaption,
          initFromDate = _props.initFromDate,
          toCaption = _props.toCaption,
          initToDate = _props.initToDate,
          dateStyle = _props.dateStyle,
          nForecastDate = _props.nForecastDate,
          errMsg = _props.errMsg,
          onTestDate = _props.onTestDate,
          onEnter = _props.onEnter,
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
            fromCaption
          ),
          _react2.default.createElement(_DateField2.default, {
            ref: this._refFromDate,
            rootStyle: dateStyle,
            placeholder: placeholder,
            initValue: initFromDate,
            errorMsg: errMsg,
            onTest: onTestDate,
            onEnter: onEnter
          })
        ),
        _react2.default.createElement(
          'div',
          { style: rowStyle },
          _react2.default.createElement(
            'span',
            { style: labelStyle },
            toCaption
          ),
          _react2.default.createElement(_DateField2.default, {
            ref: this._refToDate,
            rootStyle: dateStyle,
            placeholder: placeholder,
            initValue: initToDate,
            nForecastDate: nForecastDate,
            errorMsg: errMsg,
            onTest: onTestDate,
            onEnter: onEnter
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
      var fromDate = this.fromDate,
          toDate = this.toDate,
          _props2 = this.props,
          msgOnNotValidFormat = _props2.msgOnNotValidFormat,
          isPeriodValid = _props2.isPeriodValid,
          datesMsg = [];


      if (!fromDate.isValid()) {
        datesMsg.push(msgOnNotValidFormat('From Date'));
      }
      if (!toDate.isValid()) {
        datesMsg.push(msgOnNotValidFormat('To Date'));
      }

      if (datesMsg.length === 0 && !isPeriodValid(fromDate.getValue().trim(), toDate.getValue().trim())) {
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
  fromCaption: 'From Date:',
  toCaption: 'To Date:',
  errMsg: FORMAT_ERR_MSG,
  msgOnNotValidFormat: function msgOnNotValidFormat() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Date';
    return item + ' is not in valid format';
  },
  isPeriodValid: function isPeriodValid(from, to) {
    return from <= to;
  }
}, _temp2);
exports.default = DatesFragment;
//# sourceMappingURL=DatesFragment.js.map