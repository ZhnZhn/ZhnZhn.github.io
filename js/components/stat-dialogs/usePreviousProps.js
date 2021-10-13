"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const usePreviosProps = props => {
  const ref = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    ref.current = props;
  }, [props]);
  return ref.current;
};

var _default = usePreviosProps;
exports.default = _default;
//# sourceMappingURL=usePreviousProps.js.map