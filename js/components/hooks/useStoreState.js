"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useStoreState = (initialState, useStoreMessage, updateState) => {
  const [state, setState] = (0, _uiApi.useState)(initialState);
  useStoreMessage(storeMessage => updateState(storeMessage, setState));
  return [state, setState];
};
var _default = exports.default = useStoreState;
//# sourceMappingURL=useStoreState.js.map