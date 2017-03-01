'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputSelect = require('../zhn/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

var _withLoadOptions = require('./decorators/withLoadOptions');

var _withLoadOptions2 = _interopRequireDefault(_withLoadOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Styles = _DialogStyles2.default;

var SelectWithLoad = (0, _withLoadOptions2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(SelectWithLoad, _Component);

  function SelectWithLoad() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectWithLoad);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectWithLoad.__proto__ || Object.getPrototypeOf(SelectWithLoad)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      options: [],
      isLoading: false,
      isLoadingFailed: false
    }, _this._handlerLoadOptions = function () {
      var _this$props = _this.props,
          uri = _this$props.uri,
          jsonProp = _this$props.jsonProp;

      _this._handlerWithLoadOptions('options', 'isLoading', 'isLoadingFailed', uri, jsonProp);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectWithLoad, [{
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
        { style: Styles.rowDiv },
        _react2.default.createElement(
          'span',
          { style: Styles.labelSpan },
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
//# sourceMappingURL=SelectWithLoad.js.map