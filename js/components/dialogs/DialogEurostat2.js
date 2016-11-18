'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _EuroStatFn = require('../../adapters/eurostat/EuroStatFn');

var _EuroStatFn2 = _interopRequireDefault(_EuroStatFn);

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
    COUNTRY_CAPTION_DF = 'EU',
    MAP_FREQUENCY_DF = 'M',
    AREA = 'AREA',
    MAP = 'MAP';

var chartTypeOptions = [{ caption: 'Default : Area', value: AREA }, { caption: 'Map', value: MAP, compType: _Type.CompItemType.EUROSTAT_MAP }];

var DialogEurostat2 = _react2.default.createClass(_extends({
  displayName: 'DialogEurostat2'
}, _WithValidation2.default, _WithToolbar2.default, {
  getInitialState: function getInitialState() {
    this.one = null;
    this.two = null;
    this.date = null;
    this.chartType = null;

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
    var frequency = this.two ? this.props.mapFrequency ? this.props.mapFrequency : this.two.mapFrequency ? this.two.mapFrequency : MAP_FREQUENCY_DF : undefined;
    var mapDateDf = this.props.mapDateDf;
    var config = frequency ? _DateUtils2.default.createEurostatSelect(frequency, mapDateDf) : { dateDefault: DATE_PLACEHOLDER, options: [] };

    this.setState({
      isShowDate: true,
      dateDefault: config.dateDefault,
      dateOptions: config.options
    });
  },
  _handlerSelectTwo: function _handlerSelectTwo(two) {
    this.two = two;
    if (this.chartType && this.chartType.value === MAP) {
      this._updateForDate();
    }
  },
  _handlerSelectChartType: function _handlerSelectChartType(chartType) {
    this.chartType = chartType;
    if (chartType && chartType.value === MAP) {
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
    var _props = this.props;
    var oneCaption = _props.oneCaption;
    var twoCaption = _props.twoCaption;

    var msg = [];

    if (!(this.chartType && this.chartType.value === MAP)) {
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
    var _props2 = this.props;
    var loadId = _props2.loadId;
    var group = _props2.group;
    var _countryValue = this.one ? this.one.value : COUNTRY_CAPTION_DF;
    var _countryCaption = this.one ? this.one.caption : COUNTRY_CAPTION_DF;

    var _zhCompType = undefined,
        _time = undefined,
        _mapValue = this.two.mapValue,
        _mapSlice = this.two.mapSlice;

    if (this.chartType && this.chartType.value !== AREA) {
      _zhCompType = this.chartType.compType;
      _time = this.date ? this.date.value : this.state.dateDefault;

      if (!_mapValue) {
        _mapValue = _EuroStatFn2.default.createMapValue(this.props, this.two);
      }
      if (!_mapSlice) {
        _mapSlice = _EuroStatFn2.default.createMapSlice(this.props, this.two);
      }
    }

    return {
      geo: _countryValue,
      group: group,
      metric: this.two.value,
      loadId: loadId,
      itemCaption: _countryCaption,
      title: _countryCaption,
      subtitle: this.two.caption,
      alertItemId: _countryCaption + ':' + this.two.caption,
      alertGeo: _countryCaption,
      alertMetric: this.two.caption,
      zhCompType: _zhCompType,
      mapValue: _mapValue,
      zhMapSlice: _extends({}, _mapSlice, { time: _time }),
      time: _time
    };
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _props3 = this.props;
    var caption = _props3.caption;
    var isShow = _props3.isShow;
    var onShow = _props3.onShow;
    var oneCaption = _props3.oneCaption;
    var oneURI = _props3.oneURI;
    var oneJsonProp = _props3.oneJsonProp;
    var twoCaption = _props3.twoCaption;
    var twoURI = _props3.twoURI;
    var twoJsonProp = _props3.twoJsonProp;
    var _state = this.state;
    var isShowDate = _state.isShowDate;
    var dateDefault = _state.dateDefault;
    var dateOptions = _state.dateOptions;
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