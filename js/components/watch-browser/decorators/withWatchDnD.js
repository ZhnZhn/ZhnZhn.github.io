"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _withDnDStyle = _interopRequireDefault(require("./withDnDStyle"));

var _withDnDGroup = _interopRequireDefault(require("./withDnDGroup"));

var _withDnDList = _interopRequireDefault(require("./withDnDList"));

var _withDnDItem = _interopRequireDefault(require("./withDnDItem"));

var withWatchDnD = function withWatchDnD(target) {
  (0, _withDnDStyle["default"])(target);
  (0, _withDnDGroup["default"])(target);
  (0, _withDnDList["default"])(target);
  (0, _withDnDItem["default"])(target);
};

var _default = withWatchDnD;
exports["default"] = _default;
//# sourceMappingURL=withWatchDnD.js.map