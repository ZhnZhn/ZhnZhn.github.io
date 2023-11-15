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

const INPUT_PREFIX = 'From input:',
  DF_OPTIONS = [],
  _isArr = Array.isArray;
const _crValue = str => str.replace(INPUT_PREFIX, '').trim();
const _crInputItem = (inputValue, _ref) => {
  let {
    propCaption,
    isWithInput,
    maxInput
  } = _ref;
  const _inputValue = inputValue.slice(0, maxInput),
    _caption = isWithInput ? `${INPUT_PREFIX} ${_inputValue}` : 'No results found';
  return {
    [propCaption]: _caption,
    value: _InputSelectFn.NO_RESULT,
    inputValue: _inputValue
  };
};
const _crInitialStateFromProps = _ref2 => {
  let {
    propCaption,
    options
  } = _ref2;
  const _options = _isArr(options) ? options : DF_OPTIONS;
  return {
    value: '',
    isShowOption: false,
    initialOptions: _options,
    options: _options.map(item => {
      item._c = item[propCaption].toLowerCase();
      return item;
    }),
    nAll: _options.length,
    isFocused: false
  };
};
const _filterOptions = (options, value) => {
  const _value = value.toLowerCase();
  return options.filter(item => item._c.indexOf(_value) !== -1);
};
const _crFilterOptions = (options, token, props) => {
  const _arr = _filterOptions(options, token);
  if (_arr.length === 0) {
    _arr.push(_crInputItem(token, props));
  }
  return _arr;
};
const _calcDeltaTop = (comp, optionsComp) => comp && optionsComp ? comp.offsetTop - optionsComp.scrollTop : void 0;
const _makeVisible = (comp, indexActive, optionsComp) => {
  if (comp) {
    if (indexActive === 0) {
      return;
    }
    const deltaTop = _calcDeltaTop(comp, optionsComp);
    if (deltaTop > 70) {
      optionsComp.scrollTop += deltaTop - 70;
    }
    if (deltaTop < 0) {
      optionsComp.scrollTop = 0;
    }
  }
};
const _decorateCurrentComp = (comp, indexEl, indexActive) => {
  if (comp) {
    comp.classList.add(_CL.CL_OPTIONS_ROW_ACTIVE);
    if (indexEl) {
      indexEl.textContent = indexActive + 1;
    }
  }
};
const _undecorateComp = comp => {
  if (comp) {
    comp.classList.remove(_CL.CL_OPTIONS_ROW_ACTIVE);
  }
};
const _predicateStepDown = delta => delta > 70,
  _predicateStepUp = delta => delta < 70,
  _decorateByStep = (fnPredicate, comp, indexEl, indexActive, optionsComp) => {
    _decorateCurrentComp(comp, indexEl, indexActive);
    const deltaTop = _calcDeltaTop(comp, optionsComp);
    if (fnPredicate(deltaTop)) {
      optionsComp.scrollTop += deltaTop - 70;
    }
  };
const _stepDownOption = (getCurrentComp, refIndexActive, maxIndex, indexEl, optionsComp) => {
  const prevComp = getCurrentComp();
  if (prevComp) {
    _undecorateComp(prevComp);
    (0, _uiApi.setRefValue)(refIndexActive, (0, _uiApi.getRefValue)(refIndexActive) + 1);
    if ((0, _uiApi.getRefValue)(refIndexActive) >= maxIndex) {
      (0, _uiApi.setRefValue)(refIndexActive, 0);
      optionsComp.scrollTop = 0;
    }
    _decorateByStep(_predicateStepDown, getCurrentComp(), indexEl, (0, _uiApi.getRefValue)(refIndexActive), optionsComp);
  }
};
const _stepUpOption = (getCurrentComp, refIndexActive, maxIndex, indexEl, optionsComp) => {
  const prevComp = getCurrentComp();
  if (prevComp) {
    _undecorateComp(prevComp);
    (0, _uiApi.setRefValue)(refIndexActive, (0, _uiApi.getRefValue)(refIndexActive) - 1);
    if ((0, _uiApi.getRefValue)(refIndexActive) < 0) {
      (0, _uiApi.setRefValue)(refIndexActive, maxIndex - 1);
      const bottomComp = getCurrentComp();
      optionsComp.scrollTop = bottomComp.offsetTop;
    }
    _decorateByStep(_predicateStepUp, getCurrentComp(), indexEl, (0, _uiApi.getRefValue)(refIndexActive), optionsComp);
  }
};
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
    this._initProperties();
    this.state = _crInitialStateFromProps(props);
  }
  _initProperties = () => {
    (0, _uiApi.setRefValue)(this._refIndexActive, 0);
  };
  static getDerivedStateFromProps(props, state) {
    //Init state for new options from props
    return props.options !== state.initialOptions ? _crInitialStateFromProps(props) : null;
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
      _decorateCurrentComp(comp, this.indexNode, _indexActive);
      if (!prevState.isShowOption) {
        _makeVisible(comp, _indexActive, this.optionsComp);
      }
    }
  }
  componentWillUnmount() {
    clearTimeout(this._blurId);
  }
  _setStateToInit = props => {
    this._initProperties();
    this.setState(_crInitialStateFromProps(props));
  };
  _getCurrentComp = () => {
    return this[`v${(0, _uiApi.getRefValue)(this._refIndexActive)}`];
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
      _undecorateComp(this._getCurrentComp());
      (0, _uiApi.setRefValue)(this._refIndexActive, 0);
      const _options = tokenLn > valueLn ? options : initialOptions;
      this.setState({
        value: token,
        isShowOption: true,
        options: _crFilterOptions(_options, token, this.props)
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
              value: _crValue(_value),
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
          _stepDownOption(this._getCurrentComp, this._refIndexActive, this.state.options.length, this.indexNode, this.optionsComp);
        }
        break;
      case 38:
        //up
        if (this.state.isShowOption) {
          event.preventDefault();
          _stepUpOption(this._getCurrentComp, this._refIndexActive, this.state.options.length, this.indexNode, this.optionsComp);
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
    _undecorateComp(this._getCurrentComp());
    (0, _uiApi.setRefValue)(this._refIndexActive, index);
    this.setState({
      value: _crValue(item[propCaption]),
      isShowOption: false
    });
    this._selectItem(item);
  };
  _refOptionsComp = c => this.optionsComp = c;
  _refOptionNode = (n, index) => this[`v${index}`] = n;
  _refIndexNode = n => this.indexNode = n;
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
    _undecorateComp(this._getCurrentComp());
    this._selectItem();
    this._setStateToInit(this.props);
  };
  focusInput() {
    (0, _uiApi.focusRefElement)(this._refInput);
  }
}
var _default = exports.default = InputSelect;
//# sourceMappingURL=InputSelect.js.map