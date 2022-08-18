"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const _initState = initialValue => !!initialValue,
      _reducer = (state, boolValue) => boolValue;

const useBool = initialValue => {
  const [is, setIs] = (0, _uiApi.useReducer)(_reducer, initialValue, _initState),
        _refSetTrue = (0, _uiApi.useRef)(() => setIs(true)),
        _refSetFalse = (0, _uiApi.useRef)(() => setIs(false));

  return [is, (0, _uiApi.getRefValue)(_refSetTrue), (0, _uiApi.getRefValue)(_refSetFalse)];
};

var _default = useBool;
exports.default = _default;
//# sourceMappingURL=useBool.js.map