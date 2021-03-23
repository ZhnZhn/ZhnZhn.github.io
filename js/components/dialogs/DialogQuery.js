"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ChartTypes = _interopRequireDefault(require("./ChartTypes"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _dec, _dec2, _class, _temp;

var crOptions = _ChartTypes["default"].crOptions;
var Decor = _DialogCell["default"].Decor,
    crMenuMore = _DialogCell["default"].crMenuMore;
var ERR_MSG = 'Empty or Id format is not valid';
var S = {
  ID_CAPTION: {
    width: 85
  },
  ID_ROOT: {
    width: 270
  }
};

var _isStrNotBlank = function _isStrNotBlank(str) {
  return typeof str === 'string' && str.trim();
};

var _testId = function _testId(value) {
  return _isStrNotBlank(value) && _isStrNotBlank(value.split('/')[2]) ? true : false;
};

var DialogQuery = (_dec = Decor.withToolbar, _dec2 = Decor.withLoad, _dec(_class = _dec2(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(DialogQuery, _Component);

  function DialogQuery(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _this._hSelectChartType = function (chartType) {
      _this.setState({
        chartType: chartType
      });
    };

    _this._onRegColor = function (comp) {
      _this.colorComp = comp;
    };

    _this._handleLoad = function () {
      if (_this._idInput) {
        if (_this._idInput.isValid()) {
          var _value = _this._idInput.getValue(),
              _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
              props = _assertThisInitialize.props,
              state = _assertThisInitialize.state,
              colorComp = _assertThisInitialize.colorComp,
              dialogOptions = _assertThisInitialize.dialogOptions,
              onLoad = props.onLoad,
              loadFn = props.loadFn,
              chartType = state.chartType,
              _ref = colorComp ? colorComp.getConf() : {},
              seriaColor = _ref.seriaColor,
              seriaWidth = _ref.seriaWidth;

          onLoad(loadFn(_this.props, {
            items: [{
              c: _value,
              v: _value
            }],
            chartType: chartType,
            seriaColor: seriaColor,
            seriaWidth: seriaWidth,
            dialogOptions: dialogOptions
          }));
        } else {
          _this._idInput.showErrMsg();
        }
      }
    };

    _this._refIdInput = function (c) {
      return _this._idInput = c;
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = crMenuMore((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    var noDate = _props.noDate;
    _this.toolbarButtons = _this._createType2WithToolbar(_props, {
      noDate: noDate,
      isOptions: true
    });
    _this._chartOptions = crOptions({
      chartsType: 't2'
    });
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = {
      isToolbar: true,
      isShowLabels: true,
      isShowDate: true,
      isOptions: false,
      chartType: 'SPLINE'
    };
    return _this;
  }

  var _proto = DialogQuery.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        caption = _this$props.caption,
        isShow = _this$props.isShow,
        onShow = _this$props.onShow,
        onFront = _this$props.onFront,
        onClose = _this$props.onClose,
        oneCaption = _this$props.oneCaption,
        onePlaceholder = _this$props.onePlaceholder,
        noDate = _this$props.noDate,
        initFromDate = _this$props.initFromDate,
        initToDate = _this$props.initToDate,
        msgOnNotValidFormat = _this$props.msgOnNotValidFormat,
        onTestDate = _this$props.onTestDate,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
        isShowDate = _this$state.isShowDate,
        isOptions = _this$state.isOptions,
        chartType = _this$state.chartType;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      menuModel: this._menuMore,
      caption: caption,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: onClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Toolbar, {
        isShow: isToolbar,
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ModalOptions, {
        isShow: isOptions,
        toggleOption: this._toggleOptionWithToolbar,
        onClose: this._hideOptionsWithToolbar
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowPattern, {
        ref: this._refIdInput,
        isShow: isShow,
        isShowLabels: isShowLabels,
        captionStyle: S.ID_CAPTION,
        rootStyle: S.ID_ROOT,
        placeholder: onePlaceholder,
        caption: oneCaption,
        onTest: _testId,
        errorMsg: ERR_MSG
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowChartDate, {
        chartType: chartType,
        isShowLabels: isShowLabels,
        isShowChart: true,
        labelStyle: S.ID_CAPTION,
        selectWidth: S.ID_ROOT.width,
        chartOptions: this._chartOptions,
        onSelectChart: this._hSelectChartType,
        onRegColor: this._onRegColor,
        noDate: noDate
      }), !noDate && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ShowHide, {
        isShow: isShowDate,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].DatesFragment, {
          ref: this._refDates,
          isShowLabels: isShowLabels,
          initFromDate: initFromDate,
          initToDate: initToDate,
          msgOnNotValidFormat: msgOnNotValidFormat,
          onTestDate: onTestDate
        })
      })]
    });
  };

  return DialogQuery;
}(_react.Component), _temp)) || _class) || _class);
var _default = DialogQuery;
exports["default"] = _default;
//# sourceMappingURL=DialogQuery.js.map