"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const FN_NOOP = () => {};

class ErrorBoundary extends _react.Component {
  constructor() {
    super(...arguments);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errMsg) {
    this.props.onError();
  }

  render() {
    const {
      hasError
    } = this.state,
          {
      FallbackComp,
      children
    } = this.props;
    return hasError ? FallbackComp : children;
  }

}

ErrorBoundary.defaultProps = {
  onError: FN_NOOP
};
var _default = ErrorBoundary;
exports.default = _default;
//# sourceMappingURL=ErrorBoundary.js.map