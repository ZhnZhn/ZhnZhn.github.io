'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var QuandlCurrencyDialog = _react2.default.createClass({
  displayName: 'QuandlCurrencyDialog',


  getInitialState: function getInitialState() {
    return {
      currencySource: null,
      currency: null,
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

  _handlerSelectSource: function _handlerSelectSource(currencySource) {
    this.state.currencySource = currencySource;
    this.state.currency = null;
    this.state.optionCurrencies = _QuandlCurrency2.default.getCurrencies(currencySource);
    this.setState(this.state);
  },

  _handlerSelectCurrency: function _handlerSelectCurrency(currency) {
    this.state.currency = currency;
  },

  _handlerLoad: function _handlerLoad(event) {
    event.target.focus();

    if (this._validateInput()) {
      var _refs$datesFragment$g = this.refs.datesFragment.getValues();

      var fromDate = _refs$datesFragment$g.fromDate;
      var toDate = _refs$datesFragment$g.toDate;
      var _state = this.state;
      var currencySource = _state.currencySource;
      var currency = _state.currency;

      var option = {
        value: currencySource.value + '/' + currency.value,
        source: currencySource,
        currency: currency,
        fromDate: fromDate,
        toDate: toDate
      };
      this.props.onLoad(option);
    }
    this.setState(this.state);
  },

  _validateInput: function _validateInput() {
    var result = true;
    this.state.validationMessages = [];

    if (!this.state.currencySource) {
      this.state.validationMessages.push("Source is Required to Select");
      result = false;
    }

    if (!this.state.currency) {
      this.state.validationMessages.push("Currency is Required to Select");
      result = false;
    }

    if (!this.refs.datesFragment.isValid()) {
      this.state.validationMessages.push("Some Date is not in Valid Format");
      result = false;
    }

    return result;
  },

  /*
   _handlerShowChart: function(){
     QuandlCurrencyActions.showChart();
   },
   */

  render: function render() {
    var commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load',
      onClick: this._handlerLoad
    })];

    var _props = this.props;
    var isShow = _props.isShow;
    var onShow = _props.onShow;
    var onClose = _props.onClose;


    return _react2.default.createElement(
      _ZhDialog2.default,
      {
        caption: 'Quandl Currency Histories',
        isShow: isShow,
        commandButtons: commandButtons,
        onShowChart: onShow,
        onClose: onClose
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
          options: this.state.optionCurrencySources
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
          options: this.state.optionCurrencies
        })
      ),
      _react2.default.createElement(_DatesFragment2.default, {
        key: '3',
        ref: 'datesFragment',
        initFromDate: this.props.initFromDate,
        initToDate: this.props.initToDate,
        onTestDate: this.props.onTestDate
      }),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        key: '4',
        validationMessages: this.state.validationMessages
      })
    );
  }
});

exports.default = QuandlCurrencyDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\QuandlCurrencyDialog.js.map