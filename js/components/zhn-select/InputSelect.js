"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _has = _interopRequireDefault(require("../has"));

var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));

var _SvgClear = _interopRequireDefault(require("../zhn/SvgClear"));

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle2"));

var _ItemOptionDf = _interopRequireDefault(require("./ItemOptionDf"));

var _OptionList = _interopRequireDefault(require("./OptionList"));

var _OptionsFooter = _interopRequireDefault(require("./OptionsFooter"));

var _CL = _interopRequireDefault(require("./CL"));

//import PropTypes from 'prop-types'
var MAX_WITHOUT_ANIMATION = 800;
var INPUT_PREFIX = 'From input:';
var NO_RESULT = 'noresult';

var _crInputItem = function _crInputItem(inputValue, _ref) {
  var _ref2;

  var propCaption = _ref.propCaption,
      isWithInput = _ref.isWithInput,
      maxInput = _ref.maxInput;

  var _inputValue = inputValue.substring(0, maxInput),
      _caption = isWithInput ? INPUT_PREFIX + " " + _inputValue : 'No results found';

  return _ref2 = {}, _ref2[propCaption] = _caption, _ref2.value = NO_RESULT, _ref2.inputValue = _inputValue, _ref2;
};

var _crWidthStyle = function _crWidthStyle(width, style) {
  return width ? ('' + width).indexOf('%') !== -1 ? (0, _extends2["default"])({}, style, {
    width: width
  }) : (0, _extends2["default"])({}, style, {
    width: width + 'px'
  }) : null;
};

var _crFooterIndex = function _crFooterIndex(_ref3) {
  var options = _ref3.options,
      initialOptions = _ref3.initialOptions;
  return {
    _nFiltered: options[0] && options[0].value !== NO_RESULT ? options.length : 0,
    _nAll: initialOptions ? initialOptions.length : 0
  };
};

var S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  },
  ARROW_SHOW: {
    borderColor: '#1b75bb transparent transparent'
  },
  SVG_CLEAR: {
    position: 'absolute',
    top: 5,
    right: 8,
    stroke: '#1b75bb'
  }
};

var _crInitialStateFromProps = function _crInitialStateFromProps(_ref4) {
  var optionName = _ref4.optionName,
      optionNames = _ref4.optionNames,
      options = _ref4.options;
  return {
    value: '',
    isShowOption: false,
    initialOptions: options,
    options: options,
    optionNames: optionNames || optionName || '',
    isValidDomOptionsCache: false,
    isLocalMode: false,
    isFocused: false
  };
};

var _crValue = function _crValue(str) {
  return str.replace(INPUT_PREFIX, '').trim();
};

var _filterOptions = function _filterOptions(options, value, pnCaption) {
  var _value = value.toLowerCase();

  return options.filter(function (item) {
    return item[pnCaption].toLowerCase().indexOf(_value) !== -1;
  });
};

var _crFilterOptions = function _crFilterOptions(options, token, props) {
  var propCaption = props.propCaption;

  var _arr = _filterOptions(options, token, propCaption);

  if (_arr.length === 0) {
    _arr.push(_crInputItem(token, props));
  }

  return _arr;
};

var _getCurrent = function _getCurrent(ref) {
  return ref.current;
};

