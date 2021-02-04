"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _withForDate = _interopRequireDefault(require("./withForDate"));

var _withToolbar = _interopRequireDefault(require("./withToolbar"));

var _withValidationLoad = _interopRequireDefault(require("./withValidationLoad"));

var _withLoad = _interopRequireDefault(require("./withLoad"));

var _withInitialState = _interopRequireDefault(require("./withInitialState"));

var Decorators = {
  dialog: function dialog(target) {
    (0, _withToolbar["default"])(target);
    (0, _withValidationLoad["default"])(target);
    (0, _withLoad["default"])(target);
    (0, _withInitialState["default"])(target);
  },
  withForDate: _withForDate["default"],
  withToolbar: _withToolbar["default"],
  withValidationLoad: _withValidationLoad["default"],
  withLoad: _withLoad["default"],
  withInitialState: _withInitialState["default"]
};
var _default = Decorators;
exports["default"] = _default;
//# sourceMappingURL=Decorators.js.map