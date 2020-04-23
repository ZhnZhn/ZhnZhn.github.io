"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle2"));

var _ItemOptionDf = _interopRequireDefault(require("./ItemOptionDf"));

var _OptionsFooter = _interopRequireDefault(require("./OptionsFooter"));

var _CL = _interopRequireDefault(require("./CL"));

//import PropTypes from 'prop-types'
var MAX_WITHOUT_ANIMATION = 800;
var INPUT_PREFIX = 'From input:';

var _crInputItem = function _crInputItem(inputValue, _ref) {
  var _ref2;

  var propCaption = _ref.propCaption,
      isWithInput = _ref.isWithInput,
      maxInput = _ref.maxInput;

  var _inputValue = String(inputValue).replace(INPUT_PREFIX, '').trim().substring(0, maxInput),
      _caption = isWithInput ? INPUT_PREFIX + " " + _inputValue : 'No results found';

  return _ref2 = {}, _ref2[propCaption] = _caption, _ref2.value = 'noresult', _ref2.inputValue = _inputValue, _ref2;
};

var _toItem = function _toItem(item, propCaption) {
  var _ref3;

  return _ref3 = {}, _ref3[propCaption] = 'From Input', _ref3.value = item.inputValue, _ref3;
};

var _crWidthStyle = function _crWidthStyle(width, style) {
  return width ? ('' + width).indexOf('%') !== -1 ? (0, _extends2["default"])({}, style, {
    width: width
  }) : (0, _extends2["default"])({}, style, {
    width: width + 'px'
  }) : null;
};

var _crFooterIndex = function _crFooterIndex(_ref4) {
  var options = _ref4.options,
      initialOptions = _ref4.initialOptions;
  return {
    _nFiltered: options[0] && options[0].value !== 'noresult' ? options.length : 0,
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
  }
};

var _crInitialStateFromProps = function _crInitialStateFromProps(_ref5) {
  var optionName = _ref5.optionName,
      optionNames = _ref5.optionNames,
      options = _ref5.options;
  return {
    value: '',
    isShowOption: false,
    initialOptions: options,
    options: options,
    optionNames: optionNames || optionName || '',
    isValidDomOptionsCache: false,
    isLocalMode: false
  };
};

