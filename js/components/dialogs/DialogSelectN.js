"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _ChartOptionsFn = require("./ChartOptionsFn");

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _SelectList = _interopRequireDefault(require("./SelectList"));

var _jsxRuntime = require("react/jsx-runtime");

var _dec, _class, _class2, _temp2;

const {
  Decor,
  crMenuMore,
  crDateConfig
} = _DialogCell.default;
const DF_INIT_FROM_DATE = '2010-01-01';
const DF_MAP_FREQUENCY = 'EMPTY';
const TABLE_ID = 'table';

const _isRequireChartOptionsUpdate = (prevMapFrequency, nextMapFrequency) => prevMapFrequency !== nextMapFrequency && (prevMapFrequency === 'M' || nextMapFrequency === 'M');

const _isEqualChartOptions = (nextArgs, prevArgs) => nextArgs[0] === prevArgs[0] && nextArgs[1] === prevArgs[1] && !_isRequireChartOptionsUpdate(prevArgs[2], nextArgs[2]);

const _crIsId = id => "is" + id + "Select";

const _crIsToggleInit = selectProps => {
  const _isToggleInit = {};
  selectProps.forEach(item => {
    _isToggleInit[_crIsId(item.id)] = true;
  });
  return _isToggleInit;
};

const _getDfFrequencyConfig = function (_temp) {
  let {
    mapFrequency = DF_MAP_FREQUENCY,
    mapDateDf
  } = _temp === void 0 ? {} : _temp;
  return {
    mapFrequency,
    mapDateDf
  };
};

const _mergeFrequencyConfig = (item, dfProps) => {
  const {
    mapFrequency,
    mapDateDf
  } = _getDfFrequencyConfig(dfProps);

  return [item.mapFrequency || mapFrequency, item.mapDateDf || mapDateDf];
};

const _crStateForTableItem = (item, dfProps, prevMf, prevCht) => {
  const [mapFrequency, mapDateDf] = _mergeFrequencyConfig(item, dfProps),
        chartType = _isRequireChartOptionsUpdate(prevMf, mapFrequency) ? void 0 : prevCht;

  return {
    mapFrequency,
    mapDateDf,
    chartType
  };
};

const _getValidValue = (ref, dfValue) => {
  const _compInst = ref.current;
  return _compInst && _compInst.isValid() ? _compInst.getValue() : dfValue;
};

