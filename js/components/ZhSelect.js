'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  rootDiv: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '160px'

  },
  inputText: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '30px',
    paddingLeft: '10px',
    color: 'green',
    width: '140px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  rootOptionDiv: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#E1E1CB',
    color: 'green',
    width: '160px',
    //height: '160px',
    zIndex: '10',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px'
  },
  optionDiv: {
    //height: '160px',
    minHeight: '160px',
    maxHeight: '200px',
    overflow: 'auto'
  },
  spinnerCell: {
    position: 'relative',
    left: '8px',
    top: '4px',
    display: 'inline-block',
    width: '16px',
    height: '16px'
  },
  spinnerFailedCell: {
    position: 'relative',
    left: '8px',
    top: '4px',
    display: 'inline-block',
    width: '16px',
    height: '16px',
    borderColor: '#F44336',
    cursor: 'pointer'
  },
  arrowCell: {
    cursor: 'pointer',
    //display: table-cell
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'middle',
    //width: '25px',
    width: '35px',
    paddingRight: '5px',
    marginLeft: '10px'

  },
  arrow: {
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '5px 5px 2.5px',
    //borderWidth: '10px 10px 5px',
    display: 'inline-block',
    height: '0px',
    width: '0px'
  },
  arrow_show: {
    borderColor: '#1B75BB transparent transparent'
  },
  inputHr: {
    borderWidth: 'medium medium 1px',
    borderStyle: 'none none solid',
    borderColor: '#1B75BB',
    borderImage: 'none',
    margin: 0,
    marginLeft: '10px',
    marginBottom: '5px',
    width: '150px'

  },
  itemDiv: {
    cursor: 'pointer',
    paddingTop: '4px',
    paddingLeft: '5px',
    paddingBottom: '4px'
    //lineHeight: '14px'
  },
  itemOdd: {
    backgroundColor: '#C3C3AC'
  },
  itemEven: {
    backgroundColor: '#D5D5BC'
  },
  optionsFooter: {
    backgroundColor: 'silver',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px'
  },
  fileredSpan: {
    display: 'inline-block',
    color: 'gray',
    fontWeight: 'bold',
    //height: '20px',
    paddingLeft: '10px',
    paddingTop: '4px',
    paddingBottom: '4px'
  }
};

