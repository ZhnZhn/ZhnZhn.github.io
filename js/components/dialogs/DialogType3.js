'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithValidation = require('./WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _WithLoadOptions = require('./WithLoadOptions');

var _WithLoadOptions2 = _interopRequireDefault(_WithLoadOptions);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogType3 = _react2.default.createClass(_extends({}, _WithValidation2.default, _WithLoadOptions2.default, {

  displayName: 'DialogType3',

  getInitialState: function getInitialState() {
    this.stock = null;
    this.OPTIONS_STATE_PROP = 'optionStocks';
    var _props = this.props;
    var optionURI = _props.optionURI;
    var optionStocks = _props.optionStocks;
    var descrUrl = _props.descrUrl;
    var _isLoading = optionURI ? true : false;
    var _optionStocks = optionURI ? [] : optionStocks;

    this.toolbarButtons = descrUrl ? [{ caption: 'I', onClick: this._handlerClickInfo }] : [];

    return {
      isLoading: _isLoading,
      isLoadingFailed: false,
      optionStocks: _optionStocks,
      validationMessages: []
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.optionURI) {
      this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
    }
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
      if (this.state.isLoadingFailed && this.props.optionURI && this.props.isShow) {
        this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
      }
    }
  },
  componetWillUnmount: function componetWillUnmount() {
    this._unmountWithLoadOptions();
  },
  _handlerClickInfo: function _handlerClickInfo() {
    var _props2 = this.props;
    var descrUrl = _props2.descrUrl;
    var onClickInfo = _props2.onClickInfo;

    onClickInfo({ descrUrl: descrUrl });
  },
  _handlerLoadOptions: function _handlerLoadOptions() {
    this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
  },
  _handlerSelectStock: function _handlerSelectStock(stock) {
    this.stock = stock;
  },
  _handlerLoad: function _handlerLoad(event) {
    event.target.focus();
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var _props$itemCaption = this.props.itemCaption;
    var itemCaption = _props$itemCaption === undefined ? 'Stock' : _props$itemCaption;

    var msg = [];
    if (!this.stock) {
      msg.push(this.props.msgOnNotSelected(itemCaption));
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
    var _props3 = this.props;
    var dataColumn = _props3.dataColumn;
    var fnItemCaption = _props3.fnItemCaption;
    var _itemCaption = typeof fnItemCaption === 'function' ? fnItemCaption(this.stock.value) : undefined;
    return {
      value: this.stock.value,
      stock: this.stock,
      fromDate: fromDate,
      toDate: toDate,
      dataColumn: dataColumn,
      itemCaption: _itemCaption
    };
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _this = this;

    var _props4 = this.props;
    var caption = _props4.caption;
    var isShow = _props4.isShow;
    var onShow = _props4.onShow;
    var onClose = _props4.onClose;
    var _props4$itemCaption = _props4.itemCaption;
    var itemCaption = _props4$itemCaption === undefined ? 'Stock:' : _props4$itemCaption;
    var _props4$optionNames = _props4.optionNames;
    var optionNames = _props4$optionNames === undefined ? 'Stocks' : _props4$optionNames;
    var initFromDate = _props4.initFromDate;
    var initToDate = _props4.initToDate;
    var msgOnNotValidFormat = _props4.msgOnNotValidFormat;
    var onTestDate = _props4.onTestDate;
    var _state = this.state;
    var isLoading = _state.isLoading;
    var isLoadingFailed = _state.isLoadingFailed;
    var optionStocks = _state.optionStocks;
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
        caption: caption,
        isShow: isShow,
        commandButtons: _commandButtons,
        onShowChart: onShow,
        onClose: this._handlerClose
      },
      _react2.default.createElement(_ToolbarButtonCircle2.default, {
        buttons: this.toolbarButtons
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: itemCaption,
        options: optionStocks,
        optionNames: optionNames,
        isLoading: isLoading,
        isLoadingFailed: isLoadingFailed,
        onLoadOption: this._handlerLoadOptions,
        onSelect: this._handlerSelectStock
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

exports.default = DialogType3;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DialogType3.js.map