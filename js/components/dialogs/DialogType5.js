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

var defaultColumns = [{ caption: 'Value', value: 1 }];

var DialogType5 = _react2.default.createClass(_extends({
  displayName: 'DialogType5'
}, _WithLoadOptions2.default, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.one = null;
    this.two = null;
    this.three = null;

    this.toolbarButtons = [{ caption: 'D', onClick: this._handlerClickDate }];
    if (this.props.onClickInfo) {
      this.toolbarButtons.unshift({ caption: 'I', onClick: this._handlerClickInfo });
    }

    return {
      isShowDate: true,

      isLoadingOne: false,
      isLoadingOneFailed: false,
      optionOne: [],

      isLoadingTwo: false,
      isLoadingTwoFailed: false,
      optionTwo: [],

      optionThree: [{ caption: 'Import', value: 1 }, { caption: 'Export', value: 3 }],

      validationMessages: []
    };
  },
  componentDidMount: function componentDidMount() {
    this._handlerLoadOne();
    this._handlerLoadTwo();
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
      if (this.state.isLoadingTwoFailed && this.props.isShow) {
        this._handlerLoadTwo();
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
  _handlerLoadTwo: function _handlerLoadTwo() {
    var _props3 = this.props;
    var twoURI = _props3.twoURI;
    var twoJsonProp = _props3.twoJsonProp;

    this._handlerWithLoadOptions('optionTwo', 'isLoadingTwo', 'isLoadingTwoFailed', twoURI, twoJsonProp);
  },
  _handlerSelectOne: function _handlerSelectOne(one) {
    this.one = one;
  },
  _handlerSelectTwo: function _handlerSelectTwo(two) {
    this.two = two;
    if (two) {
      if (two.columns) {
        this.three = null;
        this.setState({ optionThree: two.columns });
      } else {
        this.three = null;
        this.setState({ optionThree: defaultColumns });
      }
    } else {
      this.three = null;
      this.setState({ optionThree: [] });
    }
  },
  _handlerSelectThree: function _handlerSelectThree(three) {
    this.three = three;
  },
  _handlerLoad: function _handlerLoad() {
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var _props4 = this.props;
    var oneCaption = _props4.oneCaption;
    var twoCaption = _props4.twoCaption;
    var threeCaption = _props4.threeCaption;

    var msg = [];

    if (!this.one) {
      msg.push(this.props.msgOnNotSelected(oneCaption));
    }
    if (!this.two) {
      msg.push(this.props.msgOnNotSelected(twoCaption));
    }
    if (!this.three) {
      msg.push(this.props.msgOnNotSelected(threeCaption));
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
    var _props5 = this.props;
    var fnValue = _props5.fnValue;
    var fnValueType = _props5.fnValueType;
    var dataColumn = _props5.dataColumn;
    var loadId = _props5.loadId;


    switch (fnValueType) {
      case 'TreeItem':
        return {
          value: fnValue(this.one.value, this.three.value),
          fromDate: fromDate,
          toDate: toDate,
          dataColumn: dataColumn,
          loadId: loadId,
          title: this.one.caption + ':' + this.two.caption,
          subtitle: this.three.caption
        };
      case 'PlusTreeItem':
        return {
          value: fnValue(this.one.value, this.two.value, this.three.value),
          fromDate: fromDate,
          toDate: toDate,
          dataColumn: dataColumn,
          loadId: loadId,
          title: this.two.caption + ':' + this.three.caption,
          subtitle: this.one.caption
        };
      default:
        var _dataColumn = this.three ? this.three.value : 1;
        return {
          value: fnValue(this.one.value, this.two.value),
          fromDate: fromDate,
          toDate: toDate,
          dataColumn: _dataColumn,
          loadId: loadId,
          title: this.one.caption + ':' + this.two.caption,
          subtitle: this.three.caption
        };
    }
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _this = this;

    var _props6 = this.props;
    var caption = _props6.caption;
    var oneCaption = _props6.oneCaption;
    var twoCaption = _props6.twoCaption;
    var threeCaption = _props6.threeCaption;
    var isShow = _props6.isShow;
    var onShow = _props6.onShow;
    var initFromDate = _props6.initFromDate;
    var initToDate = _props6.initToDate;
    var msgOnNotValidFormat = _props6.msgOnNotValidFormat;
    var onTestDate = _props6.onTestDate;
    var _state = this.state;
    var isShowDate = _state.isShowDate;
    var optionOne = _state.optionOne;
    var isLoadingOne = _state.isLoadingOne;
    var isLoadingOneFailed = _state.isLoadingOneFailed;
    var optionTwo = _state.optionTwo;
    var isLoadingTwo = _state.isLoadingTwo;
    var isLoadingTwoFailed = _state.isLoadingTwoFailed;
    var optionThree = _state.optionThree;
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
        optionNames: 'Items',
        isLoading: isLoadingTwo,
        isLoadingFailed: isLoadingTwoFailed,
        onLoadOption: this._handlerLoadTwo,
        onSelect: this._handlerSelectTwo
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: threeCaption,
        options: optionThree,
        onSelect: this._handlerSelectThree
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