"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _crDateConfig = _interopRequireDefault(require("./crDateConfig"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _MenuMore = _interopRequireDefault(require("../dialogs/MenuMore"));

var _Decorators = _interopRequireDefault(require("../dialogs/decorators/Decorators"));

var _withForDate = _interopRequireDefault(require("./withForDate"));

var _RouterOptions = _interopRequireDefault(require("./RouterOptions"));

var _ModalOptions = _interopRequireDefault(require("./ModalOptions"));

var _dec, _class, _class2, _temp;

var MAP_FREQUENCY_DF = 'M';

var _isCategory = function _isCategory(chartType) {
  return _RouterOptions["default"].isCategory(chartType);
};

var DialogEurostat2 = (_dec = _Decorators["default"].dialog, _dec(_class = (0, _withForDate["default"])(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(DialogEurostat2, _Component);

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
    var _this;

    _this = _Component.call(this, props) || this; //this.one = undefined;
    //this.two = undefined;
    //this.date = undefined;

    _this._updateForDate = function (chartType) {
      _this.date = null;
      var frequency = _this.two ? _this.props.mapFrequency ? _this.props.mapFrequency : _this.two.mapFrequency ? _this.two.mapFrequency : MAP_FREQUENCY_DF : null,
          mapDateDf = _this.props.mapDateDf,
          dateConfig = frequency ? (0, _crDateConfig["default"])(frequency, mapDateDf) : (0, _crDateConfig["default"])('EMPTY');

      _this.setState((0, _extends2["default"])({
        isShowDate: true
      }, dateConfig, {
        chartType: chartType
      }));
    };

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleSelectTwo = function (two) {
      _this.two = two;
      var chartType = _this.state.chartType;

      if (_isCategory(chartType)) {
        _this._updateForDate(chartType);
      }
    };

    _this._handleSelectChartType = function (chartType) {
      if (_isCategory(chartType)) {
        _this._updateForDate(chartType);
      } else {
        _this.setState({
          chartType: chartType,
          isShowDate: false
        });
      }
    };

    _this._onRegColor = function (comp) {
      _this.colorComp = comp;
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
      var chartType = _this.state.chartType;
      var msg = [];

      if (!_isCategory(chartType)) {
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
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          one = _assertThisInitialize.one,
          two = _assertThisInitialize.two,
          dialogOptions = _assertThisInitialize.dialogOptions,
          colorComp = _assertThisInitialize.colorComp,
          compSelect1 = _assertThisInitialize.compSelect1,
          compSelect2 = _assertThisInitialize.compSelect2,
          chartType = _this.state.chartType,
          _ref = colorComp ? colorComp.getConf() : {},
          seriaColor = _ref.seriaColor,
          seriaWidth = _ref.seriaWidth,
          date = _this._getDateWithForDate();

      return _this.props.loadFn(_this.props, {
        one: one,
        two: two,
        dialogOptions: dialogOptions,
        chartType: chartType,
        seriaColor: seriaColor,
        seriaWidth: seriaWidth,
        date: date,
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

    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      isOptions: true
    });
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this._chartOptions = _RouterOptions["default"].crOptions(props);
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isOptions: false,
      isShowDate: false
    }, (0, _crDateConfig["default"])('EMPTY'));
    return _this;
  }

  var _proto = DialogEurostat2.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        noDate = _this$props2.noDate,
        caption = _this$props2.caption,
        isShow = _this$props2.isShow,
        onShow = _this$props2.onShow,
        onFront = _this$props2.onFront,
        oneCaption = _this$props2.oneCaption,
        oneURI = _this$props2.oneURI,
        oneJsonProp = _this$props2.oneJsonProp,
        twoCaption = _this$props2.twoCaption,
        twoURI = _this$props2.twoURI,
        twoJsonProp = _this$props2.twoJsonProp,
        _this$state = this.state,
        chartType = _this$state.chartType,
        isToolbar = _this$state.isToolbar,
        isOptions = _this$state.isOptions,
        isShowLabels = _this$state.isShowLabels,
        isShowDate = _this$state.isShowDate,
        dateDefault = _this$state.dateDefault,
        dateOptions = _this$state.dateOptions,
        validationMessages = _this$state.validationMessages;
    return _react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose
    }, _react["default"].createElement(_DialogCell["default"].Toolbar, {
      isShow: isToolbar,
      buttons: this.toolbarButtons
    }), _react["default"].createElement(_ModalOptions["default"], {
      isShow: isOptions,
      toggleOption: this._toggleOptionWithToolbar,
      onClose: this._hideOptionsWithToolbar
    }), _react["default"].createElement(_DialogCell["default"].SelectWithLoad, {
      ref: this._refSelect1,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      jsonProp: oneJsonProp,
      caption: oneCaption,
      optionNames: "Items",
      onSelect: this._handleSelectOne
    }), _react["default"].createElement(_DialogCell["default"].SelectWithLoad, {
      ref: this._refSelect2,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: twoURI,
      jsonProp: twoJsonProp,
      caption: twoCaption,
      optionNames: "Metrics",
      onSelect: this._handleSelectTwo
    }), _react["default"].createElement(_DialogCell["default"].RowChart, {
      chartType: chartType,
      isShowLabels: isShowLabels,
      options: this._chartOptions,
      onSelectChart: this._handleSelectChartType,
      onRegColor: this._onRegColor
    }), !noDate && _react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowDate
    }, _react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "For Date",
      placeholder: dateDefault,
      options: dateOptions,
      onSelect: this._handleSelectDate
    })), _react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return DialogEurostat2;
}(_react.Component), _class2.defaultProps = {
  oneCaption: 'Item',
  oneJsonProp: 'items',
  twoCaption: 'Metric',
  twoJsonProp: 'metrics'
}, _temp)) || _class) || _class);
var _default = DialogEurostat2;
exports["default"] = _default;
//# sourceMappingURL=DialogEurostat2.js.map