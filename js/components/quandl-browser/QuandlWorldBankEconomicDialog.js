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

var QuandlWorldBankEconomicDialog = _react2.default.createClass(_extends({
  displayName: 'QuandlWorldBankEconomicDialog'
}, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    return {
      optionCountries: _ISO3Country2.default.getCountries(),
      optionMetrics: _QuandlWorldBankEconomic2.default.getMetrics(),
      itemCountry: null,
      itemMetric: null,
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
  _handlerSelectCountry: function _handlerSelectCountry(itemCountry) {
    this.state.itemCountry = itemCountry;
  },
  _handlerSelectMetric: function _handlerSelectMetric(itemMetric) {
    this.state.itemMetric = itemMetric;
  },
  _handlerLoad: function _handlerLoad(event) {
    event.target.focus();
    var validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      var _refs$datesFragment$g = this.refs.datesFragment.getValues();

      var fromDate = _refs$datesFragment$g.fromDate;
      var toDate = _refs$datesFragment$g.toDate;
      var _state = this.state;
      var itemCountry = _state.itemCountry;
      var itemMetric = _state.itemMetric;

      var option = {
        value: 'WWDI/' + itemCountry.value + '_' + itemMetric.value,
        country: itemCountry,
        metric: itemMetric,
        fromDate: fromDate,
        toDate: toDate
      };
      this.props.onLoad(option);
    }
    this._updateValidationMessages(validationMessages);
  },
  _getValidationMessages: function _getValidationMessages() {
    var validationMessages = [];
    if (!this.state.itemCountry) {
      validationMessages.push("Country is Required to Select");
    }
    if (!this.state.itemMetric) {
      validationMessages.push("Metric is Required to Select");
    }
    if (!this.refs.datesFragment.isValid()) {
      validationMessages.push("Some Date is not in Valid Format");
    }
    validationMessages.isValid = validationMessages.length === 0 ? true : false;

    return validationMessages;
  },
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
        caption: 'World Bank Economic',
        isShow: isShow,
        commandButtons: commandButtons,
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
          options: this.state.optionCountries
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
          options: this.state.optionMetrics
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
}));

exports.default = QuandlWorldBankEconomicDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\QuandlWorldBankEconomicDialog.js.map