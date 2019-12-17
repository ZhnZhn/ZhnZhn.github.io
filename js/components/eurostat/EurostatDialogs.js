"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DialogEurostat = _interopRequireDefault(require("./DialogEurostat"));

var _DialogEurostat2 = _interopRequireDefault(require("./DialogEurostat2"));

var _DialogEurostat3A = _interopRequireDefault(require("./DialogEurostat3A"));

var _DialogSelectN = _interopRequireDefault(require("./DialogSelectN"));

var _DialogStatN = _interopRequireDefault(require("./DialogStatN"));

var EurostatDialogs = {
  Eurostat: _DialogEurostat["default"],
  Eurostat2: _DialogEurostat2["default"],
  Eurostat3A: _DialogEurostat3A["default"],
  SelectN: _DialogSelectN["default"],
  StatN: _DialogStatN["default"]
};
var _default = EurostatDialogs;
exports["default"] = _default;
//# sourceMappingURL=EurostatDialogs.js.map