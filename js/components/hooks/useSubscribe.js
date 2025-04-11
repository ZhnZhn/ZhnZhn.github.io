"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useProperty = require("./useProperty");
const useSubscribe = (store, selector, onChange) => {
  (0, _uiApi.useSyncExternalStore)(...(0, _useProperty.useRefInit)(() => [() => store.subscribe(selector, onChange), () => selector(store.getState())]));
};
var _default = exports.default = useSubscribe;
//# sourceMappingURL=useSubscribe.js.map