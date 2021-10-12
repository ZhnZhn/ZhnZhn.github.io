"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _loadConfigs = _interopRequireDefault(require("./loadConfigs"));

var _has = _interopRequireDefault(require("../has"));

var _ChartTypes = _interopRequireDefault(require("../dialogs/ChartTypes"));

var _SpinnerLoading = _interopRequireDefault(require("../zhn/SpinnerLoading"));

var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

var _dec, _class;

const {
  Decor,
  crMenuMore,
  crDateConfig
} = _DialogCell.default;
const MAP_FREQUENCY_DF = 'M',
      MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again.",
      MSG_DIMS_LOADING = "Dims is loading",
      S_SPINNER_LOADING = {
  margin: '16px auto 32px'
},
      S_SPINNER_FAILED = {
  borderColor: '#f44336',
  animation: 'none'
};
const {
  isCategory,
  crOptions
} = _ChartTypes.default;

const _crIsId = id => "is" + id + "Select";

const _loadDims = ({
  dims,
  proxy,
  baseMeta,
  dfProps
}, _setConfigs) => {
  (0, _loadConfigs.default)({
    dims,
    proxy,
    baseMeta,
    ...dfProps
  }).then(_setConfigs).catch(err => {
    _setConfigs({
      errMsg: err.message
    });
  });
};

const _isOpenAndPrevLoadFailed = (prevProps, props, state) => props !== prevProps && !prevProps.isShow && props.isShow && state.isLoadFailed;

const _crSelectItem = (conf, index, {
  isShowLabels,
  isRow,
  fSelect
}) => {
  const {
    id,
    caption,
    options
  } = conf,
        _isShow = !isRow[_crIsId(id)];

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
    isShow: _isShow,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: caption,
      options: options,
      onSelect: fSelect(index)
    })
  }, id);
};

