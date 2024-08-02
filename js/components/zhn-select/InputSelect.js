"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ariaFn = require("../ariaFn");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _styleFn = require("../styleFn");
var _crAfterInputEl = _interopRequireDefault(require("./crAfterInputEl"));
var _InputSelectFn = require("./InputSelectFn");
var _ItemOptionDf = _interopRequireDefault(require("./ItemOptionDf"));
var _OptionsView = _interopRequireDefault(require("./OptionsView"));
var _useTouchHandlers = _interopRequireDefault(require("./useTouchHandlers"));
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const FN_NOOP = () => {},
  DF_PROP_NAME_CAPTION = "caption",
  _crItemFromInput = value => value ? {
    [DF_PROP_NAME_CAPTION]: value,
    value: value,
    isInput: true
  } : void 0;
const InputSelect = _ref => {
  let {
    labelId,
    propCaption = DF_PROP_NAME_CAPTION,
    ItemOptionComp = _ItemOptionDf.default,
    options: propsOptions,
    optionName = "",
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
    filters,
    onSelect = FN_NOOP,
    onLoadOption = FN_NOOP
  } = _ref;
  const _optionsViewId = (0, _uiApi.useId)(),
    _refInput = (0, _uiApi.useRef)(),
    _refOptionsComp = (0, _uiApi.useRef)(),
    _refIndexNode = (0, _uiApi.useRef)(),
    _refIndexActive = (0, _uiApi.useRef)(0),
    [isFocused, touchHandlers] = (0, _useTouchHandlers.default)(),
    [isShowOption, toggleIsShowOption] = (0, _useToggle.default)(),
    [state, setState] = (0, _uiApi.useState)(() => (0, _InputSelectFn.crInitialStateFromProps)(propCaption, propsOptions)),
    {
      value,
      options,
      initialOptions,
      nAll
    } = state,
    _getItemCaption = (0, _uiApi.useMemo)(() => item => (0, _InputSelectFn.crValue)((item || {})[propCaption]), [propCaption])

    /*eslint-disable react-hooks/exhaustive-deps */,
    [_hideOptions, _getCurrentComp, _decorateCurrentComp, _setSelectedItemIndex, _selectItem] = (0, _uiApi.useMemo)(() => [() => toggleIsShowOption(false), () => {
      const _optionsEl = (0, _uiApi.getRefValue)(_refOptionsComp);
      return _optionsEl ? _optionsEl.childNodes.item((0, _uiApi.getRefValue)(_refIndexActive)) : void 0;
    }, () => {
      (0, _InputSelectFn.decorateCurrentComp)(_getCurrentComp(), (0, _uiApi.getRefValue)(_refIndexNode), (0, _uiApi.getRefValue)(_refIndexActive));
    },
    // _getCurrentComp
    index => {
      if ((0, _uiApi.isNumber)(index) && index > -1) {
        (0, _InputSelectFn.undecorateComp)(_getCurrentComp());
        (0, _uiApi.setRefValue)(_refIndexActive, index);
      }
    },
    // _getCurrentComp
    item => {
      if (!item) {
        onSelect();
      } else if (item.value !== _InputSelectFn.NO_ITEMS_FOUND_VALUE) {
        const _item = {
          ...item
        };
        delete _item._c;
        onSelect(_item);
      } else {
        onSelect(isWithInput ? _crItemFromInput(item.inputValue.trim()) : void 0);
      }
    }
    // isWithInput, onSelect
    ], [])
    /*eslint-enable react-hooks/exhaustive-deps */,
    _hInputChange = evt => {
      const token = evt.target.value,
        tokenLn = token.length,
        valueLn = value.length;
      if (isWithInput && tokenLn > 0 && !regInput.test(token[tokenLn - 1])) {
        return;
      }
      if (tokenLn !== valueLn) {
        _setSelectedItemIndex(0);
        _decorateCurrentComp();
        setState(prevState => ({
          ...prevState,
          value: token,
          options: (0, _InputSelectFn.crFilterOptions)(tokenLn > valueLn ? options : initialOptions, token, {
            propCaption,
            isWithInput,
            maxInput,
            filters
          })
        }));
        toggleIsShowOption(true);
      }
    }

    /*eslint-disable react-hooks/exhaustive-deps */,
    _clearInput = (0, _uiApi.useMemo)(() => () => {
      _setSelectedItemIndex(0);
      _selectItem();
      toggleIsShowOption(false);
      setState(prevState => ({
        ...prevState,
        options: (0, _InputSelectFn.crOptionsFromInitialOptions)(prevState),
        value: ""
      }));
    }, [])
    // _getCurrentComp, _selectItem
    /*eslint-enable react-hooks/exhaustive-deps */,
    _hInputKeyDown = evt => {
      switch (evt.keyCode) {
        // enter
        case 13:
          {
            const item = options[(0, _uiApi.getRefValue)(_refIndexActive)],
              _value = _getItemCaption(item);
            if (_value) {
              toggleIsShowOption(false);
              setState(prevState => ({
                ...prevState,
                value: _value
              }));
              _selectItem(item);
            }
            break;
          }
        //escape, delete
        case 27:
        case 46:
          {
            evt.preventDefault();
            if (isShowOption) {
              toggleIsShowOption();
            } else {
              _clearInput();
            }
            break;
          }
        case 40:
          //down
          if (!isShowOption) {
            toggleIsShowOption();
          } else {
            evt.preventDefault();
            (0, _InputSelectFn.stepDownOption)(_getCurrentComp, _refIndexActive, options.length, (0, _uiApi.getRefValue)(_refIndexNode), (0, _uiApi.getRefValue)(_refOptionsComp));
          }
          break;
        case 38:
          //up
          if (isShowOption) {
            evt.preventDefault();
            (0, _InputSelectFn.stepUpOption)(_getCurrentComp, _refIndexActive, options.length, (0, _uiApi.getRefValue)(_refIndexNode), (0, _uiApi.getRefValue)(_refOptionsComp));
          }
          break;
        default:
          return;
      }
    }

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hClickItem = (0, _uiApi.useMemo)(() => (item, index) => {
      _setSelectedItemIndex(index);
      toggleIsShowOption(false);
      setState(prevState => ({
        ...prevState,
        value: _getItemCaption(item)
      }));
      _selectItem(item);
    }, [_getItemCaption])
    // _getCurrentComp, _selectItem
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    [_focusInput, _hClear] = (0, _uiApi.useMemo)(() => [() => {
      (0, _uiApi.focusRefElement)(_refInput);
    }, () => {
      _clearInput();
      _focusInput();
    }
    // _clearInput
    ], []);
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    _setSelectedItemIndex(0);
    toggleIsShowOption(false);
    setState((0, _InputSelectFn.crInitialStateFromProps)(propCaption, propsOptions));
  }, [propsOptions]);
  //propCaption, _setSelectedItemIndex
  /*eslint-unable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (isShowOption) {
      _decorateCurrentComp();
      (0, _InputSelectFn.makeVisible)(_getCurrentComp(), (0, _uiApi.getRefValue)(_refIndexActive), (0, _uiApi.getRefValue)(_refOptionsComp));
    }
  }, [isShowOption]);
  // _getCurrentComp
  /*eslint-unable react-hooks/exhaustive-deps */

  (0, _InputSelectFn.updateOptionsIfFilters)(state, setState, filters, propCaption, onSelect, _setSelectedItemIndex);
  const _rootWidthStyle = (0, _InputSelectFn.crWidthStyle)(width, style),
    [afterInputEl, _placeholder] = (0, _crAfterInputEl.default)(isLoading, isLoadingFailed, placeholder, optionName, optionNames, onLoadOption, isFocused && value, isShowOption, labelId, _optionsViewId, _hClear, toggleIsShowOption, propsOptions),
    _optionViewWidthStyle = (0, _InputSelectFn.crWidthStyle)(width, isShowOption ? _styleFn.S_BLOCK : _styleFn.S_NONE);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _CL.CL_ROOT,
    style: _rootWidthStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ...touchHandlers,
      ...(0, _ariaFn.crAriaExpandedProps)(isShowOption, _optionsViewId),
      ...(0, _ariaFn.crAriaComboboxProps)(labelId),
      ref: _refInput,
      className: _CL.CL_INPUT,
      type: "text",
      autoComplete: "off",
      autoCorrect: "off",
      spellCheck: false,
      value: value,
      placeholder: _placeholder,
      onChange: _hInputChange,
      onKeyDown: _hInputKeyDown
    }), afterInputEl, isShowOption && /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsView.default, {
      id: _optionsViewId,
      widthStyle: _optionViewWidthStyle,
      optionsStyle: optionsStyle,
      propCaption: propCaption,
      ItemOptionComp: ItemOptionComp,
      noFooterBts: noFooterBts,
      options: options,
      nAll: nAll,
      refOptionsComp: _refOptionsComp,
      refIndexNode: _refIndexNode,
      indexActive: (0, _uiApi.getRefValue)(_refIndexActive),
      onClickItem: _hClickItem,
      onClear: _hClear,
      onClickOutside: _hideOptions
    })]
  });
};
var _default = exports.default = InputSelect;
//# sourceMappingURL=InputSelect.js.map