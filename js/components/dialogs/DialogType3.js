'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _type = require('../../flux/creaters/type3');

var _type2 = _interopRequireDefault(_type);

var _WithValidation = require('./WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectWithLoad = require('./SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogType3 = _react2.default.createClass(_extends({}, _WithValidation2.default, {

  displayName: 'DialogType3',

  getInitialState: function getInitialState() {
    this.stock = undefined;
    this.toolbarButtons = this.props.descrUrl ? [{ caption: 'I', onClick: this._handlerClickInfo }] : [];

    return {
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
  _handlerClickInfo: function _handlerClickInfo() {
    var _props = this.props,
        descrUrl = _props.descrUrl,
        onClickInfo = _props.onClickInfo;

    onClickInfo({ descrUrl: descrUrl });
  },
  _handlerSelectStock: function _handlerSelectStock(stock) {
    this.stock = stock;
  },
  _handlerLoad: function _handlerLoad(event) {
    event.target.focus();
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var _props$itemCaption = this.props.itemCaption,
        itemCaption = _props$itemCaption === undefined ? 'Stock' : _props$itemCaption;

    var msg = [];
    if (!this.stock) {
      msg.push(this.props.msgOnNotSelected(itemCaption));
    }

    var _datesFragment$getVal = this.datesFragment.getValidation(),
        isValid = _datesFragment$getVal.isValid,
        datesMsg = _datesFragment$getVal.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _createLoadOption: function _createLoadOption() {
    var _datesFragment$getVal2 = this.datesFragment.getValues(),
        fromDate = _datesFragment$getVal2.fromDate,
        toDate = _datesFragment$getVal2.toDate;

    return (0, _type2.default)(this.props, { stock: this.stock, fromDate: fromDate, toDate: toDate });
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props,
        caption = _props2.caption,
        isShow = _props2.isShow,
        onShow = _props2.onShow,
        optionURI = _props2.optionURI,
        optionsJsonProp = _props2.optionsJsonProp,
        _props2$itemCaption = _props2.itemCaption,
        itemCaption = _props2$itemCaption === undefined ? 'Stock:' : _props2$itemCaption,
        _props2$optionNames = _props2.optionNames,
        optionNames = _props2$optionNames === undefined ? 'Stocks' : _props2$optionNames,
        initFromDate = _props2.initFromDate,
        initToDate = _props2.initToDate,
        msgOnNotValidFormat = _props2.msgOnNotValidFormat,
        onTestDate = _props2.onTestDate,
        validationMessages = this.state.validationMessages,
        _commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
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
      _react2.default.createElement(_SelectWithLoad2.default, {
        isShow: isShow,
        uri: optionURI,
        jsonProp: optionsJsonProp,
        caption: itemCaption,
        optionNames: optionNames,
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