var InputSelect =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(InputSelect, _Component);

  /*
  static propTypes = {
     propCaption: PropTypes.string,
     ItemOptionComp: PropTypes.element,
     width: PropTypes.string,
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

    _this._initFromProps = function (_ref6) {
      var propCaption = _ref6.propCaption;
      _this.domOptionsCache = null;
      _this.indexActiveOption = 0;
      _this.propCaption = propCaption;
    };

    _this._setStateToInit = function (props) {
      _this._initFromProps(props);

      _this.setState(_crInitialStateFromProps(props));
    };

    _this._getActiveItemComp = function () {
      return _this["v" + _this.indexActiveOption];
    };

    _this._decorateActiveRowComp = function (comp) {
      if (comp) {
        comp.classList.add(_CL["default"].OPTIONS_ROW_ACTIVE);
      }

      if (_this.indexNode) {
        _this.indexNode.textContent = _this.indexActiveOption + 1;
      }
    };

    _this._undecorateActiveRowComp = function (comp) {
      var _comp = comp || _this._getActiveItemComp();

      if (_comp) {
        _comp.classList.remove(_CL["default"].OPTIONS_ROW_ACTIVE);
      }
    };

    _this._makeVisibleActiveRowComp = function (comp) {
      if (comp) {
        var offsetTop = comp.offsetTop,
            scrollTop = _this.optionsComp.scrollTop;

        if (offsetTop - scrollTop > 70) {
          _this.optionsComp.scrollTop += offsetTop - scrollTop - 70;
        }

        if (offsetTop - scrollTop < 0) {
          _this.optionsComp.scrollTop = 0;
        }
      }
    };

    _this._filterOptions = function (options, value) {
      var valueFor = value.toLowerCase(),
          _caption = _this.propCaption;
      return options.filter(function (option) {
        return option[_caption].toLowerCase().indexOf(valueFor) !== -1;
      });
    };

    _this._crFilterOptions = function (token, tokenLn, valueLn) {
      var _this$state = _this.state,
          options = _this$state.options,
          initialOptions = _this$state.initialOptions,
          _options = tokenLn > valueLn ? options : initialOptions,
          _arr = _this._filterOptions(_options, token);

      if (_arr.length === 0) {
        _arr.push(_crInputItem(token, _this.props));
      }

      return _arr;
    };

    _this._hInputChange = function (event) {
      var token = event.target.value,
          tokenLn = token.length,
          value = _this.state.value,
          valueLn = value.length;

      if (tokenLn !== valueLn) {
        _this._undecorateActiveRowComp();

        _this.indexActiveOption = 0;

        _this.setState({
          value: token,
          isShowOption: true,
          isValidDomOptionsCache: false,
          options: _this._crFilterOptions(token, tokenLn, valueLn)
        });
      }
    };

    _this._startAfterInputAnimation = function () {
      if (_this.state.options.length > MAX_WITHOUT_ANIMATION) {
        _this.arrowCell.startAnimation();
      }
    };

    _this._stopAfterInputAnimation = function () {
      _this.arrowCell.stopAnimation();
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

    _this._stepDownOption = function () {
      var prevComp = _this._getActiveItemComp();

      if (prevComp) {
        _this._undecorateActiveRowComp(prevComp);

        _this.indexActiveOption += 1;

        if (_this.indexActiveOption >= _this.state.options.length) {
          _this.indexActiveOption = 0;
          _this.optionsComp.scrollTop = 0;
        }

        var nextComp = _this._getActiveItemComp();

        _this._decorateActiveRowComp(nextComp);

        var offsetTop = nextComp.offsetTop;
        var scrollTop = _this.optionsComp.scrollTop;

        if (offsetTop - scrollTop > 70) {
          _this.optionsComp.scrollTop += offsetTop - scrollTop - 70;
        }
      }
    };

    _this._stepUpOption = function () {
      var prevComp = _this._getActiveItemComp();

      if (prevComp) {
        _this._undecorateActiveRowComp(prevComp);

        _this.indexActiveOption -= 1;

        if (_this.indexActiveOption < 0) {
          _this.indexActiveOption = _this.state.options.length - 1;

          var bottomComp = _this._getActiveItemComp();

          _this.optionsComp.scrollTop = bottomComp.offsetTop;
        }

        var nextComp = _this._getActiveItemComp();

        _this._decorateActiveRowComp(nextComp);

        var offsetTop = nextComp.offsetTop;
        var scrollTop = _this.optionsComp.scrollTop;

        if (offsetTop - scrollTop < 70) {
          _this.optionsComp.scrollTop -= 70 - (offsetTop - scrollTop);
        }
      }
    };

    _this._hInputKeyDown = function (event) {
      switch (event.keyCode) {
        // enter
        case 13:
          {
            var item = _this.state.options[_this.indexActiveOption];

            if (item && item[_this.propCaption]) {
              _this.setState({
                value: item[_this.propCaption],
                isShowOption: false,
                isValidDomOptionsCache: true
              });

              if (item.value !== 'noresult') {
                _this.props.onSelect(item);
              } else {
                var _item = _this.props.isWithInput ? _toItem(item, _this.propCaption) : void 0;

                _this.props.onSelect(_item);
              }
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
              _this._undecorateActiveRowComp();

              _this._setStateToInit(_this.props);

              _this.props.onSelect(void 0);
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

    _this._hClickItem = function (item, index) {
      _this._undecorateActiveRowComp();

      _this.indexActiveOption = index;

      _this.setState({
        value: item[_this.propCaption],
        isShowOption: false
      });

      _this.props.onSelect(item);
    };

    _this._refOptionsComp = function (c) {
      return _this.optionsComp = c;
    };

    _this._refIndexNode = function (n) {
      return _this.indexNode = n;
    };

    _this._createDomOptionsWithCache = function () {
      var ItemOptionComp = _this.props.ItemOptionComp,
          _this$state2 = _this.state,
          options = _this$state2.options,
          isValidDomOptionsCache = _this$state2.isValidDomOptionsCache,
          _propCaption = _this.propCaption;

      var _domOptions;

      if (options) {
        if (!isValidDomOptionsCache) {
          /*eslint-disable jsx-a11y/click-events-have-key-events*/
          _domOptions = options.map(function (item, index) {
            return _react["default"].createElement("div", {
              role: "option",
              "aria-selected": _this.indexActiveOption === index,
              tabIndex: "0",
              key: index,
              className: _CL["default"].OPTIONS_ROW,
              ref: function ref(c) {
                return _this["v" + index] = c;
              },
              onClick: _this._hClickItem.bind(null, item, index)
            }, _react["default"].createElement(ItemOptionComp, {
              item: item,
              propCaption: _propCaption
            }));
          });
          /*eslint-enable jsx-a11y/click-events-have-key-events*/

          _this.domOptionsCache = _domOptions;
        } else {
          _domOptions = _this.domOptionsCache;
        }
      }

      return _domOptions;
    };

    _this.renderOptions = function () {
      var _this$props = _this.props,
          rootOptionsStyle = _this$props.rootOptionsStyle,
          width = _this$props.width,
          isShowOption = _this.state.isShowOption,
          _domOptions = _this._createDomOptionsWithCache(),
          _styleOptions = isShowOption ? S.BLOCK : S.NONE,
          _rootWidthStyle = _crWidthStyle(width, _styleOptions),
          _crFooterIndex2 = _crFooterIndex(_this.state),
          _nFiltered = _crFooterIndex2._nFiltered,
          _nAll = _crFooterIndex2._nAll;

      return _react["default"].createElement("div", {
        className: _CL["default"].OPTIONS,
        style: _rootWidthStyle,
        "data-scrollable": true
      }, _react["default"].createElement("div", {
        ref: _this._refOptionsComp,
        className: _CL["default"].OPTIONS_DIV,
        style: (0, _extends2["default"])({}, rootOptionsStyle, {}, _rootWidthStyle)
      }, _domOptions), _react["default"].createElement(_OptionsFooter["default"], {
        ref: _this._refIndexNode,
        indexActiveOption: _this.indexActiveOption,
        nAll: _nAll,
        nFiltered: _nFiltered,
        onStepUp: _this._stepUpOption,
        onStepDown: _this._stepDownOption,
        onClear: _this.clearInput
      }));
    };

    _this._refArrowCell = function (c) {
      return _this.arrowCell = c;
    };

    _this._crAfterInputEl = function () {
      var _this$props2 = _this.props,
          isLoading = _this$props2.isLoading,
          isLoadingFailed = _this$props2.isLoadingFailed,
          placeholder = _this$props2.placeholder,
          optionName = _this$props2.optionName,
          onLoadOption = _this$props2.onLoadOption,
          _this$state3 = _this.state,
          isShowOption = _this$state3.isShowOption,
          optionNames = _this$state3.optionNames;

      var _placeholder, _afterInputEl;

      if (!isLoading && !isLoadingFailed) {
        _placeholder = placeholder || "Select " + optionName + "...";
        _afterInputEl = _react["default"].createElement(_ArrowCell["default"], {
          ref: _this._refArrowCell,
          arrowStyle: isShowOption ? S.ARROW_SHOW : void 0,
          onClick: _this._hToggleOptions
        });
      } else if (isLoading) {
        _placeholder = "Loading " + optionNames + "...";
        _afterInputEl = _react["default"].createElement("span", {
          className: _CL["default"].SPINNER,
          "data-loader": "circle"
        });
      } else if (isLoadingFailed) {
        _placeholder = "Loading " + optionNames + " Failed";
        _afterInputEl = _react["default"].createElement(_ButtonCircle["default"], {
          className: _CL["default"].SPINNER_FAILED,
          "data-loader": "circle-failed",
          onClick: onLoadOption
        });
      }

      return {
        placeholder: _placeholder,
        afterInputEl: _afterInputEl
      };
    };

    _this._refDomInputText = function (c) {
      return _this.domInputText = c;
    };

    _this.clearInput = function () {
      var onSelect = _this.props.onSelect;

      _this._undecorateActiveRowComp();

      onSelect(void 0);

      _this._setStateToInit(_this.props);
    };

    _this._initFromProps(_props);

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
    // Init from props for new options from props
    if (prevState.initialOptions !== this.state.initialOptions) {
      this._initFromProps(this.props);
    } //Decorate Active Option


    if (this.state.isShowOption) {
      var comp = this._getActiveItemComp();

      this._decorateActiveRowComp(comp);

      this._makeVisibleActiveRowComp(comp);
    }
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        rootStyle = _this$props3.rootStyle,
        width = _this$props3.width,
        _this$state4 = this.state,
        value = _this$state4.value,
        isLocalMode = _this$state4.isLocalMode,
        isShowOption = _this$state4.isShowOption,
        _rootWidthStyle = _crWidthStyle(width, rootStyle),
        _this$_crAfterInputEl = this._crAfterInputEl(),
        afterInputEl = _this$_crAfterInputEl.afterInputEl,
        placeholder = _this$_crAfterInputEl.placeholder;

    return _react["default"].createElement("div", {
      className: _CL["default"].ROOT,
      style: _rootWidthStyle
    }, _react["default"].createElement("input", {
      ref: this._refDomInputText,
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
    }), afterInputEl, _react["default"].createElement("hr", {
      className: _CL["default"].INPUT_HR
    }), (isLocalMode || isShowOption) && this.renderOptions());
  };

  _proto.focusInput = function focusInput() {
    this.domInputText.focus();
  };

  _proto.focusNotValidInput = function focusNotValidInput() {
    this.domInputText.focus();
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
  //prefixInput: 'From Input:',
  onSelect: function onSelect() {},
  onLoadOption: function onLoadOption() {}
};
var _default = InputSelect;
exports["default"] = _default;
//# sourceMappingURL=InputSelect.js.map