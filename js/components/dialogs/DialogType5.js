'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _WithToolbar = require('./WithToolbar');

var _WithToolbar2 = _interopRequireDefault(_WithToolbar);

var _WithValidation = require('./WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectWithLoad = require('./SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _SelectParentChild = require('./SelectParentChild');

var _SelectParentChild2 = _interopRequireDefault(_SelectParentChild);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogType5 = _react2.default.createClass(_extends({
  displayName: 'DialogType5'
}, _WithToolbar2.default, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.one = null;
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
  _handlerLoad: function _handlerLoad() {
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var oneCaption = this.props.oneCaption;

    var msg = [];

    if (!this.one) {
      msg.push(this.props.msgOnNotSelected(oneCaption));
    }

    var _parentChild$getValid = this.parentChild.getValidation();

    var isValid1 = _parentChild$getValid.isValid;
    var msg1 = _parentChild$getValid.msg;

    if (!isValid1) {
      msg = msg.concat(msg1);
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
    var _parentChild$getValue = this.parentChild.getValues();

    var two = _parentChild$getValue.parent;
    var three = _parentChild$getValue.child;

    var _datesFragment$getVal2 = this.datesFragment.getValues();

    var fromDate = _datesFragment$getVal2.fromDate;
    var toDate = _datesFragment$getVal2.toDate;
    var _props = this.props;
    var fnValue = _props.fnValue;
    var fnValueType = _props.fnValueType;
    var dataColumn = _props.dataColumn;
    var loadId = _props.loadId;


    switch (fnValueType) {
      case 'TreeItem':
        return {
          value: fnValue(this.one.value, three.value),
          fromDate: fromDate,
          toDate: toDate,
          dataColumn: dataColumn,
          loadId: loadId,
          title: this.one.caption + ':' + two.caption,
          subtitle: three.caption
        };
      case 'PlusTreeItem':
        return {
          value: fnValue(this.one.value, two.value, three.value),
          fromDate: fromDate,
          toDate: toDate,
          dataColumn: dataColumn,
          loadId: loadId,
          title: two.caption + ' : ' + three.caption,
          subtitle: this.one.caption
        };
      default:
        var _dataColumn = three ? three.value : 1;
        return {
          value: fnValue(this.one.value, two.value),
          fromDate: fromDate,
          toDate: toDate,
          dataColumn: _dataColumn,
          loadId: loadId,
          title: this.one.caption + ':' + two.caption,
          subtitle: three.caption
        };
    }
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var caption = _props2.caption;
    var isShow = _props2.isShow;
    var onShow = _props2.onShow;
    var oneCaption = _props2.oneCaption;
    var oneURI = _props2.oneURI;
    var oneJsonProp = _props2.oneJsonProp;
    var twoCaption = _props2.twoCaption;
    var twoURI = _props2.twoURI;
    var twoJsonProp = _props2.twoJsonProp;
    var threeCaption = _props2.threeCaption;
    var msgOnNotSelected = _props2.msgOnNotSelected;
    var initFromDate = _props2.initFromDate;
    var initToDate = _props2.initToDate;
    var msgOnNotValidFormat = _props2.msgOnNotValidFormat;
    var onTestDate = _props2.onTestDate;
    var _state = this.state;
    var isShowDate = _state.isShowDate;
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
      _react2.default.createElement(_SelectWithLoad2.default, {
        isShow: isShow,
        uri: oneURI,
        jsonProp: oneJsonProp,
        caption: oneCaption,
        optionNames: 'Items',
        onSelect: this._handlerSelectOne
      }),
      _react2.default.createElement(_SelectParentChild2.default, {
        ref: function ref(c) {
          return _this.parentChild = c;
        },
        isShow: isShow,
        uri: twoURI,
        parentCaption: twoCaption,
        parentOptionNames: 'Items',
        parentJsonProp: twoJsonProp,
        childCaption: threeCaption,
        msgOnNotSelected: msgOnNotSelected
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

exports.default = DialogType5;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DialogType5.js.map