"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle2"));

//import PropTypes from 'prop-types'
var MAX_WITHOUT_ANIMATION = 800;
var CL_ROOT = 'zhn-select';
var CL = {
  ROOT: CL_ROOT,
  INPUT: CL_ROOT + "__input",
  SPINNER: CL_ROOT + "__spinner",
  SPINNER_FAILED: CL_ROOT + "__spinner--failed",
  INPUT_HR: CL_ROOT + "__input__hr",
  OPTIONS: CL_ROOT + "__options",
  OPTIONS_DIV: CL_ROOT + "__options__div",
  OPTIONS_ROW: CL_ROOT + "__row",
  OPTIONS_ROW_ACTIVE: CL_ROOT + "__row--active",
  FOOTER: CL_ROOT + "__footer",
  FOOTER_INDEX: CL_ROOT + "__footer__index",
  FOOTER_BTS: CL_ROOT + "__footer__bts",
  FOOTER_MARGIN: CL_ROOT + "__footer--margin",
  NOT_SELECTED: 'not-selected'
};
var INPUT_PREFIX = 'From input:';

var _fnNoItem = function _fnNoItem(propCaption, inputValue, isWithInput) {
  var _ref;

  var _inputValue = String(inputValue).replace(INPUT_PREFIX, '').trim(),
      _caption = isWithInput ? INPUT_PREFIX + " " + _inputValue : 'No results found';

  return _ref = {}, _ref[propCaption] = _caption, _ref.value = 'noresult', _ref.inputValue = _inputValue, _ref;
};

var _toItem = function _toItem(item, propCaption) {
  var _ref2;

  return _ref2 = {}, _ref2[propCaption] = 'From Input', _ref2.value = item.inputValue, _ref2;
};

var _crWidth = function _crWidth(width, style) {
  return width ? ('' + width).indexOf('%') !== -1 ? (0, _extends2["default"])({}, style, {
    width: width
  }) : (0, _extends2["default"])({}, style, {
    width: width + 'px'
  }) : null;
};

var S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  },
  ARROW_SHOW: {
    borderColor: '#1B75BB transparent transparent'
  }
};