let DialogSelectN = (_dec = Decor.dialog, _dec(_class = (_temp2 = _class2 = class DialogSelectN extends _react.Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    isOpt: PropTypes.bool,
    isCh: PropTypes.bool,
    isFd: PropTypes.bool,
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
      loadFn: PropTypes.func,
    onLoad: PropTypes.func,
    onShow: PropTypes.func,
    onFront: PropTypes.func,
    onClose: PropTypes.func,
      descrUrl: PropTypes.string,
    onClickInfo: PropTypes.func,
  }
  */
  constructor(props) {
    super(props);

    this._crDateConfig = () => {
      const {
        mapFrequency,
        mapDateDf
      } = this.state;
      return this._crDateConfigMem(mapFrequency, mapDateDf);
    };

    this._isShowById = id => this.state[_crIsId(id)];

    this._toggleStateBy = propName => {
      this.setState(prevState => ({
        [propName]: !prevState[propName]
      }));
    };

    this._checkCaptionBy = index => {
      this._titles.push(index);
    };

    this._uncheckCaption = index => {
      this._titles = this._titles.filter(v => v !== index);
    };

    this._hSelectChartType = chartType => {
      const _nextState = (0, _ChartOptionsFn.isCategoryItem)(chartType) ? {
        isShowDate: true,
        isShowFd: false
      } : {
        isShowDate: false
      };

      this.setState({ ..._nextState,
        chartType
      });
    };

    this._onRegColor = comp => {
      this.colorComp = comp;
    };

    this._hSelectDate = date => {
      this.date = date;
    };

    this._getDate = () => (this.date || {}).value || this._crDateConfig().dateDefault;

    this._handleLoad = () => {
      this._handleWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
    };

    this._createValidationMessages = () => {
      const {
        msgOnNotSelected,
        selectProps
      } = this.props,
            {
        chartType
      } = this.state,
            _max = selectProps.length,
            msg = [];
      let i = (0, _ChartOptionsFn.isCategoryItem)(chartType) ? 1 : 0;

      for (; i < _max; i++) {
        if (!this._items[i]) {
          msg.push(msgOnNotSelected(selectProps[i].caption));
        }
      }

      msg.isValid = msg.length === 0;
      return msg;
    };

    this._createLoadOption = () => {
      const {
        colorComp,
        dialogOptions
      } = this,
            {
        chartType
      } = this.state,
            {
        seriaColor,
        seriaWidth
      } = colorComp ? colorComp.getConf() : {};
      return this.props.loadFn(this.props, {
        items: [...this._items],
        titles: this._titles,
        dialogOptions,
        chartType,
        seriaColor,
        seriaWidth,
        isCategory: (0, _ChartOptionsFn.isCategoryItem)(chartType),
        fromDate: _getValidValue(this._refFromDate, ''),
        date: this._getDate()
        /*
        selectOptions: [
          compSelect1.getOptions(),
          compSelect2.getOptions()
        ]
        */

      });
    };

    this._hClose = () => {
      this._handleWithValidationClose();
    };

    this._hSelect = (id, index, item) => {
      this._items[index] = item;

      if (item) {
        item.id = id;

        if (id === TABLE_ID) {
          const {
            dfProps
          } = this.props,
                {
            mapFrequency,
            chartType
          } = this.state;
          this.setState(_crStateForTableItem(item, dfProps, mapFrequency, chartType));
        }
      }
    };

    this._refSelect = (id, comp) => {
      this._compSelect[id] = comp;
    };

    this._items = [];
    this._titles = [0];
    this._compSelect = {}; //this.date = undefined;

    const {
      isOpt,
      isCh,
      isFd,
      selectProps: _selectProps,
      dfProps: _dfProps
    } = props;
    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    });
    this.toolbarButtons = this._createType2WithToolbar(props, {
      noDate: true,
      isOptions: isOpt || isCh,
      isToggle: isFd || _selectProps.length > 1
    });
    this._refFromDate = /*#__PURE__*/(0, _react.createRef)();
    this._crChartOptionsMem = (0, _memoizeOne.default)(_ChartOptionsFn.crChartOptions, _isEqualChartOptions);
    this._crDateConfigMem = (0, _memoizeOne.default)(crDateConfig);
    this.state = { ...this._isWithInitialState(),
      isOptions: false,
      isToggle: false,
      isShowFd: false,
      isShowChart: true,
      isShowDate: false,
      ..._crIsToggleInit(_selectProps),
      ..._getDfFrequencyConfig(_dfProps) //chartType

    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps && this.props.isShow === nextProps.isShow) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      mapFrequency,
      mapDateDf
    } = this.state;

    if (prevState.mapFrequency !== mapFrequency || prevState.mapDateDf !== mapDateDf) {
      this.date = void 0;
    }
  }

  render() {
    const {
      caption,
      isShow,
      onShow,
      onFront,
      selectProps,
      chartsType,
      isFd,
      isCh,
      noDate,
      noForDate,
      initFromDate,
      errNotYmdOrEmpty,
      isYmdOrEmpty
    } = this.props,
          {
      chartType,
      isToolbar,
      isOptions,
      isToggle,
      isShowLabels,
      isShowFd,
      isShowChart,
      isShowDate,
      validationMessages,
      mapFrequency
    } = this.state,
          _chartOptions = this._crChartOptionsMem(selectProps, chartsType, mapFrequency),
          {
      dateDefault,
      dateOptions
    } = this._crDateConfig(),
          _isCategory = (0, _ChartOptionsFn.isCategoryItem)(chartType),
          _isRowFd = isFd && !_isCategory,
          _noForDate = noForDate || !_isCategory;

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      onLoad: this._handleLoad,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._hClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
        isShow: isToolbar,
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ModalOptions, {
        isShow: isOptions,
        toggleOption: this._toggleOptionWithToolbar,
        onClose: this._hideOptionsWithToolbar
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ModalToggle, {
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectList.default, {
        isShow: isShow,
        isShowLabels: isShowLabels,
        selectProps: selectProps,
        refSelect: this._refSelect,
        isShowById: this._isShowById,
        hSelect: this._hSelect
      }), _isRowFd && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
        isShow: isShowFd,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowDate, {
          innerRef: this._refFromDate,
          isShowLabels: isShowLabels,
          title: "From Date:",
          initialValue: initFromDate,
          errorMsg: errNotYmdOrEmpty,
          onTest: isYmdOrEmpty
        })
      }), isCh && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowChartDate, {
        chartType: chartType,
        isShowLabels: isShowLabels,
        isShowChart: isShowChart,
        chartOptions: _chartOptions,
        onSelectChart: this._hSelectChartType,
        onRegColor: this._onRegColor,
        noDate: noDate,
        isShowDate: isShowDate,
        dateDefault: dateDefault,
        dateOptions: dateOptions,
        onSelecDate: this._hSelectDate
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
        validationMessages: validationMessages
      })]
    });
  }

}, _class2.defaultProps = {
  isCh: true,
  selectProps: [],
  initFromDate: DF_INIT_FROM_DATE
}, _temp2)) || _class);
var _default = DialogSelectN;
exports.default = _default;
//# sourceMappingURL=DialogSelectN.js.map