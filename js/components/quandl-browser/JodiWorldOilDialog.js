'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DraggableDialog = require('../zhn-moleculs/DraggableDialog');

var _DraggableDialog2 = _interopRequireDefault(_DraggableDialog);

var _WithToolbar = require('../dialogs/WithToolbar');

var _WithToolbar2 = _interopRequireDefault(_WithToolbar);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectWithLoad = require('../dialogs/SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _SelectParentChild = require('../dialogs/SelectParentChild');

var _SelectParentChild2 = _interopRequireDefault(_SelectParentChild);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _DatesFragment = require('../zhn-moleculs/DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unitOptions = [{ "caption": "Thousand Barrels per day (kb/d)", "value": "KD" }, { "caption": "Thousand Barrels (kbbl)", "value": "KB" }, { "caption": "Thousand Kilolitres (kl)", "value": "KL" }, { "caption": "Thousand Metric Tons (kmt)", "value": "KT" }, { "caption": "Conversion factor barrels/ktons", "value": "BK" }];

var JodiWorldOilDialog = _react2.default.createClass((0, _extends3.default)({
  displayName: 'JodiWorldOilDialog'
}, _WithToolbar2.default, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.country = null;
    this.product = null;
    this.flow = null;
    this.units = null;

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
  _handlerSelectCountry: function _handlerSelectCountry(country) {
    this.country = country;
  },
  _handlerSelectUnits: function _handlerSelectUnits(units) {
    this.units = units;
  },
  _handlerLoad: function _handlerLoad() {
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var msgOnNotSelected = this.props.msgOnNotSelected;

    var msg = [];

    if (!this.country) {
      msg.push(msgOnNotSelected('Country'));
    }

    var _productFlow$getValid = this.productFlow.getValidation(),
        isValid1 = _productFlow$getValid.isValid,
        msg1 = _productFlow$getValid.msg;

    if (!isValid1) {
      msg = msg.concat(msg1);
    }

    if (!this.units) {
      this.units = unitOptions[0];
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
    var _productFlow$getValue = this.productFlow.getValues(),
        product = _productFlow$getValue.parent,
        flow = _productFlow$getValue.child,
        _datesFragment$getVal2 = this.datesFragment.getValues(),
        fromDate = _datesFragment$getVal2.fromDate,
        toDate = _datesFragment$getVal2.toDate,
        _props = this.props,
        fnValue = _props.fnValue,
        dataColumn = _props.dataColumn,
        loadId = _props.loadId,
        dataSource = _props.dataSource;

    return {
      value: fnValue(this.country.value, product.value, flow.value, this.units.value),
      fromDate: fromDate,
      toDate: toDate,
      dataColumn: dataColumn,
      loadId: loadId,
      title: this.country.caption + ':' + product.caption,
      subtitle: flow.caption + ':' + this.units.caption,
      dataSource: dataSource
    };
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
        parentCaption = _props2.parentCaption,
        parentChildURI = _props2.parentChildURI,
        parentJsonProp = _props2.parentJsonProp,
        childCaption = _props2.childCaption,
        msgOnNotSelected = _props2.msgOnNotSelected,
        initFromDate = _props2.initFromDate,
        initToDate = _props2.initToDate,
        msgOnNotValidFormat = _props2.msgOnNotValidFormat,
        onTestDate = _props2.onTestDate,
        _state = this.state,
        isShowDate = _state.isShowDate,
        validationMessages = _state.validationMessages,
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
      _react2.default.createElement(_SelectWithLoad2.default, {
        isShow: isShow,
        uri: oneURI,
        jsonProp: oneJsonProp,
        caption: oneCaption,
        optionNames: 'Items',
        onSelect: this._handlerSelectCountry
      }),
      _react2.default.createElement(_SelectParentChild2.default, {
        ref: function ref(c) {
          return _this.productFlow = c;
        },
        isShow: isShow,
        uri: parentChildURI,
        parentCaption: parentCaption,
        parentOptionNames: 'Items',
        parentJsonProp: parentJsonProp,
        childCaption: childCaption,
        msgOnNotSelected: msgOnNotSelected
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Units',
        options: unitOptions,
        onSelect: this._handlerSelectUnits
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
      _react2.default.createElement(_ValidationMessages2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = JodiWorldOilDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\JodiWorldOilDialog.js.map