'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectParentChild = require('../dialogs/SelectParentChild');

var _SelectParentChild2 = _interopRequireDefault(_SelectParentChild);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _RowDate = require('../dialogs/RowDate');

var _RowDate2 = _interopRequireDefault(_RowDate);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yearOptions = [{ caption: '2017', value: 2017 }, { caption: '2016', value: 2016 }, { caption: '2015', value: 2015 }, { caption: '2014', value: 2014 }, { caption: '2013', value: 2013 }, { caption: '2012', value: 2012 }];

var Futures3Dialog = _react2.default.createClass(_extends({
  displayName: 'Futures3Dialog'
}, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.year = null;

    this.toolbarButtons = [{ caption: 'I', onClick: this._handlerClickInfo }];

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
    var _props = this.props;
    var descrUrl = _props.descrUrl;
    var onClickInfo = _props.onClickInfo;

    onClickInfo({ descrUrl: descrUrl });
  },
  _handlerSelectYear: function _handlerSelectYear(year) {
    this.year = year;
  },
  _handlerLoad: function _handlerLoad() {
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var _props2 = this.props;
    var msgOnNotSelected = _props2.msgOnNotSelected;
    var msgOnNotValidFormat = _props2.msgOnNotValidFormat;
    var isContinious = _props2.isContinious;

    var msg = [];

    var _itemMonth$getValidat = this.itemMonth.getValidation();

    var isValid1 = _itemMonth$getValidat.isValid;
    var msg1 = _itemMonth$getValidat.msg;

    if (!isValid1) {
      msg = msg.concat(msg1);
    }

    if (!this.year) {
      msg.push(msgOnNotSelected('Year'));
    }

    if (isContinious && !this.fromDate.isValid()) {
      msg.push(msgOnNotValidFormat('From Date'));
    }

    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _createLoadOption: function _createLoadOption() {
    var _itemMonth$getValues = this.itemMonth.getValues();

    var item = _itemMonth$getValues.parent;
    var month = _itemMonth$getValues.child;
    var _props3 = this.props;
    var fnValue = _props3.fnValue;
    var columnName = _props3.columnName;
    var dataColumn = _props3.dataColumn;
    var loadId = _props3.loadId;
    var isContinious = _props3.isContinious;
    var _subtitle = columnName ? month.caption + ':' + this.year.caption + ':' + columnName : month.caption + ':' + this.year.caption;
    var _fromDate = isContinious ? this.fromDate.getValue() : undefined;
    return {
      value: fnValue(item.value, month.value, this.year.value),
      title: item.caption,
      subtitle: _subtitle,
      columnName: columnName,
      dataColumn: dataColumn,
      loadId: loadId,
      fromDate: _fromDate
    };
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  _renderFromDate: function _renderFromDate(initFromDate, onTestDate, msgTestDate) {
    var _this = this;

    return _react2.default.createElement(_RowDate2.default, {
      ref: function ref(c) {
        return _this.fromDate = c;
      },
      labelTitle: 'From Date:',
      initValue: initFromDate,
      errorMsg: msgTestDate,
      onTestDate: onTestDate
    });
  },
  render: function render() {
    var _this2 = this;

    var _props4 = this.props;
    var isShow = _props4.isShow;
    var caption = _props4.caption;
    var onShow = _props4.onShow;
    var futuresURI = _props4.futuresURI;
    var msgOnNotSelected = _props4.msgOnNotSelected;
    var isContinious = _props4.isContinious;
    var initFromDate = _props4.initFromDate;
    var onTestDateOrEmpty = _props4.onTestDateOrEmpty;
    var msgTestDateOrEmpty = _props4.msgTestDateOrEmpty;
    var validationMessages = this.state.validationMessages;
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
      _react2.default.createElement(_SelectParentChild2.default, {
        ref: function ref(c) {
          return _this2.itemMonth = c;
        },
        isShow: isShow,
        uri: futuresURI,
        parentCaption: 'Futures',
        parentOptionNames: 'Futures',
        parentJsonProp: 'futures',
        childCaption: 'Month',
        msgOnNotSelected: msgOnNotSelected
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Year',
        options: yearOptions,
        onSelect: this._handlerSelectYear
      }),
      isContinious && this._renderFromDate(initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = Futures3Dialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\Futures3Dialog.js.map