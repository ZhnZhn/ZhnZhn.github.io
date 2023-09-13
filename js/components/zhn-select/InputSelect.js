"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _has = require("../has");
var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));
var _SvgClear = _interopRequireDefault(require("../zhn/SvgClear"));
var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle2"));
var _ItemOptionDf = _interopRequireDefault(require("./ItemOptionDf"));
var _OptionList = _interopRequireDefault(require("./OptionList"));
var _OptionsFooter = _interopRequireDefault(require("./OptionsFooter"));
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types'

const MAX_WITHOUT_ANIMATION = 800,
  INPUT_PREFIX = 'From input:',
  NO_RESULT = 'noresult',
  S_ARROW_SHOW = {
    borderColor: '#1b75bb transparent transparent'
  },
  S_SVG_CLEAR = {
    position: 'absolute',
    top: 5,
    right: 8,
    stroke: '#1b75bb'
  };
const _crValue = str => str.replace(INPUT_PREFIX, '').trim();
const _crInputItem = (inputValue, _ref) => {
  let {
    propCaption,
    isWithInput,
    maxInput
  } = _ref;
  const _inputValue = inputValue.slice(0, maxInput),
    _caption = isWithInput ? INPUT_PREFIX + " " + _inputValue : 'No results found';
  return {
    [propCaption]: _caption,
    value: NO_RESULT,
    inputValue: _inputValue
  };
};
const _crWidthStyle = (width, style) => width ? ('' + width).indexOf('%') !== -1 ? {
  ...style,
  width
} : {
  ...style,
  width: width + 'px'
} : null;
const _crFooterIndex = _ref2 => {
  let {
    options,
    initialOptions
  } = _ref2;
  return {
    _nFiltered: options[0] && options[0].value !== NO_RESULT ? options.length : 0,
    _nAll: initialOptions ? initialOptions.length : 0
  };
};
const _crInitialStateFromProps = _ref3 => {
  let {
    optionName,
    optionNames,
    options
  } = _ref3;
  return {
    value: '',
    isShowOption: false,
    initialOptions: options,
    options: options,
    optionNames: optionNames || optionName || '',
    isValidOptionListCache: false,
    isFocused: false
  };
};
const _filterOptions = (options, value, pnCaption) => {
  const _value = value.toLowerCase();
  return options.filter(item => item[pnCaption].toLowerCase().indexOf(_value) !== -1);
};
const _crFilterOptions = (options, token, props) => {
  const {
    propCaption
  } = props;
  const _arr = _filterOptions(options, token, propCaption);
  if (_arr.length === 0) {
    _arr.push(_crInputItem(token, props));
  }
  return _arr;
};
const FN_NOOP = () => {};
class InputSelect extends _uiApi.Component {
  constructor(_props) {
    super(_props);
    this._initProperties = () => {
      this.optionListCache = null;
      this.indexActiveOption = 0;
    };
    this._setStateToInit = props => {
      this._initProperties();
      this.setState(_crInitialStateFromProps(props));
    };
    this._getCurrentComp = () => {
      return this["v" + this.indexActiveOption];
    };
    this._decorateCurrentComp = () => {
      const comp = this._getCurrentComp();
      if (comp) {
        comp.classList.add(_CL.CL_OPTIONS_ROW_ACTIVE);
        if (this.indexNode) {
          this.indexNode.textContent = this.indexActiveOption + 1;
        }
      }
      return comp;
    };
    this._undecorateCurrentComp = comp => {
      const _comp = comp || this._getCurrentComp();
      if (_comp) {
        _comp.classList.remove(_CL.CL_OPTIONS_ROW_ACTIVE);
      }
    };
    this._calcDeltaTop = comp => {
      return comp && this.optionsComp ? comp.offsetTop - this.optionsComp.scrollTop : void 0;
    };
    this._makeVisible = comp => {
      if (comp) {
        if (this.indexActiveOption === 0) {
          return;
        }
        const deltaTop = this._calcDeltaTop(comp);
        if (deltaTop > 70) {
          this.optionsComp.scrollTop += deltaTop - 70;
        }
        if (deltaTop < 0) {
          this.optionsComp.scrollTop = 0;
        }
      }
    };
    this._hInputChange = event => {
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
        this._undecorateCurrentComp();
        this.indexActiveOption = 0;
        const _options = tokenLn > valueLn ? options : initialOptions;
        this.setState({
          value: token,
          isShowOption: true,
          isValidOptionListCache: false,
          options: _crFilterOptions(_options, token, this.props)
        });
      }
    };
    this._startAfterInputAnimation = () => {
      if (this.state.options.length > MAX_WITHOUT_ANIMATION) {
        (0, _uiApi.getRefValue)(this._refArrowCell).startAnimation();
      }
    };
    this._stopAfterInputAnimation = () => {
      (0, _uiApi.getRefValue)(this._refArrowCell).stopAnimation();
    };
    this._setShowOptions = () => {
      this.setState({
        isShowOption: true
      }, this._stopAfterInputAnimation);
    };
    this._showOptions = ms => {
      if (this.props.isShowOptionAnim) {
        this._startAfterInputAnimation();
        setTimeout(this._setShowOptions, ms);
      } else {
        this.setState({
          isShowOption: true
        });
      }
    };
    this._decorateByStep = isStepDown => {
      const fnPredicate = isStepDown ? delta => delta > 70 : delta => delta < 70,
        comp = this._decorateCurrentComp(),
        deltaTop = this._calcDeltaTop(comp);
      if (fnPredicate(deltaTop)) {
        this.optionsComp.scrollTop += deltaTop - 70;
      }
    };
    this._stepDownOption = () => {
      const prevComp = this._getCurrentComp();
      if (prevComp) {
        this._undecorateCurrentComp(prevComp);
        this.indexActiveOption += 1;
        if (this.indexActiveOption >= this.state.options.length) {
          this.indexActiveOption = 0;
          this.optionsComp.scrollTop = 0;
        }
        this._decorateByStep(true);
      }
    };
    this._stepUpOption = () => {
      const prevComp = this._getCurrentComp();
      if (prevComp) {
        this._undecorateCurrentComp(prevComp);
        this.indexActiveOption -= 1;
        if (this.indexActiveOption < 0) {
          this.indexActiveOption = this.state.options.length - 1;
          const bottomComp = this._getCurrentComp();
          this.optionsComp.scrollTop = bottomComp.offsetTop;
        }
        this._decorateByStep();
      }
    };
    this._selectItem = item => {
      const {
        onSelect,
        isWithInput
      } = this.props;
      if (!item) {
        onSelect();
      } else if (item.value !== NO_RESULT) {
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
    this._hInputKeyDown = event => {
      switch (event.keyCode) {
        // enter
        case 13:
          {
            const {
                propCaption
              } = this.props,
              item = this.state.options[this.indexActiveOption] || {},
              _value = item[propCaption];
            if (_value) {
              this.setState({
                value: _crValue(_value),
                isShowOption: false,
                isValidOptionListCache: true
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
            this._showOptions(0);
          } else {
            event.preventDefault();
            this._stepDownOption();
          }
          break;
        case 38:
          //up
          if (this.state.isShowOption) {
            event.preventDefault();
            this._stepUpOption();
          }
          break;
        default:
          return;
      }
    };
    this._hToggleOptions = () => {
      if (this.state.isShowOption) {
        this.setState({
          isShowOption: false
        });
      } else {
        this._showOptions(1);
      }
    };
    this._hClickItem = (item, index, propCaption) => {
      this._undecorateCurrentComp();
      this.indexActiveOption = index;
      this.setState({
        value: _crValue(item[propCaption]),
        isShowOption: false
      });
      this._selectItem(item);
    };
    this._refOptionsComp = c => this.optionsComp = c;
    this._refOptionNode = (n, index) => this["v" + index] = n;
    this._refIndexNode = n => this.indexNode = n;
    this._crOptionListWithCache = () => {
      const {
          propCaption,
          ItemOptionComp
        } = this.props,
        {
          options,
          isValidOptionListCache
        } = this.state;
      if (options && !isValidOptionListCache) {
        this.optionListCache = /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionList.default, {
          options: options,
          refOptionNode: this._refOptionNode,
          className: _CL.CL_OPTIONS_ROW,
          selectedIndex: this.indexActiveOption,
          propCaption: propCaption,
          onClick: this._hClickItem,
          ItemComp: ItemOptionComp
        });
      }
      return this.optionListCache;
    };
    this.renderOptions = () => {
      const {
          optionsStyle,
          width,
          noFooterBts
        } = this.props,
        {
          isShowOption
        } = this.state,
        _optionListEl = this._crOptionListWithCache(),
        _styleOptions = isShowOption ? _styleFn.S_BLOCK : _styleFn.S_NONE,
        _rootWidthStyle = _crWidthStyle(width, _styleOptions),
        {
          _nFiltered,
          _nAll
        } = _crFooterIndex(this.state);
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _CL.CL_OPTIONS,
        style: _rootWidthStyle,
        "data-scrollable": true,
        tabIndex: "-1",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          ref: this._refOptionsComp,
          className: _CL.CL_OPTIONS_DIV,
          style: {
            ...optionsStyle,
            ..._rootWidthStyle
          },
          tabIndex: "-1",
          children: _optionListEl
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsFooter.default, {
          ref: this._refIndexNode,
          noFooterBts: noFooterBts,
          indexActiveOption: this.indexActiveOption,
          nAll: _nAll,
          nFiltered: _nFiltered,
          onStepUp: this._stepUpOption,
          onStepDown: this._stepDownOption,
          onClear: this._hClear
        })]
      });
    };
    this._hClear = () => {
      this.clearInput();
      this.focusInput();
    };
    this._crAfterInputEl = () => {
      const {
          isLoading,
          isLoadingFailed,
          placeholder,
          optionName,
          onLoadOption
        } = this.props,
        {
          isShowOption,
          optionNames,
          isFocused,
          value
        } = this.state;
      let _placeholder, _afterInputEl;
      if (!isLoading && !isLoadingFailed) {
        if (isFocused && value) {
          _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClear.default, {
            style: S_SVG_CLEAR,
            onClick: this._hClear
          });
        } else {
          _placeholder = placeholder || "Select " + optionName + "...";
          _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowCell.default, {
            ref: this._refArrowCell,
            arrowStyle: isShowOption ? S_ARROW_SHOW : void 0,
            onClick: this._hToggleOptions
          });
        }
      } else if (isLoading) {
        _placeholder = "Loading " + optionNames + "...";
        _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: _CL.CL_SPINNER,
          "data-loader": "circle"
        });
      } else if (isLoadingFailed) {
        _placeholder = "Loading " + optionNames + " Failed";
        _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
          className: _CL.CL_SPINNER_FAILED,
          dataLoader: "circle-failed",
          onClick: onLoadOption
        });
      }
      return {
        placeholder: _placeholder,
        afterInputEl: _afterInputEl
      };
    };
    this._hFocus = () => {
      clearTimeout(this._blurId);
      this.setState({
        isFocused: true
      });
    };
    this._hBlur = () => {
      this._blurId = setTimeout(() => this.setState({
        isFocused: false
      }), 800);
    };
    this.clearInput = () => {
      this._undecorateCurrentComp();
      this._selectItem();
      this._setStateToInit(this.props);
    };
    this._touchHandlers = _has.HAS_TOUCH_EVENTS ? {
      onFocus: this._hFocus,
      onBlur: this._hBlur
    } : void 0;
    this._initProperties();
    this._refInput = (0, _uiApi.createRef)();
    this._refArrowCell = (0, _uiApi.createRef)();
    this.state = _crInitialStateFromProps(_props);
  }
  static getDerivedStateFromProps(props, state) {
    //Init state for new options from props
    if (props.options !== state.initialOptions) {
      return _crInitialStateFromProps(props);
    }
    return null;
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
      const comp = this._decorateCurrentComp();
      if (!prevState.isShowOption) {
        this._makeVisible(comp);
      }
    }
  }
  componentWillUnmount() {
    clearTimeout(this._blurId);
  }
  render() {
    const {
        style,
        width
      } = this.props,
      {
        value,
        isShowOption
      } = this.state,
      _rootWidthStyle = _crWidthStyle(width, style),
      {
        afterInputEl,
        placeholder
      } = this._crAfterInputEl();
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
      }), isShowOption && this.renderOptions()]
    });
  }
  focusInput() {
    (0, _uiApi.focusRefElement)(this._refInput);
  }
}
/*
static propTypes = {
   propCaption: PropTypes.string,
   ItemOptionComp: PropTypes.element,
   width: PropTypes.string,
   style: PropTypes.object,
   optionsStyle: PropTypes.object,
   isShowOptionAnim: PropTypes.bool,
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
InputSelect.defaultProps = {
  propCaption: 'caption',
  ItemOptionComp: _ItemOptionDf.default,
  options: [],
  optionName: '',
  optionNames: '',
  isWithInput: false,
  maxInput: 10,
  regInput: /[A-Za-z0-9()^ ]/,
  //prefixInput: 'From Input:',
  onSelect: FN_NOOP,
  onLoadOption: FN_NOOP
};
var _default = InputSelect;
exports.default = _default;
//# sourceMappingURL=InputSelect.js.map