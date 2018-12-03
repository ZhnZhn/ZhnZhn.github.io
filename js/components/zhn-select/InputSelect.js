'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _class, _temp, _initialiseProps;
//import PropTypes from 'prop-types'

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ArrowCell = require('./ArrowCell');

var _ArrowCell2 = _interopRequireDefault(_ArrowCell);

var _ButtonCircle = require('../zhn/ButtonCircle2');

var _ButtonCircle2 = _interopRequireDefault(_ButtonCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_WITHOUT_ANIMATION = 800;

var CL_ROOT = 'zhn-select';
var CL = {
  ROOT: CL_ROOT,
  INPUT: CL_ROOT + '__input',
  SPINNER: CL_ROOT + '__spinner',
  SPINNER_FAILED: CL_ROOT + '__spinner--failed',
  INPUT_HR: CL_ROOT + '__input__hr',

  OPTIONS: CL_ROOT + '__options',
  OPTIONS_DIV: CL_ROOT + '__options__div',

  OPTIONS_ROW: CL_ROOT + '__row',
  OPTIONS_ROW_ACTIVE: CL_ROOT + '__row--active',

  FOOTER: CL_ROOT + '__footer',
  FOOTER_INDEX: CL_ROOT + '__footer__index',
  FOOTER_BTS: CL_ROOT + '__footer__bts',
  FOOTER_MARGIN: CL_ROOT + '__footer--margin',

  NOT_SELECTED: 'not-selected'
};

var INPUT_PREFIX = 'From input:';
var _fnNoItem = function _fnNoItem(propCaption, inputValue, isWithInput) {
  var _ref;

  var _inputValue = String(inputValue).replace(INPUT_PREFIX, '').trim(),
      _caption = isWithInput ? INPUT_PREFIX + ' ' + _inputValue : 'No results found';
  return _ref = {}, (0, _defineProperty3.default)(_ref, propCaption, _caption), (0, _defineProperty3.default)(_ref, 'value', 'noresult'), (0, _defineProperty3.default)(_ref, 'inputValue', _inputValue), _ref;
};

var _toItem = function _toItem(item, propCaption) {
  var _ref2;

  return _ref2 = {}, (0, _defineProperty3.default)(_ref2, propCaption, 'From Input'), (0, _defineProperty3.default)(_ref2, 'value', item.inputValue), _ref2;
};

var _crWidth = function _crWidth(width, style) {
  return width ? ('' + width).indexOf('%') !== -1 ? (0, _extends3.default)({}, style, { width: width }) : (0, _extends3.default)({}, style, { width: width + 'px' }) : null;
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
  return _react2.default.createElement(
    'span',
    null,
    item[propCaption]
  );
};

var InputSelect = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(InputSelect, _Component);

  function InputSelect(props) {
    (0, _classCallCheck3.default)(this, InputSelect);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputSelect.__proto__ || Object.getPrototypeOf(InputSelect)).call(this, props));

    _initialiseProps.call(_this);

    _this.domOptionsCache = null;
    _this.indexActiveOption = 0;
    _this.propCaption = props.propCaption;

    var optionName = props.optionName,
        optionNames = props.optionNames,
        options = props.options;

    _this.state = {
      value: '',
      isShowOption: false,
      options: options,
      optionNames: optionNames || optionName || '',
      isValidDomOptionsCache: false,
      isLocalMode: false
    };
    return _this;
  }
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
     isUpdateOptions: PropTypes.bool,
     placeholder: PropTypes.string,
     isWithInput: PropTypes.bool,
     prefixInput: PropTypes.string
       isLoading: PropTypes.bool,
     isLoadingFailed: PropTypes.bool,
       onSelect: PropTypes.func,
     onLoadOption: PropTypes.func
  }
  */

  (0, _createClass3.default)(InputSelect, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        if (this.props.options !== nextProps.options || nextProps.isUpdateOptions) {
          //New options come from Parent - Clear domCache, Init State
          this._setStateToInit(nextProps.options);
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props !== nextProps || nextProps.isUpdateOptions) {
        nextState.isLocalMode = false;
      } else {
        nextState.isLocalMode = true;
      }

      return true;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      //Decorate Active Option
      if (this.state.isShowOption) {
        var comp = this._getActiveItemComp();
        this._decorateActiveRowComp(comp);
        this._makeVisibleActiveRowComp(comp);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          rootStyle = _props.rootStyle,
          width = _props.width,
          _state = this.state,
          value = _state.value,
          isLocalMode = _state.isLocalMode,
          isShowOption = _state.isShowOption,
          _rootWidthStyle = _crWidth(width, rootStyle),
          _crAfterInputEl = this._crAfterInputEl(),
          afterInputEl = _crAfterInputEl.afterInputEl,
          placeholder = _crAfterInputEl.placeholder,
          _domOptions = isLocalMode || isShowOption ? this.renderOptions() : null;

      return _react2.default.createElement(
        'div',
        {
          className: CL.ROOT,
          style: _rootWidthStyle
        },
        _react2.default.createElement('input', {
          ref: function ref(c) {
            return _this2.domInputText = c;
          },
          type: 'text',
          name: 'select'
          //autoComplete="new-select"
          , autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: false,
          value: value,
          className: CL.INPUT
          //style={S.INPUT_TEXT}
          , placeholder: placeholder,
          onChange: this._handleInputChange,
          onKeyDown: this._handleInputKeyDown }),
        afterInputEl,
        _react2.default.createElement('hr', { className: CL.INPUT_HR }),
        _domOptions
      );
    }
  }, {
    key: 'focusInput',
    value: function focusInput() {
      this.domInputText.focus();
    }
  }, {
    key: 'focusNotValidInput',
    value: function focusNotValidInput() {
      this.domInputText.focus();
    }
  }]);
  return InputSelect;
}(_react.Component), _class.defaultProps = {
  propCaption: 'caption',
  ItemOptionComp: ItemOptionDf,
  options: [],
  optionName: '',
  optionNames: '',
  isUpdateOptions: false,
  isWithInput: false,
  //prefixInput: 'From Input:',
  onSelect: function onSelect() {},
  onLoadOption: function onLoadOption() {}
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._setStateToInit = function (options) {
    _this3.indexActiveOption = 0;
    _this3.setState({
      value: '',
      isShowOption: false,
      options: options,
      isValidDomOptionsCache: false
    });
  };

  this._getActiveItemComp = function () {
    return _this3['v' + _this3.indexActiveOption];
  };

  this._decorateActiveRowComp = function (comp) {
    if (comp) {
      comp.classList.add(CL.OPTIONS_ROW_ACTIVE);
    }
    if (_this3.indexNode) {
      _this3.indexNode.textContent = _this3.indexActiveOption + 1;
    }
  };

  this._undecorateActiveRowComp = function (comp) {
    var _comp = !comp ? _this3._getActiveItemComp() : comp;
    if (_comp) {
      _comp.classList.remove(CL.OPTIONS_ROW_ACTIVE);
    }
  };

  this._makeVisibleActiveRowComp = function (comp) {
    if (comp) {
      var offsetTop = comp.offsetTop;
      var scrollTop = _this3.optionsComp.scrollTop;
      if (offsetTop - scrollTop > 70) {
        _this3.optionsComp.scrollTop += offsetTop - scrollTop - 70;
      }
      if (offsetTop - scrollTop < 0) {
        _this3.optionsComp.scrollTop = 0;
      }
    }
  };

  this._filterOptions = function (options, value) {
    var valueFor = value.toLowerCase(),
        _caption = _this3.propCaption;
    return options.filter(function (option, i) {
      return option[_caption].toLowerCase().indexOf(valueFor) !== -1;
    });
  };

  this._handleInputChange = function (event) {
    var token = event.target.value,
        tokenLn = token.length,
        value = _this3.state.value,
        valueLn = value.length;

    var arr = [];
    if (tokenLn !== valueLn) {
      if (tokenLn > valueLn) {
        arr = _this3._filterOptions(_this3.state.options, token);
      } else if (tokenLn < valueLn) {
        arr = _this3._filterOptions(_this3.props.options, token);
      }
      if (arr.length === 0) {
        arr.push(_fnNoItem(_this3.propCaption, token, _this3.props.isWithInput));
      }
      _this3._undecorateActiveRowComp();
      _this3.indexActiveOption = 0;
      _this3.setState({
        value: token,
        isShowOption: true,
        isValidDomOptionsCache: false,
        options: arr
      });
    }
  };

  this._startAfterInputAnimation = function () {
    if (_this3.state.options.length > MAX_WITHOUT_ANIMATION) {
      _this3.arrowCell.startAnimation();
    }
  };

  this._stopAfterInputAnimation = function () {
    _this3.arrowCell.stopAnimation();
  };

  this._setShowOptions = function () {
    _this3.setState({ isShowOption: true }, _this3._stopAfterInputAnimation);
  };

  this._showOptions = function (ms) {
    if (_this3.props.isShowOptionAnim) {
      _this3._startAfterInputAnimation();
      setTimeout(_this3._setShowOptions, ms);
    } else {
      _this3.setState({ isShowOption: true });
    }
  };

  this._stepDownOption = function () {
    var prevComp = _this3._getActiveItemComp();

    if (prevComp) {
      _this3._undecorateActiveRowComp(prevComp);

      _this3.indexActiveOption += 1;
      if (_this3.indexActiveOption >= _this3.state.options.length) {
        _this3.indexActiveOption = 0;
        _this3.optionsComp.scrollTop = 0;
      }

      var nextComp = _this3._getActiveItemComp();
      _this3._decorateActiveRowComp(nextComp);
      //this.indexNode.innerHTML = this.indexActiveOption

      var offsetTop = nextComp.offsetTop;
      var scrollTop = _this3.optionsComp.scrollTop;
      if (offsetTop - scrollTop > 70) {
        _this3.optionsComp.scrollTop += offsetTop - scrollTop - 70;
      }
    }
  };

  this._stepUpOption = function () {
    var prevComp = _this3._getActiveItemComp();
    if (prevComp) {
      _this3._undecorateActiveRowComp(prevComp);

      _this3.indexActiveOption -= 1;
      if (_this3.indexActiveOption < 0) {
        _this3.indexActiveOption = _this3.state.options.length - 1;
        var bottomComp = _this3._getActiveItemComp();
        _this3.optionsComp.scrollTop = bottomComp.offsetTop;
      }

      var nextComp = _this3._getActiveItemComp();
      _this3._decorateActiveRowComp(nextComp);
      //this.indexNode.innerHTML = this.indexActiveOption

      var offsetTop = nextComp.offsetTop;
      var scrollTop = _this3.optionsComp.scrollTop;
      if (offsetTop - scrollTop < 70) {
        _this3.optionsComp.scrollTop -= 70 - (offsetTop - scrollTop);
      }
    }
  };

  this._handleInputKeyDown = function (event) {
    switch (event.keyCode) {
      // enter
      case 13:
        {
          var item = _this3.state.options[_this3.indexActiveOption];

          if (item && item[_this3.propCaption]) {
            _this3.setState({
              value: item[_this3.propCaption],
              isShowOption: false,
              isValidDomOptionsCache: true
            });

            if (item.value !== 'noresult') {
              _this3.props.onSelect(item);
            } else {
              if (!_this3.props.isWithInput) {
                _this3.props.onSelect(undefined);
              } else {
                _this3.props.onSelect(_toItem(item, _this3.propCaption));
              }
            }
          }
          break;
        }
      //escape, delete
      case 27:case 46:
        {
          event.preventDefault();
          if (_this3.state.isShowOption) {
            _this3.setState({ isShowOption: false });
          } else {
            _this3._undecorateActiveRowComp();
            _this3._setStateToInit(_this3.props.options);
            _this3.props.onSelect(undefined);
          }
          break;
        }
      case 40:
        //down
        if (!_this3.state.isShowOption) {
          _this3._showOptions(0);
          //this.setState({ isShowOption : true });
        } else {
          event.preventDefault();
          _this3._stepDownOption();
        }
        break;
      case 38:
        //up
        if (_this3.state.isShowOption) {
          event.preventDefault();
          _this3._stepUpOption();
        }
        break;
      default:
        return undefined;
    }
  };

  this._handleToggleOptions = function () {
    //this.setState({ isShowOption: !this.state.isShowOption });
    if (_this3.state.isShowOption) {
      _this3.setState({ isShowOption: false });
    } else {
      _this3._showOptions(1);
    }
  };

  this._handleClickItem = function (item, index, event) {
    _this3._undecorateActiveRowComp();
    _this3.indexActiveOption = index;
    _this3.setState({
      value: item[_this3.propCaption],
      isShowOption: false
    });
    _this3.props.onSelect(item);
  };

  this._refIndexNode = function (n) {
    return _this3.indexNode = n;
  };

  this._renderOptionsFooter = function (nFiltered, nAll) {
    return _react2.default.createElement(
      'div',
      { className: CL.FOOTER + ' ' + CL.NOT_SELECTED },
      _react2.default.createElement(
        'span',
        { className: CL.FOOTER_INDEX },
        _react2.default.createElement(
          'span',
          { ref: _this3._refIndexNode },
          _this3.indexActiveOption
        ),
        _react2.default.createElement(
          'span',
          null,
          ': ',
          nFiltered,
          ': ',
          nAll
        )
      ),
      _react2.default.createElement(
        'span',
        { className: CL.FOOTER_BTS },
        _react2.default.createElement(_ButtonCircle2.default, {
          className: CL.FOOTER_MARGIN,
          caption: 'Dn',
          onClick: _this3._stepDownOption
        }),
        _react2.default.createElement(_ButtonCircle2.default, {
          className: CL.FOOTER_MARGIN,
          caption: 'Up',
          onClick: _this3._stepUpOption
        }),
        _react2.default.createElement(_ButtonCircle2.default, {
          caption: 'CL',
          onClick: _this3.clearInput
        })
      )
    );
  };

  this._refOptionsComp = function (c) {
    return _this3.optionsComp = c;
  };

  this.renderOptions = function () {
    var _props2 = _this3.props,
        rootOptionsStyle = _props2.rootOptionsStyle,
        ItemOptionComp = _props2.ItemOptionComp,
        _state2 = _this3.state,
        isShowOption = _state2.isShowOption,
        options = _state2.options,
        isValidDomOptionsCache = _state2.isValidDomOptionsCache,
        _propCaption = _this3.propCaption;


    var _domOptions = void 0;
    if (options) {
      if (!isValidDomOptionsCache) {
        _domOptions = options.map(function (item, index) {
          return _react2.default.createElement(
            'div',
            {
              //role="option"
              //aria-selected={this.indexActiveOption === index}
              //tabIndex="0"
              key: index,
              className: CL.OPTIONS_ROW,
              ref: function ref(c) {
                return _this3['v' + index] = c;
              },
              onClick: _this3._handleClickItem.bind(_this3, item, index)
            },
            _react2.default.createElement(ItemOptionComp, {
              item: item,
              propCaption: _propCaption
            })
          );
        });
        _this3.domOptionsCache = _domOptions;
      } else {
        _domOptions = _this3.domOptionsCache;
      }
    }

    var width = _this3.props.width,
        _styleOptions = isShowOption ? S.BLOCK : S.NONE,
        _rootWidthStyle = _crWidth(width, _styleOptions),
        _nFiltered = options[0] && options[0].value !== 'noresult' ? options.length : 0,
        _nAll = _this3.props.options ? _this3.props.options.length : 0;


    return _react2.default.createElement(
      'div',
      {
        className: CL.OPTIONS,
        style: _rootWidthStyle,
        'data-scrollable': true
      },
      _react2.default.createElement(
        'div',
        {
          ref: _this3._refOptionsComp,
          className: CL.OPTIONS_DIV,
          style: (0, _extends3.default)({}, rootOptionsStyle, _rootWidthStyle)
        },
        _domOptions
      ),
      _this3._renderOptionsFooter(_nFiltered, _nAll)
    );
  };

  this._crAfterInputEl = function () {
    var _props3 = _this3.props,
        isLoading = _props3.isLoading,
        isLoadingFailed = _props3.isLoadingFailed,
        placeholder = _props3.placeholder,
        optionName = _props3.optionName,
        onLoadOption = _props3.onLoadOption,
        _state3 = _this3.state,
        isShowOption = _state3.isShowOption,
        optionNames = _state3.optionNames;


    var _placeholder = void 0,
        _afterInputEl = void 0;
    if (!isLoading && !isLoadingFailed) {
      var _arrowStyle = isShowOption ? S.ARROW_SHOW : null;
      _placeholder = placeholder ? placeholder : 'Select ' + optionName + '...';
      _afterInputEl = _react2.default.createElement(_ArrowCell2.default, {
        ref: function ref(c) {
          return _this3.arrowCell = c;
        },
        arrowStyle: _arrowStyle,
        onClick: _this3._handleToggleOptions
      });
    } else if (isLoading) {
      _placeholder = 'Loading ' + optionNames + '...';
      _afterInputEl = _react2.default.createElement('span', {
        className: CL.SPINNER
        //style={S.SPINNER_CELL}
        , 'data-loader': 'circle'
      });
    } else if (isLoadingFailed) {
      _placeholder = 'Loading ' + optionNames + ' Failed';
      _afterInputEl = _react2.default.createElement(_ButtonCircle2.default, {
        className: CL.SPINNER_FAILED,
        'data-loader': 'circle-failed',
        onClick: onLoadOption
      });
    }
    return {
      placeholder: _placeholder,
      afterInputEl: _afterInputEl
    };
  };

  this.clearInput = function () {
    var _props4 = _this3.props,
        options = _props4.options,
        onSelect = _props4.onSelect;

    _this3._undecorateActiveRowComp();
    onSelect(undefined);
    _this3._setStateToInit(options);
    _this3.setState({ isShowOption: false });
  };
}, _temp);
exports.default = InputSelect;
//# sourceMappingURL=InputSelect.js.map