"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _has = require("../has");
var _styleFn = require("../styleFn");
var _crAfterInputEl = _interopRequireDefault(require("./crAfterInputEl"));
var _InputSelectFn = require("./InputSelectFn");
var _ItemOptionDf = _interopRequireDefault(require("./ItemOptionDf"));
var _OptionsView = _interopRequireDefault(require("./OptionsView"));
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types'

const FN_NOOP = () => {};
class InputSelect extends _uiApi.Component {
  /*
  static propTypes = {
     propCaption: PropTypes.string,
     ItemOptionComp: PropTypes.element,
     width: PropTypes.string,
     style: PropTypes.object,
     optionsStyle: PropTypes.object,
     options: PropTypes.arrayOf(PropTypes.shape({
        caption: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
     })),
     optionName: PropTypes.string,
     optionNames: PropTypes.string,
     placeholder: PropTypes.string,
     isWithInput: PropTypes.bool,
     prefixInput: PropTypes.string
       isLoading: PropTypes.bool,
     isLoadingFailed: PropTypes.bool,
     noFooterBts: PropTypes.bool
       onSelect: PropTypes.func,
     onLoadOption: PropTypes.func
  }
  */

  static defaultProps = {
    propCaption: 'caption',
    ItemOptionComp: _ItemOptionDf.default,
    optionName: '',
    isWithInput: false,
    maxInput: 10,
    regInput: /[A-Za-z0-9()^ ]/,
    //prefixInput: 'From Input:',
    onSelect: FN_NOOP,
    onLoadOption: FN_NOOP
  };
  constructor(props) {
    super(props);
    this._touchHandlers = _has.HAS_TOUCH_EVENTS ? {
      onFocus: this._hFocus,
      onBlur: this._hBlur
    } : void 0;
    this._refInput = (0, _uiApi.createRef)();
    this._refIndexActive = (0, _uiApi.createRef)();
    this._refHmItems = (0, _uiApi.createRef)();
    this._refOptionsComp = (0, _uiApi.createRef)();
    this._refIndexNode = (0, _uiApi.createRef)();
    this._initProperties();
    this.state = (0, _InputSelectFn.crInitialStateFromProps)(props);
  }
  _initProperties = () => {
    (0, _uiApi.setRefValue)(this._refIndexActive, 0);
    (0, _uiApi.setRefValue)(this._refHmItems, Object.create(null));
  };
  static getDerivedStateFromProps(props, state) {
    //Init state for new options from props
    return props.options !== state.initialOptions ? (0, _InputSelectFn.crInitialStateFromProps)(props) : null;
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      initialOptions,
      isShowOption
    } = this.state;
    // Init from props for new options from props
    if (prevState.initialOptions !== initialOptions) {
      this._initProperties();
    }
    //Decorate Active Option and Make Visible
    if (isShowOption) {
      const comp = this._getCurrentComp(),
        _indexActive = (0, _uiApi.getRefValue)(this._refIndexActive);
      (0, _InputSelectFn.decorateCurrentComp)(comp, (0, _uiApi.getRefValue)(this._refIndexNode), _indexActive);
      if (!prevState.isShowOption) {
        (0, _InputSelectFn.makeVisible)(comp, _indexActive, (0, _uiApi.getRefValue)(this._refOptionsComp));
      }
    }
  }
  componentWillUnmount() {
    clearTimeout(this._blurId);
  }
  _setStateToInit = props => {
    this._initProperties();
    this.setState((0, _InputSelectFn.crInitialStateFromProps)(props));
  };
  _getCurrentComp = () => {
    return (0, _uiApi.getRefValue)(this._refHmItems)[`v${(0, _uiApi.getRefValue)(this._refIndexActive)}`];
  };
  _hInputChange = event => {
    const {
        isWithInput,
        regInput
      } = this.props,
      token = event.target.value,
      tokenLn = token.length,
      {
        value,
        options,
        initialOptions
      } = this.state,
      valueLn = value.length;
    if (isWithInput && tokenLn > 0 && !regInput.test(token[tokenLn - 1])) {
      return;
    }
    if (tokenLn !== valueLn) {
      (0, _InputSelectFn.undecorateComp)(this._getCurrentComp());
      (0, _uiApi.setRefValue)(this._refIndexActive, 0);
      const _options = tokenLn > valueLn ? options : initialOptions;
      this.setState({
        value: token,
        isShowOption: true,
        options: (0, _InputSelectFn.crFilterOptions)(_options, token, this.props)
      });
    }
  };
  _selectItem = item => {
    const {
      onSelect,
      isWithInput
    } = this.props;
    if (!item) {
      onSelect();
    } else if (item.value !== _InputSelectFn.NO_RESULT) {
      delete item._c;
      onSelect(item);
    } else if (!isWithInput) {
      onSelect();
    } else {
      const _value = item.inputValue.trim();
      if (!_value) {
        onSelect();
      } else {
        onSelect({
          caption: _value,
          value: _value,
          isInput: true
        });
      }
    }
  };
  _hInputKeyDown = event => {
    switch (event.keyCode) {
      // enter
      case 13:
        {
          const {
              propCaption
            } = this.props,
            item = this.state.options[(0, _uiApi.getRefValue)(this._refIndexActive)] || {},
            _value = item[propCaption];
          if (_value) {
            this.setState({
              value: (0, _InputSelectFn.crValue)(_value),
              isShowOption: false
            });
            this._selectItem(item);
          }
          break;
        }
      //escape, delete
      case 27:
      case 46:
        {
          event.preventDefault();
          if (this.state.isShowOption) {
            this.setState({
              isShowOption: false
            });
          } else {
            this.clearInput();
          }
          break;
        }
      case 40:
        //down
        if (!this.state.isShowOption) {
          this.setState({
            isShowOption: true
          });
        } else {
          event.preventDefault();
          (0, _InputSelectFn.stepDownOption)(this._getCurrentComp, this._refIndexActive, this.state.options.length, (0, _uiApi.getRefValue)(this._refIndexNode), (0, _uiApi.getRefValue)(this._refOptionsComp));
        }
        break;
      case 38:
        //up
        if (this.state.isShowOption) {
          event.preventDefault();
          (0, _InputSelectFn.stepUpOption)(this._getCurrentComp, this._refIndexActive, this.state.options.length, (0, _uiApi.getRefValue)(this._refIndexNode), (0, _uiApi.getRefValue)(this._refOptionsComp));
        }
        break;
      default:
        return;
    }
  };
  _hToggleOptions = () => {
    this.setState(prevState => ({
      ...prevState,
      isShowOption: !prevState.isShowOption
    }));
  };
  _hClickItem = (item, index, propCaption) => {
    (0, _InputSelectFn.undecorateComp)(this._getCurrentComp());
    (0, _uiApi.setRefValue)(this._refIndexActive, index);
    this.setState({
      value: (0, _InputSelectFn.crValue)(item[propCaption]),
      isShowOption: false
    });
    this._selectItem(item);
  };
  _refOptionNode = (n, index) => {
    const _hmItems = (0, _uiApi.getRefValue)(this._refHmItems);
    if (_hmItems) {
      _hmItems[`v${index}`] = n;
    }
  };
  _hClear = () => {
    this.clearInput();
    this.focusInput();
  };
  _hFocus = () => {
    clearTimeout(this._blurId);
    this.setState({
      isFocused: true
    });
  };
  _hBlur = () => {
    this._blurId = setTimeout(() => this.setState({
      isFocused: false
    }), 800);
  };
  render() {
    const {
        style,
        width,
        propCaption,
        ItemOptionComp,
        optionsStyle,
        noFooterBts
      } = this.props,
      {
        isShowOption,
        isFocused,
        value,
        options,
        nAll
      } = this.state,
      _rootWidthStyle = (0, _InputSelectFn.crWidthStyle)(width, style),
      [afterInputEl, placeholder] = (0, _crAfterInputEl.default)(this.props, isFocused && value, isShowOption, this._hClear, this._hToggleOptions),
      _optionViewWidthStyle = (0, _InputSelectFn.crWidthStyle)(width, isShowOption ? _styleFn.S_BLOCK : _styleFn.S_NONE);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _CL.CL_ROOT,
      style: _rootWidthStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        ref: this._refInput,
        className: _CL.CL_INPUT,
        type: "text",
        name: "select"
        //autoComplete="off"
        ,
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: false,
        value: value,
        placeholder: placeholder,
        onChange: this._hInputChange,
        onKeyDown: this._hInputKeyDown,
        ...this._touchHandlers
      }), afterInputEl, /*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {
        className: _CL.CL_INPUT_HR
      }), isShowOption && /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsView.default, {
        widthStyle: _optionViewWidthStyle,
        optionsStyle: optionsStyle,
        propCaption: propCaption,
        ItemOptionComp: ItemOptionComp,
        noFooterBts: noFooterBts,
        options: options,
        nAll: nAll,
        refOptionsComp: this._refOptionsComp,
        refOptionNode: this._refOptionNode,
        refIndexNode: this._refIndexNode,
        indexActive: (0, _uiApi.getRefValue)(this._refIndexActive),
        onClickItem: this._hClickItem,
        onClear: this._hClear
      })]
    });
  }
  clearInput = () => {
    (0, _InputSelectFn.undecorateComp)(this._getCurrentComp());
    this._selectItem();
    this._setStateToInit(this.props);
  };
  focusInput() {
    (0, _uiApi.focusRefElement)(this._refInput);
  }
}
var _default = exports.default = InputSelect;
//# sourceMappingURL=InputSelect.js.map