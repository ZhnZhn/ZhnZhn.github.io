"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useRefList = (initialList = []) => {
  const ref = (0, _react.useRef)(initialList),
        addValue = (0, _react.useCallback)(value => {
    ref.current.push(value);
  }, []),
        removeValue = (0, _react.useCallback)(value => {
    ref.current = ref.current.filter(v => v !== value);
  }, []);
  return [ref, addValue, removeValue];
};

var _default = useRefList;
exports.default = _default;
//# sourceMappingURL=useRefList.js.map