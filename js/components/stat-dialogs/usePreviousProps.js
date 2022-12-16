"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const usePreviosProps = props => {
  const ref = (0, _uiApi.useRef)();
  (0, _uiApi.useEffect)(() => {
    ref.current = props;
  }, [props]);
  return ref.current;
};
var _default = usePreviosProps;
exports.default = _default;
//# sourceMappingURL=usePreviousProps.js.map