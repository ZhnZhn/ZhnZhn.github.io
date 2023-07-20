"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const FN_NOOP = () => {};
class ErrorBoundary extends _uiApi.Component {
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
      FallbackComp,
      children
    } = this.props;
    return this.state.hasError ? FallbackComp : children;
  }
}
ErrorBoundary.defaultProps = {
  onError: FN_NOOP
};
var _default = ErrorBoundary;
exports.default = _default;
//# sourceMappingURL=ErrorBoundary.js.map