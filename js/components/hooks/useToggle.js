"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const _isBool = v => typeof v === 'boolean';

const useToggle = initialValue => {
  const [is, setIs] = (0, _react.useState)(() => !!initialValue);
  return [is, (0, _react.useCallback)(v => {
    if (_isBool(v)) {
      setIs(v);
    } else {
      setIs(is => !is);
    }
  }, [])];
};

var _default = useToggle;
exports.default = _default;
//# sourceMappingURL=useToggle.js.map