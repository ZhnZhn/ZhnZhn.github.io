"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));

var _ShowHide = _interopRequireDefault(require("../../zhn/ShowHide"));

var _withLoadOptions = _interopRequireDefault(require("../decorators/withLoadOptions"));

var _class, _class2, _temp;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var SelectOneTwo = (0, _withLoadOptions["default"])(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(SelectOneTwo, _Component);

  function SelectOneTwo() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      isLoading: false,
      isLoadingFailed: false,
      oneOptions: [],
      twoOptions: []
    };
    _this.one = null;
    _this.two = null;

    _this._loadOptions = function () {
      var _this$props = _this.props,
          uri = _this$props.uri,
          oneJsonProp = _this$props.oneJsonProp;

      _this._handlerWithLoadOptions('oneOptions', uri, oneJsonProp);
    };

    _this._setTwoOptions = function (twoOptions) {
      if (twoOptions === void 0) {
        twoOptions = [];
      }

      _this.two = null;

      _this.setState({
        twoOptions: twoOptions
      });
    };

    _this._hSelectOne = function (one) {
      var onSelectOne = _this.props.onSelectOne;
      _this.one = one;

      if (one) {
        if (one.columns) {
          _this._setTwoOptions(one.columns);
        } else if (!_this._isDfColumns) {
          _this._setTwoOptions();
        }
      } else if (!_this._isDfColumns) {
        _this._setTwoOptions();
      }

      if (_isFn(onSelectOne)) {
        onSelectOne(one);
      }
    };

    _this._hSelectTwo = function (two) {
      _this.two = two;
    };

    return _this;
  }

  var _proto = SelectOneTwo.prototype;

  /*
  constructor(props){
    super(props);
    this.one = null;
    this.two = null;
  }
  */
  _proto.componentDidMount = function componentDidMount() {
    this._loadOptions();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.state.isLoadingFailed && this.props.isShow) {
        this._loadOptions();
      }
    }
  };

  _proto.componetWillUnmount = function componetWillUnmount() {
    this._unmountWithLoadOptions();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        isShowLabels = _this$props2.isShowLabels,
        oneCaption = _this$props2.oneCaption,
        oneOptionNames = _this$props2.oneOptionNames,
        isHideTwo = _this$props2.isHideTwo,
        twoCaption = _this$props2.twoCaption,
        _this$state = this.state,
        isLoading = _this$state.isLoading,
        isLoadingFailed = _this$state.isLoadingFailed,
        oneOptions = _this$state.oneOptions,
        twoOptions = _this$state.twoOptions;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], {
        isShowLabels: isShowLabels,
        caption: oneCaption,
        options: oneOptions,
        optionNames: oneOptionNames,
        isLoading: isLoading,
        isLoadingFailed: isLoadingFailed,
        onLoadOption: this._loadOptions,
        onSelect: this._hSelectOne
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide["default"], {
        isShow: !isHideTwo,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], {
          isShowLabels: isShowLabels,
          caption: twoCaption,
          options: twoOptions,
          onSelect: this._hSelectTwo
        })
      })]
    });
  };

  _proto.getValidation = function getValidation() {
    var msg = [],
        _this$props3 = this.props,
        oneCaption = _this$props3.oneCaption,
        twoCaption = _this$props3.twoCaption,
        msgOnNotSelected = _this$props3.msgOnNotSelected;

    if (!this.one) {
      msg.push(msgOnNotSelected(oneCaption));
    }

    if (!this.two) {
      msg.push(msgOnNotSelected(twoCaption));
    }

    if (msg.length > 0) {
      return {
        isValid: false,
        msg: msg
      };
    }

    return {
      isValid: true
    };
  };

  _proto.getValues = function getValues() {
    return {
      one: this.one,
      two: this.two
    };
  };

  return SelectOneTwo;
}(_react.Component), _class2.defaultProps = {
  isShow: true,
  isHideTwo: false,
  oneOptionNames: 'Items',
  msgOnNotSelected: function msgOnNotSelected(item) {
    return item + " is not selected";
  }
}, _temp)) || _class;

var _default = SelectOneTwo;
exports["default"] = _default;
//# sourceMappingURL=SelectOneTwo.js.map