var InputSelect = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(InputSelect, _Component);

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
       onSelect: PropTypes.func,
     onLoadOption: PropTypes.func
  }
  */
  function InputSelect(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _this._initProperties = function () {
      _this.domOptionsCache = null;
      _this.indexActiveOption = 0;
    };

    _this._setStateToInit = function (props) {
      _this._initProperties();

      _this.setState(_crInitialStateFromProps(props));
    };

    _this._getCurrentComp = function () {
      return _this["v" + _this.indexActiveOption];
    };

    _this._decorateCurrentComp = function () {
      var comp = _this._getCurrentComp();

      if (comp) {
        comp.classList.add(_CL["default"].OPTIONS_ROW_ACTIVE);

        if (_this.indexNode) {
          _this.indexNode.textContent = _this.indexActiveOption + 1;
        }
      }

      return comp;
    };

    _this._undecorateCurrentComp = function (comp) {
      var _comp = comp || _this._getCurrentComp();

      if (_comp) {
        _comp.classList.remove(_CL["default"].OPTIONS_ROW_ACTIVE);
      }
    };

    _this._calcDeltaTop = function (comp) {
      return comp && _this.optionsComp ? comp.offsetTop - _this.optionsComp.scrollTop : void 0;
    };

    _this._makeVisible = function (comp) {
      if (comp) {
        if (_this.indexActiveOption === 0) {
          return;
        }

        var deltaTop = _this._calcDeltaTop(comp);

        if (deltaTop > 70) {
          _this.optionsComp.scrollTop += deltaTop - 70;
        }

        if (deltaTop < 0) {
          _this.optionsComp.scrollTop = 0;
        }
      }
    };

    _this._hInputChange = function (event) {
      var _this$props = _this.props,
          isWithInput = _this$props.isWithInput,
          regInput = _this$props.regInput,
          token = event.target.value,
          tokenLn = token.length,
          _this$state = _this.state,
          value = _this$state.value,
          options = _this$state.options,
          initialOptions = _this$state.initialOptions,
          valueLn = value.length;

      if (isWithInput && tokenLn > 0 && !regInput.test(token[tokenLn - 1])) {
        return;
      }

      if (tokenLn !== valueLn) {
        _this._undecorateCurrentComp();

        _this.indexActiveOption = 0;

        var _options = tokenLn > valueLn ? options : initialOptions;

        _this.setState({
          value: token,
          isShowOption: true,
          isValidDomOptionsCache: false,
          options: _crFilterOptions(_options, token, _this.props)
        });
      }
    };

    _this._startAfterInputAnimation = function () {
      if (_this.state.options.length > MAX_WITHOUT_ANIMATION) {
        _getCurrent(_this._refArrowCell).startAnimation();
      }
    };

    _this._stopAfterInputAnimation = function () {
      _getCurrent(_this._refArrowCell).stopAnimation();
    };

    _this._setShowOptions = function () {
      _this.setState({
        isShowOption: true
      }, _this._stopAfterInputAnimation);
    };

    _this._showOptions = function (ms) {
      if (_this.props.isShowOptionAnim) {
        _this._startAfterInputAnimation();

        setTimeout(_this._setShowOptions, ms);
      } else {
        _this.setState({
          isShowOption: true
        });
      }
    };

    _this._decorateByStep = function (isStepDown) {
      var fnPredicate = isStepDown ? function (delta) {
        return delta > 70;
      } : function (delta) {
        return delta < 70;
      },
          comp = _this._decorateCurrentComp(),
          deltaTop = _this._calcDeltaTop(comp);

      if (fnPredicate(deltaTop)) {
        _this.optionsComp.scrollTop += deltaTop - 70;
      }
    };

    _this._stepDownOption = function () {
      var prevComp = _this._getCurrentComp();

      if (prevComp) {
        _this._undecorateCurrentComp(prevComp);

        _this.indexActiveOption += 1;

        if (_this.indexActiveOption >= _this.state.options.length) {
          _this.indexActiveOption = 0;
          _this.optionsComp.scrollTop = 0;
        }

        _this._decorateByStep(true);
      }
    };

    _this._stepUpOption = function () {
      var prevComp = _this._getCurrentComp();

      if (prevComp) {
        _this._undecorateCurrentComp(prevComp);

        _this.indexActiveOption -= 1;

        if (_this.indexActiveOption < 0) {
          _this.indexActiveOption = _this.state.options.length - 1;

          var bottomComp = _this._getCurrentComp();

          _this.optionsComp.scrollTop = bottomComp.offsetTop;
        }

        _this._decorateByStep();
      }
    };

    _this._selectItem = function (item) {
      var _this$props2 = _this.props,
          onSelect = _this$props2.onSelect,
          isWithInput = _this$props2.isWithInput;

      if (!item) {
        onSelect();
      } else if (item.value !== NO_RESULT) {
        onSelect(item);
      } else if (!isWithInput) {
        onSelect();
      } else {
        var _value = item.inputValue.trim();

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

    _this._hInputKeyDown = function (event) {
      switch (event.keyCode) {
        // enter
        case 13:
          {
            var propCaption = _this.props.propCaption,
                item = _this.state.options[_this.indexActiveOption] || {},
                _value = item[propCaption];

            if (_value) {
              _this.setState({
                value: _crValue(_value),
                isShowOption: false,
                isValidDomOptionsCache: true
              });

              _this._selectItem(item);
            }

            break;
          }
        //escape, delete

        case 27:
        case 46:
          {
            event.preventDefault();

            if (_this.state.isShowOption) {
              _this.setState({
                isShowOption: false
              });
            } else {
              _this.clearInput();
            }

            break;
          }

        case 40:
          //down
          if (!_this.state.isShowOption) {
            _this._showOptions(0);
          } else {
            event.preventDefault();

            _this._stepDownOption();
          }

          break;

        case 38:
          //up
          if (_this.state.isShowOption) {
            event.preventDefault();

            _this._stepUpOption();
          }

          break;

        default:
          return;
      }
    };

    _this._hToggleOptions = function () {
      if (_this.state.isShowOption) {
        _this.setState({
          isShowOption: false
        });
      } else {
        _this._showOptions(1);
      }
    };

    _this._hClickItem = function (item, index, propCaption) {
      _this._undecorateCurrentComp();

      _this.indexActiveOption = index;

      _this.setState({
        value: _crValue(item[propCaption]),
        isShowOption: false
      });

      _this._selectItem(item);
    };

    _this._refOptionsComp = function (c) {
      return _this.optionsComp = c;
    };

    _this._refIndexNode = function (n) {
      return _this.indexNode = n;
    };

    _this._refOptionNode = function (n, index) {
      return _this["v" + index] = n;
    };

    _this._crOptionListWithCache = function () {
      var _this$props3 = _this.props,
          propCaption = _this$props3.propCaption,
          ItemOptionComp = _this$props3.ItemOptionComp,
          _this$state2 = _this.state,
          options = _this$state2.options,
          isValidDomOptionsCache = _this$state2.isValidDomOptionsCache;

      if (options && !isValidDomOptionsCache) {
        _this.domOptionsCache = /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionList["default"], {
          options: options,
          refOptionNode: _this._refOptionNode,
          className: _CL["default"].OPTIONS_ROW,
          selectedIndex: _this.indexActiveOption,
          propCaption: propCaption,
          onClick: _this._hClickItem,
          ItemComp: ItemOptionComp
        });
      }

      return _this.domOptionsCache;
    };

    _this.renderOptions = function () {
      var _this$props4 = _this.props,
          optionsStyle = _this$props4.optionsStyle,
          width = _this$props4.width,
          isShowOption = _this.state.isShowOption,
          _optionListEl = _this._crOptionListWithCache(),
          _styleOptions = isShowOption ? S.BLOCK : S.NONE,
          _rootWidthStyle = _crWidthStyle(width, _styleOptions),
          _crFooterIndex2 = _crFooterIndex(_this.state),
          _nFiltered = _crFooterIndex2._nFiltered,
          _nAll = _crFooterIndex2._nAll;

      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _CL["default"].OPTIONS,
        style: _rootWidthStyle,
        "data-scrollable": true,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          ref: _this._refOptionsComp,
          className: _CL["default"].OPTIONS_DIV,
          style: (0, _extends2["default"])({}, optionsStyle, _rootWidthStyle),
          children: _optionListEl
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsFooter["default"], {
          ref: _this._refIndexNode,
          indexActiveOption: _this.indexActiveOption,
          nAll: _nAll,
          nFiltered: _nFiltered,
          onStepUp: _this._stepUpOption,
          onStepDown: _this._stepDownOption,
          onClear: _this._hClear
        })]
      });
    };

    _this._hClear = function () {
      _this.clearInput();

      _this.focusInput();
    };

    _this._crAfterInputEl = function () {
      var _this$props5 = _this.props,
          isLoading = _this$props5.isLoading,
          isLoadingFailed = _this$props5.isLoadingFailed,
          placeholder = _this$props5.placeholder,
          optionName = _this$props5.optionName,
          onLoadOption = _this$props5.onLoadOption,
          _this$state3 = _this.state,
          isShowOption = _this$state3.isShowOption,
          optionNames = _this$state3.optionNames,
          isFocused = _this$state3.isFocused,
          value = _this$state3.value;

      var _placeholder, _afterInputEl;

      if (!isLoading && !isLoadingFailed) {
        if (isFocused && value) {
          _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClear["default"], {
            style: S.SVG_CLEAR,
            onClick: _this._hClear
          });
        } else {
          _placeholder = placeholder || "Select " + optionName + "...";
          _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowCell["default"], {
            ref: _this._refArrowCell,
            arrowStyle: isShowOption ? S.ARROW_SHOW : void 0,
            onClick: _this._hToggleOptions
          });
        }
      } else if (isLoading) {
        _placeholder = "Loading " + optionNames + "...";
        _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: _CL["default"].SPINNER,
          "data-loader": "circle"
        });
      } else if (isLoadingFailed) {
        _placeholder = "Loading " + optionNames + " Failed";
        _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle["default"], {
          className: _CL["default"].SPINNER_FAILED,
          dataLoader: "circle-failed",
          onClick: onLoadOption
        });
      }

      return {
        placeholder: _placeholder,
        afterInputEl: _afterInputEl
      };
    };

    _this._hFocus = function () {
      clearTimeout(_this._blurId);

      _this.setState({
        isFocused: true
      });
    };

    _this._hBlur = function () {
      _this._blurId = setTimeout(function () {
        return _this.setState({
          isFocused: false
        });
      }, 800);
    };

    _this._refInput = function (node) {
      return _this._nodeInput = node;
    };

    _this.clearInput = function () {
      _this._undecorateCurrentComp();

      _this._selectItem();

      _this._setStateToInit(_this.props);
    };

    _this._touchHandlers = _has["default"].touch ? {
      onFocus: _this._hFocus,
      onBlur: _this._hBlur
    } : void 0;

    _this._initProperties();

    _this._refArrowCell = /*#__PURE__*/(0, _react.createRef)();
    _this.state = _crInitialStateFromProps(_props);
    return _this;
  }

  InputSelect.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    //Init state for new options from props
    if (props.options !== state.initialOptions) {
      return _crInitialStateFromProps(props);
    }

    return null;
  };

  var _proto = InputSelect.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this$state4 = this.state,
        initialOptions = _this$state4.initialOptions,
        isShowOption = _this$state4.isShowOption; // Init from props for new options from props

    if (prevState.initialOptions !== initialOptions) {
      this._initProperties();
    } //Decorate Active Option and Make Visible


    if (isShowOption) {
      var comp = this._decorateCurrentComp();

      if (!prevState.isShowOption) {
        this._makeVisible(comp);
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this._blurId);
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        style = _this$props6.style,
        width = _this$props6.width,
        _this$state5 = this.state,
        value = _this$state5.value,
        isLocalMode = _this$state5.isLocalMode,
        isShowOption = _this$state5.isShowOption,
        _rootWidthStyle = _crWidthStyle(width, style),
        _this$_crAfterInputEl = this._crAfterInputEl(),
        afterInputEl = _this$_crAfterInputEl.afterInputEl,
        placeholder = _this$_crAfterInputEl.placeholder;

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _CL["default"].ROOT,
      style: _rootWidthStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", (0, _extends2["default"])({
        ref: this._refInput,
        className: _CL["default"].INPUT,
        type: "text",
        name: "select",
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: false,
        value: value,
        placeholder: placeholder,
        onChange: this._hInputChange,
        onKeyDown: this._hInputKeyDown
      }, this._touchHandlers)), afterInputEl, /*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {
        className: _CL["default"].INPUT_HR
      }), (isLocalMode || isShowOption) && this.renderOptions()]
    });
  };

  _proto.focusInput = function focusInput() {
    this._nodeInput.focus();
  };

  return InputSelect;
}(_react.Component);

InputSelect.defaultProps = {
  propCaption: 'caption',
  ItemOptionComp: _ItemOptionDf["default"],
  options: [],
  optionName: '',
  optionNames: '',
  isWithInput: false,
  maxInput: 10,
  regInput: /[A-Za-z0-9() ]/,
  //prefixInput: 'From Input:',
  onSelect: function onSelect() {},
  onLoadOption: function onLoadOption() {}
};
var _default = InputSelect;
exports["default"] = _default;
//# sourceMappingURL=InputSelect.js.map