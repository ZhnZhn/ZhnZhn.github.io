"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useProperty = require("./useProperty");
const useSubscribeState = (store, selector) => (0, _uiApi.useSyncExternalStore)(...(0, _useProperty.useRefInit)(() => [rerender => store.subscribe(selector, rerender), () => selector(store.getState())]));
var _default = exports.default = useSubscribeState;
//# sourceMappingURL=useSubscribeState.js.map