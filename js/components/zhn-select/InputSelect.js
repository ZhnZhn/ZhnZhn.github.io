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
const FN_NOOP = () => {};
const InputSelect = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    propCaption = 'caption',
    ItemOptionComp = _ItemOptionDf.default,
    options: propsOptions,
    optionName = '',
    isWithInput = false,
    maxInput = 10,
    regInput = /[A-Za-z0-9()^ ]/,
    style,
    width,
    optionsStyle,
    noFooterBts,
    isLoading,
    isLoadingFailed,
    placeholder,
    optionNames,
    onSelect = FN_NOOP,
    onLoadOption = FN_NOOP
  } = _ref;
  const _refInput = (0, _uiApi.useRef)(),
    _refIndexActive = (0, _uiApi.useRef)(),
    _refHmItems = (0, _uiApi.useRef)(),
    _refOptionsComp = (0, _uiApi.useRef)(),
    _refIndexNode = (0, _uiApi.useRef)(),
    _refBlurId = (0, _uiApi.useRef)(),
    _refOptionNode = (0, _uiApi.useCallback)((n, index) => {
      const _hmItems = (0, _uiApi.getRefValue)(_refHmItems);
      if (_hmItems) {
        _hmItems[`v${index}`] = n;
      }
    }, []),
    [state, setState] = (0, _uiApi.useState)(() => (0, _InputSelectFn.crInitialStateFromProps)(propCaption, propsOptions)),
    {
      value,
      options,
      initialOptions,
      isShowOption,
      isFocused,
      nAll
    } = state,
    _initProperties = () => {
      (0, _uiApi.setRefValue)(_refIndexActive, 0);
      (0, _uiApi.setRefValue)(_refHmItems, Object.create(null));
    },
    _getCurrentComp = (0, _uiApi.useCallback)(() => (0, _uiApi.getRefValue)(_refHmItems)[`v${(0, _uiApi.getRefValue)(_refIndexActive)}`], [])

    /*eslint-disable react-hooks/exhaustive-deps */,
    _decorateCurrentComp = (0, _uiApi.useCallback)(() => {
      (0, _InputSelectFn.decorateCurrentComp)(_getCurrentComp(), (0, _uiApi.getRefValue)(_refIndexNode), (0, _uiApi.getRefValue)(_refIndexActive));
    }, [])
    // _getCurrentComp
    /*eslint-enable react-hooks/exhaustive-deps */,
    _hInputChange = event => {
      const token = event.target.value,
        tokenLn = token.length,
        valueLn = value.length;
      if (isWithInput && tokenLn > 0 && !regInput.test(token[tokenLn - 1])) {
        return;
      }
      if (tokenLn !== valueLn) {
        (0, _InputSelectFn.undecorateComp)(_getCurrentComp());
        (0, _uiApi.setRefValue)(_refIndexActive, 0);
        _decorateCurrentComp();
        const _options = tokenLn > valueLn ? options : initialOptions;
        setState(prevState => ({
          ...prevState,
          value: token,
          isShowOption: true,
          options: (0, _InputSelectFn.crFilterOptions)(_options, token, {
            propCaption,
            isWithInput,
            maxInput
          })
        }));
      }
    }

    /*eslint-disable react-hooks/exhaustive-deps */,
    _selectItem = (0, _uiApi.useCallback)(item => {
      if (!item) {
        onSelect();
      } else if (item.value !== _InputSelectFn.NO_RESULT) {
        const _item = {
          ...item
        };
        delete _item._c;
        onSelect(_item);
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
    }, [])
    // isWithInput, onSelect
    /*eslint-unable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    _clearInput = (0, _uiApi.useCallback)(() => {
      (0, _InputSelectFn.undecorateComp)(_getCurrentComp());
      (0, _uiApi.setRefValue)(_refIndexActive, 0);
      _selectItem();
      setState(prevState => ({
        ...prevState,
        options: prevState.initialOptions,
        isShowOption: false,
        value: ''
      }));
    }, [])
    // _getCurrentComp, _selectItem
    /*eslint-enable react-hooks/exhaustive-deps */,
    _hInputKeyDown = event => {
      switch (event.keyCode) {
        // enter
        case 13:
          {
            const item = options[(0, _uiApi.getRefValue)(_refIndexActive)] || {},
              _value = item[propCaption];
            if (_value) {
              setState(prevState => ({
                ...prevState,
                value: (0, _InputSelectFn.crValue)(_value),
                isShowOption: false
              }));
              _selectItem(item);
            }
            break;
          }
        //escape, delete
        case 27:
        case 46:
          {
            event.preventDefault();
            if (isShowOption) {
              setState(prevState => ({
                ...prevState,
                isShowOption: false
              }));
            } else {
              _clearInput();
            }
            break;
          }
        case 40:
          //down
          if (!isShowOption) {
            setState(prevState => ({
              ...prevState,
              isShowOption: true
            }));
          } else {
            event.preventDefault();
            (0, _InputSelectFn.stepDownOption)(_getCurrentComp, _refIndexActive, options.length, (0, _uiApi.getRefValue)(_refIndexNode), (0, _uiApi.getRefValue)(_refOptionsComp));
          }
          break;
        case 38:
          //up
          if (isShowOption) {
            event.preventDefault();
            (0, _InputSelectFn.stepUpOption)(_getCurrentComp, _refIndexActive, options.length, (0, _uiApi.getRefValue)(_refIndexNode), (0, _uiApi.getRefValue)(_refOptionsComp));
          }
          break;
        default:
          return;
      }
    },
    _hToggleOptions = () => {
      setState(prevState => ({
        ...prevState,
        isShowOption: !prevState.isShowOption
      }));
    }

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hClickItem = (0, _uiApi.useCallback)((item, index, propCaption) => {
      (0, _InputSelectFn.undecorateComp)(_getCurrentComp());
      (0, _uiApi.setRefValue)(_refIndexActive, index);
      setState(prevState => ({
        ...prevState,
        value: (0, _InputSelectFn.crValue)(item[propCaption]),
        isShowOption: false
      }));
      _selectItem(item);
    }, [_selectItem])
    // _getCurrentComp
    /*eslint-unable react-hooks/exhaustive-deps */,
    _focusInput = (0, _uiApi.useCallback)(() => {
      (0, _uiApi.focusRefElement)(_refInput);
    }, []),
    _hClear = (0, _uiApi.useCallback)(() => {
      _clearInput();
      _focusInput();
    }, []),
    _hFocus = (0, _uiApi.useCallback)(() => {
      clearTimeout((0, _uiApi.getRefValue)(_refBlurId));
      setState(prevState => ({
        ...prevState,
        isFocused: true
      }));
    }, []),
    _hBlur = (0, _uiApi.useCallback)(() => {
      (0, _uiApi.setRefValue)(_refBlurId, setTimeout(() => setState(prevState => ({
        ...prevState,
        isFocused: false
      })), 800));
    }, []),
    _refTouchHandlers = (0, _uiApi.useRef)(_has.HAS_TOUCH_EVENTS ? {
      onFocus: _hFocus,
      onBlur: _hBlur
    } : void 0);
  (0, _uiApi.useImperativeHandle)(ref, () => ({
    clearInput: _clearInput,
    focusInput: _focusInput
  }));
  (0, _uiApi.useEffect)(() => {
    _initProperties();
    return () => {
      clearTimeout((0, _uiApi.getRefValue)(_refBlurId));
    };
  }, []);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    _initProperties();
    setState((0, _InputSelectFn.crInitialStateFromProps)(propCaption, propsOptions));
  }, [propsOptions]);
  //propCaption
  /*eslint-unable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (isShowOption) {
      const comp = _getCurrentComp(),
        _indexActive = (0, _uiApi.getRefValue)(_refIndexActive);
      _decorateCurrentComp();
      (0, _InputSelectFn.makeVisible)(comp, _indexActive, (0, _uiApi.getRefValue)(_refOptionsComp));
    }
  }, [isShowOption]);
  // _getCurrentComp
  /*eslint-unable react-hooks/exhaustive-deps */

  const _rootWidthStyle = (0, _InputSelectFn.crWidthStyle)(width, style),
    [afterInputEl, _placeholder] = (0, _crAfterInputEl.default)(isLoading, isLoadingFailed, placeholder, optionName, optionNames, onLoadOption, isFocused && value, isShowOption, _hClear, _hToggleOptions),
    _optionViewWidthStyle = (0, _InputSelectFn.crWidthStyle)(width, isShowOption ? _styleFn.S_BLOCK : _styleFn.S_NONE);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _CL.CL_ROOT,
    style: _rootWidthStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ref: _refInput,
      className: _CL.CL_INPUT,
      type: "text",
      name: "select"
      //autoComplete="off"
      ,
      autoCorrect: "off",
      autoCapitalize: "off",
      spellCheck: false,
      value: value,
      placeholder: _placeholder,
      onChange: _hInputChange,
      onKeyDown: _hInputKeyDown,
      ...(0, _uiApi.getRefValue)(_refTouchHandlers)
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
      refOptionsComp: _refOptionsComp,
      refOptionNode: _refOptionNode,
      refIndexNode: _refIndexNode,
      indexActive: (0, _uiApi.getRefValue)(_refIndexActive),
      onClickItem: _hClickItem,
      onClear: _hClear
    })]
  });
});
var _default = exports.default = InputSelect;
//# sourceMappingURL=InputSelect.js.map