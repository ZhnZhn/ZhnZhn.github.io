"use strict";

exports.__esModule = true;
exports.default = void 0;

var _SpinnerStatus = require("./SpinnerStatus");

const crSpinnerStatus = (isLoading, isLoadFailed) => isLoading ? _SpinnerStatus.LOADING : isLoadFailed ? _SpinnerStatus.FAILED : void 0;

var _default = crSpinnerStatus;
exports.default = _default;
//# sourceMappingURL=crSpinnerStatus.js.map