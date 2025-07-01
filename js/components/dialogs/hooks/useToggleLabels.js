"use strict";

exports.__esModule = true;
exports.default = void 0;
var _has = require("../../has");
var _useToggle = require("../../hooks/useToggle");
const useToggleLabels = fnClose => (0, _useToggle.useToggleAsync)(_has.HAS_WIDE_SCREEN, fnClose);
var _default = exports.default = useToggleLabels;
//# sourceMappingURL=useToggleLabels.js.map