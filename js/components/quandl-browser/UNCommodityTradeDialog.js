'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _WithLoadOptions = require('../dialogs/WithLoadOptions');

var _WithLoadOptions2 = _interopRequireDefault(_WithLoadOptions);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var UNCommodityTradeDialog = _react2.default.createClass(_extends({
  displayName: 'UNCommodityTradeDialog'
}, _WithLoadOptions2.default, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.nation = null;
    this.commodity = null;
    this.trade = null;

    return {
      isLoadingCountries: false,
      isLoadingCountriesFailed: false,
      optionCountries: [],

      isLoadingCommodities: false,
      isLoadingCommoditiesFailed: false,
      optionCommodities: [],

      optionTrades: [{ caption: 'Import', value: 1 }, { caption: 'Export', value: 3 }],

      validationMessages: []
    };
  },
  componentDidMount: function componentDidMount() {
    this._handlerLoadNation();
    this._handlerLoadCommodity();
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }
    return true;
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.state.isLoadingCountriesFailed && this.props.isShow) {
        this._handlerLoadNation();
      }
      if (this.state.isLoadingCommoditiesFailed && this.props.isShow) {
        this._handlerLoadCommodity();
      }
    }
  },
  componetWillUnmount: function componetWillUnmount() {
    this._unmountWithLoadOptions();
  },
  _handlerLoadNation: function _handlerLoadNation() {
    var _props = this.props;
    var countryURI = _props.countryURI;
    var countryJsonProp = _props.countryJsonProp;

    this._handlerWithLoadOptions('optionCountries', 'isLoadingCountries', 'isLoadingCountriesFailed', countryURI, countryJsonProp);
  },
  _handlerLoadCommodity: function _handlerLoadCommodity() {
    var _props2 = this.props;
    var commodityURI = _props2.commodityURI;
    var commodityJsonProp = _props2.commodityJsonProp;

    this._handlerWithLoadOptions('optionCommodities', 'isLoadingCommodities', 'isLoadingCommoditiesFailed', commodityURI, commodityJsonProp);
  },
  _handlerSelectNation: function _handlerSelectNation(nation) {
    this.nation = nation;
  },
  _handlerSelectCommodity: function _handlerSelectCommodity(commodity) {
    this.commodity = commodity;
  },
  _handlerSelectTrade: function _handlerSelectTrade(trade) {
    this.trade = trade;
  },
  _handlerLoad: function _handlerLoad() {
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var msg = [];
    if (!this.nation) {
      msg.push(this.props.msgOnNotSelected('Nation'));
    }
    if (!this.commodity) {
      msg.push(this.props.msgOnNotSelected('Commodity'));
    }

    var _datesFragment$getVal = this.datesFragment.getValidation();

    var isValid = _datesFragment$getVal.isValid;
    var datesMsg = _datesFragment$getVal.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _createLoadOption: function _createLoadOption() {
    var _datesFragment$getVal2 = this.datesFragment.getValues();

    var fromDate = _datesFragment$getVal2.fromDate;
    var toDate = _datesFragment$getVal2.toDate;
    var _dataColumn = this.trade ? this.trade.value : this.props.dataColumn;
    var fnValue = this.props.fnValue;

    return {
      value: fnValue(this.commodity.value, this.nation.value),
      fromDate: fromDate,
      toDate: toDate,
      dataColumn: _dataColumn
    };
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _this = this;

    var _props3 = this.props;
    var isShow = _props3.isShow;
    var onShow = _props3.onShow;
    var onClose = _props3.onClose;
    var initFromDate = _props3.initFromDate;
    var initToDate = _props3.initToDate;
    var msgOnNotValidFormat = _props3.msgOnNotValidFormat;
    var onTestDate = _props3.onTestDate;
    var _state = this.state;
    var optionCountries = _state.optionCountries;
    var isLoadingCountries = _state.isLoadingCountries;
    var isLoadingCountriesFailed = _state.isLoadingCountriesFailed;
    var optionCommodities = _state.optionCommodities;
    var isLoadingCommodities = _state.isLoadingCommodities;
    var isLoadingCommoditiesFailed = _state.isLoadingCommoditiesFailed;
    var optionTrades = _state.optionTrades;
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
        caption: 'United Nations Commodity Trade',
        isShow: isShow,
        commandButtons: _commandButtons,
        onShowChart: onShow,
        onClose: this._handlerClose
      },
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Country:',
        options: optionCountries,
        optionNames: 'Countries',
        isLoading: isLoadingCountries,
        isLoadingFailed: isLoadingCountriesFailed,
        onLoadOption: this._handlerLoadNation,
        onSelect: this._handlerSelectNation
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Commodity:',
        options: optionCommodities,
        optionNames: 'Commodities',
        isLoading: isLoadingCommodities,
        isLoadingFailed: isLoadingCommoditiesFailed,
        onLoadOption: this._handlerLoadCommodity,
        onSelect: this._handlerSelectCommodity
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Trade:',
        options: optionTrades,
        onSelect: this._handlerSelectTrade
      }),
      _react2.default.createElement(_DatesFragment2.default, {
        ref: function ref(c) {
          return _this.datesFragment = c;
        },
        initFromDate: initFromDate,
        initToDate: initToDate,
        msgOnNotValidFormat: msgOnNotValidFormat,
        onTestDate: onTestDate
      }),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = UNCommodityTradeDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\UNCommodityTradeDialog.js.map