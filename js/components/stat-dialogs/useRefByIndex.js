"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useRefByIndex = () => {
  const refItems = (0, _react.useRef)([]),
        fSelect = (0, _react.useCallback)(index => item => {
    refItems.current[index] = item ? { ...item
    } : void 0;
  }, []);
  return [refItems, fSelect];
};

var _default = useRefByIndex;
exports.default = _default;
//# sourceMappingURL=useRefByIndex.js.map