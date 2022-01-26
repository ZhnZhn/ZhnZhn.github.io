"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useVm = () => {
  const refVm = (0, _react.useRef)(),
        compareTo = (0, _react.useCallback)(dateTo => {
    const {
      current
    } = refVm;

    if (current) {
      return current._updateDateTo(dateTo);
    }
  }, []);
  return [refVm, compareTo];
};

var _default = useVm;
exports.default = _default;
//# sourceMappingURL=useVm.js.map