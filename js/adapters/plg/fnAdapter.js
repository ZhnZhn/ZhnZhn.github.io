"use strict";

exports.__esModule = true;
exports.crAddConfig = void 0;
var _AdapterFn = require("../AdapterFn");
const crAddConfig = _ref => {
  let {
    option
  } = _ref;
  return {
    zhConfig: (0, _AdapterFn.crZhConfig)(option)
  };
};
exports.crAddConfig = crAddConfig;
//# sourceMappingURL=fnAdapter.js.map