let DialogStatN = (_dec = Decor.dialog, _dec(_class = class DialogStatN extends _react.Component {
  constructor(props) {
    super(props);

    this._toggleIsRow = propName => {
      this.setState(prevState => {
        const {
          isRow
        } = prevState;
        isRow[propName] = !isRow[propName];
        prevState.isRow = { ...isRow
        };
        return { ...prevState
        };
      });
    };

    this._checkCaptionBy = index => {
      this._titles.push(index);
    };

    this._uncheckCaption = index => {
      this._titles = this._titles.filter(v => v !== index);
    };

    this._setConfigs = ({
      configs,
      timeId,
      mapFrequency: mF,
      errMsg
    }) => {
      if (configs) {
        const {
          chartsType,
          mapFrequency
        } = this.props;
        this.setState({
          isLoading: false,
          isLoadFailed: false,
          timeId,
          configs,
          mapFrequency: mF || mapFrequency,
          selectOptions: configs.map(config => config.options),
          chartOptions: crOptions({
            configs,
            chartsType
          })
        });
      } else {
        this.setState({
          isLoading: false,
          isLoadFailed: true,
          validationMessages: [errMsg]
        });
      }
    };

    this._setIsShowDate = (state, value) => {
      const {
        isRow
      } = state;
      isRow.isShowDate = value;
      state.isRow = { ...isRow
      };
    };

    this._updateForDate = chartType => {
      this.date = null;

      const {
        mapDateDf
      } = this.props,
            {
        mapFrequency
      } = this.state,
            _frequency = mapFrequency || MAP_FREQUENCY_DF,
            dateConfig = crDateConfig(_frequency, mapDateDf);

      this.setState(prevState => {
        this._setIsShowDate(prevState, true);

        return { ...prevState,
          ...dateConfig,
          chartType
        };
      });
    };

    this._handleLoad = () => {
      const validationMessages = this._crValidationMessages();

      if (validationMessages.length === 0) {
        const {
          _items,
          _titles,
          dialogOptions,
          colorComp,
          date
        } = this,
              {
          seriaColor,
          seriaWidth
        } = colorComp ? colorComp.getConf() : {},
              {
          dateDefault,
          timeId,
          chartType,
          selectOptions
        } = this.state,
              {
          loadFn,
          onLoad
        } = this.props,
              _props = { ...this.props,
          timeId
        },
              loadOpt = loadFn(_props, {
          dialogOptions,
          chartType,
          seriaColor,
          seriaWidth,
          date,
          dateDefault,
          items: _items,
          titles: _titles,
          selectOptions: selectOptions
        });
        onLoad(loadOpt);
      }

      this.setState({
        validationMessages
      });
    };

    this._crValidationMessages = () => {
      const msg = [],
            {
        isLoadFailed,
        isLoading,
        configs,
        chartType
      } = this.state,
            _isCategory = isCategory(chartType),
            {
        dim
      } = chartType || {};

      if (isLoadFailed) {
        msg.push(MSG_DIMS_NOT_LOADED);
        return msg;
      }

      if (isLoading) {
        msg.push(MSG_DIMS_LOADING);
        return msg;
      }

      configs.forEach((config, index) => {
        const {
          caption
        } = config;

        if (!(_isCategory && caption === dim)) {
          if (!this._items[index]) {
            msg.push(this.props.msgOnNotSelected(caption));
          }
        }
      });
      return msg;
    };

    this._hClose = () => {
      this.props.onClose();
      this.setState(prevState => ({
        validationMessages: []
      }));
    };

    this._hSelectChartType = chartType => {
      if (isCategory(chartType)) {
        this._updateForDate(chartType);
      } else {
        this.setState(prevState => {
          this._setIsShowDate(prevState, false);

          return { ...prevState,
            chartType
          };
        });
      }
    };

    this._onRegColor = comp => {
      this.colorComp = comp;
    };

    this._fSelect = index => {
      return function (item) {
        this._items[index] = item ? { ...item
        } : void 0;
      }.bind(this);
    };

    this._hSelectDate = date => {
      this.date = date;
    };

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    });
    this.toolbarButtons = this._createType2WithToolbar(props, {
      noDate: true,
      isOptions: true,
      isToggle: true
    });
    this._commandButtons = this._crCommandsWithLoad(this);
    this._items = [];
    this._titles = [];
    this.state = {
      isLoading: true,
      isLoadFailed: false,
      isToolbar: true,
      isShowLabels: _has.default.wideWidth(),
      isRow: {
        isShowChart: true,
        isShowDate: false
      },
      ...crDateConfig('EMPTY'),
      //isToggle: false,
      //isOptions: false,
      configs: [],
      selectOptions: [],
      mapFrequency: props.mapFrequency,
      chartOptions: crOptions(props),
      //chartType
      validationMessages: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  }

  componentDidMount() {
    _loadDims(this.props, this._setConfigs);
  }

  componentDidUpdate(prevProps) {
    if (_isOpenAndPrevLoadFailed(prevProps, this.props, this.state)) {
      this.setState({
        isLoading: true,
        isLoadFailed: false
      });

      _loadDims(this.props, this._setConfigs);
    }
  }

  render() {
    const {
      isShow,
      caption,
      onShow,
      onFront
    } = this.props,
          {
      chartType,
      isToolbar,
      isOptions,
      isToggle,
      isShowLabels,
      isLoading,
      isLoadFailed,
      dateDefault,
      dateOptions,
      isRow,
      configs,
      chartOptions,
      validationMessages
    } = this.state,
          {
      isShowChart,
      isShowDate
    } = isRow,
          _spinnerStyle = isLoading ? S_SPINNER_LOADING : isLoadFailed ? { ...S_SPINNER_LOADING,
      ...S_SPINNER_FAILED
    } : void 0;

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
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
        selectProps: configs,
        isShowChart: isShowChart,
        isShowDate: isShowDate,
        crIsId: _crIsId,
        onToggle: this._toggleIsRow,
        onCheckCaption: this._checkCaptionBy,
        onUnCheckCaption: this._uncheckCaption,
        onClose: this._hideToggleWithToolbar
      }), _spinnerStyle ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpinnerLoading.default, {
        style: _spinnerStyle
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
        items: configs,
        crItem: _crSelectItem,
        isShowLabels: isShowLabels,
        isRow: isRow,
        fSelect: this._fSelect
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowChartDate, {
        chartType: chartType,
        isShowLabels: isShowLabels,
        isShowChart: isShowChart,
        chartOptions: chartOptions,
        onSelectChart: this._hSelectChartType,
        onRegColor: this._onRegColor,
        isShowDate: isShowDate,
        dateDefault: dateDefault,
        dateOptions: dateOptions,
        onSelecDate: this._hSelectDate
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
        validationMessages: validationMessages
      })]
    });
  }

}) || _class);
var _default = DialogStatN;
exports.default = _default;
//# sourceMappingURL=DialogStatN.js.map