'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _eurostat = require('../../flux/creaters/eurostat2');

var _eurostat2 = _interopRequireDefault(_eurostat);

var _Type = require('../../constants/Type');

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _is = require('../../utils/is');

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _WithValidation = require('./WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _WithToolbar = require('./WithToolbar');

var _WithToolbar2 = _interopRequireDefault(_WithToolbar);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectWithLoad = require('./SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATE_PLACEHOLDER = 'Before Select Indicator',
    MAP_FREQUENCY_DF = 'M',
    AREA = 'AREA',
    MAP = 'MAP',
    categoryTypes = ['MAP', 'COLUMN', 'BAR'];

var chartTypeOptions = [{ caption: 'Default : Area', value: AREA }, { caption: 'Map : All Countries', value: MAP, compType: _Type.CompItemType.EUROSTAT_MAP }, { caption: 'Column : All Countries', value: 'COLUMN' }, { caption: 'Bar : All Countries', value: 'BAR' }];

var isCategoryType = function isCategoryType(chartType) {
  if (!chartType) {
    return false;
  }
  return (0, _is.isStrInArr)(chartType.value)(categoryTypes);
};

var DialogEurostat2 = _react2.default.createClass(_extends({
  displayName: 'DialogEurostat2'
}, _WithValidation2.default, _WithToolbar2.default, {
  getInitialState: function getInitialState() {
    this.one = undefined;
    this.two = undefined;
    this.date = undefined;
    this.chartType = undefined;

    this.toolbarButtons = [{ caption: 'I', onClick: this._clickInfoWithToolbar }];

    return {
      isShowDate: false,
      dateDefault: DATE_PLACEHOLDER,
      dateOptions: [],
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
  _updateForDate: function _updateForDate() {
    this.date = undefined;
    var frequency = this.two ? this.props.mapFrequency ? this.props.mapFrequency : this.two.mapFrequency ? this.two.mapFrequency : MAP_FREQUENCY_DF : undefined,
        mapDateDf = this.props.mapDateDf,
        config = frequency ? _DateUtils2.default.createEurostatSelect(frequency, mapDateDf) : { dateDefault: DATE_PLACEHOLDER, options: [] };


    this.setState({
      isShowDate: true,
      dateDefault: config.dateDefault,
      dateOptions: config.options
    });
  },
  _handlerSelectTwo: function _handlerSelectTwo(two) {
    this.two = two;
    if (isCategoryType(this.chartType)) {
      this._updateForDate();
    }
  },
  _handlerSelectChartType: function _handlerSelectChartType(chartType) {
    this.chartType = chartType;
    if (isCategoryType(this.chartType)) {
      this._updateForDate();
    } else {
      this.setState({ isShowDate: false });
    }
  },
  _handlerSelectDate: function _handlerSelectDate(date) {
    this.date = date;
  },
  _handlerLoad: function _handlerLoad() {
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var _props = this.props,
        oneCaption = _props.oneCaption,
        twoCaption = _props.twoCaption;

    var msg = [];

    if (!isCategoryType(this.chartType)) {
      if (!this.one) {
        msg.push(this.props.msgOnNotSelected(oneCaption));
      }
    }
    if (!this.two) {
      msg.push(this.props.msgOnNotSelected(twoCaption));
    }

    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _createLoadOption: function _createLoadOption() {
    var one = this.one,
        two = this.two,
        chartType = this.chartType,
        date = this.date,
        dateDefault = this.state.dateDefault;

    return (0, _eurostat2.default)(this.props, { one: one, two: two, chartType: chartType, date: date, dateDefault: dateDefault });
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _props2 = this.props,
        caption = _props2.caption,
        isShow = _props2.isShow,
        onShow = _props2.onShow,
        oneCaption = _props2.oneCaption,
        oneURI = _props2.oneURI,
        oneJsonProp = _props2.oneJsonProp,
        twoCaption = _props2.twoCaption,
        twoURI = _props2.twoURI,
        twoJsonProp = _props2.twoJsonProp,
        _state = this.state,
        isShowDate = _state.isShowDate,
        dateDefault = _state.dateDefault,
        dateOptions = _state.dateOptions,
        validationMessages = _state.validationMessages,
        _commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
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
      _react2.default.createElement(_SelectWithLoad2.default, {
        isShow: isShow,
        uri: twoURI,
        jsonProp: twoJsonProp,
        caption: twoCaption,
        optionNames: 'Items',
        onSelect: this._handlerSelectTwo
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Chart Type',
        placeholder: 'Default: Area',
        options: chartTypeOptions,
        onSelect: this._handlerSelectChartType
      }),
      _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isShowDate },
        _react2.default.createElement(_RowInputSelect2.default, {
          caption: 'For Date',
          placeholder: dateDefault,
          options: dateOptions,
          onSelect: this._handlerSelectDate
        })
      ),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = DialogEurostat2;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DialogEurostat2.js.map