"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _ChartTypes = _interopRequireDefault(require("./ChartTypes"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _dec, _dec2, _class, _class2, _temp;

var Decor = _DialogCell["default"].Decor,
    crMenuMore = _DialogCell["default"].crMenuMore,
    crDateConfig = _DialogCell["default"].crDateConfig;
var DF_INIT_FROM_DATE = '2010-01-01';
var DF_MAP_FREQUENCY = 'M';
var TABLE_ID = 'table';
var crOptions = _ChartTypes["default"].crOptions,
    isCategory = _ChartTypes["default"].isCategory;

var _crIsId = function _crIsId(id) {
  return "is" + id + "Select";
};

var _crIsToggleInit = function _crIsToggleInit(selectProps) {
  var _isToggleInit = {};
  selectProps.forEach(function (item) {
    _isToggleInit[_crIsId(item.id)] = true;
  });
  return _isToggleInit;
};

var _getDfFrequencyConfig = function _getDfFrequencyConfig(props) {
  var _props$dfProps = props.dfProps,
      dfProps = _props$dfProps === void 0 ? {} : _props$dfProps,
      _dfProps$mapFrequency = dfProps.mapFrequency,
      mapFrequency = _dfProps$mapFrequency === void 0 ? DF_MAP_FREQUENCY : _dfProps$mapFrequency,
      mapDateDf = dfProps.mapDateDf;
  return {
    mapFrequency: mapFrequency,
    mapDateDf: mapDateDf
  };
};

var _isRequireChartOptionsUpdate = function _isRequireChartOptionsUpdate(oldFrequency, _ref) {
  var mapFrequency = _ref.mapFrequency;
  return oldFrequency !== mapFrequency && (oldFrequency === 'M' || mapFrequency === 'M');
};

