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

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BigMacDialog = _react2.default.createClass(_extends({
  displayName: 'BigMacDialog'
}, _WithLoadOptions2.default, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.country = null;
    this.metric = null;
    this.toolbarButtons = [{ caption: 'I', onClick: this._handlerClickInfo }, { caption: 'D', onClick: this._handlerClickDate }];
    return {
      isShowDate: true,
      isLoadingCountries: false,
      isLoadingCountriesFailed: false,
      optionCountries: [],
      optionMetrics: [{ caption: 'Local Price', value: 1 }, { caption: 'Dollar Exchange', value: 2 }, { caption: 'Dollar Price', value: 3 }, { caption: 'Dollar PPP', value: 4 }, { caption: 'Dollar Valuation', value: 5 }],

      validationMessages: []
    };
  },
  componentDidMount: function componentDidMount() {
    this._handlerLoadCountry();
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
      if (this.state.isLoadingCountriesFailed && this.props.isShow) {
        this._handlerLoadCountry();
      }
    }
  },
  componetWillUnmount: function componetWillUnmount() {
    this._unmountWithLoadOptions();
  },
  _handlerClickInfo: function _handlerClickInfo() {
    var _props = this.props;
    var descrUrl = _props.descrUrl;
    var onClickInfo = _props.onClickInfo;

    onClickInfo({ descrUrl: descrUrl });
  },
  _handlerClickDate: function _handlerClickDate() {
    this.setState({ isShowDate: !this.state.isShowDate });
  },
  _handlerLoadCountry: function _handlerLoadCountry() {
    var _props2 = this.props;
    var countryURI = _props2.countryURI;
    var countryJsonProp = _props2.countryJsonProp;

    this._handlerWithLoadOptions('optionCountries', 'isLoadingCountries', 'isLoadingCountriesFailed', countryURI, countryJsonProp);
  },
  _handlerSelectCountry: function _handlerSelectCountry(country) {
    this.country = country;
  },
  _handlerSelectMetric: function _handlerSelectMetric(metric) {
    this.metric = metric;
  },
  _handlerLoad: function _handlerLoad() {
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var msg = [];
    if (!this.country) {
      msg.push(this.props.msgOnNotSelected('Country'));
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
    var _dataColumn = this.metric ? this.metric.value : 1;
    var fnValue = this.props.fnValue;

    return {
      value: fnValue(this.country.value),
      fromDate: fromDate,
      toDate: toDate,
      dataColumn: _dataColumn,
      itemCaption: this.country.caption
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
    var onShow = _props3.onShow;
    var onClose = _props3.onClose;
    var initFromDate = _props3.initFromDate;
    var initToDate = _props3.initToDate;
    var msgOnNotValidFormat = _props3.msgOnNotValidFormat;
    var onTestDate = _props3.onTestDate;
    var _state = this.state;
    var isShowDate = _state.isShowDate;
    var optionCountries = _state.optionCountries;
    var isLoadingCountries = _state.isLoadingCountries;
    var isLoadingCountriesFailed = _state.isLoadingCountriesFailed;
    var optionMetrics = _state.optionMetrics;
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
        caption: 'Economist Big Mac Index',
        isShow: isShow,
        commandButtons: _commandButtons,
        onShowChart: onShow,
        onClose: this._handlerClose
      },
      _react2.default.createElement(_ToolbarButtonCircle2.default, {
        buttons: this.toolbarButtons
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Country:',
        options: optionCountries,
        optionNames: 'Countries',
        isLoading: isLoadingCountries,
        isLoadingFailed: isLoadingCountriesFailed,
        onLoadOption: this._handlerLoadCountry,
        onSelect: this._handlerSelectCountry
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Metric:',
        options: optionMetrics,
        onSelect: this._handlerSelectMetric
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

exports.default = BigMacDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\BigMacDialog.js.map