"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
/*eslint-disable react-hooks/exhaustive-deps */
const useSubscribe = (store, selector, onChange) => {
  (0, _uiApi.useEffect)(() => store.subscribe(selector, onChange), []);
  //onChange
};
/*eslint-disable react-hooks/exhaustive-deps */
var _default = exports.default = useSubscribe;
//# sourceMappingURL=useSubscribe.js.map