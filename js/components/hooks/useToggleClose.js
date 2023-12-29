"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useToggleClose = initialValue => {
  const [state, setState] = (0, _uiApi.useState)(() => [!!initialValue, () => setState(prevState => [!prevState[0], prevState[1], prevState[2]]), () => setState(prevState => [false, prevState[1], prevState[2]])]);
  return state;
};
var _default = exports.default = useToggleClose;
//# sourceMappingURL=useToggleClose.js.map