"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useRefInit = _interopRequireDefault(require("./useRefInit"));
const useSubscribe = (store, selector, onChange) => {
  (0, _uiApi.useSyncExternalStore)(...(0, _useRefInit.default)(() => [() => store.subscribe(selector, onChange), () => selector(store.getState())]));
};
var _default = exports.default = useSubscribe;
//# sourceMappingURL=useSubscribe.js.map