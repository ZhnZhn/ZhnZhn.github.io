'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  arrowCell: {
    cursor: 'pointer',
    //display: table-cell
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '25px',
    paddingRight: '5px'
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
  },
  //lineHeight: '14px'
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

var ZhSelect = _react2.default.createClass({
  displayName: 'ZhSelect',

  getInitialState: function getInitialState() {
    return {
      value: '',
      isShowOption: false,
      options: this.props.options,
      indexActiveOption: 0,
      domOptionsCache: null,
      isValidDomOptionsCache: false,
      isLocalMode: false
    };
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      nextState.isLocalMode = false;
    } else {
      nextState.isLocalMode = true;
    }

    return true;
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (this.props.options !== nextProps.options) {
        //New options come from Parent - Clear domCache, Init State
        this.state.isValidDomOptionsCache = false;
        this.state.value = '';
        this.state.isShowOption = false;
        this.state.indexActiveOption = 0;
        this.state.options = nextProps.options;
        //console.log("componentWillReceiveProps this.props.options !== nextProps.options");
      }
    }
  },

  _getDomForActiveOption: function _getDomForActiveOption() {
    return this.refs["v" + this.state.indexActiveOption];
  },

  _decorateOfDomActiveOption: function _decorateOfDomActiveOption(domActiveOption) {
    if (domActiveOption) {
      domActiveOption.classList.add("option-row__active");
    }
  },

  _decorateActiveOption: function _decorateActiveOption() {
    var domActiveOption = this.refs["v" + this.state.indexActiveOption];
    domActiveOption.classList.add("option-row__active");
  },

  _undecorateActiveOption: function _undecorateActiveOption() {
    if (this.refs["v" + this.state.indexActiveOption]) {
      this.refs["v" + this.state.indexActiveOption].classList.remove("option-row__active");
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
      var scrollTop = this.refs.options.scrollTop;
      if (offsetTop - scrollTop > 70) {
        this.refs.options.scrollTop += offsetTop - scrollTop - 70;
      }
      if (offsetTop - scrollTop < 0) {
        this.refs.options.scrollTop = 0;
      }
    }
  },

  _makeVisibleActiveOption: function _makeVisibleActiveOption() {
    var domActiveOption = this.refs["v" + this.state.indexActiveOption];

    var offsetTop = domActiveOption.offsetTop;
    var scrollTop = this.refs.options.scrollTop;
    if (offsetTop - scrollTop > 70) {
      this.refs.options.scrollTop += offsetTop - scrollTop - 70;
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    //Decorate Active Option
    if (this.state.isShowOption) {
      var domActiveOption = this._getDomForActiveOption();
      this._decorateOfDomActiveOption(domActiveOption);
      this._makeVisibleOfDomActiveOption(domActiveOption);
    }
  },

  _filterOptionsToState: function _filterOptionsToState(options, value) {
    this.state.value = value;
    this.state.isShowOption = true;

    value = value.toLowerCase();
    this.state.options = _lodash2.default.filter(options, function (option) {
      return option.caption.toLowerCase().indexOf(value) !== -1;
    });
  },

  _handlerInputChange: function _handlerInputChange(event) {
    var value = void 0;
    value = event.target.value;

    if (value.length !== this.state.value.length) {

      if (value.length > this.state.value.length) {
        this._filterOptionsToState(this.state.options, value);
      } else if (value.length < this.state.value.length) {
        this._filterOptionsToState(this.props.options, value);
      }

      if (this.state.options.length === 0) {
        this.state.options.push({ caption: 'No results found', value: 'noresult' });
      }

      this._undecorateActiveOption();
      this.state.indexActiveOption = 0;
      this.state.isValidDomOptionsCache = false;
      this.setState(this.state);
    }
  },

  _handlerInputKeyDown: function _handlerInputKeyDown(event) {
    switch (event.keyCode) {
      // enter
      case 13:
        var item = this.state.options[this.state.indexActiveOption];

        this.state.value = this.state.options[this.state.indexActiveOption].caption;
        this.state.isShowOption = false;
        this.state.isValidDomOptionsCache = true;
        this.setState(this.state);

        if (item.value !== 'noresult') {
          this.props.onSelect(item);
        } else {
          this.props.onSelect(null);
        }
        break;
      //escape
      case 27:
        if (this.state.isShowOption) {
          this.state.isShowOption = false;
          this.setState(this.state);
        } else {
          this.state.value = '';
          this.state.isShowOption = false;
          this.state.options = this.props.options;
          this.state.indexActiveOption = 0;
          this.state.isValidDomOptionsCache = false;
          this.setState(this.state);
          this.props.onSelect(null);
        }
        break;
      //down
      case 40:
        if (!this.state.isShowOption) {
          this.state.isShowOption = true;
          this.setState(this.state);
        } else {
          event.preventDefault();

          var domActiveOption = this._getDomForActiveOption();

          if (domActiveOption) {
            this._undecorateOfDomActiveOption(domActiveOption);

            this.state.indexActiveOption += 1;
            if (this.state.indexActiveOption >= this.state.options.length) {
              this.state.indexActiveOption = 0;
              this.refs.options.scrollTop = 0;
            }

            domActiveOption = this._getDomForActiveOption();
            this._decorateOfDomActiveOption(domActiveOption);

            var offsetTop = this.refs["v" + this.state.indexActiveOption].offsetTop;
            var scrollTop = this.refs.options.scrollTop;
            if (offsetTop - scrollTop > 70) {
              this.refs.options.scrollTop += offsetTop - scrollTop - 70;
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

            this.state.indexActiveOption -= 1;
            if (this.state.indexActiveOption < 0) {
              this.state.indexActiveOption = this.state.options.length - 1;
              var offsetTop2 = this.refs["v" + this.state.indexActiveOption].offsetTop;
              this.refs.options.scrollTop = offsetTop2;
            }

            _domActiveOption = this._getDomForActiveOption();
            this._decorateOfDomActiveOption(_domActiveOption);

            var _offsetTop = _domActiveOption.offsetTop;
            var _scrollTop = this.refs.options.scrollTop;
            if (_offsetTop - _scrollTop < 70) {
              this.refs.options.scrollTop -= 70 - (_offsetTop - _scrollTop);
            }
          }
        }
        break;
      default:
        /*console.log(event.keyCode);*/return;
    }
  },

  _handlerToggleOptions: function _handlerToggleOptions() {
    this.state.isShowOption = !this.state.isShowOption;
    this.setState(this.state);
  },

  _handlerClickOption: function _handlerClickOption(item, index, event) {
    this.state.indexActiveOption = index;
    this.state.value = item.caption;
    this.state.isShowOption = false;
    this.setState(this.state);

    this.props.onSelect(item);
  },

  renderOptions: function renderOptions() {
    var _this = this;

    var styleOptions = this.state.isShowOption ? { display: 'block' } : { display: 'none' };
    var domOptions = void 0;

    if (this.state.options) {
      if (!this.state.isValidDomOptionsCache) {
        domOptions = this.state.options.map(function (item, index) {
          var styleDiv = index % 2 === 0 ? styles.itemOdd : styles.itemEven;
          return _react2.default.createElement(
            'div',
            {
              className: 'option-row',
              style: Object.assign({}, styles.itemDiv, styleDiv),
              key: index,
              ref: "v" + index,
              onClick: _this._handlerClickOption.bind(_this, item, index) },
            item.caption
          );
        });
        this.state.domOptionsCache = domOptions;
      } else {
        domOptions = this.state.domOptionsCache;
      }
    }

    var styleDivWidth = null;
    if (this.props.width) {
      styleDivWidth = { width: this.props.width + 'px' };
    }

    var numberFilteredItems = void 0;
    if (this.state.options[0]) {
      if (this.state.options[0].value !== 'noresult') {
        numberFilteredItems = this.state.options.length;
      } else {
        numberFilteredItems = 0;
      }
    } else {
      numberFilteredItems = 0;
    }

    var numberAllItems = this.props.options ? this.props.options.length : 0;

    return _react2.default.createElement(
      'div',
      { style: Object.assign({}, styles.rootOptionDiv, styleOptions, styleDivWidth) },
      _react2.default.createElement(
        'div',
        { ref: 'options', key: '1', style: Object.assign({}, styles.optionDiv, styleOptions, styleDivWidth) },
        domOptions
      ),
      _react2.default.createElement(
        'div',
        { key: '2', style: styles.optionsFooter },
        _react2.default.createElement(
          'span',
          { style: styles.fileredSpan },
          'Filtered ',
          numberFilteredItems,
          ' : ',
          numberAllItems
        )
      )
    );
  },

  render: function render() {
    var value = this.state.value;
    var styleOptions = this.state.isShowOption ? { display: 'block' } : { display: 'none' };
    var styleArrow = this.state.isShowOption ? { borderColor: '#1B75BB transparent transparent' } : null;

    var styleDivWidth = null;
    var styleInputWidth = null;
    var styleHr = null;
    if (this.props.width) {
      styleDivWidth = { width: this.props.width + 'px' };
      styleInputWidth = { width: this.props.width - 20 + 'px' };
      styleHr = { width: this.props.width - 30 + 'px' };
    }

    var domOptions = null;
    if (this.state.isLocalMode) {
      domOptions = this.renderOptions();
    } else {
      if (this.state.isShowOption) {
        domOptions = this.renderOptions();
      }
    }

    return _react2.default.createElement(
      'div',
      { style: Object.assign({}, styles.rootDiv, styleDivWidth) },
      _react2.default.createElement('input', {
        ref: 'inputText',
        type: 'text',
        value: value,
        style: Object.assign({}, styles.inputText, styleInputWidth),
        placeholder: 'Select...',
        translate: false,
        onChange: this._handlerInputChange,
        onKeyDown: this._handlerInputKeyDown }),
      _react2.default.createElement(
        'span',
        {
          style: styles.arrowCell,
          onClick: this._handlerToggleOptions },
        _react2.default.createElement('span', { style: Object.assign({}, styles.arrow, styleArrow) })
      ),
      _react2.default.createElement('hr', { style: Object.assign({}, styles.inputHr, styleHr) }),
      domOptions
    );
  },

  focusInput: function focusInput() {
    this.refs.inputText.focus();
  },

  focusNotValidInput: function focusNotValidInput() {
    this.refs.inputText.focus();
  }

});

exports.default = ZhSelect;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ZhSelect.js.map