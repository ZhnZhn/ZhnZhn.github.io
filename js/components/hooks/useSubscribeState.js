"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
/*eslint-disable react-hooks/exhaustive-deps */
const useSubscribeState = (store, selector, initialState) => {
  const [state, setState] = (0, _uiApi.useState)(initialState);
  (0, _uiApi.useEffect)(() => store.subscribe(selector, setState), []);
  //store, selector

  return state;
};
/*eslint-disable react-hooks/exhaustive-deps */
var _default = exports.default = useSubscribeState;
//# sourceMappingURL=useSubscribeState.js.map