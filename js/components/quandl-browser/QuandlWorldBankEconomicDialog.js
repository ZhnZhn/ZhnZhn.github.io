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

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _ZhSelect = require('../ZhSelect');

var _ZhSelect2 = _interopRequireDefault(_ZhSelect);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

var _ISO3Country = require('../../services/qe/ISO3Country');

var _ISO3Country2 = _interopRequireDefault(_ISO3Country);

var _QuandlWorldBankEconomic = require('../../services/qe/QuandlWorldBankEconomic');

var _QuandlWorldBankEconomic2 = _interopRequireDefault(_QuandlWorldBankEconomic);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var QuandlWorldBankEconomicDialog = _react2.default.createClass(_extends({}, _WithValidation2.default, {

  displayName: 'QuandlWorldBankEconomicDialog',

  getInitialState: function getInitialState() {
    this.country = null;
    this.metric = null;
    return {
      optionCountries: _ISO3Country2.default.getCountries(),
      optionMetrics: _QuandlWorldBankEconomic2.default.getMetrics(),
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
  _handlerSelectCountry: function _handlerSelectCountry(country) {
    this.country = country;
  },
  _handlerSelectMetric: function _handlerSelectMetric(metric) {
    this.metric = metric;
  },
  _handlerLoad: function _handlerLoad(event) {
    event.target.focus();
    var validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      var _datesFragment$getVal = this.datesFragment.getValues();

      var fromDate = _datesFragment$getVal.fromDate;
      var toDate = _datesFragment$getVal.toDate;
      var dataColumn = this.props.dataColumn;

      var option = {
        value: 'WWDI/' + this.country.value + '_' + this.metric.value,
        country: this.country,
        metric: this.metric,
        fromDate: fromDate,
        toDate: toDate,
        dataColumn: dataColumn
      };
      this.props.onLoad(option);
    }
    this._updateValidationMessages(validationMessages);
  },
  _getValidationMessages: function _getValidationMessages() {
    var msgOnNotSelected = this.props.msgOnNotSelected;

    var msg = [];

    if (!this.country) {
      msg.push(msgOnNotSelected('Country'));
    }
    if (!this.metric) {
      msg.push(msgOnNotSelected('Metric'));
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
    var optionCountries = _state.optionCountries;
    var optionMetrics = _state.optionMetrics;
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
        caption: 'World Bank Economic',
        isShow: isShow,
        commandButtons: _commandButtons,
        onClose: this._handlerClose,
        onShowChart: onShow
      },
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '1' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Country:'
        ),
        _react2.default.createElement(_ZhSelect2.default, {
          width: '250',
          onSelect: this._handlerSelectCountry,
          options: optionCountries
        })
      ),
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '2' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Metric:'
        ),
        _react2.default.createElement(_ZhSelect2.default, {
          width: '250',
          onSelect: this._handlerSelectMetric,
          options: optionMetrics
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

exports.default = QuandlWorldBankEconomicDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\QuandlWorldBankEconomicDialog.js.map