var ItemOptionDf = function ItemOptionDf(_ref3) {
  var item = _ref3.item,
      propCaption = _ref3.propCaption;
  return _react["default"].createElement("span", null, item[propCaption]);
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
  function InputSelect(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._setStateToInit = function (options) {
      _this.indexActiveOption = 0;

      _this.setState({
        value: '',
        isShowOption: false,
        options: options,
        isValidDomOptionsCache: false
      });
    };

    _this._getActiveItemComp = function () {
      return _this["v" + _this.indexActiveOption];
    };

    _this._decorateActiveRowComp = function (comp) {
      if (comp) {
        comp.classList.add(CL.OPTIONS_ROW_ACTIVE);
      }

      if (_this.indexNode) {
        _this.indexNode.textContent = _this.indexActiveOption + 1;
      }
    };

    _this._undecorateActiveRowComp = function (comp) {
      var _comp = !comp ? _this._getActiveItemComp() : comp;

      if (_comp) {
        _comp.classList.remove(CL.OPTIONS_ROW_ACTIVE);
      }
    };

    _this._makeVisibleActiveRowComp = function (comp) {
      if (comp) {
        var offsetTop = comp.offsetTop;
        var scrollTop = _this.optionsComp.scrollTop;

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
      return options.filter(function (option, i) {
        return option[_caption].toLowerCase().indexOf(valueFor) !== -1;
      });
    };

    _this._handleInputChange = function (event) {
      var token = event.target.value,
          tokenLn = token.length,
          value = _this.state.value,
          valueLn = value.length;
      var arr = [];

      if (tokenLn !== valueLn) {
        if (tokenLn > valueLn) {
          arr = _this._filterOptions(_this.state.options, token);
        } else if (tokenLn < valueLn) {
          arr = _this._filterOptions(_this.props.options, token);
        }

        if (arr.length === 0) {
          arr.push(_fnNoItem(_this.propCaption, token, _this.props.isWithInput));
        }

        _this._undecorateActiveRowComp();

        _this.indexActiveOption = 0;

        _this.setState({
          value: token,
          isShowOption: true,
          isValidDomOptionsCache: false,
          options: arr
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

        _this._decorateActiveRowComp(nextComp); //this.indexNode.innerHTML = this.indexActiveOption


        var offsetTop = nextComp.offsetTop;
        var scrollTop = _this.optionsComp.scrollTop;

        if (offsetTop - scrollTop < 70) {
          _this.optionsComp.scrollTop -= 70 - (offsetTop - scrollTop);
        }
      }
    };

    _this._handleInputKeyDown = function (event) {
      //tab && isShowOptions
      if (event.keyCode === 9 && _this.state.isShowOption) {
        event.preventDefault();
        return;
      }

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
                if (!_this.props.isWithInput) {
                  _this.props.onSelect(undefined);
                } else {
                  _this.props.onSelect(_toItem(item, _this.propCaption));
                }
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

              _this._setStateToInit(_this.props.options);

              _this.props.onSelect(undefined);
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
          return undefined;
      }
    };

    _this._handleToggleOptions = function () {
      //this.setState({ isShowOption: !this.state.isShowOption });
      if (_this.state.isShowOption) {
        _this.setState({
          isShowOption: false
        });
      } else {
        _this._showOptions(1);
      }
    };

    _this._handleClickItem = function (item, index, event) {
      _this._undecorateActiveRowComp();

      _this.indexActiveOption = index;

      _this.setState({
        value: item[_this.propCaption],
        isShowOption: false
      });

      _this.props.onSelect(item);
    };

    _this._refIndexNode = function (n) {
      return _this.indexNode = n;
    };

    _this._renderOptionsFooter = function (nFiltered, nAll) {
      return _react["default"].createElement("div", {
        className: CL.FOOTER + " " + CL.NOT_SELECTED
      }, _react["default"].createElement("span", {
        className: CL.FOOTER_INDEX
      }, _react["default"].createElement("span", {
        ref: _this._refIndexNode
      }, _this.indexActiveOption), _react["default"].createElement("span", null, ": ", nFiltered, ": ", nAll)), _react["default"].createElement("span", {
        className: CL.FOOTER_BTS
      }, _react["default"].createElement(_ButtonCircle["default"], {
        className: CL.FOOTER_MARGIN,
        caption: "Dn",
        onClick: _this._stepDownOption
      }), _react["default"].createElement(_ButtonCircle["default"], {
        className: CL.FOOTER_MARGIN,
        caption: "Up",
        onClick: _this._stepUpOption
      }), _react["default"].createElement(_ButtonCircle["default"], {
        caption: "CL",
        onClick: _this.clearInput
      })));
    };

    _this._refOptionsComp = function (c) {
      return _this.optionsComp = c;
    };

    _this.renderOptions = function () {
      var _this$props = _this.props,
          rootOptionsStyle = _this$props.rootOptionsStyle,
          ItemOptionComp = _this$props.ItemOptionComp,
          _this$state = _this.state,
          isShowOption = _this$state.isShowOption,
          options = _this$state.options,
          isValidDomOptionsCache = _this$state.isValidDomOptionsCache,
          _propCaption = _this.propCaption;

      var _domOptions;

      if (options) {
        if (!isValidDomOptionsCache) {
          _domOptions = options.map(function (item, index) {
            return _react["default"].createElement("div", {
              //role="option"
              //aria-selected={this.indexActiveOption === index}
              //tabIndex="0"
              key: index,
              className: CL.OPTIONS_ROW,
              ref: function ref(c) {
                return _this["v" + index] = c;
              },
              onClick: _this._handleClickItem.bind((0, _assertThisInitialized2["default"])(_this), item, index)
            }, _react["default"].createElement(ItemOptionComp, {
              item: item,
              propCaption: _propCaption
            }));
          });
          _this.domOptionsCache = _domOptions;
        } else {
          _domOptions = _this.domOptionsCache;
        }
      }

      var width = _this.props.width,
          _styleOptions = isShowOption ? S.BLOCK : S.NONE,
          _rootWidthStyle = _crWidth(width, _styleOptions),
          _nFiltered = options[0] && options[0].value !== 'noresult' ? options.length : 0,
          _nAll = _this.props.options ? _this.props.options.length : 0;

      return _react["default"].createElement("div", {
        className: CL.OPTIONS,
        style: _rootWidthStyle,
        "data-scrollable": true
      }, _react["default"].createElement("div", {
        ref: _this._refOptionsComp,
        className: CL.OPTIONS_DIV,
        style: (0, _extends2["default"])({}, rootOptionsStyle, {}, _rootWidthStyle)
      }, _domOptions), _this._renderOptionsFooter(_nFiltered, _nAll));
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
          _this$state2 = _this.state,
          isShowOption = _this$state2.isShowOption,
          optionNames = _this$state2.optionNames;

      var _placeholder, _afterInputEl;

      if (!isLoading && !isLoadingFailed) {
        var _arrowStyle = isShowOption ? S.ARROW_SHOW : null;

        _placeholder = placeholder ? placeholder : "Select " + optionName + "...";
        _afterInputEl = _react["default"].createElement(_ArrowCell["default"], {
          ref: _this._refArrowCell,
          arrowStyle: _arrowStyle,
          onClick: _this._handleToggleOptions
        });
      } else if (isLoading) {
        _placeholder = "Loading " + optionNames + "...";
        _afterInputEl = _react["default"].createElement("span", {
          className: CL.SPINNER,
          "data-loader": "circle"
        });
      } else if (isLoadingFailed) {
        _placeholder = "Loading " + optionNames + " Failed";
        _afterInputEl = _react["default"].createElement(_ButtonCircle["default"], {
          className: CL.SPINNER_FAILED,
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
      var _this$props3 = _this.props,
          options = _this$props3.options,
          onSelect = _this$props3.onSelect;

      _this._undecorateActiveRowComp();

      onSelect(undefined);

      _this._setStateToInit(options);

      _this.setState({
        isShowOption: false
      });
    };

    _this.domOptionsCache = null;
    _this.indexActiveOption = 0;
    _this.propCaption = props.propCaption;
    var _optionName = props.optionName,
        _optionNames = props.optionNames,
        _options = props.options;
    _this.state = {
      value: '',
      isShowOption: false,
      options: _options,
      optionNames: _optionNames || _optionName || '',
      isValidDomOptionsCache: false,
      isLocalMode: false
    };
    return _this;
  }

  var _proto = InputSelect.prototype;

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (this.props.options !== nextProps.options) {
        //New options come from Parent - Clear domCache, Init State
        this._setStateToInit(nextProps.options);
      }
    }
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      nextState.isLocalMode = false;
    } else {
      nextState.isLocalMode = true;
    }

    return true;
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    //Decorate Active Option
    if (this.state.isShowOption) {
      var comp = this._getActiveItemComp();

      this._decorateActiveRowComp(comp);

      this._makeVisibleActiveRowComp(comp);
    }
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        rootStyle = _this$props4.rootStyle,
        width = _this$props4.width,
        _this$state3 = this.state,
        value = _this$state3.value,
        isLocalMode = _this$state3.isLocalMode,
        isShowOption = _this$state3.isShowOption,
        _rootWidthStyle = _crWidth(width, rootStyle),
        _this$_crAfterInputEl = this._crAfterInputEl(),
        afterInputEl = _this$_crAfterInputEl.afterInputEl,
        placeholder = _this$_crAfterInputEl.placeholder,
        _domOptions = isLocalMode || isShowOption ? this.renderOptions() : null;

    return _react["default"].createElement("div", {
      className: CL.ROOT,
      style: _rootWidthStyle
    }, _react["default"].createElement("input", {
      ref: this._refDomInputText,
      type: "text",
      name: "select" //autoComplete="new-select"
      ,
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "off",
      spellCheck: false,
      value: value,
      className: CL.INPUT,
      placeholder: placeholder,
      onChange: this._handleInputChange,
      onKeyDown: this._handleInputKeyDown
    }), afterInputEl, _react["default"].createElement("hr", {
      className: CL.INPUT_HR
    }), _domOptions);
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
  ItemOptionComp: ItemOptionDf,
  options: [],
  optionName: '',
  optionNames: '',
  isWithInput: false,
  //prefixInput: 'From Input:',
  onSelect: function onSelect() {},
  onLoadOption: function onLoadOption() {}
};
var _default = InputSelect;
exports["default"] = _default;
//# sourceMappingURL=InputSelect.js.map