"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _throttleFn = _interopRequireDefault(require("../../utils/throttleFn"));

/*eslint-disable react-hooks/exhaustive-deps */
const useThrottleCallback = (fn, deps, period) => (0, _uiApi.useCallback)((0, _throttleFn.default)(fn, period), deps || []);
/*eslint-enable react-hooks/exhaustive-deps */


var _default = useThrottleCallback;
exports.default = _default;
//# sourceMappingURL=useThrottleCallback.js.map