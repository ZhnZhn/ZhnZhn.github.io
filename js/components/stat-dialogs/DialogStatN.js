"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _loadConfigs = _interopRequireDefault(require("./loadConfigs"));

var _ChartTypes = _interopRequireDefault(require("../dialogs/ChartTypes"));

var _SpinnerLoading = _interopRequireDefault(require("../zhn/SpinnerLoading"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

var _dec, _class;

const {
  Decor,
  crMenuMore,
  crDateConfig
} = _DialogCell.default;
const MAP_FREQUENCY_DF = 'M',
      MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again.";
const S = {
  SPINNER_LOADING: {
    margin: '16px auto 32px'
  },
  SPINNER_FAILED: {
    borderColor: '#f44336',
    animation: 'none'
  }
};
const {
  isCategory,
  crOptions
} = _ChartTypes.default;

const _crIsId = id => "is" + id + "Select";

const _isOpenAndPrevLoadFailed = (prevProps, props, state) => props !== prevProps && !prevProps.isShow && props.isShow && state.isLoadFailed;

let DialogStatN = (_dec = Decor.dialog, _dec(_class = class DialogStatN extends _react.Component {
  constructor(props) {
    super(props);

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

    this._loadDims = () => {
      const {
        dims,
        proxy,
        baseMeta,
        dfProps
      } = this.props;
      (0, _loadConfigs.default)({
        dims,
        proxy,
        baseMeta,
        ...dfProps
      }).then(this._setConfigs).catch(err => {
        this._setConfigs({
          errMsg: err.message
        });
      });
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

      this.setState({
        isShowDate: true,
        ...dateConfig,
        chartType
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
        configs,
        isLoadFailed,
        chartType = {}
      } = this.state,
            _isCategory = isCategory(chartType),
            {
        dim
      } = chartType;

      if (!isLoadFailed) {
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
      } else {
        msg.push(MSG_DIMS_NOT_LOADED);
      }

      return msg;
    };

    this._handleClose = () => {
      this._handleWithValidationClose();
    };

    this._hSelectChartType = chartType => {
      if (isCategory(chartType)) {
        this._updateForDate(chartType);
      } else {
        this.setState({
          chartType,
          isShowDate: false
        });
      }
    };

    this._onRegColor = comp => {
      this.colorComp = comp;
    };

    this._fSelect = index => {
      return function (item) {
        this._items[index] = { ...item
        };
      };
    };

    this._hSelectDate = date => {
      this.date = date;
    };

    this._renderSelectInputs = () => {
      const {
        isShowLabels,
        configs
      } = this.state;
      return configs.map((conf, index) => {
        const {
          id,
          caption,
          options
        } = conf,
              _isShow = !this.state[_crIsId(id)];

        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
          isShow: _isShow,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
            isShowLabels: isShowLabels,
            caption: caption,
            options: options,
            onSelect: this._fSelect(index).bind(this)
          })
        }, id);
      });
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
    this.state = { ...this._isWithInitialState(),
      isLoading: true,
      isLoadFailed: false,
      isShowChart: true,
      isShowDate: false,
      ...crDateConfig('EMPTY'),
      isOptions: false,
      isToggle: false,
      configs: [],
      selectOptions: [],
      mapFrequency: props.mapFrequency,
      chartOptions: crOptions(props) //chartType

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
    this._loadDims();
  }

  componentDidUpdate(prevProps) {
    if (_isOpenAndPrevLoadFailed(prevProps, this.props, this.state)) {
      this.setState({
        isLoading: true,
        isLoadFailed: false
      });

      this._loadDims();
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
      isShowChart,
      isShowDate,
      dateDefault,
      dateOptions,
      configs,
      chartOptions,
      validationMessages
    } = this.state,
          _spinnerStyle = isLoading ? S.SPINNER_LOADING : isLoadFailed ? { ...S.SPINNER_LOADING,
      ...S.SPINNER_FAILED
    } : void 0;

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose,
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
        onToggle: this._toggleStateBy,
        onCheckCaption: this._checkCaptionBy,
        onUnCheckCaption: this._uncheckCaption,
        onClose: this._hideToggleWithToolbar
      }), _spinnerStyle ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpinnerLoading.default, {
        style: _spinnerStyle
      }) : this._renderSelectInputs(), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowChartDate, {
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