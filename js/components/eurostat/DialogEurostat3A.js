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
var DialogEurostat3A = (_dec = _Decorators["default"].dialog, _dec(_class = (0, _withForDate["default"])(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(DialogEurostat3A, _Component);

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
      threeCaption: PropTypes.string,
    threeURI: PropTypes.string,
    threeJsonProp: PropTypes.string,
      noDate: PropTypes.string,
      mapFrequency: PropTypes.oneOf(['M', 'Q', 'Y']),
    mapDateDf: PropTypes.number,
      msgOnNotSelected: PropTypes.func,
    onShow: PropTypes.func,
    loadFn: PropTypes.func
  }
  */
  function DialogEurostat3A(props) {
    var _this;

    _this = _Component.call(this, props) || this; //this.one = undefined;
    //this.two = undefined;
    //this.three = undefined;
    //this.date = undefined;
    //this.chartType = undefined;

    _this._isCategory = function () {
      return _RouterOptions["default"].isCategory(_this.chartType);
    };

    _this._updateForDate = function () {
      _this.date = undefined;
      var _this$props$dfProps = _this.props.dfProps,
          dfProps = _this$props$dfProps === void 0 ? {} : _this$props$dfProps,
          mapFrequency = dfProps.mapFrequency,
          mapDateDf = dfProps.mapDateDf;

      var _frequency = _this.two ? mapFrequency : MAP_FREQUENCY_DF,
          dateConfig = _frequency ? (0, _crDateConfig["default"])(_frequency, mapDateDf) : (0, _crDateConfig["default"])('EMPTY');

      _this.setState((0, _extends2["default"])({
        isShowDate: true
      }, dateConfig));
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

    _this._handleSelectThree = function (three) {
      _this.three = three;
    };

    _this._handleSelectChartType = function (chartType) {
      _this.chartType = chartType;

      if (_this._isCategory()) {
        _this._updateForDate();
      } else {
        _this.setState({
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
          twoCaption = _this$props.twoCaption,
          threeCaption = _this$props.threeCaption,
          msgOnNotSelected = _this$props.msgOnNotSelected;
      var msg = [];

      if (!_this._isCategory() && !_this.one) {
        msg.push(msgOnNotSelected(oneCaption));
      }

      if (!_this.two) {
        msg.push(msgOnNotSelected(twoCaption));
      }

      if (!_this.three) {
        msg.push(msgOnNotSelected(threeCaption));
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          one = _assertThisInitialize.one,
          two = _assertThisInitialize.two,
          three = _assertThisInitialize.three,
          dialogOptions = _assertThisInitialize.dialogOptions,
          chartType = _assertThisInitialize.chartType,
          colorComp = _assertThisInitialize.colorComp,
          compSelect1 = _assertThisInitialize.compSelect1,
          compSelect2 = _assertThisInitialize.compSelect2,
          seriaColor = colorComp ? colorComp.getColor() : undefined,
          date = _this._getDateWithForDate();

      return _this.props.loadFn(_this.props, {
        one: one,
        group: two,
        metric: three,
        dialogOptions: dialogOptions,
        chartType: chartType,
        seriaColor: seriaColor,
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

  var _proto = DialogEurostat3A.prototype;

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
        threeCaption = _this$props2.threeCaption,
        threeURI = _this$props2.threeURI,
        threeJsonProp = _this$props2.threeJsonProp,
        noDate = _this$props2.noDate,
        _this$state = this.state,
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
      optionNames: "Countries",
      onSelect: this._handleSelectOne
    }), _react["default"].createElement(_DialogCell["default"].SelectWithLoad, {
      ref: this._refSelect2,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: twoURI,
      jsonProp: twoJsonProp,
      caption: twoCaption,
      optionNames: "Items",
      onSelect: this._handleSelectTwo
    }), _react["default"].createElement(_DialogCell["default"].SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: threeURI,
      jsonProp: threeJsonProp,
      caption: threeCaption,
      optionNames: "Metrics",
      onSelect: this._handleSelectThree
    }), _react["default"].createElement(_DialogCell["default"].RowChart, {
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

  return DialogEurostat3A;
}(_react.Component), _class2.defaultProps = {
  oneCaption: 'Country',
  oneJsonProp: 'countries',
  twoCaption: 'Item',
  twoJsonProp: 'items',
  threeCaption: 'Metric',
  threeJsonProp: 'items'
}, _temp)) || _class) || _class);
var _default = DialogEurostat3A;
exports["default"] = _default;
//# sourceMappingURL=DialogEurostat3A.js.map