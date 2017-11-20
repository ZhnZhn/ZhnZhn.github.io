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

var _dec, _dec2, _class, _class2, _temp;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

var _RouterOptions = require('./RouterOptions');

var _RouterOptions2 = _interopRequireDefault(_RouterOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATE_PLACEHOLDER = 'Before Select Metric',
    MAP_FREQUENCY_DF = 'M';

var DialogEurostat2 = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec(_class = _dec2(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(DialogEurostat2, _Component);

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
      oneCaption: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,
      twoCaption: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,
      mapFrequency: PropTypes.oneOf(['M', 'Q', 'Y']),
    mapDateDf: PropTypes.number,
      msgOnNotSelected: PropTypes.func,
    onShow: PropTypes.func,
    loadFn: PropTypes.func
  }
  */
  function DialogEurostat2(props) {
    (0, _classCallCheck3.default)(this, DialogEurostat2);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogEurostat2.__proto__ || Object.getPrototypeOf(DialogEurostat2)).call(this));

    _this._isCategory = function () {
      return _RouterOptions2.default.isCategory(_this.chartType);
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

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleSelectTwo = function (two) {
      _this.two = two;
      if (_this._isCategory()) {
        _this._updateForDate();
      }
    };

    _this._handleSelectChartType = function (chartType) {
      _this.chartType = chartType;
      if (_this._isCategory()) {
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

      if (!_this._isCategory()) {
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
          compSelect1 = _this.compSelect1,
          compSelect2 = _this.compSelect2,
          dateDefault = _this.state.dateDefault;

      return _this.props.loadFn(_this.props, {
        one: one, two: two, chartType: chartType, date: date, dateDefault: dateDefault,
        selectOptions: [compSelect1.getOptions(), compSelect2.getOptions()]
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._refSelect1 = function (comp) {
      _this.compSelect1 = comp;
    };

    _this._refSelect2 = function (comp) {
      _this.compSelect2 = comp;
    };

    _this.one = undefined;
    _this.two = undefined;
    _this.date = undefined;
    _this.chartType = undefined;

    _this.toolbarButtons = _this._createType2WithToolbar(props);

    _this._commandButtons = [_react2.default.createElement(_DialogCell2.default.Button.Load, { onClick: _this._handleLoad })];

    _this._chartOptions = _RouterOptions2.default.crOptions(props);

    _this.state = {
      isShowLabels: true,
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
          onFront = _props.onFront,
          oneCaption = _props.oneCaption,
          oneURI = _props.oneURI,
          oneJsonProp = _props.oneJsonProp,
          twoCaption = _props.twoCaption,
          twoURI = _props.twoURI,
          twoJsonProp = _props.twoJsonProp,
          _state = this.state,
          isShowLabels = _state.isShowLabels,
          isShowDate = _state.isShowDate,
          dateDefault = _state.dateDefault,
          dateOptions = _state.dateOptions,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _DialogCell2.default.DraggableDialog,
        {
          caption: caption,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.ToolbarButtonCircle, {
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          ref: this._refSelect1,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: oneURI,
          jsonProp: oneJsonProp,
          caption: oneCaption,
          optionNames: 'Items',
          onSelect: this._handleSelectOne
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          ref: this._refSelect2,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: twoURI,
          jsonProp: twoJsonProp,
          caption: twoCaption,
          optionNames: 'Metrics',
          onSelect: this._handleSelectTwo
        }),
        _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: 'Chart',
          placeholder: 'Default: Area',
          options: this._chartOptions,
          onSelect: this._handleSelectChartType
        }),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowDate },
          _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
            isShowLabels: isShowLabels,
            caption: 'For Date',
            placeholder: dateDefault,
            options: dateOptions,
            onSelect: this._handleSelectDate
          })
        ),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogEurostat2;
}(_react.Component), _class2.defaultProps = {
  oneCaption: 'Item',
  oneJsonProp: 'items',
  twoCaption: 'Metric',
  twoJsonProp: 'metrics'
}, _temp)) || _class) || _class);
exports.default = DialogEurostat2;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\eurostat\DialogEurostat2.js.map