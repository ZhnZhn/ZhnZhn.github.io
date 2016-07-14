'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithLoadOptions = require('./WithLoadOptions');

var _WithLoadOptions2 = _interopRequireDefault(_WithLoadOptions);

var _ZhSelect = require('../ZhSelect');

var _ZhSelect2 = _interopRequireDefault(_ZhSelect);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = _DialogStyles2.default;

var SelectWithLoad = _react2.default.createClass(_extends({}, _WithLoadOptions2.default, {

  displayName: 'SelectWithLoad',

  getDefaultProps: function getDefaultProps() {
    return {
      isShow: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      options: [],
      isLoading: false,
      isLoadingFailed: false
    };
  },
  componentDidMount: function componentDidMount() {
    this._handlerLoadOptions();
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.state.isLoadingFailed && this.props.isShow) {
        this._handlerLoadOptions();
      }
    }
  },
  componetWillUnmount: function componetWillUnmount() {
    this._unmountWithLoadOptions();
  },
  _handlerLoadOptions: function _handlerLoadOptions() {
    var _props = this.props;
    var uri = _props.uri;
    var jsonProp = _props.jsonProp;

    this._handlerWithLoadOptions('options', 'isLoading', 'isLoadingFailed', uri, jsonProp);
  },
  render: function render() {
    var _props2 = this.props;
    var caption = _props2.caption;
    var optionNames = _props2.optionNames;
    var placeholder = _props2.placeholder;
    var onSelect = _props2.onSelect;
    var _state = this.state;
    var isLoading = _state.isLoading;
    var isLoadingFailed = _state.isLoadingFailed;
    var options = _state.options;


    return _react2.default.createElement(
      'div',
      { style: Styles.rowDiv },
      _react2.default.createElement(
        'span',
        { style: Styles.labelSpan },
        caption
      ),
      _react2.default.createElement(_ZhSelect2.default, {
        width: '250',
        isLoading: isLoading,
        isLoadingFailed: isLoadingFailed,
        options: options,
        optionNames: optionNames,
        placeholder: placeholder,
        onLoadOption: this._handlerLoadOptions,
        onSelect: onSelect
      })
    );
  }
}));

exports.default = SelectWithLoad;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\SelectWithLoad.js.map