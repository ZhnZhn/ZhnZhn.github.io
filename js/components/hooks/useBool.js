"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useBool = initialValue => {
  const [state, setState] = (0, _uiApi.useState)(() => [!!initialValue, () => setState(prevState => [true, prevState[1], prevState[2]]), () => setState(prevState => [false, prevState[1], prevState[2]])]);
  return state;
};
var _default = exports.default = useBool;
//# sourceMappingURL=useBool.js.map