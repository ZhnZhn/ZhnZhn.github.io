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

var _WithToolbar = require('../dialogs/WithToolbar');

var _WithToolbar2 = _interopRequireDefault(_WithToolbar);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _SelectParentChild = require('../dialogs/SelectParentChild');

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

var unitOptions = [{ "caption": "Thousand Barrels per day (kb/d)", "value": "KD" }, { "caption": "Thousand Barrels (kbbl)", "value": "KB" }, { "caption": "Thousand Kilolitres (kl)", "value": "KL" }, { "caption": "Thousand Metric Tons (kmt)", "value": "KT" }, { "caption": "Conversion factor barrels/ktons", "value": "BK" }];

var JodiWorldOilDialog = _react2.default.createClass(_extends({
  displayName: 'JodiWorldOilDialog'
}, _WithLoadOptions2.default, _WithToolbar2.default, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.country = null;
    this.product = null;
    this.flow = null;
    this.units = null;

    this.toolbarButtons = this._createType2WithToolbar();
    return {
      isShowDate: true,

      isLoadingOne: false,
      isLoadingOneFailed: false,
      optionOne: [],

      validationMessages: []
    };
  },
  componentDidMount: function componentDidMount() {
    this._handlerLoadOne();
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
      if (this.state.isLoadingOneFailed && this.props.isShow) {
        this._handlerLoadOne();
      }
    }
  },
  componetWillUnmount: function componetWillUnmount() {
    this._unmountWithLoadOptions();
  },
  _handlerLoadOne: function _handlerLoadOne() {
    var _props = this.props;
    var oneURI = _props.oneURI;
    var oneJsonProp = _props.oneJsonProp;

    this._handlerWithLoadOptions('optionOne', 'isLoadingOne', 'isLoadingOneFailed', oneURI, oneJsonProp);
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

    var _productFlow$getValid = this.productFlow.getValidation();

    var isValid1 = _productFlow$getValid.isValid;
    var msg1 = _productFlow$getValid.msg;

    if (!isValid1) {
      msg = msg.concat(msg1);
    }

    if (!this.units) {
      this.units = unitOptions[0];
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
    var _productFlow$getValue = this.productFlow.getValues();

    var product = _productFlow$getValue.parent;
    var flow = _productFlow$getValue.child;

    var _datesFragment$getVal2 = this.datesFragment.getValues();

    var fromDate = _datesFragment$getVal2.fromDate;
    var toDate = _datesFragment$getVal2.toDate;
    var _props2 = this.props;
    var fnValue = _props2.fnValue;
    var dataColumn = _props2.dataColumn;
    var loadId = _props2.loadId;

    return {
      value: fnValue(this.country.value, product.value, flow.value, this.units.value),
      fromDate: fromDate,
      toDate: toDate,
      dataColumn: dataColumn,
      loadId: loadId,
      title: this.country.caption + ':' + product.caption,
      subtitle: flow.caption + ':' + this.units.caption
    };
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _this = this;

    var _props3 = this.props;
    var caption = _props3.caption;
    var isShow = _props3.isShow;
    var onShow = _props3.onShow;
    var oneCaption = _props3.oneCaption;
    var parentCaption = _props3.parentCaption;
    var parentChildURI = _props3.parentChildURI;
    var parentJsonProp = _props3.parentJsonProp;
    var childCaption = _props3.childCaption;
    var msgOnNotSelected = _props3.msgOnNotSelected;
    var initFromDate = _props3.initFromDate;
    var initToDate = _props3.initToDate;
    var msgOnNotValidFormat = _props3.msgOnNotValidFormat;
    var onTestDate = _props3.onTestDate;
    var _state = this.state;
    var isLoadingOne = _state.isLoadingOne;
    var isLoadingOneFailed = _state.isLoadingOneFailed;
    var optionOne = _state.optionOne;
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
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: oneCaption,
        options: optionOne,
        optionNames: 'Items',
        isLoading: isLoadingOne,
        isLoadingFailed: isLoadingOneFailed,
        onLoadOption: this._handlerLoadOne,
        onSelect: this._handlerSelectCountry
      }),
      _react2.default.createElement(_SelectParentChild2.default, {
        ref: function ref(c) {
          return _this.productFlow = c;
        },
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
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = JodiWorldOilDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\JodiWorldOilDialog.js.map