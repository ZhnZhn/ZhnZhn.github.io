"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useRefInit = _interopRequireDefault(require("./useRefInit"));
const useSubscribeState = (store, selector) => (0, _uiApi.useSyncExternalStore)(...(0, _useRefInit.default)(() => [rerender => store.subscribe(selector, rerender), () => selector(store.getState())]));
var _default = exports.default = useSubscribeState;
//# sourceMappingURL=useSubscribeState.js.map