'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _futuresWiki = require('../../flux/creaters/futuresWiki');

var _futuresWiki2 = _interopRequireDefault(_futuresWiki);

var _DraggableDialog = require('../zhn-moleculs/DraggableDialog');

var _DraggableDialog2 = _interopRequireDefault(_DraggableDialog);

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

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeOptions = [{ caption: 'Continuous Contract #1', value: 1 }, { caption: 'Continuous Contract #2', value: 2 }, { caption: 'Continuous Contract #3', value: 3 }, { caption: 'Continuous Contract #4', value: 4 }, { caption: 'Continuous Contract #5', value: 5 }];

var Futures3Dialog = _react2.default.createClass(_extends({
  displayName: 'Futures3Dialog'
}, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.type = undefined;
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
    var _props = this.props,
        descrUrl = _props.descrUrl,
        onClickInfo = _props.onClickInfo;

    onClickInfo({ descrUrl: descrUrl });
  },
  _handlerSelectType: function _handlerSelectType(type) {
    this.type = type;
  },
  _handlerLoad: function _handlerLoad() {
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var _props2 = this.props,
        msgOnNotSelected = _props2.msgOnNotSelected,
        msgOnNotValidFormat = _props2.msgOnNotValidFormat,
        isContinious = _props2.isContinious;

    var msg = [];

    var _exchangeItem$getVali = this.exchangeItem.getValidation(),
        isValid1 = _exchangeItem$getVali.isValid,
        msg1 = _exchangeItem$getVali.msg;

    if (!isValid1) {
      msg = msg.concat(msg1);
    }

    if (!this.type) {
      msg.push(msgOnNotSelected('Type'));
    }

    if (isContinious && !this.fromDate.isValid()) {
      msg.push(msgOnNotValidFormat('From Date'));
    }

    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _createLoadOption: function _createLoadOption() {
    var _exchangeItem$getValu = this.exchangeItem.getValues(),
        exchange = _exchangeItem$getValu.parent,
        item = _exchangeItem$getValu.child,
        isContinious = this.props.isContinious,
        fromDate = isContinious ? this.fromDate.getValue() : undefined;

    return (0, _futuresWiki2.default)(this.props, { exchange: exchange, item: item, type: this.type, fromDate: fromDate });
    /*
    return {
       value : fnValue(exchange.value, item.value, this.type.value ),
       title : `${exchange.caption}:${item.caption}`,
       subtitle : _subtitle,
       columnName : columnName,
       seriaColumnNames: seriaColumnNames,
       dataColumn : dataColumn,
       loadId : loadId,
       fromDate : _fromDate
    };
    */
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

    var _props3 = this.props,
        isShow = _props3.isShow,
        caption = _props3.caption,
        onShow = _props3.onShow,
        futuresURI = _props3.futuresURI,
        msgOnNotSelected = _props3.msgOnNotSelected,
        isContinious = _props3.isContinious,
        initFromDate = _props3.initFromDate,
        onTestDateOrEmpty = _props3.onTestDateOrEmpty,
        msgTestDateOrEmpty = _props3.msgTestDateOrEmpty,
        validationMessages = this.state.validationMessages,
        _commandButtons = [_react2.default.createElement(_ActionButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load',
      onClick: this._handlerLoad
    })];


    return _react2.default.createElement(
      _DraggableDialog2.default,
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
          return _this2.exchangeItem = c;
        },
        isShow: isShow,
        uri: futuresURI,
        parentCaption: 'Exchange',
        parentOptionNames: 'Exchanges',
        parentJsonProp: 'futures',
        childCaption: 'Asset',
        msgOnNotSelected: msgOnNotSelected
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Type',
        options: typeOptions,
        onSelect: this._handlerSelectType
      }),
      isContinious && this._renderFromDate(initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty),
      _react2.default.createElement(_ValidationMessages2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = Futures3Dialog;
//# sourceMappingURL=FuturesWikiDialog.js.map