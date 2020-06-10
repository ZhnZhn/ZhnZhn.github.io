"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _LogicFn = _interopRequireDefault(require("./LogicFn"));

var _WithLogicGroup = _interopRequireDefault(require("./WithLogicGroup"));

var _WithLogicList = _interopRequireDefault(require("./WithLogicList"));

var _WithLogicItem = _interopRequireDefault(require("./WithLogicItem"));

var _WithLogicDnD = _interopRequireDefault(require("./WithLogicDnD"));

var Logic = (0, _extends2["default"])({}, _WithLogicGroup["default"], _WithLogicList["default"], _WithLogicItem["default"], _WithLogicDnD["default"], {
  findGroup: _LogicFn["default"].findGroup
});
var _default = Logic;
exports["default"] = _default;
//# sourceMappingURL=Logic.js.map