"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

//import PropTypes from 'prop-types';
var CL = "hrz-container";

var CompContainer = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(CompContainer, _Component);

  function CompContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      containers: []
    };

    _this._onStore = function (actionType, Comp) {
      if (actionType === _this.props.addAction) {
        _this.setState(function (prevState) {
          prevState.containers.unshift(Comp);
          return prevState;
        });
      }
    };

    return _this;
  }

  var _proto = CompContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: this.props.className
    }, this.state.containers);
  };

  return CompContainer;
}(_react.Component);

CompContainer.defaultProps = {
  className: CL
};
var _default = CompContainer;
exports["default"] = _default;
//# sourceMappingURL=CompContainer.js.map