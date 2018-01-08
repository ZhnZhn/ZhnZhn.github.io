'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

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
      return _react2.default.createElement(_RowInputSelect2.default, (0, _extends3.default)({}, this.props, this.state, {
        onLoadOption: this._handlerLoadOptions
      }));
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.state.options;
    }
  }]);
  return SelectWithLoad;
}(_react.Component), _class2.defaultProps = {
  isShow: true,
  optionNames: 'Items',
  jsonProp: 'items'
}, _temp2)) || _class;

exports.default = SelectWithLoad;
//# sourceMappingURL=SelectWithLoad.js.map