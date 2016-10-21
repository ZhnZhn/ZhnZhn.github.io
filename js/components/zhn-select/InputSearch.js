'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    //width: '95%',
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

var InputSearch = _react2.default.createClass({
  displayName: 'InputSearch',
  getDefaultProps: function getDefaultProps() {
    return {
      options: [],
      optionName: '',
      optionNames: '',
      isUpdateOptions: false
    };
  },
  getInitialState: function getInitialState() {
    this.domOptionsCache = null;
    this.indexActiveOption = 0;

    var _props = this.props;
    var optionName = _props.optionName;
    var optionNames = _props.optionNames;
    var _optionName = optionName ? ' ' + optionName : '';
    var _optionNames = optionNames ? ' ' + optionNames : optionName ? _optionName : '';
    return {
      value: '',
      isShowOption: false,
      options: this.props.options,
      optionName: _optionName,
      optionNames: _optionNames,
      isValidDomOptionsCache: false,
      isLocalMode: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (this.props.options !== nextProps.options || nextProps.isUpdateOptions) {
        //New options come from Parent - Clear domCache, Init State
        this._setStateToInit(nextProps.options);
      }
    }
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps || nextProps.isUpdateOptions) {
      nextState.isLocalMode = false;
    } else {
      nextState.isLocalMode = true;
    }

    return true;
  },
  componentDidUpdate: function componentDidUpdate() {
    //Decorate Active Option
    if (this.state.isShowOption) {
      var domActiveOption = this._getDomForActiveOption();
      this._decorateOfDomActiveOption(domActiveOption);
      this._makeVisibleOfDomActiveOption(domActiveOption);
    }
  },
  _setStateToInit: function _setStateToInit(options) {
    this.indexActiveOption = 0;
    this.setState({
      value: '',
      isShowOption: false,
      options: options,
      isValidDomOptionsCache: false
    });
  },
  _getDomForActiveOption: function _getDomForActiveOption() {
    return this.refs["v" + this.indexActiveOption];
  },
  _decorateOfDomActiveOption: function _decorateOfDomActiveOption(domActiveOption) {
    if (domActiveOption) {
      domActiveOption.classList.add("option-row__active");
    }
  },
  _decorateActiveOption: function _decorateActiveOption() {
    var domActiveOption = this.refs["v" + this.indexActiveOption];
    domActiveOption.classList.add("option-row__active");
  },
  _undecorateActiveOption: function _undecorateActiveOption() {
    if (this.refs["v" + this.indexActiveOption]) {
      this.refs["v" + this.indexActiveOption].classList.remove("option-row__active");
    }
  },
  _undecorateOfDomActiveOption: function _undecorateOfDomActiveOption(domActiveOption) {
    if (domActiveOption) {
      domActiveOption.classList.remove("option-row__active");
    }
  },
  _makeVisibleOfDomActiveOption: function _makeVisibleOfDomActiveOption(domActiveOption) {
    if (domActiveOption) {
      var offsetTop = domActiveOption.offsetTop;
      var scrollTop = this.domOptions.scrollTop;
      if (offsetTop - scrollTop > 70) {
        this.domOptions.scrollTop += offsetTop - scrollTop - 70;
      }
      if (offsetTop - scrollTop < 0) {
        this.domOptions.scrollTop = 0;
      }
    }
  },
  _makeVisibleActiveOption: function _makeVisibleActiveOption() {
    var domActiveOption = this.refs["v" + this.indexActiveOption];

    var offsetTop = domActiveOption.offsetTop;
    var scrollTop = this.domOptions.scrollTop;
    if (offsetTop - scrollTop > 70) {
      this.domOptions.scrollTop += offsetTop - scrollTop - 70;
    }
  },
  _filterOptionsToState: function _filterOptionsToState(options, value) {
    var valueFor = value.toLowerCase();
    return options.filter(function (option, i) {
      return option.caption.toLowerCase().indexOf(valueFor) !== -1;
    });
  },
  _handlerInputChange: function _handlerInputChange(event) {
    var value = event.target.value;
    var arr = [];
    if (value.length !== this.state.value.length) {
      if (value.length > this.state.value.length) {
        arr = this._filterOptionsToState(this.state.options, value);
      } else if (value.length < this.state.value.length) {
        arr = this._filterOptionsToState(this.props.options, value);
      }
      if (arr.length === 0) {
        arr.push({ caption: 'No results found', value: 'noresult' });
      }
      this._undecorateActiveOption();
      this.indexActiveOption = 0;
      this.setState({
        value: value,
        isShowOption: true,
        isValidDomOptionsCache: false,
        options: arr
      });
    }
  },
  _handlerInputKeyDown: function _handlerInputKeyDown(event) {
    switch (event.keyCode) {
      // enter
      case 13:
        var item = this.state.options[this.indexActiveOption];

        if (item && item.caption) {
          this.setState({
            value: item.caption,
            isShowOption: false,
            isValidDomOptionsCache: true
          });

          if (item.value !== 'noresult') {
            this.props.onSelect(item);
          } else {
            this.props.onSelect(null);
          }
        }
        break;
      //escape
      case 27:
        if (this.state.isShowOption) {
          this.setState({ isShowOption: false });
        } else {
          this._undecorateActiveOption();
          this._setStateToInit(this.props.options);
          this.props.onSelect(null);
        }
        break;
      //down
      case 40:
        if (!this.state.isShowOption) {
          this.setState({ isShowOption: true });
        } else {
          event.preventDefault();

          var domActiveOption = this._getDomForActiveOption();

          if (domActiveOption) {
            this._undecorateOfDomActiveOption(domActiveOption);

            this.indexActiveOption += 1;
            if (this.indexActiveOption >= this.state.options.length) {
              this.indexActiveOption = 0;
              this.domOptions.scrollTop = 0;
            }

            domActiveOption = this._getDomForActiveOption();
            this._decorateOfDomActiveOption(domActiveOption);

            var offsetTop = this.refs["v" + this.indexActiveOption].offsetTop;
            var scrollTop = this.domOptions.scrollTop;
            if (offsetTop - scrollTop > 70) {
              this.domOptions.scrollTop += offsetTop - scrollTop - 70;
            }
          }
        }
        break;
      //up
      case 38:
        if (this.state.isShowOption) {
          event.preventDefault();

          var _domActiveOption = this._getDomForActiveOption();
          if (_domActiveOption) {
            this._undecorateOfDomActiveOption(_domActiveOption);

            this.indexActiveOption -= 1;
            if (this.indexActiveOption < 0) {
              this.indexActiveOption = this.state.options.length - 1;
              var offsetTop2 = this.refs["v" + this.indexActiveOption].offsetTop;
              this.domOptions.scrollTop = offsetTop2;
            }

            _domActiveOption = this._getDomForActiveOption();
            this._decorateOfDomActiveOption(_domActiveOption);

            var _offsetTop = _domActiveOption.offsetTop;
            var _scrollTop = this.domOptions.scrollTop;
            if (_offsetTop - _scrollTop < 70) {
              this.domOptions.scrollTop -= 70 - (_offsetTop - _scrollTop);
            }
          }
        }
        break;
      default:
        /*console.log(event.keyCode);*/return;
    }
  },
  _handlerToggleOptions: function _handlerToggleOptions() {
    this.setState({ isShowOption: !this.state.isShowOption });
  },
  _handlerClickOption: function _handlerClickOption(item, index, event) {
    this.indexActiveOption = index;
    this.setState({
      value: item.caption,
      isShowOption: false
    });
    this.props.onSelect(item);
  },
  renderOptions: function renderOptions() {
    var _this = this;

    var _state = this.state;
    var isShowOption = _state.isShowOption;
    var options = _state.options;
    var isValidDomOptionsCache = _state.isValidDomOptionsCache;


    var _domOptions = void 0;
    if (options) {
      if (!isValidDomOptionsCache) {
        _domOptions = options.map(function (item, index) {
          var _styleDiv = index % 2 === 0 ? styles.itemOdd : styles.itemEven;
          return _react2.default.createElement(
            'div',
            {
              key: index,
              ref: "v" + index,
              className: 'option-row',
              style: Object.assign({}, styles.itemDiv, _styleDiv),
              onClick: _this._handlerClickOption.bind(_this, item, index)
            },
            item.caption
          );
        });
        this.domOptionsCache = _domOptions;
      } else {
        _domOptions = this.domOptionsCache;
      }
    }

    var width = this.props.width;
    var _styleOptions = isShowOption ? { display: 'block' } : { display: 'none' };
    var _styleDivWidth = width ? { width: width + 'px' } : null;
    var _numberFilteredItems = options[0] && options[0].value !== 'noresult' ? options.length : 0;
    var _numberAllItems = this.props.options ? this.props.options.length : 0;

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
  },
  _renderAfterInput: function _renderAfterInput(isLoading, isLoadingFailed, _styleArrow) {
    if (!isLoading && !isLoadingFailed) {
      return _react2.default.createElement(
        'span',
        {
          style: styles.arrowCell,
          onClick: this._handlerToggleOptions },
        _react2.default.createElement('span', { style: Object.assign({}, styles.arrow, _styleArrow) })
      );
    } else if (isLoading) {
      return _react2.default.createElement('span', {
        style: styles.spinnerCell,
        'data-loader': 'circle'
      });
    } else if (isLoadingFailed) {
      return _react2.default.createElement('span', {
        style: styles.spinnerFailedCell,
        'data-loader': 'circle-failed',
        onClick: this.props.onLoadOption
      });
    }
  },
  render: function render() {
    var _this2 = this;

    var width = this.props.width;
    var _state2 = this.state;
    var value = _state2.value;
    var isLocalMode = _state2.isLocalMode;
    var isShowOption = _state2.isShowOption;


    var _styleArrow = isShowOption ? { borderColor: '#1B75BB transparent transparent' } : null;

    var _styleDivWidth = null;
    var _styleInputWidth = null;
    var _styleHr = null;
    if (width) {
      _styleDivWidth = { width: width + 'px' };
      _styleInputWidth = { width: width - 30 + 'px' };
      _styleHr = { width: width - 40 + 'px' };
    }

    var _domOptions = isLocalMode || isShowOption ? this.renderOptions() : null;

    var _props2 = this.props;
    var isLoading = _props2.isLoading;
    var isLoadingFailed = _props2.isLoadingFailed;
    var placeholder = _props2.placeholder;
    var _state3 = this.state;
    var optionName = _state3.optionName;
    var optionNames = _state3.optionNames;


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
  },
  focusInput: function focusInput() {
    this.domInputText.focus();
  },
  focusNotValidInput: function focusNotValidInput() {
    this.domInputText.focus();
  }
});

exports.default = InputSearch;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-select\InputSearch.js.map