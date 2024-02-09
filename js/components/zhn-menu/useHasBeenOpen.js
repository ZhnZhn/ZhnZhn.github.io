"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _usePrevValue = _interopRequireDefault(require("../hooks/usePrevValue"));
const useHasBeenOpen = isShow => !(0, _usePrevValue.default)(isShow) && isShow;
var _default = exports.default = useHasBeenOpen;
//# sourceMappingURL=useHasBeenOpen.js.map