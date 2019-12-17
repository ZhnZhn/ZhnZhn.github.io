"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _RowInputSelect = _interopRequireDefault(require("./rows/RowInputSelect"));

var _withLoadOptions = _interopRequireDefault(require("./decorators/withLoadOptions"));

var _class, _class2, _temp;

var SelectWithLoad = (0, _withLoadOptions["default"])(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(SelectWithLoad, _Component);

  function SelectWithLoad() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      options: [],
      isLoading: false,
      isLoadingFailed: false
    };

    _this._handlerLoadOptions = function () {
      var _this$props = _this.props,
          uri = _this$props.uri,
          jsonProp = _this$props.jsonProp;

      _this._handlerWithLoadOptions('options', uri, jsonProp);
    };

    return _this;
  }

  var _proto = SelectWithLoad.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._handlerLoadOptions();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.state.isLoadingFailed && this.props.isShow) {
        this._handlerLoadOptions();
      }
    }
  };

  _proto.componetWillUnmount = function componetWillUnmount() {
    this._unmountWithLoadOptions();
  };

  _proto.render = function render() {
    return _react["default"].createElement(_RowInputSelect["default"], (0, _extends2["default"])({}, this.props, this.state, {
      onLoadOption: this._handlerLoadOptions
    }));
  };

  _proto.getOptions = function getOptions() {
    return this.state.options;
  };

  return SelectWithLoad;
}(_react.Component), _class2.defaultProps = {
  isShow: true,
  optionNames: 'Items',
  jsonProp: 'items'
}, _temp)) || _class;

var _default = SelectWithLoad;
exports["default"] = _default;
//# sourceMappingURL=SelectWithLoad.js.map