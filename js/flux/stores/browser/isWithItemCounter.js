"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _BrowserConfig = _interopRequireDefault(require("../../../constants/BrowserConfig"));
const isWithItemCounter = browserType => {
  const _config = _BrowserConfig.default[browserType];
  return typeof _config === 'undefined' ? false : !_config.withoutItemCounter;
};
var _default = exports.default = isWithItemCounter;
//# sourceMappingURL=isWithItemCounter.js.map