var DialogSelectN = (_dec = Decor.dialog, _dec2 = Decor.withForDate, _dec(_class = _dec2(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(DialogSelectN, _Component);

  /*
  static propTypes = {
    isOpt: PropTypes.bool,
    isCh: PropTypes.bool,
    isShow: PropTypes.bool,
    caption: PropTypes.string,
    selectProps: PropTypes.arrayOf(
       PropTypes.shape({
          id: PropTypes.string,
          caption: PropTypes.string,
          uri: PropTypes.string,
          jsonProp: PropTypes.string
       })
    ),
      noDate: PropTypes.string,
    dfProps: PropTypes.shape({
      mapFrequency: PropTypes.oneOf(['M', 'Q', 'Y']),
      mapDateDf: PropTypes.number,
    }),
    msgOnNotSelected: PropTypes.func,
      onShow: PropTypes.func,
    onFront: PropTypes.func,
    loadFn: PropTypes.func,
      descrUrl: PropTypes.string,
    onClickInfo: PropTypes.func,
      onClose: PropTypes.func,
    onLoad: PropTypes.func
  }
  */
  function DialogSelectN(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._toggleStateBy = function (propName) {
      _this.setState(function (prevState) {
        var _ref2;

        return _ref2 = {}, _ref2[propName] = !prevState[propName], _ref2;
      });
    };

    _this._checkCaptionBy = function (index) {
      _this._titles.push(index);
    };

    _this._uncheckCaption = function (index) {
      _this._titles = _this._titles.filter(function (v) {
        return v !== index;
      });
    };

    _this._crDateConfig = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          _mapFrequency = _assertThisInitialize._mapFrequency,
          _mapDateDf = _assertThisInitialize._mapDateDf;

      return crDateConfig(_mapFrequency, _mapDateDf);
    };

    _this._updateForDate = function (chartType) {
      _this.date = void 0;

      _this.setState((0, _extends2["default"])({
        isShowFd: false,
        isShowDate: true,
        chartType: chartType
      }, _this._crDateConfig()));
    };

    _this._hSelectChartType = function (chartType) {
      if (isCategory(chartType)) {
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

    _this._hSelectDate = function (date) {
      _this.date = date;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          msgOnNotSelected = _this$props.msgOnNotSelected,
          selectProps = _this$props.selectProps,
          chartType = _this.state.chartType,
          _max = selectProps.length,
          msg = [];
      var i = isCategory(chartType) ? 1 : 0;

      for (; i < _max; i++) {
        if (!_this._items[i]) {
          msg.push(msgOnNotSelected(selectProps[i].caption));
        }
      }

      msg.isValid = msg.length === 0;
      return msg;
    };

    _this._createLoadOption = function () {
      var _assertThisInitialize2 = (0, _assertThisInitialized2["default"])(_this),
          colorComp = _assertThisInitialize2.colorComp,
          dialogOptions = _assertThisInitialize2.dialogOptions,
          chartType = _this.state.chartType,
          _ref3 = colorComp ? colorComp.getConf() : {},
          seriaColor = _ref3.seriaColor,
          seriaWidth = _ref3.seriaWidth,
          date = _this._getDateWithForDate(),
          _isCategory = isCategory(chartType),
          items = _isCategory ? _this._items.slice(1) : [].concat(_this._items),
          _compFd = _this._refFromDate.current,
          fromDate = _compFd && _compFd.isValid() ? _compFd.getValue() : '';

      return _this.props.loadFn(_this.props, {
        items: items,
        titles: _this._titles,
        dialogOptions: dialogOptions,
        chartType: chartType,
        seriaColor: seriaColor,
        seriaWidth: seriaWidth,
        isCategory: _isCategory,
        fromDate: fromDate,
        date: date
        /*
        selectOptions: [
          compSelect1.getOptions(),
          compSelect2.getOptions()
        ]
        */

      });
    };

    _this._hClose = function () {
      _this._handleWithValidationClose();
    };

    _this._crFrequencyConfig = function (item) {
      var _getDfFrequencyConfig2 = _getDfFrequencyConfig(_this.props),
          mapFrequency = _getDfFrequencyConfig2.mapFrequency,
          mapDateDf = _getDfFrequencyConfig2.mapDateDf,
          _frequency = item.mapFrequency || mapFrequency,
          _dateDf = item.mapDateDf || mapDateDf;

      return _this._mapFrequency !== _frequency || _this._mapDateDf !== _dateDf ? {
        mapFrequency: _frequency,
        mapDateDf: _dateDf
      } : void 0;
    };

    _this._checkForTableId = function (id, item) {
      if (id === TABLE_ID) {
        var _conf = _this._crFrequencyConfig(item);

        if (_conf) {
          if (_isRequireChartOptionsUpdate(_this._mapFrequency, _conf)) {
            _this._chartOptions = crOptions(_this.props, _conf);
          }

          _this._setFrequencyConfig(_conf);

          _this.setState(_this._crDateConfig());
        }
      }
    };

    _this._hSelect = function (id, index, item) {
      _this._items[index] = item;

      if (item) {
        item.id = id;

        _this._checkForTableId(id, item);
      }
    };

    _this._refSelect = function (id, comp) {
      _this._compSelect[id] = comp;
    };

    _this._renderSelects = function (selectProps, isShow, isShowLabels) {
      return selectProps.map(function (item, index) {
        var id = item.id,
            restItem = (0, _objectWithoutPropertiesLoose2["default"])(item, ["id"]);

        var _isShow = _this.state[_crIsId(id)];

        return /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
          key: id,
          isShow: _isShow
        }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].SelectWithLoad, (0, _extends2["default"])({}, restItem, {
          ref: _this._refSelect.bind(null, id),
          isShow: isShow,
          isShowLabels: isShowLabels,
          onSelect: _this._hSelect.bind(null, id, index)
        })));
      });
    };

    _this._items = [];
    _this._titles = [0];
    _this._compSelect = {}; //this.date = undefined;

    var isOpt = props.isOpt,
        isCh = props.isCh,
        isFd = props.isFd,
        _selectProps = props.selectProps;

    _this._setFrequencyConfig(_getDfFrequencyConfig(props));

    _this._menuMore = crMenuMore((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: true,
      isOptions: isOpt || isCh,
      isToggle: isFd || _selectProps.length > 1
    });
    _this._refFromDate = /*#__PURE__*/_react["default"].createRef();
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this._chartOptions = crOptions(props);
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isOptions: false,
      isToggle: false,
      isShowFd: true,
      isShowChart: true,
      isShowDate: false
    }, crDateConfig('EMPTY'), _crIsToggleInit(_selectProps));
    return _this;
  }

  var _proto = DialogSelectN.prototype;

  _proto._setFrequencyConfig = function _setFrequencyConfig(_ref4) {
    var mapFrequency = _ref4.mapFrequency,
        mapDateDf = _ref4.mapDateDf;
    this._mapFrequency = mapFrequency;
    this._mapDateDf = mapDateDf;
  };

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
        selectProps = _this$props2.selectProps,
        isFd = _this$props2.isFd,
        isCh = _this$props2.isCh,
        noDate = _this$props2.noDate,
        noForDate = _this$props2.noForDate,
        initFromDate = _this$props2.initFromDate,
        errNotYmdOrEmpty = _this$props2.errNotYmdOrEmpty,
        isYmdOrEmpty = _this$props2.isYmdOrEmpty,
        _this$state = this.state,
        chartType = _this$state.chartType,
        isToolbar = _this$state.isToolbar,
        isOptions = _this$state.isOptions,
        isToggle = _this$state.isToggle,
        isShowLabels = _this$state.isShowLabels,
        isShowFd = _this$state.isShowFd,
        isShowChart = _this$state.isShowChart,
        isShowDate = _this$state.isShowDate,
        dateDefault = _this$state.dateDefault,
        dateOptions = _this$state.dateOptions,
        validationMessages = _this$state.validationMessages,
        _isCategory = isCategory(chartType),
        _isRowFd = isFd && !_isCategory,
        _noForDate = noForDate || !_isCategory;

    return /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._hClose
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].Toolbar, {
      isShow: isToolbar,
      buttons: this.toolbarButtons
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ModalOptions, {
      isShow: isOptions,
      toggleOption: this._toggleOptionWithToolbar,
      onClose: this._hideOptionsWithToolbar
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ModalToggle, {
      isShow: isToggle,
      noForDate: _noForDate,
      selectProps: selectProps,
      isFd: _isRowFd,
      isShowFd: isShowFd,
      isCh: isCh,
      isShowChart: isShowChart,
      isShowDate: isShowDate,
      crIsId: _crIsId,
      onToggle: this._toggleStateBy,
      onCheckCaption: this._checkCaptionBy,
      onUnCheckCaption: this._uncheckCaption,
      onClose: this._hideToggleWithToolbar
    }), this._renderSelects(selectProps, isShow, isShowLabels), _isRowFd && /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowFd
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowDate, {
      innerRef: this._refFromDate,
      isShowLabels: isShowLabels,
      labelTitle: "From Date:",
      initValue: initFromDate,
      errorMsg: errNotYmdOrEmpty,
      onTestDate: isYmdOrEmpty
    })), isCh && /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowChartDate, {
      chartType: chartType,
      isShowLabels: isShowLabels,
      isShowChart: isShowChart,
      chartOptions: this._chartOptions,
      onSelectChart: this._hSelectChartType,
      onRegColor: this._onRegColor,
      noDate: noDate,
      isShowDate: isShowDate,
      dateDefault: dateDefault,
      dateOptions: dateOptions,
      onSelecDate: this._hSelectDate
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return DialogSelectN;
}(_react.Component), _class2.defaultProps = {
  isCh: true,
  selectProps: [],
  initFromDate: DF_INIT_FROM_DATE
}, _temp)) || _class) || _class);
var _default = DialogSelectN;
exports["default"] = _default;
//# sourceMappingURL=DialogSelectN.js.map