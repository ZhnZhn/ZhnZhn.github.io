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
    var msgOnNotSelected = this.props.msgOnNotSelected;

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

    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _createLoadOption: function _createLoadOption() {
    var _itemMonth$getValues = this.itemMonth.getValues();

    var item = _itemMonth$getValues.parent;
    var month = _itemMonth$getValues.child;
    var _props2 = this.props;
    var fnValue = _props2.fnValue;
    var columnName = _props2.columnName;
    var dataColumn = _props2.dataColumn;
    var loadId = _props2.loadId;
    var _subtitle = columnName ? month.caption + ':' + this.year.caption + ':' + columnName : month.caption + ':' + this.year.caption;
    return {
      value: fnValue(item.value, month.value, this.year.value),
      title: item.caption,
      subtitle: _subtitle,
      columnName: columnName,
      dataColumn: dataColumn,
      loadId: loadId
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
    var caption = _props3.caption;
    var onShow = _props3.onShow;
    var futuresURI = _props3.futuresURI;
    var msgOnNotSelected = _props3.msgOnNotSelected;
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
          return _this.itemMonth = c;
        },
        isShow: isShow,
        uri: futuresURI,
        parentCaption: 'Commodity',
        parentOptionNames: 'Commodities',
        parentJsonProp: 'futures',
        childCaption: 'Month',
        msgOnNotSelected: msgOnNotSelected
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Year',
        options: yearOptions,
        onSelect: this._handlerSelectYear
      }),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = Futures3Dialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\Futures3Dialog.js.map