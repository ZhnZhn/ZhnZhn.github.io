'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _type = require('../../flux/creaters/type4');

var _type2 = _interopRequireDefault(_type);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _WithToolbar = require('./WithToolbar');

var _WithToolbar2 = _interopRequireDefault(_WithToolbar);

var _WithValidation = require('./WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _SelectWithLoad = require('./SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogType4 = _react2.default.createClass(_extends({
  displayName: 'DialogType4'
}, _WithToolbar2.default, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.one = undefined;
    this.two = undefined;
    this.toolbarButtons = this._createType2WithToolbar();
    return {
      isShowDate: true,
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
  _handlerSelectOne: function _handlerSelectOne(one) {
    this.one = one;
  },
  _handlerSelectTwo: function _handlerSelectTwo(two) {
    this.two = two;
  },
  _handlerLoad: function _handlerLoad() {
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var _props = this.props,
        oneCaption = _props.oneCaption,
        twoCaption = _props.twoCaption,
        msgOnNotSelected = _props.msgOnNotSelected;

    var msg = [];

    if (!this.one) {
      msg.push(msgOnNotSelected(oneCaption));
    }
    if (!this.two) {
      msg.push(msgOnNotSelected(twoCaption));
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

    return (0, _type2.default)(this.props, { one: this.one, two: this.two, fromDate: fromDate, toDate: toDate });
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
        oneCaption = _props2.oneCaption,
        oneURI = _props2.oneURI,
        oneJsonProp = _props2.oneJsonProp,
        twoCaption = _props2.twoCaption,
        twoURI = _props2.twoURI,
        twoJsonProp = _props2.twoJsonProp,
        initFromDate = _props2.initFromDate,
        initToDate = _props2.initToDate,
        msgOnNotValidFormat = _props2.msgOnNotValidFormat,
        onTestDate = _props2.onTestDate,
        _state = this.state,
        isShowDate = _state.isShowDate,
        validationMessages = _state.validationMessages,
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
        uri: oneURI,
        jsonProp: oneJsonProp,
        caption: oneCaption,
        optionNames: 'Stocks',
        onSelect: this._handlerSelectOne
      }),
      _react2.default.createElement(_SelectWithLoad2.default, {
        isShow: isShow,
        uri: twoURI,
        jsonProp: twoJsonProp,
        caption: twoCaption,
        optionNames: 'Indicators',
        onSelect: this._handlerSelectTwo
      }),
      _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isShowDate },
        _react2.default.createElement(_DatesFragment2.default, {
          ref: function ref(c) {
            return _this.datesFragment = c;
          },
          initFromDate: initFromDate,
          initToDate: initToDate,
          msgOnNotValidFormat: msgOnNotValidFormat,
          onTestDate: onTestDate
        })
      ),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = DialogType4;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DialogType4.js.map