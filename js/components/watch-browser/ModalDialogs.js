"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _LoadItemDialog = _interopRequireDefault(require("./LoadItemDialog"));

var _EditGroupDialog = _interopRequireDefault(require("./EditGroupDialog"));

var _EditListDialog = _interopRequireDefault(require("./EditListDialog"));

var ModalDialogs = {
  LoadItem: _LoadItemDialog["default"],
  EditGroup: _EditGroupDialog["default"],
  EditList: _EditListDialog["default"]
};
var _default = ModalDialogs;
exports["default"] = _default;
//# sourceMappingURL=ModalDialogs.js.map