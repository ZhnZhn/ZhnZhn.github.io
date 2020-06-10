"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DialogContainer = _interopRequireDefault(require("../zhn-containers/DialogContainer"));

//import PropTypes from "prop-types";
var CL_ROOT = "hrz-container";

var BrowserContainer = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(BrowserContainer, _Component);

  function BrowserContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      elBrowsers: []
    };

    _this._onStore = function (actionType, data) {
      if (actionType === _this.props.initBrowserAction) {
        _this.setState(function (prevState) {
          return {
            elBrowsers: [data].concat(prevState.elBrowsers)
          };
        });
      }
    };

    return _this;
  }

  var _proto = BrowserContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var store = this.props.store;
    this.unsubscribe = store.listen(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        store = _this$props.store,
        showDialogAction = _this$props.showDialogAction,
        onCloseDialog = _this$props.onCloseDialog,
        elBrowsers = this.state.elBrowsers;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: CL_ROOT
    }, elBrowsers.map(function (Comp) {
      return /*#__PURE__*/_react["default"].cloneElement(Comp);
    }), /*#__PURE__*/_react["default"].createElement(_DialogContainer["default"], {
      maxDialog: 3,
      store: store,
      showAction: showDialogAction,
      onCloseDialog: onCloseDialog
    }));
  };

  return BrowserContainer;
}(_react.Component);

var _default = BrowserContainer;
exports["default"] = _default;
//# sourceMappingURL=BrowserContainer.js.map