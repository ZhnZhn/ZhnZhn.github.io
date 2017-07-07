'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _ArrayUtil = require('../../utils/ArrayUtil');

var _ArrayUtil2 = _interopRequireDefault(_ArrayUtil);

var _DraggableDialog = require('../zhn-moleculs/DraggableDialog');

var _DraggableDialog2 = _interopRequireDefault(_DraggableDialog);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectWithLoad = require('./SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _withToolbar = require('./decorators/withToolbar');

var _withToolbar2 = _interopRequireDefault(_withToolbar);

var _withValidationLoad = require('./decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

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
  return _ArrayUtil2.default.isStrInArr(chartType.value)(categoryTypes);
};

var DialogEurostat2 = (0, _withToolbar2.default)(_class = (0, _withValidationLoad2.default)(_class = function (_Component) {
  (0, _inherits3.default)(DialogEurostat2, _Component);

  function DialogEurostat2(props) {
    (0, _classCallCheck3.default)(this, DialogEurostat2);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogEurostat2.__proto__ || Object.getPrototypeOf(DialogEurostat2)).call(this));

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._updateForDate = function () {
      _this.date = null;
      var frequency = _this.two ? _this.props.mapFrequency ? _this.props.mapFrequency : _this.two.mapFrequency ? _this.two.mapFrequency : MAP_FREQUENCY_DF : null,
          mapDateDf = _this.props.mapDateDf,
          config = frequency ? _DateUtils2.default.createEurostatSelect(frequency, mapDateDf) : { dateDefault: DATE_PLACEHOLDER, options: [] };


      _this.setState({
        isShowDate: true,
        dateDefault: config.dateDefault,
        dateOptions: config.options
      });
    };

    _this._handleSelectTwo = function (two) {
      _this.two = two;
      if (isCategoryType(_this.chartType)) {
        _this._updateForDate();
      }
    };

    _this._handleSelectChartType = function (chartType) {
      _this.chartType = chartType;
      if (isCategoryType(_this.chartType)) {
        _this._updateForDate();
      } else {
        _this.setState({ isShowDate: false });
      }
    };

    _this._handleSelectDate = function (date) {
      _this.date = date;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          oneCaption = _this$props.oneCaption,
          twoCaption = _this$props.twoCaption;

      var msg = [];

      if (!isCategoryType(_this.chartType)) {
        if (!_this.one) {
          msg.push(_this.props.msgOnNotSelected(oneCaption));
        }
      }
      if (!_this.two) {
        msg.push(_this.props.msgOnNotSelected(twoCaption));
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var one = _this.one,
          two = _this.two,
          chartType = _this.chartType,
          date = _this.date,
          dateDefault = _this.state.dateDefault;

      return _this.props.loadFn(_this.props, { one: one, two: two, chartType: chartType, date: date, dateDefault: dateDefault });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose(_this._createValidationMessages);
      _this.props.onClose();
    };

    _this.one = undefined;
    _this.two = undefined;
    _this.date = undefined;
    _this.chartType = undefined;

    _this.toolbarButtons = [{ caption: 'I', onClick: _this._clickInfoWithToolbar.bind(_this) }];
    _this._commandButtons = [_react2.default.createElement(_Button2.default.Load, { onClick: _this._handleLoad })];
    _this.state = {
      isShowDate: false,
      dateDefault: DATE_PLACEHOLDER,
      dateOptions: [],
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(DialogEurostat2, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props !== nextProps) {
        if (this.props.isShow === nextProps.isShow) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          isShow = _props.isShow,
          onShow = _props.onShow,
          oneCaption = _props.oneCaption,
          oneURI = _props.oneURI,
          oneJsonProp = _props.oneJsonProp,
          twoCaption = _props.twoCaption,
          twoURI = _props.twoURI,
          twoJsonProp = _props.twoJsonProp,
          _state = this.state,
          isShowDate = _state.isShowDate,
          dateDefault = _state.dateDefault,
          dateOptions = _state.dateOptions,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _DraggableDialog2.default,
        {
          caption: caption,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onClose: this._handleClose
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
          onSelect: this._handleSelectOne
        }),
        _react2.default.createElement(_SelectWithLoad2.default, {
          isShow: isShow,
          uri: twoURI,
          jsonProp: twoJsonProp,
          caption: twoCaption,
          optionNames: 'Items',
          onSelect: this._handleSelectTwo
        }),
        _react2.default.createElement(_RowInputSelect2.default, {
          caption: 'Chart Type',
          placeholder: 'Default: Area',
          options: chartTypeOptions,
          onSelect: this._handleSelectChartType
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowDate },
          _react2.default.createElement(_RowInputSelect2.default, {
            caption: 'For Date',
            placeholder: dateDefault,
            options: dateOptions,
            onSelect: this._handleSelectDate
          })
        ),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogEurostat2;
}(_react.Component)) || _class) || _class;

process.env.NODE_ENV !== "production" ? DialogEurostat2.propTypes = {
  isShow: _react.PropTypes.bool,
  caption: _react.PropTypes.string,

  oneCaption: _react.PropTypes.string,
  oneURI: _react.PropTypes.string,
  oneJsonProp: _react.PropTypes.string,

  twoCaption: _react.PropTypes.string,
  twoURI: _react.PropTypes.string,
  twoJsonProp: _react.PropTypes.string,

  mapFrequency: _react.PropTypes.oneOf(['M', 'Q', 'Y']),
  mapDateDf: _react.PropTypes.number,

  msgOnNotSelected: _react.PropTypes.func,
  onShow: _react.PropTypes.func,
  loadFn: _react.PropTypes.func
} : void 0;
exports.default = DialogEurostat2;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DialogEurostat2.js.map