var ZhSelect = (_temp = _class = function (_Component) {
  _inherits(ZhSelect, _Component);

  function ZhSelect(props) {
    _classCallCheck(this, ZhSelect);

    var _this = _possibleConstructorReturn(this, (ZhSelect.__proto__ || Object.getPrototypeOf(ZhSelect)).call(this));

    _this._setStateToInit = function (options) {
      _this.indexActiveOption = 0;
      _this.setState({
        value: '',
        isShowOption: false,
        options: options,
        isValidDomOptionsCache: false
      });
    };

    _this._getDomForActiveOption = function () {
      return _this.refs["v" + _this.indexActiveOption];
    };

    _this._decorateOfDomActiveOption = function (domActiveOption) {
      if (domActiveOption) {
        domActiveOption.classList.add("option-row__active");
      }
    };

    _this._decorateActiveOption = function () {
      var domActiveOption = _this.refs["v" + _this.indexActiveOption];
      domActiveOption.classList.add("option-row__active");
    };

    _this._undecorateActiveOption = function () {
      if (_this.refs["v" + _this.indexActiveOption]) {
        _this.refs["v" + _this.indexActiveOption].classList.remove("option-row__active");
      }
    };

    _this._undecorateOfDomActiveOption = function (domActiveOption) {
      if (domActiveOption) {
        domActiveOption.classList.remove("option-row__active");
      }
    };

    _this._makeVisibleOfDomActiveOption = function (domActiveOption) {
      if (domActiveOption) {
        var offsetTop = domActiveOption.offsetTop;
        var scrollTop = _this.domOptions.scrollTop;
        if (offsetTop - scrollTop > 70) {
          _this.domOptions.scrollTop += offsetTop - scrollTop - 70;
        }
        if (offsetTop - scrollTop < 0) {
          _this.domOptions.scrollTop = 0;
        }
      }
    };

    _this._makeVisibleActiveOption = function () {
      var domActiveOption = _this.refs["v" + _this.indexActiveOption];

      var offsetTop = domActiveOption.offsetTop;
      var scrollTop = _this.domOptions.scrollTop;
      if (offsetTop - scrollTop > 70) {
        _this.domOptions.scrollTop += offsetTop - scrollTop - 70;
      }
    };

    _this._filterOptionsToState = function (options, value) {
      var valueFor = value.toLowerCase();
      return options.filter(function (option, i) {
        return option.caption.toLowerCase().indexOf(valueFor) !== -1;
      });
    };

    _this._handlerInputChange = function (event) {
      var value = event.target.value;
      var arr = [];
      if (value.length !== _this.state.value.length) {
        if (value.length > _this.state.value.length) {
          arr = _this._filterOptionsToState(_this.state.options, value);
        } else if (value.length < _this.state.value.length) {
          arr = _this._filterOptionsToState(_this.props.options, value);
        }
        if (arr.length === 0) {
          arr.push({ caption: 'No results found', value: 'noresult' });
        }
        _this._undecorateActiveOption();
        _this.indexActiveOption = 0;
        _this.setState({
          value: value,
          isShowOption: true,
          isValidDomOptionsCache: false,
          options: arr
        });
      }
    };

    _this._handlerInputKeyDown = function (event) {
      switch (event.keyCode) {
        // enter
        case 13:
          {
            var item = _this.state.options[_this.indexActiveOption];

            if (item && item.caption) {
              _this.setState({
                value: item.caption,
                isShowOption: false,
                isValidDomOptionsCache: true
              });

              if (item.value !== 'noresult') {
                _this.props.onSelect(item);
              } else {
                _this.props.onSelect(null);
              }
            }
            break;
          }
        //escape
        case 27:
          {
            if (_this.state.isShowOption) {
              _this.setState({ isShowOption: false });
            } else {
              _this._undecorateActiveOption();
              _this._setStateToInit(_this.props.options);
              _this.props.onSelect(undefined);
            }
            break;
          }
        //down
        case 40:
          {
            if (!_this.state.isShowOption) {
              _this.setState({ isShowOption: true });
            } else {
              event.preventDefault();

              var domActiveOption = _this._getDomForActiveOption();

              if (domActiveOption) {
                _this._undecorateOfDomActiveOption(domActiveOption);

                _this.indexActiveOption += 1;
                if (_this.indexActiveOption >= _this.state.options.length) {
                  _this.indexActiveOption = 0;
                  _this.domOptions.scrollTop = 0;
                }

                domActiveOption = _this._getDomForActiveOption();
                _this._decorateOfDomActiveOption(domActiveOption);

                var offsetTop = _this.refs["v" + _this.indexActiveOption].offsetTop;
                var scrollTop = _this.domOptions.scrollTop;
                if (offsetTop - scrollTop > 70) {
                  _this.domOptions.scrollTop += offsetTop - scrollTop - 70;
                }
              }
            }
            break;
          }
        //up
        case 38:
          {
            if (_this.state.isShowOption) {
              event.preventDefault();

              var _domActiveOption = _this._getDomForActiveOption();
              if (_domActiveOption) {
                _this._undecorateOfDomActiveOption(_domActiveOption);

                _this.indexActiveOption -= 1;
                if (_this.indexActiveOption < 0) {
                  _this.indexActiveOption = _this.state.options.length - 1;
                  var offsetTop2 = _this.refs["v" + _this.indexActiveOption].offsetTop;
                  _this.domOptions.scrollTop = offsetTop2;
                }

                _domActiveOption = _this._getDomForActiveOption();
                _this._decorateOfDomActiveOption(_domActiveOption);

                var _offsetTop = _domActiveOption.offsetTop;
                var _scrollTop = _this.domOptions.scrollTop;
                if (_offsetTop - _scrollTop < 70) {
                  _this.domOptions.scrollTop -= 70 - (_offsetTop - _scrollTop);
                }
              }
            }
            break;
          }
        default:
          return undefined;
      }
    };

    _this._handlerToggleOptions = function () {
      _this.setState({ isShowOption: !_this.state.isShowOption });
    };

    _this._handlerClickOption = function (item, index, event) {
      _this.indexActiveOption = index;
      _this.setState({
        value: item.caption,
        isShowOption: false
      });
      _this.props.onSelect(item);
    };

    _this.renderOptions = function () {
      var _this$state = _this.state,
          isShowOption = _this$state.isShowOption,
          options = _this$state.options,
          isValidDomOptionsCache = _this$state.isValidDomOptionsCache;


      var _domOptions = void 0;
      if (options) {
        if (!isValidDomOptionsCache) {
          _domOptions = options.map(function (item, index) {
            var _styleDiv = index % 2 === 0 ? styles.itemOdd : styles.itemEven;
            return _react2.default.createElement(
              'div',
              {
                className: 'option-row',
                style: Object.assign({}, styles.itemDiv, _styleDiv),
                key: index,
                ref: "v" + index,
                onClick: _this._handlerClickOption.bind(_this, item, index)
              },
              item.caption
            );
          });
          _this.domOptionsCache = _domOptions;
        } else {
          _domOptions = _this.domOptionsCache;
        }
      }

      var width = _this.props.width,
          _styleOptions = isShowOption ? { display: 'block' } : { display: 'none' },
          _styleDivWidth = width ? { width: width + 'px' } : null,
          _numberFilteredItems = options[0] && options[0].value !== 'noresult' ? options.length : 0,
          _numberAllItems = _this.props.options ? _this.props.options.length : 0;


      return _react2.default.createElement(
        'div',
        { style: Object.assign({}, styles.rootOptionDiv, _styleOptions, _styleDivWidth) },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(c) {
              return _this.domOptions = c;
            },
            key: '1',
            style: Object.assign({}, styles.optionDiv, _styleOptions, _styleDivWidth)
          },
          _domOptions
        ),
        _react2.default.createElement(
          'div',
          { key: '2', style: styles.optionsFooter },
          _react2.default.createElement(
            'span',
            { style: styles.fileredSpan },
            'Filtered ',
            _numberFilteredItems,
            ' : ',
            _numberAllItems
          )
        )
      );
    };

    _this.focusInput = function () {
      _this.domInputText.focus();
    };

    _this.focusNotValidInput = function () {
      _this.domInputText.focus();
    };

    _this.domOptionsCache = null;
    _this.indexActiveOption = 0;

    var optionName = props.optionName,
        optionNames = props.optionNames,
        _optionName = optionName ? ' ' + optionName : '',
        _optionNames = optionNames ? ' ' + optionNames : optionName ? _optionName : '';

    _this.state = {
      value: '',
      isShowOption: false,
      options: props.options,
      optionName: _optionName,
      optionNames: _optionNames,
      isValidDomOptionsCache: false,
      isLocalMode: false
    };
    return _this;
  }

  _createClass(ZhSelect, [{
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
        var domActiveOption = this._getDomForActiveOption();
        this._decorateOfDomActiveOption(domActiveOption);
        this._makeVisibleOfDomActiveOption(domActiveOption);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var width = this.props.width,
          _state = this.state,
          value = _state.value,
          isLocalMode = _state.isLocalMode,
          isShowOption = _state.isShowOption,
          _styleArrow = isShowOption ? styles.arrow_show : null,
          _styleDivWidth = width ? { width: width + 'px' } : null,
          _styleInputWidth = width ? { width: width - 30 + 'px' } : null,
          _styleHr = width ? { width: width - 40 + 'px' } : null;


      var _domOptions = isLocalMode || isShowOption ? this.renderOptions() : null;

      var _props = this.props,
          isLoading = _props.isLoading,
          isLoadingFailed = _props.isLoadingFailed,
          placeholder = _props.placeholder,
          _state2 = this.state,
          optionName = _state2.optionName,
          optionNames = _state2.optionNames;


      var _domAfterInput = void 0,
          _placeholder = void 0;
      if (!isLoading && !isLoadingFailed) {
        _placeholder = placeholder ? placeholder : 'Select' + optionName + '...';
        _domAfterInput = _react2.default.createElement(
          'span',
          {
            style: styles.arrowCell,
            onClick: this._handlerToggleOptions },
          _react2.default.createElement('span', { style: Object.assign({}, styles.arrow, _styleArrow) })
        );
      } else if (isLoading) {
        _placeholder = 'Loading' + optionNames + '...';
        _domAfterInput = _react2.default.createElement('span', {
          style: styles.spinnerCell,
          'data-loader': 'circle'
        });
      } else if (isLoadingFailed) {
        _placeholder = 'Loading' + optionNames + ' Failed';
        _domAfterInput = _react2.default.createElement('span', {
          style: styles.spinnerFailedCell,
          'data-loader': 'circle-failed',
          onClick: this.props.onLoadOption
        });
      }

      return _react2.default.createElement(
        'div',
        { style: Object.assign({}, styles.rootDiv, _styleDivWidth) },
        _react2.default.createElement('input', {
          ref: function ref(c) {
            return _this2.domInputText = c;
          },
          type: 'text',
          value: value,
          style: Object.assign({}, styles.inputText, _styleInputWidth),
          placeholder: _placeholder,
          translate: false,
          onChange: this._handlerInputChange,
          onKeyDown: this._handlerInputKeyDown }),
        _domAfterInput,
        _react2.default.createElement('hr', { style: Object.assign({}, styles.inputHr, _styleHr) }),
        _domOptions
      );
    }
  }]);

  return ZhSelect;
}(_react.Component), _class.defaultProps = {
  options: [],
  optionName: '',
  optionNames: '',
  isUpdateOptions: false
}, _temp);
exports.default = ZhSelect;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ZhSelect.js.map