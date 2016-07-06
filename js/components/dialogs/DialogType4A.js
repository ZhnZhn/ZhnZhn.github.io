'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _WithLoadOptions = require('./WithLoadOptions');

var _WithLoadOptions2 = _interopRequireDefault(_WithLoadOptions);

var _WithValidation = require('./WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultColumns = [];

var DialogType4A = _react2.default.createClass(_extends({
  displayName: 'DialogType4A'
}, _WithLoadOptions2.default, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.one = null;
    this.two = null;

    this.toolbarButtons = [{ caption: 'D', onClick: this._handlerClickDate }];
    if (this.props.onClickInfo) {
      this.toolbarButtons.unshift({ caption: 'I', onClick: this._handlerClickInfo });
    }

    return {
      isShowDate: true,

      isLoadingOne: false,
      isLoadingOneFailed: false,
      optionOne: [],

      optionTwo: [],

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
  _handlerClickInfo: function _handlerClickInfo() {
    var _props = this.props;
    var descrUrl = _props.descrUrl;
    var onClickInfo = _props.onClickInfo;

    onClickInfo({ descrUrl: descrUrl });
  },
  _handlerClickDate: function _handlerClickDate() {
    this.setState({ isShowDate: !this.state.isShowDate });
  },
  _handlerLoadOne: function _handlerLoadOne() {
    var _props2 = this.props;
    var oneURI = _props2.oneURI;
    var oneJsonProp = _props2.oneJsonProp;

    this._handlerWithLoadOptions('optionOne', 'isLoadingOne', 'isLoadingOneFailed', oneURI, oneJsonProp);
  },
  _handlerSelectOne: function _handlerSelectOne(one) {
    this.one = one;
    if (one) {
      if (one.columns) {
        this.two = null;
        this.setState({ optionTwo: one.columns });
      } else {
        this.two = null;
        this.setState({ optionTwo: defaultColumns });
      }
    } else {
      this.two = null;
      this.setState({ optionTwo: defaultColumns });
    }
  },
  _handlerSelectTwo: function _handlerSelectTwo(two) {
    this.two = two;
  },
  _handlerLoad: function _handlerLoad() {
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var _props3 = this.props;
    var oneCaption = _props3.oneCaption;
    var twoCaption = _props3.twoCaption;

    var msg = [];

    if (!this.one) {
      msg.push(this.props.msgOnNotSelected(oneCaption));
    }
    if (!this.two) {
      msg.push(this.props.msgOnNotSelected(twoCaption));
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
    var _props4 = this.props;
    var fnValue = _props4.fnValue;
    var dataColumn = _props4.dataColumn;
    var loadId = _props4.loadId;

    return {
      value: fnValue(this.one.value, this.two.value),
      fromDate: fromDate,
      toDate: toDate,
      dataColumn: dataColumn,
      loadId: loadId,
      title: this.one.caption,
      subtitle: this.two.caption
    };
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _this = this;

    var _props5 = this.props;
    var caption = _props5.caption;
    var oneCaption = _props5.oneCaption;
    var twoCaption = _props5.twoCaption;
    var isShow = _props5.isShow;
    var onShow = _props5.onShow;
    var initFromDate = _props5.initFromDate;
    var initToDate = _props5.initToDate;
    var msgOnNotValidFormat = _props5.msgOnNotValidFormat;
    var onTestDate = _props5.onTestDate;
    var _state = this.state;
    var isShowDate = _state.isShowDate;
    var optionOne = _state.optionOne;
    var isLoadingOne = _state.isLoadingOne;
    var isLoadingOneFailed = _state.isLoadingOneFailed;
    var optionTwo = _state.optionTwo;
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
        onSelect: this._handlerSelectOne
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: twoCaption,
        options: optionTwo,
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

exports.default = DialogType4A;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DialogType4A.js.map