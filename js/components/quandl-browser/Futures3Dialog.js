'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _futures = require('../../flux/creaters/futures3');

var _futures2 = _interopRequireDefault(_futures);

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

var yearOptions = [{ caption: '2017', value: 2017 }, { caption: '2016', value: 2016 }, { caption: '2015', value: 2015 }, { caption: '2014', value: 2014 }, { caption: '2013', value: 2013 }, { caption: '2012', value: 2012 }];

var Futures3Dialog = _react2.default.createClass((0, _extends3.default)({
  displayName: 'Futures3Dialog'
}, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.year = undefined;
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
  _handlerSelectYear: function _handlerSelectYear(year) {
    this.year = year;
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

    var _itemMonth$getValidat = this.itemMonth.getValidation(),
        isValid1 = _itemMonth$getValidat.isValid,
        msg1 = _itemMonth$getValidat.msg;

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
    var _itemMonth$getValues = this.itemMonth.getValues(),
        item = _itemMonth$getValues.parent,
        month = _itemMonth$getValues.child,
        isContinious = this.props.isContinious,
        fromDate = isContinious ? this.fromDate.getValue() : undefined;
    /*
    , { fnValue, columnName, dataColumn, seriaColumnNames, loadId, isContinious } = this.props
    , _subtitle = (columnName)
          ? `${month.caption}:${this.year.caption}:${columnName}`
          : `${month.caption}:${this.year.caption}`
    , _fromDate = (isContinious)
          ? this.fromDate.getValue()
          : undefined  ;
    */

    return (0, _futures2.default)(this.props, { item: item, month: month, year: this.year, fromDate: fromDate });
    /*
    return {
       value : fnValue(item.value, month.value, this.year.value ),
       title : item.caption,
       subtitle : _subtitle,
       columnName : columnName,
       dataColumn : dataColumn,
       loadId : loadId,
       fromDate : _fromDate,
       seriaColumnNames : seriaColumnNames
    };*/
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
      _react2.default.createElement(_ValidationMessages2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = Futures3Dialog;
//# sourceMappingURL=Futures3Dialog.js.map