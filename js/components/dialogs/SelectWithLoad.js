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

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputSelect = require('../zhn-select/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

var _withLoadOptions = require('./decorators/withLoadOptions');

var _withLoadOptions2 = _interopRequireDefault(_withLoadOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectWithLoad = (0, _withLoadOptions2.default)(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3.default)(SelectWithLoad, _Component);

  function SelectWithLoad() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SelectWithLoad);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SelectWithLoad.__proto__ || Object.getPrototypeOf(SelectWithLoad)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      options: [],
      isLoading: false,
      isLoadingFailed: false
    }, _this._handlerLoadOptions = function () {
      var _this$props = _this.props,
          uri = _this$props.uri,
          jsonProp = _this$props.jsonProp;

      _this._handlerWithLoadOptions('options', 'isLoading', 'isLoadingFailed', uri, jsonProp);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SelectWithLoad, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._handlerLoadOptions();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps !== this.props) {
        if (this.state.isLoadingFailed && this.props.isShow) {
          this._handlerLoadOptions();
        }
      }
    }
  }, {
    key: 'componetWillUnmount',
    value: function componetWillUnmount() {
      this._unmountWithLoadOptions();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          optionNames = _props.optionNames,
          placeholder = _props.placeholder,
          onSelect = _props.onSelect,
          _state = this.state,
          isLoading = _state.isLoading,
          isLoadingFailed = _state.isLoadingFailed,
          options = _state.options;


      return _react2.default.createElement(
        'div',
        { style: _DialogStyles2.default.rowDiv },
        _react2.default.createElement(
          'span',
          { style: _DialogStyles2.default.labelSpan },
          caption
        ),
        _react2.default.createElement(_InputSelect2.default, {
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
  }]);
  return SelectWithLoad;
}(_react.Component), _class2.defaultProps = { isShow: true }, _temp2)) || _class;

exports.default = SelectWithLoad;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\SelectWithLoad.js.map