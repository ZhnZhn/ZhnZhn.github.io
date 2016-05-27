'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _ZhSelect = require('../ZhSelect');

var _ZhSelect2 = _interopRequireDefault(_ZhSelect);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

var _QuandlCurrency = require('../../services/qe/QuandlCurrency');

var _QuandlCurrency2 = _interopRequireDefault(_QuandlCurrency);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var QuandlCurrencyDialog = _react2.default.createClass(_extends({}, _WithValidation2.default, {

  displayName: 'QuandlCurrencyDialog',

  getInitialState: function getInitialState() {
    this.source = null;
    this.currency = null;
    return {
      optionCurrencySources: _QuandlCurrency2.default.getCurrencySource(),
      optionCurrencies: [],
      validationMessages: []
    };
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }
    return true;
  },
  _handlerSelectSource: function _handlerSelectSource(source) {
    if (source && source.value) {
      this.source = source;
      this.currency = null;
      this.setState({ optionCurrencies: _QuandlCurrency2.default.getCurrencies(source) });
    } else {
      this.source = null;
      this.currency = null;
    }
  },
  _handlerSelectCurrency: function _handlerSelectCurrency(currency) {
    this.currency = currency;
  },
  _handlerLoad: function _handlerLoad(event) {
    event.target.focus();
    var validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      var _datesFragment$getVal = this.datesFragment.getValues();

      var fromDate = _datesFragment$getVal.fromDate;
      var toDate = _datesFragment$getVal.toDate;

      var option = {
        value: this.source.value + '/' + this.currency.value,
        source: this.source,
        currency: this.currency,
        fromDate: fromDate,
        toDate: toDate
      };
      this.props.onLoad(option);
    }
    this._updateValidationMessages(validationMessages);
  },
  _getValidationMessages: function _getValidationMessages() {
    var msgOnNotSelected = this.props.msgOnNotSelected;

    var msg = [];

    if (!this.source) {
      msg.push(msgOnNotSelected('Source'));
    }
    if (!this.currency) {
      msg.push(msgOnNotSelected('Currency'));
    }

    var _datesFragment$getVal2 = this.datesFragment.getValidation();

    var isValid = _datesFragment$getVal2.isValid;
    var datesMsg = _datesFragment$getVal2.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }

    msg.isValid = msg.length === 0 ? true : false;

    return msg;
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var isShow = _props.isShow;
    var onShow = _props.onShow;
    var onClose = _props.onClose;
    var initFromDate = _props.initFromDate;
    var initToDate = _props.initToDate;
    var msgOnNotValidFormat = _props.msgOnNotValidFormat;
    var onTestDate = _props.onTestDate;
    var _state = this.state;
    var optionCurrencySources = _state.optionCurrencySources;
    var optionCurrencies = _state.optionCurrencies;
    var validationMessages = _state.validationMessages;
    var _commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load',
      onClick: this._handlerLoad
    })];

    return _react2.default.createElement(
      _ZhDialog2.default,
      {
        caption: 'Quandl Currency Histories',
        isShow: isShow,
        commandButtons: _commandButtons,
        onShowChart: onShow,
        onClose: this._handlerClose
      },
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '1' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Source:'
        ),
        _react2.default.createElement(_ZhSelect2.default, {
          width: '250',
          onSelect: this._handlerSelectSource,
          options: optionCurrencySources
        })
      ),
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '2' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Currency:'
        ),
        _react2.default.createElement(_ZhSelect2.default, {
          width: '250',
          onSelect: this._handlerSelectCurrency,
          options: optionCurrencies
        })
      ),
      _react2.default.createElement(_DatesFragment2.default, {
        key: '3',
        ref: function ref(c) {
          return _this.datesFragment = c;
        },
        initFromDate: initFromDate,
        initToDate: initToDate,
        msgOnNotValidFormat: msgOnNotValidFormat,
        onTestDate: onTestDate
      }),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        key: '4',
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = QuandlCurrencyDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\QuandlCurrencyDialog.js.map